
wOS={
  timezone: -4,
  ON_TIME:10,
  BRIGHT:0.5,
  FACEUP:true,
  VIBRATE:true,
  awake:true,
  time_left:10,
  ticker:undefined,
  settings:undefined,
  buzz:(v)=>{
    if(!wOS.VIBRATE)return;
    v=v?v:100;
    if(v <= 50){
      digitalPulse(wOS.BUZZPIN,false,v);}
    else{wOS.BUZZPIN.reset();
         setTimeout(()=>{wOS.BUZZPIN.set();},v);}},
  batV:()=>{return 7.0*analogRead(wOS.BATVOLT);},
  isCharging:()=>{return!wOS.BATPIN.read();},
  setLCDTimeout:(v)=>{
    wOS.ON_TIME=v<5?5:v;
  },
  setLCDBrightness:(v)=>{
    wOS.BRIGHT=v;
    wOS.brightness(v);
  },
  init:()=> {
   s = {
     lowbright:0.3,
      nightbright: 0.1,
      daystart:7,
      lowstart:19,
      nightstart:23
    };
    wOS.time_left=10;
    //wOS.STEPS=(typeof s.steps !='undefined')?s.steps:false;
    wOS.settings=s;
    E.setTimeZone(wOS.timezone);},
  sleep:()=>{
    wOS.awake=false;
    wOS.brightness(0);
    TC.stop();
    wOS.emit("lcdPower",false);
    g.flip();
    g.lcd_sleep();
  },
  bright:()=>{
    var hrs=Date().getHours();
    var ds=wOS.settings.daystart;
    var ls=wOS.settings.lowstart;
    var ns=wOS.settings.nightstart;
    var b=(hrs >= ds && hrs<ls)?wOS.BRIGHT:(hrs >= ls && hrs<ns)?wOS.settings.lowbright:wOS.settings.nightbright;wOS.brightness(b);
  },
  wake:()=>{
    wOS.awake=true;
    wOS.time_left=wOS.ON_TIME;
    TC.start();
    g.lcd_wake();
    wOS.emit("lcdPower",true);
    wOS.bright();
    wOS.ticker=setInterval(wOS.tick,1000);
  },
  setLCDPower:(b)=>{
    if(b){
      if(wOS.awake)wOS.time_left=wOS.ON_TIME;
      else wOS.wake();
    }else wOS.sleep();
  },
  isLCDOn:()=>{
    return wOS.awake;
  }
  ,
  tick:()=>{
    wOS.time_left --;
    if(wOS.time_left <= 0){
      if(wOS.ticker)
        wOS.ticker=clearInterval(wOS.ticker);
      wOS.emit("sleep",true);
      wOS.sleep();
    }
  }
};
var wOSI2C=new I2C();
wOSI2C.setup({scl:D7,sda:D6,bitrate:200000});
wOS.BATPIN=D19;
wOS.BATVOLT=D31;
wOS.BUZZPIN=D16;
global.Bangle=wOS;
function watchBat(){
  setWatch(()=>{if(!wOS.awake)wOS.wake();wOS.emit("charging",wOS.isCharging());},wOS.BATPIN,{edge:"both",repeat:true,debounce:500});}
wOS.init();
eval(_S.read("lcd-sn80.js"));
var g=GC9A01();
g.setTheme((wOS.settings.theme)?wOS.settings.theme:{fg:0xffff,bg:0,fg2:0x07ff,bg2:0,fgH:0xFFFF,bgH:0x001F,dark:true});
wOS.bright();
eval(_S.read("cst716-sn80.js"));
TC.start();
eval(_S.read("accel.js"));
ACCEL.init();
ACCEL.on("faceup",()=>{if(!wOS.awake)wOS.wake();});
wOS.ticker=setInterval(wOS.tick,1000);
wOS.POWER=wOS.isCharging();
watchBat();

E.getBattery=function(){var v=wOS.batV();v=v<3.7?3.7:v;return Math.floor((v-3.7)*200);}
wOS.showLauncher=function(){load("launch-sn80.js");};
//eval(_S.read("menu-sn80.js"));
//eval(_S.read("prompt-sn80.js"));
//eval(_S.read("widgets-sn80.js"));
wOS.btnWatches=[
  setWatch(function(){if(wOS.awake)wOS.showLauncher();else wOS.wake();},BTN1,{repeat:1,edge:"falling"}),
];

STOR=_S;
