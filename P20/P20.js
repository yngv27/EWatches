/* P20 startup code
** Custom pin setup for this watch
*/
const BTN2 = D26;
eval(_S.read("lcd.js"));
g = GC9A01({SCK:D8,IO: D9,DC:D6,CS:D14, RST:D7});
 
pinMode(D15, "output");
pinMode(D16, "output");
D15.write(1);
D16.write(1);
pinMode(D5, "output");
D5.write(0);
//D23.write(0); ?? D24?
// set CSs high
//D14.set();
//D20.set();

eval(_S.read("~SC7A20.js"));
//let i2c = new I2C();
//i2c.setup ({sda: D15, scl: D16});
//ACCEL = SC7A20({I2C: i2c, ADDR: 0x18, INT: D5});

//eval(_S.read("touch.js"));
//i2c = new I2C();
//i2c.setup ({sda: D10, scl: D11});
//TC.init({I2C: i2c, ADDR: 0x15, INT: D12, RST:D13});
TC = { stop: ()=>{} };

eval(_S.read("hrs.js")); //just shuts down the LED
wOS = {
  BKL: D4,
  BUZ: D22,
  BAT: D30,
  CHG: D3, 
  time_left: 0,
  tikint: 0,
  isAwake: false,
  buzz: (ms)=> {wOS.BUZ.set(); setTimeout(()=>{wOS.BUZ.reset();},ms?ms:250);},
  isCharging: ()=>{return !wOS.CHG.read();},
  wake: ()=> {
    g.lcd_wake();
    wOS.setLCDBrightness(wOS.brightLevel());
    wOS.emit("wake");
    wOS.time_left = 7;
    //print(`TL: ${wOS.time_left}`);
    wOS.isAwake = true;
    if(!wOS.tikint) wOS.tikint = setInterval(wOS.tick, 1000);
  },
  tick: (t)=> {
    wOS.emit("tick");
    if(typeof(wOS.time_left) === "undefined") wOS.time_left = 10;
    //print(`Tick: ${wOS.time_left}`);
    if(--wOS.time_left <= 0) {
      wOS.sleep();
      clearInterval(wOS.tikint);
      wOS.tikint = 0;
    }
  },
  sleep: ()=> {
    TC.stop();
    wOS.BKL.reset();
    g.lcd_sleep();
    wOS.isAwake = false;
  },
  brightLevel: ()=> { 
    let c=Math.floor(Date().getHours()/3);
    // custom to each watch: set brightness by time of day
    return [0.001,0.025,0.5,0.99][c > 3 ? 7-c : c]; 
  },
  setLCDBrightness: (lvl)=>{analogWrite(wOS.BKL, lvl);},
};
setWatch(()=>{
  wOS.buzz();
}, wOS.CHG, {"edge": "both", "repeat":true});
// full: 0.317. empty: 0.255 Multiplicant: 100/diff
E.getBattery = () => { return Math.floor((analogRead(wOS.BAT) - 0.255) * 1612); };
E.setTimeZone(-4);
wOS.UI = {};
logD = ()=>{};

setInterval(()=>{
  NRF.setAdvertising({
    0x180F : [E.getBattery()] // Service data 0x180F = 95
  });
}, 300000);
  
ACCEL.on("faceup",()=>{
  if(! wOS.isAwake) wOS.wake();
  else wOS.time_left = 7;
});

TC.stop();
Bangle = wOS;
setWatch(()=>{
  if(!wOS.isAwake) { wOS.wake();}
}, BTN2, {edge:"rising", repeat: true});

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
