global.wOS = {
  BATPIN: D24,
  BATLVL: D4,
  BUZZPIN: D30,
  BKLT: D29,
  ON_TIME: 10,
  BRIGHT: 0.75,
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
              wOS.BUZZPIN.set();
              setTimeout(()=>{wOS.BUZZPIN.reset();resolve();},v);
          }
      });
  },
  isCharging:()=>{return !wOS.BATPIN.read();},

//screen brightness function
  brightness: (v) => {
    analogWrite(wOS.BKLT,v*0.7);
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
    //var blevel = new Uint8Array([1,1,1,1,1,2,2,9,9,9,9,9,9,9,9,9,9,9,9,7,7,2,1,1]);
    //var hrs = Date().getHours();
    wOS.brightness(Uint8Array([1,1,1,1,1,2,2,9,9,9,9,9,9,9,9,9,9,9,9,7,7,2,1,1])[Date().getHours()]/10);
  },
  wake:()=> {
      wOS.awake = true;
      wOS.time_left = wOS.ON_TIME;
      g.lcd_wake();
      wOS.emit("lcdPower",true);
      wOS.bright();
      if(wOS.ticker) 
        wOS.time_left += 5;
      else 
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

var GPS ={
GPTXT : function(a){
  if (a[2]!='01') print(a.join(' '));
},
GNRMC : function(a){
  print("RMC ",a[0],a[8]);
}
};
// handle one line from GPS
function gpsline(line){
  var garr=line.split(',');
  var f=GPS[garr[0]];
  if(f) f(garr.slice(1));
  else print(line);
}

function gpsum(s){
  var xor=0;
  [].forEach.call(s,(c)=>{xor^=c.charCodeAt(0);});
  return xor.toString(16).toUpperCase();
}

function gpsformat(line){
return '$'+line+'*'+gpsum(line)+'\x0d\x0a';
}
// PCAS00 save config to flash
// PCAS01,1 - speed 0=4800,1=9600,2=19200,3=38400,4=57600,5=115200
// PCAS02,1000 - 1Hz, 500 250 200 100
// PCAS03,0,0,0,0,0,0,0 - frequency of GGA,GLL,GSA,GSV,RMC,VTG,ZDA in periods set by PSCAS02 (0-9)
// Serial1.write(gpsformat("PCAS03,0,0,0,0,0,0,0")) - off
// gpsformat("PCAS04,5") systems 1 gps, 2 bds, 4 glonas, combinations 5 6 7


var gpsbuff="";
function gpsdata(data){
  gpsbuff+=data;
  var idx = gpsbuff.indexOf("\n");
  while (idx>=0) {
    var line = gpsbuff.substr(0,idx);
    gpsbuff = gpsbuff.substr(idx+1);
    if(line.startsWith("$")) gpsline(line.substr(1,line.lastIndexOf('*')-1));
    idx = gpsbuff.indexOf("\n");
  }
}

function gpson(){
  gpsbuff="";
  Serial1.setup(9600,{tx:D27,rx:D28});
  Serial1.on('data',gpsdata);
  D7.write(1);
}

function gpsoff(){
  D7.write(0);
  Serial1.removeListener('data',gpsdata);
  Serial1.unsetup();
}
// some stuff in https://github.com/infusion/GPS.js/blob/master/gps.js


/*
NRF.whitelist=[];
NRF.on('connect',function(addr) {
  if (!NRF.whitelist.includes(addr)){
    if (BTN1.read()){ // add to whitelist when button is held while connecting
      NRF.whitelist.push(addr);
      vibrate(1,1,100,0);
    } else
        NRF.disconnect();
  }
  NRF.connection = {};
  NRF.connection.addr = addr;
  NRF.connected=true;
  NRF.setRSSIHandler((rssi)=>{NRF.connection.RSSI=rssi;});
});
NRF.on('disconnect',function(reason) {
  NRF.connected=false;
  NRF.connection = {};
  NRF.lastReason=reason;
});
*/

var fc=new SPI(); // font chip - 2MB SPI flash
D12.write(1);
fc.setup({sck:D14,miso:D11,mosi:D13,mode:0});
fc.send([0xb9],D12); //put to deep sleep

/*
//print(fc.send([0xab],D23)); // wake from deep sleep
//print(fc.send([0x90,0,0,1,0,0],D23));
//print(fc.send([0x9f,0,0,0],D23));
//print(fc.send([0xb9],D23)); // put to deep sleep
var w25 = require("W25");
var fc = new w25(fc, D23 );
*/
setWatch(()=>{
  if(!wOS.awake) wOS.wake();
  wOS.buzz();
  wOS.emit("charging",wOS.isCharging());
},wOS.BATPIN,{edge:"both",repeat:true,debounce:500});

wOS.i2c = new I2C();
wOS.i2c.setup({scl:D18,sda:D17,bitrate:200000});

let ACCEL = {
  CNTL1: 0x18,
  INC1: 0x1c,
  writeByte:(a,d) => { 
      wOS.i2c.writeTo(0x1f,a,d);
  }, 
  readBytes:(a,n) => {
      wOS.i2c.writeTo(0x1f, a);
      return wOS.i2c.readFrom(0x1f,n); 
  },
  init:() => {
    let cmds = [
        [0x18, 0x0],[0x1b, 0x2],[0x18, 0x80]
      ];
    cmds.forEach((cmd) => {
      ACCEL.writeByte(cmd[0], cmd[1]);
    });
    
    // ACCEL.readBytes(0x0f,1)[0];
    
  },
  read:()=>{
      function conv(lo,hi) { 
        var i = (hi<<8)+lo;
        return ((i & 0x7FFF) - (i & 0x8000))/16;
      }
      var a = ACCEL.readBytes(0x6,6); 
      return {ax:a[1], ay:a[3], az:a[5]};
  },
};
setTimeout(ACCEL.init, 1000);

eval(_S.read("ST7735.js"));
g = ST7735();

//wOS.ticker = setInterval(wOS.tick,1000);

/*
setWatch(() =>{
  if(wOS.awake) {
      wOS.showLauncher();
  } else  wOS.wake();
},BTN1,{repeat:true,edge:"rising"});
*/
E.getBattery = function (){
  var l=3.5,h=4.19;
  v=4.20/0.320*analogRead(D4);
  if(v>=h)return 100;
  if(v<=l)return 0;
  return Math.floor(100*(v-l)/(h-l));
};

wOS.getStepCount = ()=>{ return ACCEL.getSteps(); };
wOS.resetStepCounter = () => { ACCEL.resetSteps(); }; 

wOS.showLauncher = function(){
  //load("launch.js");
};

global.Bangle = wOS;

