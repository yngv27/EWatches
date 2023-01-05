
global.wOS = {
  BATPIN: D19,
  BATLVL: D31,
  BUZZPIN: D16,
  ON_TIME: 10,
  BRIGHT: 0.5,
  FACEUP:true,
  VIBRATE:true,
  awake : true,
  time_left:10,
  ticker:undefined,
  settings:undefined,
  buzz: function(v){
      return new Promise(function(resolve, reject) {
          v = v? v : 100;
          if (!wOS.VIBRATE) resolve();
          else if (v<=50){
              digitalPulse(wOS.BUZZPIN,false,v);
              resolve();
          } else {
              wOS.BUZZPIN.reset();
              setTimeout(()=>{wOS.BUZZPIN.set();resolve();},v);
          }
      });
  },
  isCharging:()=>{return !wOS.BATPIN.read();},

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
      wOS.awake = false;
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
      wOS.awake = true;
      wOS.time_left = wOS.ON_TIME;
      g.lcd_wake();
      wOS.emit("lcdPower",true);
      wOS.bright();
      wOS.ticker = setInterval(wOS.tick,1000);
  },
  setLCDPower:(b)=>{
      if (b){
          if (wOS.awake) wOS.time_left = wOS.ON_TIME; else wOS.wake();
      } else 
          wOS.sleep();
  },
  isLCDOn:()=>{ return wOS.awake;},
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
  if(!wOS.awake) wOS.wake();
  wOS.buzz();
  wOS.emit("charging",wOS.isCharging());
},wOS.BATPIN,{edge:"both",repeat:true,debounce:500});


eval(_S.read("st7789.js"));
var g = ST7789();

/*
eval(_S.read("bma421.js"));
ACCEL.init();
ACCEL.on("faceup",()=>{if (!wOS.awake) wOS.wake();});
//console.log("loaded accel");
*/
wOS.ticker = setInterval(wOS.tick,1000);

setWatch(() =>{
  if(wOS.awake) {
      wOS.showLauncher();
  } else  wOS.wake();
},BTN1,{repeat:true,edge:"rising"});

E.getBattery = function (){
    return Math.floor(Math.min((analogRead(wOS.BATLVL)-0.5) * 1000), 100);
};
E.setTimeZone(-5);

wOS.showLauncher = function(){
  //load("launch.js");
};

global.Bangle = wOS;
