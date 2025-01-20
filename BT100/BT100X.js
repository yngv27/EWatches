
E.showMessage = function(msg,title) {};
delayms = (ms) => {
  digitalPulse(D25,0,ms); // just to wait <50ms; unused pin
  digitalPulse(D25,0,0);
};

wOS = {
  BUZ: D7,
  CHG: D3,
  BAT: D2,
  time_left: 0,
  buzz: (ms) => {  digitalPulse(wOS.BUZ, 1, 30);  },
  //buzz: (ms) => { analogWrite(wOS.BUZ, 0.5); setTimeout(()=>{wOS.BUZ.reset();}, ms?ms:100); },
  isCharging: ()=>{return (wOS.CHG.read());},
  ticker: 0,
  tikint: 0,
  sleep: ()=> {
    g.lcd_sleep();
    wOS.emit("sleep");
    wOS.isAwake = false;
  },
  wake: ()=>{
    wOS.ticker = 7;
    if(wOS.isAwake) return;
    g.lcd_wake();
    if(!wOS.tikint) wOS.tikint = setInterval(wOS.tick, 1000);
    wOS.emit("wake");
    wOS.isAwake = true;
  },
  tick: ()=>{
    wOS.ticker--;
    wOS.emit("tick");
    if(wOS.ticker <= 0){
      clearInterval(wOS.tikint);
      wOS.tikint = 0;
      wOS.sleep();
    }
  },
};

wOS.BUZ.reset(); // in case we go nuts on start up
wOS.isLCDOn = ()=>{return wOS.isAwake;}

SPI1.setup({sck: D28, mosi: D30, baud: 2000000});
opts = {
  cs: D29, //dummy
  dc: D27,
  rst: D31,
  width: 200,
  height: 200,
};
g=require("~IL3829.js").connect(SPI1, opts);
g.lcd_sleep = ()=>{};
g.lcd_wake = ()=>{};

//if (_S.read("driver.js")) eval(_S.read("driver.js"));
//if (_S.read("~SC7A20.js")) eval(_S.read("~SC7A20.js"));
//ACCEL.on("faceup", wOS.wake);

setWatch(()=>{wOS.buzz();}, wOS.CHG, {"edge":"both", "repeat":true});
wOS.UI = {};
logD = ()=>{};

// battery is D2, hi=? lo=?
E.getBattery = () => {
  let batLo = 0.27 , batHi = 0.4;
  let pct = Math.floor((analogRead(wOS.BAT) - batLo) * 100 / (batHi-batLo));
  return (pct > 100) ? 100 : pct;
};
setWatch(()=>{wOS.uptime = getTime();}, wOS.CHG, {edge: "both", repeat: true});
setInterval(()=>{
  NRF.setAdvertising({
    0x180F : [E.getBattery()]}, // Service data 0x180F = 95
    {name: "BT100X "+NRF.getAddress().slice(-5)
  });
}, 300000);
wOS.setStepCount = (n) => {};
wOS.getStepCount = () => { return 0; };

//setWatch(()=>{digitalPulse(wOS.BUZ, 0, [100,50,100]);}, BTN1, {"edge":"rising"});

// MANAGE EVENTS
let BUTTON = {
  lastUp: 0,
  longpressTO: 0,
  tapTO: 0,
  longTime: 1000,
  tapTime: 250,
  dbltap: false,
  watchUp: false,
  upOpts: { repeat:false, edge:'falling', debounce:37},
  dnOpts: { repeat:false, edge:'rising', debounce:37},
};
  
const btnDown = (b) => {
  //longpress = b.time;
  if(BUTTON.tapTO) {
    clearTimeout(BUTTON.tapTO);
    BUTTON.tapTO = 0;
    BUTTON.dbltap = true;
  }
  BUTTON.longpressTO = setTimeout(function(){
    // long press behaviour
    //BUTTON.emit('longpress');
    wOS.UI.emit('longpress');
    BUTTON.longpressTO = 0;
    // ignore button up
    BUTTON.watchUp = false;
  }, BUTTON.longTime);
  logD(`lpto=${BUTTON.longpressTO}`);
  BUTTON.watchUp = true;
  setWatch(btnUp, BTN1, BUTTON.upOpts);
};

const btnUp = (b) => {
  if(BUTTON.longpressTO) {
    clearTimeout(BUTTON.longpressTO);
    BUTTON.longpressTO = 0;
  } 
  if(BUTTON.dbltap) {
    //BUTTON.emit('dbltap');
    wOS.UI.emit('dbltap');
    BUTTON.dbltap = false;
  } else if (BUTTON.watchUp) {
    BUTTON.tapTO = setTimeout(function(){
      // long press behaviour
      //BUTTON.emit('tap');
      wOS.UI.emit('tap');
      BUTTON.tapTO = 0;
      BUTTON.dbltap = false;
    }, BUTTON.tapTime);
    logD(`lpto=${BUTTON.tapTO}`);
  }
  BUTTON.lastUp = b.time;
  setWatch(btnDown, BTN1, BUTTON.dnOpts);
};

setWatch(btnDown, BTN1, BUTTON.dnOpts);
