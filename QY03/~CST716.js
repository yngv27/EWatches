
// touch driver CST716 for QY03

const C = {
    DOWN:1, UP:2, LEFT:3, RIGHT:4, CLICK:5, LONG:12,  
  };
  
  function CSTx16(opts) {
    this.addr = 0x15;
    this._wid=undefined;
    this._haslong=false;
    this.i2c = opts.i2c;
    this.RESET_PIN = opts.rst;
    this.TOUCH_PIN = opts.intr;
    this.fx=-1;
    this.fy=-1;
    this.down=false;
    pinMode(this.TOUCH_PIN,'input');
  }
  
  CSTx16.prototype.writeByte = function(a,d)  { 
     this.i2c.writeTo(this.addr,a,d);
  }; 
  CSTx16.prototype.readBytes = function(a,n)  {
     this.i2c.writeTo(this.addr, a);
     return this.i2c.readFrom(this.addr,n); 
  };
  CSTx16.prototype.getXY = function() { 
      var _data = TC.readBytes(0x00,8);
      return { x:(((_data[3]&0x0F)<<8)|_data[4])+20,
               y:((_data[5]&0x0F)<<8)|_data[6],
               gest:_data[1],
               b: _data[2]
             };
  };
     
      //sleepMode:()=>{TC.writeByte(0xA5,0x03);},
        
  CSTx16.prototype.enable= function () {TC.writeByte(0xed, 0xc8);} ; // NO gesture mode
  CSTx16.prototype.sleepMode = function() {TC.writeByte(0xE5,0x03);};
  CSTx16.prototype.touchevent = function()  {
    var p = this.getXY();
        if (p.b && !this.down) {
            this.fx = p.x; this.fy = p.y; this.down = true;
            //wOS.time_left = wOS.ON_TIME; //reset LCD on time.
        }
        if (!p.b && this.down) {
            var ax = Math.abs(p.x-this.fx); 
            var ay = Math.abs(p.y-this.fy);
            this.down=false;
            if (ax<30 && ay<30) {this.emit("touch",p);return;}
            if (ay>ax) p.gest = p.y>this.fy ? C.DOWN : C.UP;
            else p.gest = p.x>this.fx ? C.RIGHT : C.LEFT;
            this.emit("swipe",p.gest); 
        }
  };
  CSTx16.prototype.start = function(){
     digitalPulse(this.RESET_PIN,0,5);
     var t = getTime()+50/1000; while(getTime()<t); // delay 50 ms
     this.enable();
     if (this._wid) clearWatch(this._wid);
     this._wid = setWatch(()=>{
       this.touchevent();
     },this.TOUCH_PIN,{repeat:true,edge:"falling"});
  };
  CSTx16.prototype.stop = function(){
     if (this._wid) {
         this._wid = clearWatch(TC._wid);
         this._wid = undefined;
     }
     this.sleepMode();
  };
  exports={};
  exports.connect = function(opts) {
   return new CSTx16(opts);
  };
  /*
  function go() {
   TC.start();
  TC.on("touch", (p)=>{
   console.log("touch x: "+p.x+" y:"+p.y);
  });
  
  TC.on("swipe", (d)=>{
   console.log("swipe d: "+d);
  });
  
  TC.on("longtouch", (p)=>{
   console.log("long touch");
  });
  }
  */
  I2C1.setup({sda: D15, scl:D14, bitrate:200000})
  var TC = exports.connect({i2c: I2C1, rst: D39, intr: D32});
  
  