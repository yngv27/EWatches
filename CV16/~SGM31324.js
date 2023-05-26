//var exports = {};

class LED {
    constructor(i2c) {
      this.I2C = i2c;
      this.init();
    }
    w(a,d) { this.I2C.writeTo(0x30, a, d);}
  
    init () {
      this.w(0, 0x1f);
      this.w(9, 0);
      this.w(1, 0x10);
      this.w(2, 0x68);
      this.w(3, 0x18);
      this.w(5, 0x31);
    }
    // rgb = red * 32 + grn * 8 + blue * 2
    breathe(rgb) {
      this.w(0,0x7);
      this.w(9,0x0);
      this.w(5,0xff);
      this.w(4,0x40 | rgb); 
      this.w(1,0x0f);
    }
  }
  exports.setup = (i2c) => { return new LED(i2c);};