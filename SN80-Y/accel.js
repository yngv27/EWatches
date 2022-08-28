// TEMPORARY: This is shared IO/CLK with SPI display AND Flash! Put check in to make sure all CS are LOW

/ Genuine LIS3DH!
let ACCELPIN = D26;
let ACCELI2C = new I2C();
ACCELI2C.setup({scl:D20,sda:D17,bitrate:200000});

var ACCEL = {
    writeByte:(a,d) => { 
      ACCELI2C.writeTo(0x19,a,d);
    }, 
    readBytes:(a,n) => {
      ACCELI2C.writeTo(0x19, a);
        return ACCELI2C.readFrom(0x19,n); 
    },
    init:() => {
        var id = ACCEL.readBytes(0x0F,1)[0];
        ACCEL.writeByte(0x20,0x4f); //47 = reg mode, 4f = low power
        ACCEL.writeByte(0x21,0x00); //highpass filter disabled
        ACCEL.writeByte(0x22,0x40); //interrupt to INT1
        ACCEL.writeByte(0x23,0x80); //BDU,MSB at high addr, 88=HR, 80=low res
        ACCEL.writeByte(0x24,0x00); //latched interrupt off
        ACCEL.writeByte(0x32,0x18); //threshold = 250 milli g's
        ACCEL.writeByte(0x33,0x01); //duration = 1 * 20ms
        ACCEL.writeByte(0x30,0x08); //08=YH interrupt 02=XH in
        pinMode(ACCELPIN,"input",false);
      
        setWatch(()=>{
          setTimeout(()=>{
           var  a = ACCEL.read();
    //print(ACCEL.read());
          if (a.x < -500 && a.x > -900 && a.y > -300 && a.y < 400 && a.z > 0) {
            //if (wOS.awake)
               //wOS.time_left = wOS.ON_TIME; //reset LCD on time.
            //else
               ACCEL.emit("faceup");
            }
          }, 300);
        },ACCELPIN,{repeat:true,edge:"rising",debounce:50});
        
        return id;
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
  
setTimeout(()=>{
  ACCEL.init();
  //ACCEL.on("faceup",()=>console.log("faceup"));
}, 500);
