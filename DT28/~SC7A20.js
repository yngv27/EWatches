
if(typeof(wOS) === "undefined") {
  wOS = { awake: false, time_left: 0, ON_TIME: 10};
}
var ACCEL = {
  pin: D13,
  writeByte:(a,d) => { 
    ACCEL.I2C.writeTo(0x19,a,d);
  }, 
  readBytes:(a,n) => {
    ACCEL.I2C.writeTo(0x19, a);
    return ACCEL.I2C.readFrom(0x19,n); 
  },
  init:() => {
    ACCEL.I2C = new I2C();
    ACCEL.I2C.setup({scl:D9,sda:D8,bitrate:200000});

    var id = ACCEL.readBytes(0x0F,1)[0];
    ACCEL.writeByte(0x20,0x4f);
    ACCEL.writeByte(0x21,0x00); //highpass filter disabled
    ACCEL.writeByte(0x22,0x40); //interrupt to INT1
    ACCEL.writeByte(0x23,0x80); //BDU,MSB at high addr, HR
    ACCEL.writeByte(0x24,0x00); //latched interrupt off
    ACCEL.writeByte(0x32,0x30); //threshold = 250 milli g's
    ACCEL.writeByte(0x33,0x02); //duration = 1 * 20ms
    ACCEL.writeByte(0x30,0x02); //XH interrupt 
    pinMode(ACCEL.pin,"input",false);
    setWatch(()=>{
      print("ACCEL INT");
      setTimeout(()=>{
        var  xyz = ACCEL.read();
        if(xyz.x > 200 && xyz.x < 250 && (xyz.y < 20 || xyz.y > 240) && xyz.z < 200) {
          ACCEL.emit("faceup");
        }
      }, 200);
    },ACCEL.pin,{repeat:true,edge:"rising",debounce:50});
    return id;
  },
  read:()=>{
    /*
      function conv(lo,hi) { 
        var i = (hi<<8)+lo;
        return ((i & 0x7FFF) - (i & 0x8000))/16;
      }
    */
      var a = ACCEL.readBytes(0xA8,6);
      //return {x:conv(a[0],a[1]), y:conv(a[2],a[3]), z:conv(a[4],a[5])};
    return {x:a[1], y:a[3], z:a[5]};
  },
};

ACCEL.init();
/*
ACCEL.on("faceup",()=>console.log("faceup"));
*/
/*
for(let p=0; p<32; p++) { 
    print(peek32(0x50000700+4*p ).toString(16));
}
print(peek32(0x50000510).toString(2).padStart(32,"0"));

accel
01100000 01101100 00000011 10100100
lcd
01100000 01100000 00000000 10000000

*/
