
E.showMessage = function(msg,title) {};
delayms = (ms) => {
  digitalPulse(D25,0,ms); // just to wait 10ms
  digitalPulse(D25,0,0);
};

const BTN2 = D30;
//pinMode(BTN2, "input_pullup")
wOS = {
  BUZ: D25,
  CHG: D22,
  BLK: D16,
  BAT: D2,
  buzz: (ms) => {  wOS.BUZ.set(); setTimeout(()=>{wOS.BUZ.reset();}, ms?ms:200);  },
  isCharging: ()=>{return !(wOS.CHG.read());},
  setLCDBrightness: ()=>{},
};

wOS.BUZ.reset(); // in case we go nuts on start up

/* E-INK
opts = {
  cs: D9, //dummy
  dc: D28,
  rst: D11,
  width: 200,
  height: 200,
  spi: spi1,
};
var g=require("~SSD1681.js").connect(opts);
g.setRotation(2,1);
g.setBgColor(1).setColor(0);
g.clear();
*/
// MEMLCD
opts = {
  cs: D28, 
  //vcom: D11,
  width: 240,
  height: 240,
};
opts.spi = new SPI();
opts.spi.setup({sck: D18, mosi: D19, order: "lsb", baud: 2000000});

var g = require("~MEMLCD.js").connect(opts); 

//if (_S.read("~SC7A20.js")) eval(_S.read("~SC7A20.js"));
//ACCEL.on("faceup", wOS.wake);

setWatch(()=>{wOS.buzz();}, wOS.CHG, {"edge":"both", "repeat":true});
Bangle = wOS;
wOS.UI = {};
logD = ()=>{};
// we're "special"
NRF.setAdvertising({},{name:"DT28X "+NRF.getAddress().split(':').slice(-2).join('')});

// battery is D2, hi=0.693 lo=0.576
E.getBattery = () => { return (analogRead(D2)-0.576)*854; };
setInterval(()=>{
  NRF.setAdvertising({
    0x180F : [E.getBattery()] // Service data 0x180F = 95
  });
}, 300000);
wOS.setStepCount = (n) => {};
wOS.getStepCount = () => { return 0; };

var fc=new SPI(); // font chip - 2MB SPI flash
D6.write(1);
fc.setup({sck:D9,miso:D7,mosi:D8,mode:0});
fc.send([0xb9],D6); //put to deep sleep
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
