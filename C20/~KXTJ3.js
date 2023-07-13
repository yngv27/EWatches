//KXTJ3   

//var ACCELPIN = D8;
var ACCEL = {};

ACCEL = {
  ADDR: 0x0f,
  wasFaceUp: false,
  writeByte:(a,d) => { 
    wOS.I2C.writeTo(ACCEL.ADDR,a,d);
  }, 
  readBytes:(a,n) => {
    wOS.I2C.writeTo(ACCEL.ADDR, a);
    return wOS.I2C.readFrom(ACCEL.ADDR,n); 
  },
  init:()=>{
    var id = ACCEL.readBytes(0x0F,1)[0];
    ACCEL.writeByte(0x1B,0x28);  //CNTL1 Off (top bit)
    ACCEL.writeByte(0x1D,0x28);  //CNTL2 Software reset
    delayms(2);
    ACCEL.writeByte(0x21,1); //DATA_CTRL_REG --25Hz
    ACCEL.writeByte(0x1D,0x28); 
    ACCEL.writeByte(0x1B,0xA8);  //CNTL1 Off (top bit), low power, DRDYE1, 2g , Wakeup=0
    setInterval(()=>{
      var a = ACCEL.read();
      if (ACCEL.step) E.stepCount(a.x,a.y,a.z);
       if ( (a.y>500 && a.y<1000 && a.z>-864 && a.z <226)) {
         if (wOS.awake)
           wOS.time_left = wOS.ON_TIME; //reset LCD on time.
         else
          ACCEL.emit("faceup");
       }
    },ACCEL.step?80:300);
    return id;  
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
ACCEL.init();
ACCEL.intvl = setInterval(ACCEL.isFaceUp, 300);
/*
setInterval(()=>{print(peek32(0x50000510).toString(2).padStart(32,'0'));}, 250);

*/