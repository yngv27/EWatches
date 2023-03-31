function ST7735() {
    var LCD_WIDTH = 80;
    var LCD_HEIGHT = 160;
    var XOFF = 24;
    var YOFF = 0;
    var cmd = lcd_spi_unbuf.command;
  
    function dispinit(rst,fn) {
        function delayms(d) {var t = getTime()+d/1000; while(getTime()<t);}
        if (rst) {
            digitalPulse(rst,0,10);
        } else {
            cmd(0x01); //ST7735_SWRESET: Software reset, 0 args, w/delay: 150 ms delay
        }
    setTimeout(function() {
      cmd(0x11); //ST7735_SLPOUT: Out of sleep mode, 0 args, w/delay: 500 ms delay
      setTimeout(function() {
        cmd(0xB1,[0x01,0x2C,0x2D]); //ST7735_FRMCTR1: Set Frame rate ctrl - normal mode, 3 args: (Rate = fosc/(1x2+40) * (LINE+2C+2D))
        cmd(0xB2,[0x01,0x2C,0x2D]); //ST7735_FRMCTR2: Set Frame rate control - idle mode, 3 args: Rate = fosc/(1x2+40) * (LINE+2C+2D)
        cmd(0xB3,[0x01,0x2C,0x2D,0x01,0x2C,0x2D]); //ST7735_FRMCTR3: Set Frame rate ctrl - partial mode, 6 args: Dot inversion mode + Line inversion mode
        cmd(0xB4,0x07); // ST7735_INVCTR: Set Display inversion ctrl, 1 arg, no delay: No inversion
        cmd(0xC0,[0xA2,0x02,0x84]); //ST7735_PWCTR1: Set Power control, 3 args, no delay: init + -4.6V + AUTO mode
        cmd(0xC1,0xC5); //ST7735_PWCTR2: Set Power control, 1 arg, no delay: VGH25 = 2.4C VGSEL = -10 VGH = 3 * AVDD
        cmd(0xC2,[0x0A,0x00]); //ST7735_PWCTR3: Set Power control, 2 args, no delay: Opamp current small + Boost frequency
        cmd(0xC3,[0x8A,0x2A]); //ST7735_PWCTR4: Set Power control, 2 args, no delay: BCLK/2, Opamp current small & Medium low
        cmd(0xC4,[0x8A,0xEE]); //ST7735_PWCTR5: Set Power control, 2 args, no delay:
        cmd(0xC5,0x0E); //ST7735_VMCTR1: Set Power control, 1 arg, no delay:
        cmd(0x20,0x00); //ST7735_INVOFF: Don't invert display, no args, no delay
        cmd(0x36,0xC8); //ST7735_MADCTL: Set Memory access control (directions), 1 arg: row addr/col addr, bottom to top refresh
        cmd(0x3A,0x05); //ST7735_COLMOD: Set color mode, 1 arg, no delay: 16-bit color
        cmd(0x2A,[0x00,0x00,0x00,LCD_WIDTH-1]); //ST7735_CASET: Set Column addr set, 4 args, no delay: XSTART = 0 + XEND = 127
        cmd(0x2B,[0x00,0x00,0x00,LCD_HEIGHT-1]); //ST7735_RASET: Set Row addr set, 4 args, no delay: XSTART = 0 + XEND = 127
        cmd(0xE0,[0x02,0x1c,0x07,0x12,0x37,0x32,0x29,0x2d,0x29,0x25,0x2B,0x39,0x00,0x01,0x03,0x10]); //ST7735_GMCTRP1: color and gamma correction
        cmd(0xE1,[0x03,0x1d,0x07,0x06,0x2E,0x2C,0x29,0x2D,0x2E,0x2E,0x37,0x3F,0x00,0x00,0x02,0x10]); //ST7735_GMCTRN1: color and gamma correction
        cmd(0x13); //ST7735_NORON: Set Normal display on, no args, w/delay: 10 ms delay
        cmd(0x29); //ST7735_DISPON: Set Main screen turn on, no args w/delay: 100 ms delay
  
        if (fn) fn();
      },10);
    } ,100);
  
  }
  
    function connect(options , callback) {
        var spi=options.spi, dc=options.dc, ce=options.cs, rst=options.rst;
        var g = lcd_spi_unbuf.connect(options.spi, {
            dc: options.dc,
            cs: options.cs,
            height: LCD_HEIGHT,
            width: LCD_WIDTH,
            colstart: XOFF,
            rowstart: YOFF
        });
        g.lcd_sleep = function(){cmd(0x10);cmd(0x28);};
        g.lcd_wake = function(){cmd(0x29);cmd(0x11);};
        dispinit(rst, ()=>{g.clear(1).setFont("6x8").drawString("Loading...",20,20);});
        return g;
    }
  
    //var spi = new SPI();
    SPI1.setup({sck:D2, mosi:D3, baud: 8000000});
  
    return connect({spi:SPI1, dc:D6, cs:D5, rst:D8});
  }
  