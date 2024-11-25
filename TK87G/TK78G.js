
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
  
  setLCDBrightness: ()=>{},
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
// we're "special"
//NRF.setAdvertising({},{name:"MagicX "+NRF.getAddress().split(':').slice(-2).join('')});

// battery is D3, hi=0.223 lo=0.20
E.getBattery = () => { return (analogRead(wOS.BAT)-0.2)*3333; };
setInterval(()=>{
  NRF.setAdvertising({
    0x180F : [E.getBattery()] // Service data 0x180F = 95
  });
}, 300000);
wOS.setStepCount = (n) => {};
wOS.getStepCount = () => { return 0; };

// MANAGE EVENTS
let BUTTON = {
  lastUp: 0,
  longpressTO: 0,
  tapTO: 0,
  longTime: 1000,
  tapTime: 250,
  dbltap: false,
  watchUp: false,
  dnOpts: { repeat:false, edge:'falling', debounce:25},
  upOpts: { repeat:false, edge:'rising', debounce:25},
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
