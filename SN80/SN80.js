wOS={
  BATPIN: D19,
  BATVOLT: D31,
  BUZZPIN: D16,
  timezone: -4,
  ON_TIME:7,
  BRIGHT:0.5,
  FACEUP:true,
  VIBRATE:true,
  isAwake:true,
  time_left:7,
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
    wOS.isAwake=false;
    wOS.brightness(0);
    TC.stop();
    wOS.emit("lcdPower",false);
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
    if(wOS.isAwake) return;
    wOS.isAwake=true;
    wOS.time_left=wOS.ON_TIME;
    TC.start();
    g.lcd_wake();
    wOS.emit("lcdPower",true);
    wOS.bright();
    wOS.ticker=setInterval(wOS.tick,1000);
  },
  setLCDPower:(b)=>{
    if(b){
      if(wOS.isAwake) wOS.time_left=wOS.ON_TIME;
      else wOS.wake();
    }else wOS.sleep();
  },
  isLCDOn:()=>{
    return wOS.isAwake;
  }
  ,
  tick:()=>{
    wOS.time_left --;
    if(wOS.time_left <= 0){
      if(wOS.ticker) wOS.ticker=clearInterval(wOS.ticker);
      wOS.sleep();
    } else {
      wOS.emit("tick");
    }
  }
};

wOS.init();

//shared I2C for accel/touch
wOS.I2C=new I2C();
wOS.I2C.setup({scl:D7,sda:D6,bitrate:200000});

setWatch(()=>{
  wOS.wake();
  wOS.emit("charging",wOS.isCharging());
},wOS.BATPIN,{edge:"both",repeat:true,debounce:500});

eval(_S.read("lcd.js"));

wOS.brightness= function(v) {
  v = Math.round(v/0.125);
  v = v>7?7:v<0?0:v;
  v=v>7?1:v;	
  digitalWrite([D23,D22,D14],7-v);
};

wOS.bright();
eval(_S.read("touch.js"));
TC.init(wOS.I2C, { "RESET": D10, "INTPIN": D28});
TC.start();

eval(_S.read("accel.js"));
ACCEL.init(wOS.I2C, {"INTPIN": D8});
ACCEL.on("faceup",()=>{wOS.wake();});

wOS.ticker=setInterval(wOS.tick,1000);

E.getBattery=function(){
  var v=wOS.batV();v=v<3.7?3.7:v; batt = Math.floor((v-3.7)*200); if(batt > 100) return 100; else return batt;
};

wOS.steps = 0;
wOS.getStepCount = () => {return wOS.steps;};
wOS.setStepCount= (s) => {wOS.steps = s;};
wOS.resetStepCounter = () => { wOS.setStepCount(0); };
/*
//wOS.showLauncher=function(){load("launch-sn80.js");};
//eval(_S.read("menu-sn80.js"));
//eval(_S.read("prompt-sn80.js"));
//eval(_S.read("widgets-sn80.js"));
wOS.btnWatches=[
  setWatch(function(){if(wOS.isAwake)wOS.showLauncher();else wOS.wake();},BTN1,{repeat:1,edge:"falling"}),
];
*/
global.Bangle=wOS;
wOS.UI={};

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
