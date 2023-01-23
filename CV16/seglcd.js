/*
                0x01
               ======
  0x04  ||           || 0x04
        ||           ||
          ======
        || 0x10      ||
  0x40  ||           || 0x10
               ======
                0x40
*/
const _segData = new Uint16Array([ 0x4455, 0x14, 0x5045, 0x1055, 0x1414, 0x1451, 0x5451, 0x15, 0x5455, 0x1455,
  0x1445, 0x5051, 0x40, 0x1000, 0x1,  0, 
  // percentage,   low,   med,  hi,   blank
]);

class SEGLCD {
  delay(ms)  {
    let t = Math.floor(Date().getTime())+ms;
    while(t > Date().getTime()) {  }
  }
  constructor(opts) {
    this.I2C = opts.i2c;
    this.init(opts.EN, opts.RST);
  }

  w(a, d) {
    this.I2C.writeTo(0x3f,a,d);
  }
  lcd_on ()  {this.w(0, 0xaf);}
  lcd_off () {this.w(0, 0xae);}

  init(EN, RST) {
    EN.reset(); //clear 15
    RST.set(); //set 30
    this.delay(2);
    RST.reset(); //clear 30
    this.delay(2);
    RST.set(); //set 30
    this.delay(10);
    this.w(0, 0xe2);//  0xe200;
    this.delay(10);
    this.w(0,  0xff);
    this.w(0,  0x72);
    this.w(0,  0xfe);
    this.w(0,  0xda);
    this.w(0,  0x95);
    this.w(0,  0x99);
    this.w(0,  0xa0);
    this.w(0,  0xc8);
    this.w(0,  0xa4);
    this.w(0,  0x40);
    this.w(0,  0x22);
    this.w(0,  0x81);
    this.w(0,  0x3);
    this.w(0,  0xf8);
    this.w(0,  0x0);

    this.w(0,  0x2c);
    this.delay(1);
    this.w(0,  0x2e);
    this.delay(1);
    this.w(0,  0x2f);
    this.delay(1);
    this.w(0,  0xff);
    this.w(0,  0x64);
    this.w(0,  0xfe);
    this.delay(1);
    this.w(0,  0xaf);
  }

// serial access
  setEverything (bigStr, icons) {
    this.w(0,0xb0);
    this.w(0,0x10);
    // offset into array
    this.w(0,0);
    let max = Math.min(bigStr.length, 13);
    for(let idx = 0; idx < max; idx++) {
      val = bigStr.charCodeAt(idx)-48;
      if(val > _segData.length) val = 0;
      this.w(0x40, ((_segData[val] >> 8) + (icons ? 1 : 0)) & 0xff);
      this.w(0x40, _segData[val] & 0xff);
    }
  }

  // random access
  setDigit(idx, val, icon) {
    this.w(0,0xb0);
    // first 8 go to 0x10, the other 5 to 0x11
    this.w(0, 0x10 + (idx >> 3));
    this.w(0, (idx % 8) * 2);
    this.w(0x40, ((_segData[val] >> 8) + (icon ? 1 : 0)) & 0xff);
    this.w(0x40, _segData[val] & 0xff);
  }

  setDigitRaw(idx, val, icon) {
    this.w(0,0xb0);
    this.w(0, 0x10 + (idx >> 3));
    this.w(0, (idx % 8) * 2);
    // offset into array
    this.w(0x40, ((val >> 8) + (icon ? 1 : 0)) & 0xff);
    this.w(0x40, val & 0xff);
  }
}
exports.init = (opts) => { return new SEGLCD(opts); };