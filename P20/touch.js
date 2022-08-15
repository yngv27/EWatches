/*
** P20 Touch Driver
** Based upon CST716 driver courtesty @jeffmer
** https://github.com/jeffmer/WatchApps/blob/6f8ffacdc8163911cf09aef431bd20577efff9e2/apps/main-sn80/cst716-sn80.js
*/

// NOT COMPLETE..  doesn't emit events, but reads touches/coords


var TC = {
  TOUCH_PIN: D12,
  RESET_PIN: D13,
  log: console.log,
  //log: ()=>{},
  DOWN:1, UP:2, LEFT:3, RIGHT:4, CLICK:5, LONG:12,
  _wid:undefined,
  _haslong:false,
  writeByte:(a,d) => { 
    TC.I2C.writeTo(0x15,a,d);
  }, 
  readBytes:(a,n) => {
    TC.I2C.writeTo(0x15, a);
    return TC.I2C.readFrom(0x15,n); 
  },
  getXY:()=>{
    var _data = TC.readBytes(0x00,8);
    TC.log(`raw tc=${JSON.stringify(_data)}`);
    //_data[2] => 0: finger up. 1: finger down
    return { 
      x:((_data[3]&0x0F)<<8)|_data[4],
      y:((_data[5]&0x0F)<<8)|_data[6],
      gest:_data[1]
    };
  },
  init: () => {
    TC.I2C =new I2C();
    TC.I2C.setup ({sda: D10, scl: D11});
  },
  delay: (ms) => { digitalPulse(D31, 0, ms); digitalPulse(D31, 0,0);},
  reset: () => {
    digitalPulse(TC.RESET_PIN,0,20); //0,5);
    var t = getTime()+50/1000; while(getTime()<t); // delay 50 ms
    //TC.delay(50);
  },
  //716
  enable:()=>{
    TC.reset();
    //TC.writeByte(0xED, 0xC8);
    // wakey
    TC.readBytes(0x15, 1);
    TC.delay(5);
    TC.readBytes(0xA7, 1);
    TC.delay(5);
    // bit2: continuous read; bit1: slide up/dn for cont read; bit0: dbl click enable
    TC.writeByte(0xEC, 3);
    TC.writeByte(0xFA, 0x70);
  },
  //enable:()=>{TC.writeByte(0xFA, 0x11);},
  sleepMode:()=>{
    TC.reset();
    TC.writeByte(0xA5,0x03);
    TC.writeByte(0xE5,0x03);
  },
  
  touchevent:() => {
    //wOS.time_left = wOS.ON_TIME; //reset LCD on time 
    var p = TC.getXY();
    TC.log(JSON.stringify(p));
    if (p.gest==TC.CLICK) {TC.emit("touch",p);TC._haslong=false;}
    else if (p.gest>=1 && p.gest<=4) {TC.emit("swipe",p.gest); TC._haslong=false;}
    else if (p.gest==TC.LONG  && !TC._haslong) {TC.emit("longtouch",p); TC._haslong=true;}
  },
  start:()=>{
    TC.enable();
    if (TC._wid) clearWatch(TC._wid);
    TC._wid = setWatch(TC.touchevent,TC.TOUCH_PIN,{repeat:true,edge:"falling"});
  },
  stop:()=>{
      if (TC._wid) {
          TC._wid = clearWatch(TC._wid);
          TC._wid = undefined;
      }
      TC.sleepMode();
  }
};
TC.init();

TC.on("touch", (p)=>{
    console.log("touch x: "+p.x+" y:"+p.y);
});

TC.on("swipe", (d)=>{
    console.log("swipe d: "+d);
});

TC.on("longtouch", (p)=>{
    console.log("long touch");
});
