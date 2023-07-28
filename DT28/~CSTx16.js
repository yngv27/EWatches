//TC.init(wOS.I2C, { "RESET": D10, "INTPIN": D28});
// touch driver CST716


var TC = {
    DOWN:1, UP:2, LEFT:3, RIGHT:4, CLICK:5, LONG:12,
    _wid:undefined,
    _haslong:false,
    writeByte:(a,d) => { 
        TC.I2C.writeTo(0x15,a,d);
    }, 
    readBytes:(a,n) => {
        TC.I2C.writeTo(0x15, a);
        return TC.I2C.readFrom(0x15,n); 
    },
    getXY:()=>{
        var _data = TC.readBytes(0x00,8);
        return { x:((_data[3]&0x0F)<<8)|_data[4],
                 y:((_data[5]&0x0F)<<8)|_data[6],
                 gest:_data[1]
               };
    },
    enable:()=>{TC.writeByte(0xED, 0xC8);},
    sleepMode:()=>{TC.writeByte(0xA5,0x03);},
    touchevent:() => {
        wOS.time_left = wOS.ON_TIME; //reset LCD on time 
        var p = TC.getXY();
        if (p.gest==TC.CLICK) {TC.emit("touch",p);TC._haslong=false;}
        else if (p.gest>=1 && p.gest<=4) {TC.emit("swipe",p.gest); TC._haslong=false;}
        else if (p.gest==TC.LONG  && !TC._haslong) {TC.emit("longtouch",p); TC._haslong=true;}
    },
    start:()=>{
        digitalPulse(TC.RESET_PIN,0,5);
        var t = getTime()+50/1000; while(getTime()<t); // delay 50 ms
        TC.enable();
        if (TC._wid) clearWatch(TC._wid);
        TC._wid = setWatch(TC.touchevent,TC.TOUCH_PIN,{repeat:true,edge:"falling"});
    },
    stop:()=>{
        if (TC._wid) {
            TC._wid = clearWatch(TC._wid);
            TC._wid = undefined;
        }
        TC.sleepMode();
    },
    init:(i2c, opts)=>{
      TC.I2C = i2c;
      TC.RESET_PIN = opts.RESET;
      TC.TOUCH_PIN = opts.INTPIN;
      pinMode(TC.TOUCH_PIN,'input');
  
    },
  };
  /*
  TC.on("touch", (p)=>{
      console.log("touch x: "+p.x+" y:"+p.y);
  });
  
  TC.on("swipe", (d)=>{
      console.log("swipe d: "+d);
  });
  
  TC.on("longtouch", (p)=>{
      console.log("long touch");
  });
  */
  