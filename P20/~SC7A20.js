/*
SC7A20 Accelerometer
Code courtesy @jeffmer
https://github.com/jeffmer/WatchApps/blob/6f8ffacdc8163911cf09aef431bd20577efff9e2/apps/main-gw32/accel-gw32.js
*/

if(typeof(wOS) === "undefined") {
  wOS = { isAwake: false, time_left: 0, ON_TIME: 10};
}
var ACCEL = {
  pin: D5,
  writeByte:(a,d) => { 
    ACCEL.I2C.writeTo(0x18,a,d);
  }, 
  readBytes:(a,n) => {
    ACCEL.I2C.writeTo(0x18, a);
    return ACCEL.I2C.readFrom(0x18,n); 
  },
  init:() => {
    ACCEL.I2C = new I2C();
    ACCEL.I2C.setup({scl:D16,sda:D15,bitrate:200000});

    var id = ACCEL.readBytes(0x0F,1)[0];
    ACCEL.writeByte(0x20,0x2f); // 10Hz, Low power, all axes
    ACCEL.writeByte(0x21,0x00); //highpass filter disabled
    ACCEL.writeByte(0x22,0x00); //NO interrupt 
    ACCEL.writeByte(0x23,0x80); //BDU,MSB at high addr, not HR
    ACCEL.writeByte(0x24,0x00); //latched interrupt off
    //ACCEL.writeByte(0x32,0x30); //threshold = 250 milli g's
    //ACCEL.writeByte(0x33,0x02); //duration = 1 * 20ms
    ACCEL.writeByte(0x30,0x00); //no interrupt 
    //pinMode(ACCEL.pin,"output",false);
    // unreliable on P20
/*    setWatch(()=>{
      //print("ACCEL INT");
      setTimeout(()=>{
        var  xyz = ACCEL.read();
        //print(`v=${ACCEL.readBytes(0,1)[0]} xyz=${JSON.stringify(xyz)}`);
    if(xyz.x > 20 && xyz.x < 50 && (xyz.y < 10 || xyz.y > 240) && xyz.z >= 40 && xyz.z <= 70) {
          if (wOS.isAwake)
            wOS.time_left = wOS.ON_TIME; //reset LCD on time.
          else
            ACCEL.emit("faceup");
        }
      }, 300);
    },ACCEL.pin,{repeat:true,edge:"rising",debounce:50});
    */
    setInterval(()=> {
      var  xyz = ACCEL.read();
      //print(`v=${ACCEL.readBytes(0,1)[0]} xyz=${JSON.stringify(xyz)}`);
      if(xyz.x > 20 && xyz.x < 50 && (xyz.y < 10 || xyz.y > 240) && xyz.z >= 40 && xyz.z <= 70) {
        ACCEL.emit("faceup");
      }
    }, 500);
    return id;
  },
  read:()=>{
      var a = ACCEL.readBytes(0xA8,6);
      return {x:a[1], y:a[3], z:a[5]};
  },
};

ACCEL.init();
/*
ACCEL.on("faceup",()=>console.log("****  FU"));
*/
