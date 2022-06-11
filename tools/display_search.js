E.kickWatchdog();
function KickWd(){
  if( (typeof(BTN1)=='undefined')||(!BTN1.read()) ) E.kickWatchdog();
}
var wdint=setInterval(KickWd,2000);
E.enableWatchdog(15, false);

const logD = console.log;

/*
** D3   battery charging (charging = LOW)
** D4   backlight (analog)
** D15  I2C SDA (SC7A20)
** D16  I2C SCK (SC7A20)
** D17  SPI Flash MOSI
** D18  SPI Flash SCLK
** D19  SPI FLash MISO
** D20  SPI Flash CS
** D22  buzzer
** D25  BTN1 (input_pullup)
** D26  BTN2 (input_pullup)
** D28  I2C SDA (0x48 - HRM??)
** D29  I2C SCK (???)
** D30  analog battery voltage (low = 2.555, high = 3.17)
*/
let Xpins = [
    D0, D1, 
    D2, D5, 
    D6, D7, D8, D9,
    D10, D11, D12, D13, D14, //D15, D16, D17, D18, D19,
    D21, D23, D24, D27, 
    D31, 
];
/*
= new SPI();
    SPI1.setup({sck:D2, mosi:D3, baud: 8000000});
    return connect({spi:SPI1, dc:D18, cs:D25, rst:D26});
    */
let pins = [
  // SN80
  //D2, D25, D3, D18, D26
  // P20
  D11, D12, D13, D14, D6, D7, D8, D9
  ];

let pinBusy = [];

function resetBusy() {
  for(let i = 0; i< pins.length; i++) {
    pinBusy[i] = false;
  }
}
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


      var XOFF = 0;
      var YOFF = 0;
      var INVERSE = 1;
      var cmd = lcd_spi_unbuf.command;
        
      function dispinit(rst,fn) {
          function delayms(d) {var t = getTime()+d/1000; while(getTime()<t);}
          if (rst) {
              digitalPulse(rst,0,10);
          } else {
              cmd(0x01); //ST7735_SWRESET: Software reset, 0 args, w/delay: 150 ms delay
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
          if (fn) setTimeout(fn, 500);
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
          dispinit(rst, callback);
          return g;
      }

     

function on() {
  // P20
  D4.set();
  // SN80
  //digitalWrite([D23,D22,D14],0);
}
// GC9A01(D25, D3, D2, D18, D26);
function GC9A01(CS, IO, CLK, DC, RST) {
  //SN80
  //if(CLK == D3) {
  // P20
  if(CLK == D9) {
    print("Skipping bad clock D9");
    return;
  }
  //var spi = new SPI();
  SPI1.setup({sck:CLK,mosi:IO,mode:0,baud:8000000});
  on();
  var g = connect({spi: SPI1, dc: DC, cs: CS, rst: RST}, function() {
    var STMP = stamp();
    print(`-- ${STMP} -- CS: ${CS} IO: ${IO} CLK:${CLK} DC:${DC} RST:${RST}`);
    g.clear().setFont("6x8",4).setColor("#00ffff");//.fillRect(80,80,160,100);
    g.setFontAlign(0,0).drawString(STMP,120,120);
  });
  return g;
}

function stamp() {
  let res="";
  let waste = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for(let c=0; c < 3;c++) {
    res += waste.charAt(Math.random() * 36);
  }
  return res;
}

var delay = 1000;
var CS=0, IO=0, CLK=0, DC=0, RST=0;
// P20
CS=4, IO=1, CLK=2, DC=3, RST=7;

function getNextPin(idx) {
  for(let c=idx; c<pins.length && pinBusy[c] ; c++);
  return c >= pins.length ? -1 : c;
}

function test() {
  on();
  resetBusy();
  CS = getNextPin(CS);
  pinBusy[CS] = true;
  IO = getNextPin(IO);
  pinBusy[IO] = true;
  CLK = getNextPin(CLK);
  pinBusy[CLK] = true;
  DC = getNextPin(DC);
  pinBusy[DC] = true;
  RST = getNextPin(RST);
  print(`CS=${CS}, IO=${IO}, CLK=${CLK}, DC=${DC}, RST=${RST} `);
  GC9A01(pins[CS], pins[IO], pins[CLK], pins[DC],pins[RST]);
  //delayms(900);
  //print (`GC9A01(${pins[CS]}, ${pins[IO]}, ${pins[CLK]}, ${pins[DC]}, ${pins[RST]}); `);
  RST=getNextPin(++RST);
  if(RST == -1) {
    pinBusy[DC++]=false;
    DC=getNextPin(DC);
    if(DC == -1) {
      pinBusy[CLK++]=false;
      CLK=getNextPin(CLK);
      if(CLK == -1) {
        pinBusy[IO++]=false;
        IO=getNextPin(IO);
        if(IO == -1) {
          CS++;
          if(CS >= pins.length) {
            print("DONE");
            return;
          }
          IO=0;
        }
        CLK=0;
      }
      DC=0;
    }
    RST=0;
  }
}

t=test;

function ORIGtest() {
    on();
    for(let CS=0; CS < 1; CS++) {
      resetBusy();
      pinBusy[CS] = true;
      for(let IO=0; IO < 2; IO++) {
        if(pinBusy[IO]) continue;
        pinBusy[IO] = true;
        //print(`IO = ${IO}`);
        for(let CLK=0; CLK < pins.length; CLK++) {
          if(pinBusy[CLK]) continue;
          pinBusy[CLK] = true;
          //print(`CLK = ${CLK}`);
          for(let DC=0; DC < pins.length; DC++) {
            if(pinBusy[DC]) continue;
            pinBusy[DC] = true;
            for(let RST=0; RST < pins.length; RST++) {
              if(pinBusy[RST]) continue;
              //pinBusy[RST] = true;
              setTimeout((b,c,d,e,f) => {
                GC9A01(b,c,d,e,f);
              }, delay,
                 pins[CS], pins[IO], pins[CLK], pins[DC],pins[RST]);
              //GC9A01(pins[CS], pins[IO], pins[CLK], pins[DC],pins[RST]);
              //delayms(900);
              print (`GC9A01(${pins[CS]}, ${pins[IO]}, ${pins[CLK]}, ${pins[DC]}, ${pins[RST]}); `);
            }
            pinBusy[DC] = false;
          }
          pinBusy[CLK] = false;
        }
        pinBusy[IO] = false;
      }
      pinBusy[CS] = false;
    }
  }
