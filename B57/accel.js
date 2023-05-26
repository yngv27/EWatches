//sc7a20   - use datasheet for LIS3DH
var ACCEL = {
  ACCELPIN: D8,
  writeByte:(a,d) => { 
    wOSI2C.writeTo(0x18,a,d);
  }, 
  readBytes:(a,n) => {
    wOSI2C.writeTo(0x18, a);
      return wOSI2C.readFrom(0x18,n); 
  },
  init:() => {
      var id = ACCEL.readBytes(0x0F,1)[0];
      ACCEL.writeByte(0x20,0x47);
      ACCEL.writeByte(0x21,0x00); //highpass filter disabled
      ACCEL.writeByte(0x22,0x40); //interrupt to INT1
      ACCEL.writeByte(0x23,0x88); //BDU,MSB at high addr, HR
      ACCEL.writeByte(0x24,0x00); //latched interrupt off
      ACCEL.writeByte(0x32,0x10); //threshold = 250 milli g's
      ACCEL.writeByte(0x33,0x01); //duration = 1 * 20ms
      ACCEL.writeByte(0x30,0x02); //XH interrupt 
      pinMode(ACCEL.ACCELPIN,"input",false);
      setWatch(()=>{
        //print(`v=${ACCEL.read0()} xyz=${JSON.stringify(ACCEL.read())}`);
        setTimeout(()=>{
          var xyz = ACCEL.read();
          if (xyz.y > 300 && xyz.y < 800 && xyz.x > -300 && xyz.x < 300) {
            ACCEL.emit("faceup");
          }
        }, 300);
      },ACCEL.ACCELPIN,{repeat:true,edge:"rising",debounce:50});
      return id;
  },
  read0:()=>{
      return ACCEL.readBytes(0x01,1)[0];
  },
  read:()=>{
      function conv(lo,hi) { 
        var i = (hi<<8)+lo;
        return ((i & 0x7FFF) - (i & 0x8000))/16;
      }
      var a = ACCEL.readBytes(0xA8,6);
      return {x:conv(a[0],a[1]), y:conv(a[2],a[3]), z:conv(a[4],a[5])};
  },
};
ACCEL.init();

