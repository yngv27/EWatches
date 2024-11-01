
wOS = {
    BUZ: D16,
    CHG: D19,
    BKL: D23,
    BAT: D31,
    time_left: 0,
    buzz: (ms) => { if(wOS.isAwake) return; wOS.BKL.set(); wOS.BUZ.reset(); setTimeout(()=>{wOS.BUZ.set();}, ms?ms:100);  },
    isCharging: ()=>{return !(wOS.CHG.read());},
    ticker: 0,
    tikint: 0,
    isAwake: false,
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
      let c=Math.floor(Date().getHours()/3)-1;
      if(c<0)c++;
      return [0.01,0.2,0.75,0.99][c > 3 ? 7-c : c]; 
    },
    setLCDBrightness: (lvl)=>{if(lvl ==0) wOS.BKL.set(); else analogWrite(wOS.BKL, 1-lvl);},
    isLCDOn: ()=>{return (wOS.isAwake);}
  };

  
wOS.buzz(); // in case we go nuts on start up
//shared I2C for accel/touch
wOS.I2C=new I2C();
wOS.I2C.setup({scl:D7,sda:D6,bitrate:200000});

if (_S.list().includes("~GC9A01.js")) eval(_S.read("~GC9A01.js"));
if (_S.list().includes("~BMA421.js")) ACCEL=require("~BMA421.js").connect(wOS.I2C);
if (_S.list().includes("~CST716.js")) eval(_S.read("~CST716.js"));
TC.init(wOS.I2C, { "RESET": D13, "INTPIN": D28});
TC.start();
ACCEL.isFaceUp = false;
setInterval(()=>{
    let a = ACCEL.getAccel();
    if(a.x > 230 && a.y < 15 && a.z > 225) {
        if(!ACCEL.isFaceUp) ACCEL.emit("faceup");
        ACCEL.isFaceUp = true;
    } else {
        ACCEL.isFaceUp = false;
    }
}, 400)
//ACCEL={};
ACCEL.on("faceup", wOS.wake);

setWatch(()=>{wOS.buzz();}, wOS.CHG, {"edge":"both", "repeat":true});
Bangle = wOS;
wOS.UI = {};
logD = ()=>{};


// battery is D31, lo = 0.485, high = 0.721
//E.getBattery = () => { return (analogRead(wOS.BAT)-0.54)*555; };
E.getBattery = () => {
    let batLo = 0.485, batHi = 0.611;
    let pct = Math.floor((analogRead(wOS.BAT) - batLo) * 100 / (batHi-batLo));
    return (pct > 100) ? 100 : pct;
};

wOS.steps = 0;
wOS.getStepCount = () => {return ACCEL.getSteps();};
wOS.setStepCount= (s) => {if(s==0) ACCEL.resetSteps(); else wOS.steps = s;};
wOS.resetStepCounter = () => { ACCEL.resetSteps(); };

setInterval(()=>{  // advertise battery level every 5 min
    NRF.setAdvertising({0x180F : [E.getBattery()] });
}, 300000);

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
//*/
  