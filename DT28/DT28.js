
E.showMessage = function(msg,title) {};
delayms = (ms) => {
  digitalPulse(D25,0,ms); // just to wait 10ms
  digitalPulse(D25,0,0);
};

const BTN2 = D30;
pinMode(BTN2, "input_pull")
wOS = {
  BUZ: D25,
  CHG: D22,
  BLK: D16,
  BAT: D2,
  time_left: 0,
  buzz: (ms) => {  wOS.BUZ.set(); setTimeout(()=>{wOS.BUZ.reset();}, ms?ms:200);  },
  isCharging: ()=>{return !(wOS.CHG.read());},
  ticker: 0,
  tikint: 0,
  sleep: ()=> {
    g.lcd_sleep();
    wOS.setLCDBrightness(0);
    wOS.emit("sleep");
    wOS.isAwake = false;
  },
  wake: ()=>{
    wOS.ticker = 7;
    if(wOS.isAwake) return;
    g.lcd_wake();
    wOS.setLCDBrightness(wOS.brightLevel());
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
  brightLevel: ()=> { 
    let c=Math.floor(Date().getHours()/3);
    return [0.1,0.5,0.7,0.99][c > 3 ? 7-c : c]; 
  },
  setLCDBrightness: (lvl)=>{analogWrite(wOS.BLK, lvl);},
};

wOS.BUZ.reset(); // in case we go nuts on start up

if (_S.read("~ST7789.js")) eval(_S.read("~ST7789.js"));

/*
wOS.I2C = new I2C();
wOS.I2C.setup({scl:D15,sda:D14,bitrate:200000});
if (_S.read("~KXTJ3.js")) eval(_S.read("~KXTJ3.js"));
//setTimeout(()=>{
  ACCEL.on("faceup", wOS.wake);
//}, 250);
*/

setWatch(()=>{wOS.buzz();}, wOS.CHG, {"edge":"both", "repeat":true});
Bangle = wOS;
wOS.UI = {};
logD = ()=>{};

E.setTimeZone(-4);
// battery is D2, hi=0.70 lo=0.65
E.getBattery = () => { return (analogRead(D2)-0.65)*2000; };
NRF.setAdvertising({
    0x180F : [E.getBattery()] // Service data 0x180F = 95
  });
wOS.setStepCount = (n) => {};
wOS.getStepCount = () => { return 0; };


//setWatch(()=>{digitalPulse(wOS.BUZ, 0, [100,50,100]);}, BTN1, {"edge":"rising"});
/*
setInterval(()=>{  // advertise battery level every 5 min
  NRF.setAdvertising({0x180F : [E.getBattery()] });
}, 300000);
*/
// MANAGE EVENTS
let BUTTON = {
  lastUp: 0,
  longpressTO: 0,
  tapTO: 0,
  longTime: 1000,
  tapTime: 250,
  dbltap: false,
  watchUp: false,
  upOpts: { repeat:false, edge:'falling', debounce:25},
  dnOpts: { repeat:false, edge:'rising', debounce:25},
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
  setWatch(btnDown, BTN1, BUTTON.downOpts);
};

setWatch(btnDown, BTN1, BUTTON.downOpts);
