global.wOS = {
  CHG: D19,
  BAT: D31,
  BUZ: D16,
  ON_TIME: 8,
  BRIGHT: 0.5,
  FACEUP:true,
  VIBRATE:true,
  isAwake : true,
  time_left:8,
  ticker:undefined,
  settings:undefined,
  buzz: function(v){
      return new Promise(function(resolve, reject) {
          v = v? v : 100;
          if (!wOS.VIBRATE) resolve();
          else if (v<=50){
              digitalPulse(wOS.BUZ,false,v);
              resolve();
          } else {
              wOS.BUZ.reset();
              setTimeout(()=>{wOS.BUZ.set();resolve();},v);
          }
      });
  },
  isCharging:()=>{return !wOS.CHG.read();},

//screen brightness function
  brightness: (v) => {
    v = Math.round(v/0.125);
    v = v>7?7:v<0?0:v;
    v=v>7?1:v;
    digitalWrite([D23,D22,D14],7-v);
  },

  setLCDTimeout:(v)=>{wOS.ON_TIME=v<5?5:v;},
  setLCDBrightness:(v)=>{wOS.BRIGHT=v; wOS.brightness(v);},

  sleep:() => {
      wOS.isAwake = false;
      wOS.brightness(0);
      wOS.emit("lcdPower",false);
      g.flip(); //make sure finished with SPI before stopping it.
      g.lcd_sleep();
     // setTimeout(anom89,100);
  },
  bright:()=>{
    var blevel = new Uint8Array([2,2,2,2,2,2,2,9,9,9,9,9,9,9,9,9,9,9,9,7,7,1,1,1]);
    var hrs = Date().getHours();
    wOS.brightness(blevel[Date().getHours()]/10);
  },
  wake:()=> {
      wOS.time_left = wOS.ON_TIME;
      if(wOS.isAwake) return;
      wOS.isAwake = true;
      g.lcd_wake();
      wOS.emit("lcdPower",true);
      wOS.bright();
      wOS.ticker = setInterval(wOS.tick,1000);
  },
  setLCDPower:(b)=>{
      if (b){
          if (wOS.isAwake) wOS.time_left = wOS.ON_TIME; else wOS.wake();
      } else 
          wOS.sleep();
  },
  isLCDOn:()=>{ return wOS.isAwake;},
  tick:()=>{
      wOS.time_left--;
      if (wOS.time_left<=0){
         if (wOS.ticker) wOS.ticker=clearInterval(wOS.ticker);
         wOS.emit("sleep",true);
         wOS.sleep();
      }
  }
};

wOS.I2C = new I2C();
wOS.I2C.setup({scl:D7,sda:D6,bitrate:200000});

setWatch(()=>{
  if(!wOS.isAwake) wOS.wake();
  wOS.buzz();
  wOS.emit("charging",wOS.isCharging());
},wOS.CHG,{edge:"both",repeat:true,debounce:500});


eval(_S.read("~ST7789.js"));
var g = ST7789();


ACCEL = require("~BMA421.js").connect(wOS.I2C);
ACCEL.init();
//ACCEL.on("faceup",()=>{if (!wOS.isAwake) wOS.wake();});
//console.log("loaded accel");
LED = require("~SGM31324.js").setup(wOS.I2C);
if(typeof(BTN2) === "undefined") BTN2 = D20;
if(typeof(LCD)==="undefined")   
    var LCD=require("~SEGLCD.js").init({EN:D15, RST:D30, i2c:wOS.I2C});

wOS.ticker = setInterval(wOS.tick,1000);

setWatch(() =>{
  if(wOS.isAwake) {
      wOS.showLauncher();
  } else  wOS.wake();
},BTN1,{repeat:true,edge:"rising"});

E.getBattery = function (){
  // lo = .52 hi = .59
    return Math.floor((analogRead(wOS.BAT)-0.52)*1428);
};
E.setTimeZone(-4);
wOS.getStepCount = ()=>{ return ACCEL.getSteps(); };
wOS.resetStepCounter = () => { ACCEL.resetSteps(); }; 

wOS.showLauncher = function(){
  //load("launch.js");
};

global.Bangle = wOS;
