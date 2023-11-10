
E.showMessage = function(msg,title) {};
delayms = (ms) => {
  digitalPulse(D4,0,ms); // just to wait ms - D4 is a "dummy" (broken button)
  digitalPulse(D4,0,0);
};
wOS = {
  BUZ: D6,
  CHG: D8,
  BLK: D12,
  BAT: D30,
  time_left: 0,
  buzz: (ms) => {  wOS.BUZ.reset(); setTimeout(()=>{wOS.BUZ.set();}, ms?ms:200);  },
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
Bangle = wOS;
wOS.UI = {};
logD = ()=>{};

//E.setTimeZone(-4);
// battery is D2, hi=0.347 lo=0.275
E.getBattery = () => { 
  var l=3.5,h=4.19;
  v=4.20/0.59*analogRead(wOS.BAT);
  if(v>=h)return 100;
  if(v<=l)return 0;
  return 100*(v-l)/(h-l);
}
wOS.setStepCount = (n) => {};
wOS.getStepCount = () => { return 0; };

// we're "special"
NRF.setAdvertising({},{name:"QY03X "+NRF.getAddress().split(':').slice(-2).join('')});

setInterval(()=>{  // advertise battery level every 5 min
  NRF.setAdvertising({0x180F : [E.getBattery()] });
}, 300000);

// The 2.13 E-ink display
var spi1 = new SPI();
spi1.setup({sck: D45, mosi: D2, baud: 2000000});
//DC = D44;
//RST=D47;
D3.reset();  // "CS"

var g = require("~SSD1681.js").connect({spi: spi1, cs: 0, dc: D44, rst: D47, width: 128, height: 250}, ()=>{
  g.setRotation(3,1);
  g.getHeight = () => {return 122;};
  g.setBgColor(1).setColor(0);
  g.clear();
  g.flip();
});
/*
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
*/