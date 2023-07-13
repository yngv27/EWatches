//KXTJ3   

//var ACCELPIN = D8;
let ACCELADDR = 0x0e;
let wOSI2C = new I2C();
var ACCEL = {};

wOSI2C.setup({scl:D10,sda:D9,bitrate:200000});
ACCEL = {
  wasFaceUp: false,
  writeByte:(a,d) => { 
    wOSI2C.writeTo(ACCELADDR,a,d);
  }, 
  readBytes:(a,n) => {
    wOSI2C.writeTo(ACCELADDR, a);
    return wOSI2C.readFrom(ACCELADDR,n); 
  },
  init:()=>{
    ACCEL.writeByte(0x1b, 0);
    ACCEL.writeByte(0x1b, 0x80);
  },
  read0:()=>{
    return ACCEL.readBytes(0x0F,1)[0];
  },
  read:()=>{
    var a = ACCEL.readBytes(0x6,6);
    // just return MSB
    return {x:a[1], y:a[3], z:a[5]};
  },
  isFaceUp:()=>{
    let a = ACCEL.read();
    if((a.x < 15 || a.x > 240) && a.y > 20 && a.y < 45 && a.z > 190) {
      if(!ACCEL.wasFaceUp) ACCEL.emit('faceup');
      ACCEL.wasFaceUp = true;
      return true;
    }
    ACCEL.wasFaceUp = false;
    return false;
  }
};
