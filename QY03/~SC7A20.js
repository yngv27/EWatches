var WI2C = new I2C();
WI2C.setup({scl:D14,sda:D15,bitrate:200000});
var ACCEL = {
    writeByte:(a,d) => { 
        WI2C.writeTo(0x18,a,d);
    }, 
    readBytes:(a,n) => {
        WI2C.writeTo(0x18, a);
        return WI2C.readFrom(0x18,n); 
    },
    init:() => {
        var id = ACCEL.readBytes(0x0F,1)[0];
      // datarate: 4 = 50Hz; 0 for LPen (no low power); 0b111 = enable all axes
        ACCEL.writeByte(0x20,0x47);
        ACCEL.writeByte(0x21,0x00); //highpass filter disabled
        ACCEL.writeByte(0x22,0x40); //interrupt to INT1
        ACCEL.writeByte(0x23,0x88); //BDU,MSB at high addr, HR
        ACCEL.writeByte(0x24,0x00); //latched interrupt off
        ACCEL.writeByte(0x32,0x10); //threshold = 250 milli g's
        ACCEL.writeByte(0x33,0x01); //duration = 1 * 20ms
        ACCEL.writeByte(0x30,0x02); //XH interrupt 
        pinMode(D16,"input",false);
        setWatch(()=>{
           if (ACCEL.read0()>192) ACCEL.emit("faceup");
        },D16,{repeat:true,edge:"rising",debounce:50});
        return id;
    },
    read0:()=>{
        return ACCEL.readBytes(0x1,1)[0];
    },
    read:()=>{
        function conv(lo,hi) { 
          var i = (hi<<8)+lo;
          return ((i & 0x7FFF) - (i & 0x8000))/16;
        }
      // register 28, with high bit set for sequential read[
        var a = ACCEL.readBytes(0xA8,6);
        return {ax:conv(a[0],a[1]), ay:conv(a[2],a[3]), az:conv(a[4],a[5])};
    },
  };
  ACCEL.init();