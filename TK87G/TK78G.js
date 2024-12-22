
E.showMessage = function(msg,title) {};
delayms = (ms) => {
  digitalPulse(D47,0,ms); // just to wait 10ms
  digitalPulse(D47,0,0);
};

wOS = {
  BUZ: D20,
  CHG: D40,
  BAT: D3,
  buzz: (ms) => {  
    if(ms == undefined) ms = 200;
    analogWrite(wOS.BUZ, 0.5); setTimeout(()=>{wOS.BUZ.reset();}, ms);
  },
  isCharging: ()=>{return !(wOS.CHG.read());},
  BKL: D8,
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

wOS.BUZ.reset(); // in case we go nuts on start up
/*
let spi1 = new SPI();
spi1.setup({sck: D36, mosi: D34, baud: 2000000});
g = require("~IL3829.js").connect(spi1, {cs: D4, dc: D33, rst: D35, width: 200, height: 200});
setTimeout( ()=>{
  g.setBgColor(1).setColor(0);
  g.clear(); 
}, 500);
*/


//if (_S.read("~SC7A20.js")) eval(_S.read("~SC7A20.js"));

setWatch(()=>{wOS.buzz();}, wOS.CHG, {"edge":"both", "repeat":true});
Bangle = wOS;
wOS.UI = {};
logD = ()=>{};

// battery is D3, hi=0.23 lo=0.20
E.getBattery = () => {
  let batLo = 0.20 , batHi = 0.23;
  let pct = Math.floor((analogRead(wOS.BAT) - batLo) * 100 / (batHi-batLo));
  return (pct > 100) ? 100 : pct;
};

setInterval(()=>{
  NRF.setAdvertising({
    0x180F : [E.getBattery()] // Service data 0x180F = 95
  });
}, 300000);
wOS.setStepCount = (n) => {};
wOS.getStepCount = () => { return 0; };

SPI1.setup({sck:D4, mosi:D26, baud: 8000000});
g=require("~ST7789.js").connect({spi:SPI1, dc:D27, cs:D5, rst:D6, height:280, yoff:20, inverse:1, MADCTL:0});

wOS.I2C= new I2C();
wOS.I2C.setup({sda: D38, scl: D37, bitrate: 100000});
var ACCEL=require("~ACCEL.js").connect({i2c: wOS.I2C});
ACCEL.init();
ACCEL.on("faceup", wOS.wake);

//TC = {start: ()=>{}, stop: ()=>{}};
wOS.I2C2 = new I2C();
wOS.I2C2.setup({sda: D33, scl: D34, bitrate: 200000});
var TC = require("~CSTx16.js").connect({i2c: wOS.I2C2, rst: D35, intr: D36}); //TK78G


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
