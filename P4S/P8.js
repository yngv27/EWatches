
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
    //setLCDbrightness: (lvl)=>{if(lvl ==0) wOS.BKL.set(); else analogWrite(wOS.BKL, 1-lvl);},
    setLCDBrightness: (lvl) => {
      v = Math.round(lvl*8);
      v = v>7?7:v<0?0:v;
      digitalWrite([D23,D22,D14],7-v);
    },
    
    isLCDOn: ()=>{return (wOS.isAwake);}
  };

  
//wOS.buzz(); // in case we go nuts on start up
SPI1.setup({sck:D2, mosi:D3, baud: 8000000});
if (_S.list().includes("~ST7789.js")) g=require("~ST7789.js").connect({spi:SPI1, dc:D18, cs:D25, rst:D26, inverse:1, MADCTL:0});
// because square screens suck..
g.clears=g.clear;
/*g.cbuf = Graphics.createArrayBuffer(7,7,1,{msg:true});g.cbuf.setBgColor(0).clear().setColor(1).fillCircle(7,7,7);g.cbuf = g.cbuf.asImage("string");*/
g.cbuf = atob("BwcBDn37////gA==");
g.clear = function(rst) {
  let bg=g.getBgColor();  let fg=g.getColor();
  g.clears(rst).setColor(bg).setBgColor(0);
  for(let x=3; x>=0; x--) {
    g.setRotation(x);
    g.drawImage(g.cbuf,0,0);
  }
  g.setColor(fg).setBgColor(bg);
};

//shared I2C for accel/touch
I2C1.setup({scl:D7,sda:D6,bitrate:200000});
if (_S.list().includes("~SC7A20.js")) ACCEL=require("~SC7A20.js").connect({i2c: I2C1, intr: D8});
if (_S.list().includes("~CSTx16.js")) TC = require("~CSTx16.js").connect({i2c: I2C1, rst: D10, intr: D28}); //P4S
ACCEL.init();
ACCEL.isFaceUp = false;
/*setInterval(()=>{
    let a = ACCEL.getAccel();
    if(a.x > 230 && a.y < 15 && a.z > 225) {
        if(!ACCEL.isFaceUp) ACCEL.emit("faceup");
        ACCEL.isFaceUp = true;
    } else {
        ACCEL.isFaceUp = false;
    }
}, 400)
//ACCEL={};
*/
ACCEL.on("faceup", wOS.wake);

//setWatch(()=>{wOS.buzz();}, wOS.CHG, {"edge":"both", "repeat":true});
Bangle = wOS;
wOS.UI = {};
logD = ()=>{};


// battery is D31, lo = 0.37, high = 0.47
//E.getBattery = () => { return (analogRead(wOS.BAT)-0.54)*555; };
E.getBattery = () => {
    let batLo = 0.37 , batHi = 0.47;
    let pct = Math.floor((analogRead(wOS.BAT) - batLo) * 100 / (batHi-batLo));
    return (pct > 100) ? 100 : pct;
};

wOS.steps = 0;
/* not yet
wOS.getStepCount = () => {return ACCEL.getSteps();};
wOS.setStepCount= (s) => {if(s==0) ACCEL.resetSteps(); else wOS.steps = s;};
wOS.resetStepCounter = () => { ACCEL.resetSteps(); };
*/
wOS.getStepCount = () => {return 0;};
wOS.setStepCount= (s) => {};
wOS.resetStepCounter = () => {  };

NRF.setAdvertising({},{name:"P4S "+NRF.getAddress().split(':').slice(-2).join('')});

setInterval(()=>{  // advertise battery level every 5 min
    NRF.setAdvertising({0x180F : [E.getBattery()] });
}, 300000);

//*
// MANAGE EVENTS
BTTN=D13;
let BUTTON = {
lastUp: 0,
longpressTO: 0,
tapTO: 0,
longTime: 1000,
tapTime: 250,
dbltap: false,
watchUp: false,
upOpts: { repeat:false, edge:'falling', debounce:25},
downOpts: { repeat:false, edge:'rising', debounce:25},
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
setWatch(btnUp, BTTN, BUTTON.upOpts);
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
setWatch(btnDown, BTTN, BUTTON.downOpts);
};

setWatch(btnDown, BTTN, BUTTON.downOpts);
//*/
  