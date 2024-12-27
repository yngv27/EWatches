function ST7789(opts) {
    this.INVERSE = opts.inverse ? opts.inverse : 0;
    this.MADCTL = (typeof(opts.MADCTL) == "number") ? opts.MADCTL : 0x48;

    var g = lcd_spi_unbuf.connect(opts.spi, {
        dc: opts.dc,
        cs: opts.cs,
        height: opts.height ? opts.height : 240,
        width: opts.width ? opts.width : 240,
        colstart: opts.xoff ? opts.xoff : 0,
        rowstart: opts.yoff ? opts.yoff : 0
    });
    g.cmd = lcd_spi_unbuf.command;
    g.lcd_sleep = function(){g.cmd(0x10);g.cmd(0x28);};
    g.lcd_wake = function(){g.cmd(0x29);g.cmd(0x11);};
    this.init(opts.rst, ()=>{
        g.clear(1).setFontVector(18).setFontAlign(0,0).drawString("ST7789",120,120);
    });
    return g;
}

ST7789.prototype.delayms = function(ms) {
    let t = getTime()+ms/1000; while(getTime()<t);
};
ST7789.prototype.init = function (rst, fn) {
    let cmd = lcd_spi_unbuf.command;
    if (rst) {
        digitalPulse(rst,0,10);
    } else {
        cmd(0x01); //ST7735_SWRESET: Software reset, 0 args, w/delay: 150 ms delay
    }
    this.delayms(120);   // no apps to run 
    cmd(0x11); //SLPOUT
    this.delayms(50);
    //MADCTL: Set Memory access control (directions), 1 arg: row addr/col addr, bottom to top refresh
    cmd(0x36, this.MADCTL);
    //COLMOD: Set color mode, 1 arg, no delay: 16-bit color
    cmd(0x3a, 0x05);
    //PORCTRL: Porch control
    cmd(0xb2, [0x0b, 0x0b, 0x33, 0x00, 0x33]);
    //GCTRL: Gate control
    cmd(0xb7, 0x11);
    // VCOMS: VCOMS setting
    cmd(0xbb, 0x35);
    //LCMCTRL: CM control
    cmd(0xc0, 0x2c);
    //VDVVRHEN: VDV and VRH command enable
    cmd(0xc2, 0x01);
    // VRHS: VRH Set
    cmd(0xc3, 0x08);
    // VDVS: VDV Set
    cmd(0xc4, 0x20);
    //VCMOFSET: VCOM Offset Set .
    cmd(0xC6, 0x1F);
    //PWCTRL1: Power Control 1
    cmd(0xD0, [0xA4, 0xA1]);
    // PVGAMCTRL: Positive Voltage Gamma Control
    cmd(0xe0, [0xF0, 0x04, 0x0a, 0x0a, 0x08, 0x25, 0x33, 0x27, 0x3d, 0x38, 0x14, 0x14, 0x25, 0x2a]);
    // NVGAMCTRL: Negative Voltage Gamma Contro
    cmd(0xe1, [0xf0, 0x05, 0x08, 0x07, 0x06, 0x02, 0x26, 0x32, 0x3d, 0x3a, 0x16, 0x16, 0x26, 0x2c]);
    if (this.INVERSE) {
    //TFT_INVONN: Invert display, no args, no delay
    cmd(0x21);
    } else {
    //TFT_INVOFF: Don't invert display, no args, no delay
    cmd(0x20);
    }
    //TFT_NORON: Set Normal display on, no args, w/delay: 10 ms delay
    cmd(0x13);
    //TFT_DISPON: Set Main screen turn on, no args w/delay: 100 ms delay
    cmd(0x29);
    if (fn) fn();
};

exports = {};
exports.connect = function(opts) {
    return new ST7789(opts);
};
/*
SPI1.setup({sck:D2, mosi:D3, baud: 8000000});
g=exports.connect({spi:SPI1, dc:D18, cs:D25, rst:D26, inverse:1, MADCTL:0x0});
wOS = {
  wake: ()=>{ g.lcd_wake(); D23.reset(); }
};
setTimeout(()=>{
  g.setColor(0,0,1).fillRect(0,0,40,40);
  wOS.wake();
}, 1000);

SPI1.setup({sck:D4, mosi:D26, baud: 8000000});
g=require("~ST7789.js").connect({spi:SPI1, dc:D27, cs:D5, rst:D6});
SPI1.setup({sck:D45, mosi:D44, baud: 8000000});
g=exports.connect({spi:SPI1, dc:D47, cs:D3, rst:D2, height:280, yoff:20});
g=require("~ST7789.js").connect({spi:SPI1, dc:D47, cs:D3, rst:D2, height:280, yoff:20});
*/