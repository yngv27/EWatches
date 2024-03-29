// Temporary
const logD = console.log;

/* anything BUT
D5:  Touch panel INT
D6:  Touch panel RESET
D7:  Backlight (analog 0.0-0.1)
D15: Buzzer (1==full, 0==off)
D16: BTN1
D18: SPI Flash SO
D19: SPI Flash CS
D23: Charging (0 == charging)
D28: Battery voltage (low=. high =)
*/
/*
= new SPI();
    SPI1.setup({sck:D2, mosi:D3, baud: 8000000});
    return connect({spi:SPI1, dc:D18, cs:D25, rst:D26});
    */

var tmp = "";
function delayms(ms) {
  //digitalPulse(D18,0,ms);digitalPulse(D18,0,0);
  var t = getTime()+ms/1000; while(getTime()<t);
  /*
  let t = Math.floor(Date().getTime())+ms;
  while(t > Date().getTime()) {
    // something silly
    tmp = ' ';
  }
  */
}

const LCD_WIDTH = 240;
const LCD_HEIGHT = 240;
const COLSTART = 0;
const ROWSTART = 0;

var INVERSE = 1;

function buzz() { 
  D15.set(); 
  setTimeout(()=>{
    D15.reset();
  }, 500);
}
function init(spi, dc, ce, en, rst, callback) {
    function cmd(c, d) {
        dc.reset();
        spi.write(c, ce);
        if (d !== undefined) {
            dc.set();
            spi.write(d, ce);
        }
    }

    function delayms(d) {var t = getTime()+d/1000; while(getTime()<t);}
    if (en) en.set();
    if (rst) {
        digitalPulse(rst,0,[20,50]);
    } else {
        cmd(0x01); 
    }
    delayms(120);
    cmd(0x11); //SLPOUT
    delayms(50);
    cmd(0xFE);
    cmd(0xEF);
    cmd(0xEB,0x14);
    cmd(0x84,0x40);
    cmd(0x85,0xF1);
    cmd(0x86,0x98);
    cmd(0x87,0x28);
    cmd(0x88,0xA);
    cmd(0x8A,0);
    cmd(0x8B,0x80);
    cmd(0x8C,1);
    cmd(0x8D,0);
    cmd(0x8E,0xDF);
    cmd(0x8F,82);
    cmd(0xB6,0x20);
    cmd(0x36,0x48);
    cmd(0x3A,5);
    cmd(0x90,[8,8,8,8]);
    cmd(0xBD,6);
    cmd(0xA6,0x74);
    cmd(0xBF,0x1C);
    cmd(0xA7,0x45);
    cmd(0xA9,0xBB);
    cmd(0xB8,0x63);
    cmd(0xBC,0);
    cmd(0xFF,[0x60,1,4]);
    cmd(0xC3,0x17);
    cmd(0xC4,0x17);
    cmd(0xC9,0x25);
    cmd(0xBE,0x11);
    cmd(0xE1,[0x10,0xE]);
    cmd(0xDF,[0x21,0x10,2]);
    cmd(0xF0,[0x45,9,8,8,0x26,0x2A]);
    cmd(0xF1,[0x43,0x70,0x72,0x36,0x37,0x6F]);
    cmd(0xF2,[0x45,9,8,8,0x26,0x2A]);
    cmd(0xF3,[0x43,0x70,0x72,0x36,0x37,0x6F]);
    cmd(0xED,[0x1B,0xB]);
    cmd(0xAC,0x47);
    cmd(0xAE,0x77);
    cmd(0xCB,2);
    cmd(0xCD,0x63);
    cmd(0x70,[7,9,4,0xE,0xF,9,7,8,3]);
    cmd(0xE8,0x34);
    cmd(0x62,[0x18,0xD,0x71,0xED,0x70,0x70,0x18,0x0F,0x71,0xEF,0x70,0x70]);
    cmd(0x63,[0x18,0x11,0x71,0xF1,0x70,0x70,0x18,0x13,0x71,0xF3,0x70,0x70]);
    cmd(0x64,[0x28,0x29,1,0xF1,0,7,0xF1]);
    cmd(0x66,[0x3C,0,0xCD,0x67,0x45,0x45,0x10,0,0,0]);
    cmd(0x67,[0,0x3C,0,0,0,1,0x54,0x10,0x32,0x98]);
    cmd(0x74,[0x10,0x80,0x80,0,0,0x4E,0]);
    cmd(0x35,0);  
    if (INVERSE) {
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
    if (callback) setTimeout(callback, 250);

}


connect = function (spi, dc, ce, en, rst, callback) {
    var g = Graphics.createCallback(LCD_WIDTH, LCD_HEIGHT, 16, {
        setPixel: function (x, y, c) {
            ce.reset();
            spi.write(0x2A, dc);
            spi.write((COLSTART + x) >> 8, COLSTART + x, (COLSTART + x) >> 8, COLSTART + x);
            spi.write(0x2B, dc);
            spi.write((ROWSTART + y) >> 8, ROWSTART + y, (ROWSTART + y) >> 8, (ROWSTART + y));
            spi.write(0x2C, dc);
            spi.write(c >> 8, c);
            ce.set();
        },
        fillRect: function (x1, y1, x2, y2, c) {
            ce.reset();
            spi.write(0x2A, dc);
            spi.write((COLSTART + x1) >> 8, COLSTART + x1, (COLSTART + x2) >> 8, COLSTART + x2);
            spi.write(0x2B, dc);
            spi.write((ROWSTART + y1) >> 8, ROWSTART + y1, (ROWSTART + y2) >> 8, (ROWSTART + y2));
            spi.write(0x2C, dc);
            spi.write({ data: String.fromCharCode(c >> 8, c), count: (x2 - x1 + 1) * (y2 - y1 + 1) });
            ce.set();
        }
    });
    init(spi, dc, ce, en, rst, callback);
    return g;
};
/*
D7:  Backlight (analog 0.0-0.1)
D8:  LCD RST, (must toggle 0->1->0) also toggles power? 
D11: LCD DC
D12: on LCD socket (?)
D13: LCD CS
D14: LCD Enable (must be high; resetting requires re-init of LCD)
D17: Shared LCD / SPI Flash SI / Accel
D20: Shared LCD / SPI Flash CLK / Accel
*/
    
function on() {
  // SN80Y
  D7.set();
}
// g = GC9A01(D13, D17, D20, D11, D14, D8);
function GC9A01(CS, SI, CLK, DC, EN, RST) {
  //SN80
  //if(CLK == D3) {
  // P20
  //if(CLK == D9) {
    //print("Skipping bad clock D9");
    //return;
  //}
  var spi = new SPI();
  spi.setup({sck:CLK,mosi:SI,mode:0,baud:8000000});
  on();
  //D12.write(0); D8.write(0);
  var g = connect(spi, DC, CS, EN, RST, function() {
    var STMP = "HI THERE";
    print(`-- ${STMP} -- CS: ${CS} SI: ${SI} CLK:${CLK} DC:${DC} EN:${EN} RST:${RST}`);
    g.setFont("6x8",4).setColor("#00ffff");//.fillRect(80,80,160,100);
    g.setFontAlign(0,0).drawString(STMP,120,120,true);
  });
  return g;
}
