//sc7a20   - use datasheet for LIS3DH

var ACCEL = {
  writeByte:(a,d) => { 
    ACCEL.I2C.writeTo(0x18,a,d);
  }, 
  readBytes:(a,n) => {
    ACCEL.I2C.writeTo(0x18, a);
    return ACCEL.I2C.readFrom(0x18,n); 
  },
  init:(i2c, opts) => {
    ACCEL.I2C = i2c;
    ACCEL.INTPIN = opts.INTPIN;
    var id = ACCEL.readBytes(0x0F,1)[0];
    ACCEL.writeByte(0x20,0x47);
    ACCEL.writeByte(0x21,0x00); //highpass filter disabled
    ACCEL.writeByte(0x22,0x40); //interrupt to INT1
    ACCEL.writeByte(0x23,0x88); //BDU,MSB at high addr, HR
    ACCEL.writeByte(0x24,0x00); //latched interrupt off
    ACCEL.writeByte(0x32,0x10); //threshold = 250 milli g's
    ACCEL.writeByte(0x33,0x01); //duration = 1 * 20ms
    ACCEL.writeByte(0x30,0x02); //XH interrupt 
    /*
    pinMode(ACCEL.INTPIN,"input",false);
    setWatch(()=>{
       var  a = ACCEL.read();
       if (a.x > 220 && a.x < 250 && (a.y < 10 || a.y > 220) && a.z > 30 && a.z < 70) ACCEL.emit("faceup");
    },ACCEL.INTPIN,{repeat:true,edge:"rising",debounce:50});
    */
    setInterval(()=> {
      var a = ACCEL.read();
      //print(a);
      if (ACCEL.step) E.stepCount(a.x,a.y,a.z);
      //if ( (a.y>500 && a.y<1000 && a.z>-864 && a.z <226)) {
      if((a.x > 220 && a.x < 250 && (a.y < 10 || a.y > 220) && a.z > 30 && a.z < 70) ) {
        ACCEL.emit("faceup");
      }
    }, 500); 
    return id;
  },
  read0:()=>{
      return ACCEL.readBytes(0x01,1)[0];
  },
  /*
    read:()=>{
        function conv(lo,hi) { 
          var i = (hi<<8)+lo;
          return ((i & 0x7FFF) - (i & 0x8000))/16;
        }
        var a = ACCEL.readBytes(0xA8,6);
        return {x:conv(a[0],a[1]), y:conv(a[2],a[3]), z:conv(a[4],a[5])};
    },
    */
  read: () => {
    var a = ACCEL.readBytes(0xA8,6);
    return({x:a[1], y:a[3], z:a[5]});
  }, 
   
};
  
//ACCEL.init(wOS.I2C, {"INTPIN": D8});