let ACCEL = {
  CNTL1: 0x18,
  INC1: 0x1c,
  isFaceUp: false,
  writeByte:(a,d) => { 
    wOS.i2c.writeTo(0x1f,a,d);
  }, 
  readBytes:(a,n) => {
    wOS.i2c.writeTo(0x1f, a);
    return wOS.i2c.readFrom(0x1f,n); 
  },
 
  read:()=>{
    function conv(lo,hi) { 
        var i = (hi<<8)+lo;
        return ((i & 0x7FFF) - (i & 0x8000))/16;
    }
    var a = ACCEL.readBytes(0x6,6); 
    return {ax:a[1], ay:a[3], az:a[5]};
  },
  checkFaceup: () => {
    let xyz = ACCEL.read();
    // step check
    if((xyz.ax < 45 || xyz.ax > 220) && (xyz.ay < 220 || xyz.ay > 192) && xyz.az > 200) {
      if(!ACCEL.inStep) {
          // EMIT "STEP"!
          //wOS.steps++;
          ACCEL.emit("step");
          ACCEL.inStep = true;
      } 
    } else {
      ACCEL.inStep = false;
    }
    //console.log(JSON.stringify(xyz));
    if((xyz.ax > 20 && xyz.ax < 240) || xyz.ay > 40 || xyz.ay < 20) {
      ACCEL.isFaceUp = false;
      return;
    }
    // have we switched?
    if(ACCEL.isFaceUp == false) {
      ACCEL.emit("faceup");
    }
    ACCEL.isFaceUp = true;
  }
};

exports.init = (opts) => {
    let cmds = [
        [0x18, 0x0],[0x1b, 0x2],[0x18, 0x80]
    ];
    cmds.forEach((cmd) => {
      ACCEL.writeByte(cmd[0], cmd[1]);
    });
    ACCEL.check = setInterval(ACCEL.checkFaceup, 555);
    return ACCEL;
};

