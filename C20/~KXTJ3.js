//KXTJ3   

let ACCEL = {};

ACCEL = {
  ADDR: 0x0f,
  INTPIN: D13,
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
    ACCEL.writeByte(0x1B,0x0);  //CNTL1 Off (top bit)
    delayms(30);
    ACCEL.writeByte(0x21,2); //DATA_CTRL_REG --50Hz
    ACCEL.writeByte(0x1B,0x12);  //CNTL1 Off (top bit), low power, no DRDYE1, 2g , Wakeup=1
    ACCEL.writeByte(0x1D,0x4);  //CNTL2 set to 6.25Hz
    ACCEL.writeByte(0x1F,0x3F); // all axes
    ACCEL.writeByte(0x29,0x5); // wakeup counter 
    ACCEL.writeByte(0x6A,0x8); // wakeup threshold for interrupt
    ACCEL.writeByte(0x1E,0x30); // enable INT pin (high) and latch
    ACCEL.writeByte(0x1B,0x92);  //CNTL1 Off (top bit), low power, no DRDYE1, 2g , Wakeup=1
    delayms(30);
    ACCEL.readBytes(0x1A,1); // clear latched interrupt
    /*
    setWatch(()=>{
      //print("INT!");
      var a = ACCEL.read();
      //print(a);
      if (ACCEL.step) E.stepCount(a.x,a.y,a.z);
      //if ( (a.y>500 && a.y<1000 && a.z>-864 && a.z <226)) {
      if((a.x < 15 || a.x > 240) && a.y > 10 && a.y < 45 && a.z > 190) {
        if (wOS.awake)
          wOS.time_left = wOS.ON_TIME; //reset LCD on time.
        else
        ACCEL.emit("faceup");
      }
      ACCEL.readBytes(0x1A,1); // clear latched interrupt
    },ACCEL.INTPIN, {repeat: true, edge:"rising"});
    */
    setInterval(()=> {
      var a = ACCEL.read();
      //print(a);
      if (ACCEL.step) E.stepCount(a.x,a.y,a.z);
      //if ( (a.y>500 && a.y<1000 && a.z>-864 && a.z <226)) {
      if((a.x < 15 || a.x > 240) && a.y > 10 && a.y < 45 && a.z > 190) {
        ACCEL.emit("faceup");
      }
    }, 500);
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
//ACCEL.intvl = setInterval(ACCEL.isFaceUp, 300);
/*
setInterval(()=>{print(peek32(0x50000510).toString(2).padStart(32,'0'));}, 250);
0010000000100000 1110 0100 0000 1000
>ACCEL.readBytes(0x1a,1)
=new Uint8Array(1)
0000000000100000 1100 0100 0000 1000
*/