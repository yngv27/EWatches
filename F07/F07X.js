global.wOS = {
  BAT: D13,
  LVL: D5,
  BUZ: D25,
  BKL: D11,
  ON_TIME: 10,
  BRIGHT: 0.75,
  FACEUP:true,
  VIBRATE:true,
  isAwake : true,
  time_left:10,
  ticker:undefined,
  settings:undefined,
  buzz: function(v, i){
    analogWrite(wOS.BUZ,0.4);
    setTimeout(()=>{wOS.BUZ.reset();},100);
  },
  isCharging:()=>{return wOS.BAT.read();},


  setLCDTimeout:(v)=>{wOS.ON_TIME=v<5?5:v;},
  setLCDBrightness:(v)=>{},

  sleep:() => {
      wOS.isAwake = false;
       g.flip(); //make sure finished with SPI before stopping it.
  },
  wake:()=> {
      wOS.isAwake = true;
      wOS.time_left = wOS.ON_TIME;
      if(wOS.ticker) 
        wOS.time_left += 5;
      else 
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

/*
var fc=new SPI(); // font chip - 2MB SPI flash
D12.write(1);
fc.setup({sck:D14,miso:D11,mosi:D13,mode:0});
fc.send([0xb9],D12); //put to deep sleep
*/
/*
//print(fc.send([0xab],D23)); // wake from deep sleep
//print(fc.send([0x90,0,0,1,0,0],D23));
//print(fc.send([0x9f,0,0,0],D23));
//print(fc.send([0xb9],D23)); // put to deep sleep
var w25 = require("W25");
var fc = new w25(fc, D23 );
*/

// we're "special"
NRF.setAdvertising({},{name:"F07X "+NRF.getAddress().split(':').slice(-2).join('')});


setWatch(()=>{
  if(!wOS.isAwake) wOS.wake();
  wOS.buzz();
  wOS.emit("charging",wOS.isCharging());
},wOS.BAT,{edge:"both",repeat:true,debounce:500});

 
//AC = require("~KX022.js").init({i2c:wOS.i2c, intpin:D1});
eval(_S.read("~BMA222.js"));
ACCEL.init();

// D8 is our power pin for the display
pinMode(D8, "output");
D8.set();

SPI1.setup({ sck:D7, mosi:D6, order: "lsb", baud: 4000000 });
var g = require("~MEMLCD.js").connect(SPI1, D2/*SCS*/, 0/*EXTCOMIN*/, 144/*width*/, 168/*height*/);
g.setRotation(2).setBgColor(1).setColor(0).clear(); 

E.getBattery = function (){
  let l=3.5,h=4.19;
  let v=4.20/0.18*analogRead(wOS.LVL);
  if(v>=h)return 100;
  if(v<=l)return 0;
  return Math.floor(100*(v-l)/(h-l));
};

setInterval(()=>{  // advertise battery level every 5 min
  NRF.setAdvertising({0x180F : [E.getBattery()] });
}, 300000);

wOS.steps = 0;
wOS.getStepCount = () => {return wOS.steps;};
wOS.setStepCount= (s) => {wOS.steps = s;};
wOS.resetStepCounter = () => { wOS.setStepCount(0); };
ACCEL.on("STEP", ()=>{wOS.steps++;});
ACCEL.on("FACEUP", wOS.wake);
wOS.showLauncher = function(){
  //load("launch.js");
};
wOS.UI = {};

global.Bangle = wOS;
logD = print;

