pinMode(D4, "input_pulldown");
// turn off HRS LEDs
//D7.set(); 
E.showMessage = function(msg,title) {};
delayms = (ms) => {
  digitalPulse(D43,0,ms); // just to wait ms - D43 is a "dummy" (for QY03)
  digitalPulse(D43,0,0);
};
wOS = {
  BUZ: D6,
  CHG: D8,
  BKL: D12,
  BAT: D30,
  time_left: 0,
  buzz: (ms) => {  wOS.BUZ.reset(); setTimeout(()=>{wOS.BUZ.set();}, ms?ms:200);  },
  isCharging: ()=>{return !(wOS.CHG.read());},
  ticker: 0,
  tikint: 0,
  sleep: ()=> {
    g.lcd_sleep();
    TC.stop();
    wOS.setLCDBrightness(0);
    wOS.emit("sleep");
    wOS.isAwake = false;
  },
  wake: ()=>{
    wOS.ticker = 7;
    if(wOS.isAwake) return;
    TC.start();
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
  setLCDBrightness: (lvl)=>{analogWrite(wOS.BKL, lvl);},
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

wOS.BUZ.set(); // in case we go nuts on start up

setWatch(()=>{wOS.buzz();}, wOS.CHG, {"edge":"both", "repeat":true});
//Bangle = wOS;
wOS.UI = {};
logD = ()=>{};

// battery is D30, hi=0.60 lo=0.49
E.getBattery = () => {
  let batLo = 0.485, batHi = 0.611;
  let pct = Math.floor((analogRead(wOS.BAT) - batLo) * 100 / (batHi-batLo));
  return (pct > 100) ? 100 : pct;
};
wOS.setStepCount = (n) => {};
wOS.getStepCount = () => { return 0; };

// we're "special"
//NRF.setAdvertising({},{name:"QY03 "+NRF.getAddress().split(':').slice(-2).join('')});

setInterval(()=>{  // advertise battery level every 5 min
  NRF.setAdvertising({0x180F : [E.getBattery()] });
}, 300000);

SPI1.setup({sck:D45, mosi:D44, baud: 8000000});
g=require("~ST7789.js").connect({spi:SPI1, dc:D47, cs:D3, rst:D2, height:280, yoff:20});

I2C1.setup({sda: D15, scl:D14, bitrate:200000})
let ACCEL=require("~SC7A20.js").connect({i2c: I2C1, intr:D16})
let TC = require("~CSTx16.js").connect({i2c: I2C1, rst: D39, intr: D32});
 
/*
ACCEL.on('faceup',() => {
  wOS.wake();
});
*/
//*

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
  logD("bntDown");
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
  logD("bntUp");
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
//*/
