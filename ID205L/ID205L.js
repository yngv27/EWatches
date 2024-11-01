// ID205L startup code

wOS={
  BKL: D30,
  BUZ: D20,
  BAT: D28,
  CHG: D39, 
  timezone: -4,
  ON_TIME:10,
  BRIGHT:0.75,
  awake:true,
  time_left:10,
  tikint: 0,
  ticker:undefined,
  settings:undefined,
  buzz: (ms)=> {wOS.BUZ.set(); setTimeout(()=>{wOS.BUZ.reset();},ms?ms:250);},
  isCharging: ()=>{return !wOS.CHG.read();},

  setLCDTimeout:(v)=>{
    wOS.ON_TIME=v<5?5:v;
  },
  setLCDBrightness:(v)=>{
    analogWrite(wOS.BKL, v);
  },
  init:()=> {
   s = {
     lowbright:0.3,
      nightbright: 0.1,
    };
    //wOS.STEPS=(typeof s.steps !='undefined')?s.steps:false;
    wOS.settings=s;
    E.setTimeZone(wOS.timezone);
  },
  sleep:()=>{
    //TC.disable();
    wOS.emit("lcdPower",false);
    wOS.setLCDBrightness(0);
    g.lcd_sleep();
    D22.reset(); // special?
    ACCEL.enable();
    wOS.awake = false;
  },
  bright:()=>{
    var hrs=Date().getHours();
    let ds=7,ls=19,ns=22;
    var b=(hrs >= ds && hrs<ls)?wOS.BRIGHT:(hrs >= ls && hrs<ns)?wOS.settings.lowbright:wOS.settings.nightbright;
    wOS.setLCDBrightness(b);
  },
  wake: ()=> {
    //if(TC) TC.enable();
    D22.set();// special?
    ACCEL.disable();
    g.lcd_wake();
    wOS.emit("wake");
    wOS.emit("lcdPower",true);
    wOS.time_left=wOS.ON_TIME;
    //print(`TL: ${wOS.time_left}`);
    wOS.awake = true;
    //wOS.setLCDBrightness(wOS.BRIGHT); // make this smarter
    wOS.bright();
    if(!wOS.tikint) wOS.tikint = setInterval(wOS.tick, 1000);
  },

  setLCDPower:(b)=>{
    if(b){
      if(wOS.awake) wOS.time_left=wOS.ON_TIME;
      else wOS.wake();
    }else wOS.sleep();
  },
  isLCDOn:()=>{
    return wOS.awake;
  }
  ,
  tick: (t)=> {
    //print(`Tick: ${wOS.time_left}`);
    if(--wOS.time_left <= 0) {
      wOS.sleep();
      wOS.emit("sleep",true);
      if(wOS.tikint) clearInterval(wOS.tikint);
      wOS.tikint = 0;
    } else wOS.emit("tick");
  },

};

wOS.init();
LED1.set(); // turn off HRS LED

//I2C for accel/touch
wOS.I2CAC=new I2C();
wOS.I2CAC.setup({scl:D5,sda:D27,bitrate:200000});
wOS.I2CTC=new I2C();
wOS.I2CTC.setup({scl:D42,sda:D43,bitrate:200000});

setWatch(()=>{
  if(!wOS.awake)wOS.wake();
  wOS.buzz();
  wOS.emit("charging",wOS.isCharging());
},wOS.CHG, {edge:"both",repeat:true, debounce:500});

g = require("lcd.js").connect(SPI1,{
 SCK: D2, RST: D46, CS: D47, SI: D29, DC: D31,
});

/*
if (_S.read("touch.js")) eval(_S.read("touch.js"));
TC.init(wOS.I2CTC, { "RESET": D24, "INTPIN": D44, "ENABLE":D45});
TC.start();
*/
let TC = require("touch.js")({
  sda: D43,
  scl: D42,
  enable: D45,
  reset: D24,
  int: D44,
});
TC.disable();


if (_S.read("accel.js")) eval(_S.read("accel.js"));
ACCEL.init(wOS.I2CAC, {"INTPIN": D8, "ENABLE":D4});
ACCEL.on("faceup",()=>{if(!wOS.awake)wOS.wake();});


if (_S.read("hrs.js")) eval(_S.read("hrs.js")); //just shuts down the LED

//wOS.ticker=setInterval(wOS.tick,1000);

wOS.showLauncher=function(){
  //load("launch-sn80.js");
  wOS.emit("wake");
};
//eval(_S.read("menu-sn80.js"));
//eval(_S.read("prompt-sn80.js"));
//eval(_S.read("widgets-sn80.js"));
wOS.btnWatches=[
  setWatch(function(){wOS.wake();},BTN1,{repeat:1,edge:"falling"}),
];


// full: 0.847. empty: 0.547:   (BAT-low) * (100/difference)
E.getBattery = () => { return Math.floor((analogRead(wOS.BAT) - 0.547) * 333); };


wOS.wake();

Bangle = wOS;
