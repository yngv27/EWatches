function SC7A20(opts)  {
    this.i2c = opts.i2c;
    this.intr = opts.intr;
    this.addr = 0x18;
    //this.useInt = opts.useInt;
  }
  SC7A20.prototype.writeByte = function(a,d) { 
    this.i2c.writeTo(this.addr,a,d);
  }; 
  SC7A20.prototype.readBytes = function(a,n) {
    this.i2c.writeTo(this.addr, a);
    return this.i2c.readFrom(this.addr,n); 
  };
  SC7A20.prototype.init = function () {
    this.id = this.readBytes(0x0F,1)[0];
    this.writeByte(0x21,0x00); //highpass filter disabled
    this.writeByte(0x24,0x00); //latched interrupt off
    if(!this.intr) {
      // low power, no built-in wakeup
      this.writeByte(0x20,0x2F); // 10Mhz
      this.writeByte(0x22,0x00); //no interrupt to INT1
      this.writeByte(0x23,0x80); //BDU,MSB at high addr, NO HighRes
      this.writeByte(0x30,0x00); //no XH interrupt 
      return this.id;
    }
    // use built-in wakeup
    this.writeByte(0x20,0x47); // datarate: 4 = 50Hz; 0 for LPen (no low power); 0b111 = enable all axes
    this.writeByte(0x22,0x40); //interrupt to INT1
    this.writeByte(0x23,0x88); //BDU,MSB at high addr, HR
    this.writeByte(0x32,0x10); //threshold = 250 milli g's
    this.writeByte(0x33,0x01); //duration = 1 * 20ms
    this.writeByte(0x30,0x02); //XH interrupt 
    pinMode(this.intr,"input",false);
    setWatch(()=>{
      //print("EEK: "+JSON.stringify(this));
        if (this.read0()>192) this.emit("faceup");
    },this.intr,{repeat:true,edge:"rising",debounce:50});
    return this.id;
  };
  SC7A20.prototype.read0 = function() {
    return this.readBytes(0x1,1)[0];
  };
  SC7A20.prototype.read = function() {
    function conv(lo,hi) { 
      var i = (hi<<8)+lo;
      return ((i & 0x7FFF) - (i & 0x8000))/16;
    }
  // register 0x28, with high bit set for sequential read
    var a = this.readBytes(0xA8,6);
    //return {ax:conv(a[0],a[1]), ay:conv(a[2],a[3]), az:conv(a[4],a[5])};
    return {ax:a[1], ay:a[3], az:a[5]};
  };
  exports={};
  exports.connect = function(opts) {
    return new SC7A20(opts);
  };
  
  //var WI2C = new I2C();
  //I2C1.setup({scl:D14,sda:D15,bitrate:200000});
  //A=exports.connect({i2c: I2C1, intr: D16});
    