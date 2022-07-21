()=>{
  var HRS = {
    writeByte:(a,d) => { 
        HRS.I2C.writeTo(0x48,a,d);
    }, 
    readBytes:(a,n) => {
        HRS.I2C.writeTo(0x48, a);
        return HRS.I2C.readFrom(0x48,n); 
    },
    init:() => {
      HRS.I2C = new I2C();
      HRS.I2C.setup ({sda: D28, scl: D29, bitrate: 100000});
    },
    off:() => {HRS.writeByte(3,0);},
    on:() => {HRS.writeByte(3,2);},
  };
  //r=HRS.readBytes, w=HRS.writeByte;

  // until we know what we're doing
  HRS.init();
  HRS.off();
}();
