
E.showMessage = function(msg,title) {};

wOS = {
  BUZ: D16,
  CHG: D12,
  BAT: D0,

  time_left: 0,
  VIBRATE: true,
  buzz: (ms) => { analogWrite(wOS.BUZ,0.65); setTimeout(()=>{wOS.BUZ.set();}, ms?ms:200);  },
  /*
  buzz: function(v, i){
    return new Promise(function(resolve, reject) {
        v = v? v : 100;
        i=i?i:1.0; // intensity
        if (!wOS.VIBRATE) resolve();
        else if (v<=50){
            digitalPulse(wOS.BUZ,true,v);
            resolve();
        } else {
            //analogWrite(wOS.BUZZPIN,i);
            analogWrite(wOS.BUZZPIN, 0.5);
            setTimeout(()=>{wOS.BUZ.set();resolve();},v);
        }
    });
  },
*/
  isCharging: ()=>{return wOS.CHG.read();},
  ticker: 0,
  tikint: 0,
  sleep: ()=> {
    g.lcd_sleep();
    wOS.setLCDBrightness(0);
    wOS.emit("sleep");
    wOS.isAwake = false;
  },
  wake: ()=>{
    wOS.ticker = 10;
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
  brightLevel: ()=> { return 1; },
};

wOS.BUZ.set(); // in case we go nuts on start up

if (_S.read("~ST7789.js")) eval(_S.read("~ST7789.js"));
wOS.setLCDTimeout = (v)=>{wOS.ON_TIME=v<5?5:v;},
//screen brightness function
wOS.setLCDBrightness = function(v) {
  v = Math.round(v*8);
  v = v>7?7:v<0?0:v;
	digitalWrite([D23,D22,D14],7-v);
};

wOS.I2C = new I2C();
wOS.I2C.setup({scl:D7,sda:D6,bitrate:200000});

ACCEL = require("~BMA421.js").connect(wOS.I2C);
ACCEL.init();
ACCEL.isFaceUp = () => {
    let a= ACCEL.readBytes(0x12,6);
    if(a[3] < 10 && a[1] < 245 && a[1] > 235 && a[5] > 200) return true;
    return false;
  };
setTimeout(()=>{
    setInterval(()=>{
        if(ACCEL.isFaceUp()) {wOS.wake();};
    }, 300);    
}, 3000);
//ACCEL.on("faceup",()=>{if (!wOS.awake) wOS.wake();});
//console.log("loaded accel");

wOS.setStepCount = (sc) => {ACCEL.resetSteps();};
wOS.getStepCount = () => {return ACCEL.getSteps();};
//wOS.setStepCount = (sc) => {};

delayms = (ms) => {
  digitalPulse(D25,0,ms); // just to wait 10ms
  digitalPulse(D25,0,0);
};
setWatch(()=>{wOS.buzz();}, wOS.CHG, {"edge":"both", "repeat":true});
Bangle = wOS;
wOS.UI = {};
logD = print;

E.setTimeZone(-4);
// battery is D31, hi=0.58 lo=0.50
E.getBattery = () => { return (analogRead(D31)-0.50)*909; };

//setWatch(()=>{digitalPulse(wOS.BUZ, 0, [100,50,100]);}, BTN1, {"edge":"rising"});

setInterval(()=>{  // advertise battery level every 5 min
  NRF.setAdvertising({0x180F : [E.getBattery()] });
}, 300000);

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
