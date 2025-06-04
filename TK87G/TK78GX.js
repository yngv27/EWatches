// TK78GX - for units without an LCD attached (no ST7789, CST716)
E.showMessage = function(msg,title) {};
delayms = (ms) => {
  digitalPulse(D47,0,ms); // just to wait 10ms
  digitalPulse(D47,0,0);
};

wOS = {
  BUZ: D20,
  CHG: D40,
  BAT: D3,
  BKL: D8,

  buzz: (ms) => { wOS.BKL.reset(); wOS.BUZ.set(); setTimeout(()=>{wOS.BUZ.reset();}, ms?ms:100);  },
 
  isCharging: ()=>{return !(wOS.CHG.read());},
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
    setLCDPower:(b)=>{
      if(b){
        if(wOS.isAwake) wOS.time_left=wOS.ON_TIME;
        else wOS.wake();
      }else wOS.sleep();
    },
    isLCDOn:()=>{
      return wOS.isAwake;
    }
};

wOS.BUZ.reset(); // in case we go nuts on start up

let spi1 = new SPI();
spi1.setup({sck: D36, mosi: D34, baud: 2000000});
g = require("~SSD1681.js").connect({spi:spi1, cs: D4, dc: D33, rst: D35, width: 200, height: 200});
setTimeout( ()=>{
  g.setBgColor(1).setColor(0);
  g.setRotation(2,1);
  g.clear(); 
  g.lcd_wake = ()=>{};
  g.lcd_sleep = g.lcd_wake;
}, 500);

//if (_S.read("~SC7A20.js")) eval(_S.read("~SC7A20.js"));

setWatch(()=>{wOS.buzz();}, wOS.CHG, {"edge":"both", "repeat":true});
//Bangle = wOS;
wOS.UI = {};
//logD = ()=>{};

// battery is D3, hi=0.23 lo=0.20
E.getBattery = () => {
  let batLo = 0.18 , batHi = 0.23;
  let pct = Math.floor((analogRead(wOS.BAT) - batLo) * 100 / (batHi-batLo));
  return (pct > 100) ? 100 : pct;
};
setWatch(()=>{wOS.uptime = Math.floor((new Date()).getTime()/1000);}, wOS.CHG, {edge: "both", repeat: true});

setInterval(()=>{
  NRF.setAdvertising({
    0x180F : [E.getBattery()] // Service data 0x180F = 95
  });
}, 300000);
wOS.setStepCount = (n) => {};
wOS.getStepCount = () => { return 0; };

wOS.I2C= new I2C();
wOS.I2C.setup({sda: D38, scl: D37, bitrate: 100000});
var ACCEL=require("~ACCEL.js").connect({i2c: wOS.I2C});
ACCEL.init();
ACCEL.on("faceup", wOS.wake);
TC = {start: ()=>{}, stop: ()=>{}};

//DIE = require("~BTN.js").init(BTN1);

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
  setWatch(btnUp, BTN2, BUTTON.upOpts);
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
  setWatch(btnDown, BTN2, BUTTON.dnOpts);
};

setWatch(btnDown, BTN2, BUTTON.dnOpts);
