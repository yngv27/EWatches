/*
 cfg.sda - i2c sda pin
 cfg.scl - i2c scl pin
 cfg.enable - i2c reset pin, high to enable device
*/
ACCEL = {
  i2c: undefined,
  ENABLE: undefined,
  pollint: undefined,
  //I2C_DEVICEID: 0x1f,
  //I2C_REG: 0x02,

  u8u8tos16: (byteA, byteB) => {
    const sign = byteA & (1 << 7);
    var x = ((byteA & 0xff) << 8) | (byteB & 0xff);
    if (sign) {
      return 0xffff0000 | x; // fill in most significant bits with 1's
    }
    return x;
  },

  init: (i2c, cfg) => {
    ACCEL.i2c = i2c;
    ENABLE = cfg.ENABLE;
  },
  enable: () => {
    ENABLE.write(1);
    ACCEL.pollint = setInterval(ACCEL.poll, 1000);
  },
  disable: () => {
    ENABLE.write(0);
    if(ACCEL.pollint) clearInterval(ACCEL.pollint);
  },
  read: () => {
    ACCEL.i2c.writeTo(0x1f, 0x02);
    const data = ACCEL.i2c.readFrom(0x1f, 6);
    return {
      x: ACCEL.u8u8tos16(data[1], data[0]) >> 6,
      y: ACCEL.u8u8tos16(data[3], data[2]) >> 6,
      z: ACCEL.u8u8tos16(data[5], data[4]) >> 6
    };
  },
  poll: () => {
    let xyz=ACCEL.read();
    if(xyz.x < -100 && xyz.x > -200 && xyz.y < 100 && xyz.y > -100 && xyz.z > 0) {
      ACCEL.emit("faceup");
    }
  }


};

/*
if (_S.read("accel.js")) eval(_S.read("accel.js"));
ACCEL.init(wOS.I2CAC, {"INTPIN": D8, "ENABLE":D4});
A=ACCEL;
A.enable();
ACCEL.on("faceup",()=>{if(!wOS.awake)wOS.wake();});
*/
