/* Based upon Espruino SPI code for the ST7789:
Copyright (c) 2020 Akos Lukacs, based on code by Gordon Williams and https://github.com/Bodmer/TFT_eSPI. See the file LICENSE for copying permission. 

Module for the GC9A01 240x240 LCD controller
*/
E.kickWatchdog();
function KickWd(){
  E.kickWatchdog();
}
var wdint=setInterval(KickWd,2000);
E.enableWatchdog(15, false);

let WATCH = process.env.BOARD; //"P20";


SCK=D8;
IO= D9;
DC=D6;
CS=D14; 
RST=D7;

if(WATCH == "SN80") {
  SCK=D2;
  IO= D3;
  DC=D18;
  CS=D25; 
  RST=D26;
}



function delayms(ms) {
  //digitalPulse(D18,0,ms);digitalPulse(D18,0,0);
  var t = getTime()+ms/1000; while(getTime()<t);
}


function on() {
  // SN80
  if(WATCH == "SN80") digitalWrite([D23,D22,D14],0);
  // P20
  else {
    D4.set();
  }
}

var spi = new SPI();
spi.setup({sck:SCK,mosi:IO,baud:8000000, mode:0}); 

const LCD_WIDTH = 240;
const LCD_HEIGHT = 240;
const COLSTART = 0;
const ROWSTART = 0;

nrf_wait_us = delayms;

function init(spi, dc, ce, rst, callback) {
  /*
  function cmd(c, d) {
      dc.reset();
      spi.write(c, ce);
      if (d !== undefined) {
          dc.set();
          spi.write(d, ce);
      }
  }
  */
  function spi_tx(cord, b) {
    if(cord) dc.set(); else dc.reset();
    spi.write(b, ce);
  }

  pinMode(rst, 'output');
  rst.set();
  pinMode(dc, 'output');
  dc.set();
  pinMode(ce, 'output');
  ce.set();
          
  /*
  if (rst) {
      //digitalPulse(rst, 1, [50,50,120]);
  } else {
      cmd(0x01); //Software reset
  }
  */
  digitalWrite(rst, 1);
  nrf_wait_us(50);
  digitalWrite(rst, 0);
  nrf_wait_us(50);
  digitalWrite(rst, 1);
  nrf_wait_us(120);
  
  spi_tx(0, 40);
  nrf_wait_us(120);
  spi_tx(0, 16);
  nrf_wait_us(120);
  spi_tx(0, 254);
  spi_tx(0, 239);
  spi_tx(0, 235);
  spi_tx(1, 20);
  spi_tx(0, 132);
  spi_tx(1, 64);
  spi_tx(0, 133);
  spi_tx(1, 255);
  spi_tx(0, 134);
  spi_tx(1, 255);
  spi_tx(0, 135);
  spi_tx(1, 255);
  spi_tx(0, 142);
  spi_tx(1, 255);
  spi_tx(0, 143);
  spi_tx(1, 255);
  spi_tx(0, 136);
  spi_tx(1, 10);
  spi_tx(0, 137);
  spi_tx(1, 35);
  spi_tx(0, 138);
  spi_tx(1, 0);
  spi_tx(0, 139);
  spi_tx(1, 128);
  spi_tx(0, 140);
  spi_tx(1, 1);
  spi_tx(0, 141);
  spi_tx(1, 1);
  spi_tx(0, 182);
  spi_tx(1, 0);
  spi_tx(0, 54);
  spi_tx(1, 72);
  spi_tx(0, 58);
  spi_tx(1, 5);
  spi_tx(0, 144);
  spi_tx(1, 8);
  spi_tx(1, 8);
  spi_tx(1, 8);
  spi_tx(1, 8);
  spi_tx(0, 189);
  spi_tx(1, 6);
  spi_tx(0, 188);
  spi_tx(1, 0);
  spi_tx(0, 255);
  spi_tx(1, 96);
  spi_tx(1, 1);
  spi_tx(1, 4);
  spi_tx(0, 195);
  spi_tx(1, 22);
  spi_tx(0, 196);
  spi_tx(1, 22);
  spi_tx(0, 201);
  spi_tx(1, 37);
  spi_tx(0, 190);
  spi_tx(1, 17);
  spi_tx(0, 225);
  spi_tx(1, 16);
  spi_tx(1, 14);
  spi_tx(0, 223);
  spi_tx(1, 33);
  spi_tx(1, 12);
  spi_tx(1, 2);
  spi_tx(0, 240);
  spi_tx(1, 69);
  spi_tx(1, 9);
  spi_tx(1, 8);
  spi_tx(1, 8);
  spi_tx(1, 38);
  spi_tx(1, 42);
  spi_tx(0, 241);
  spi_tx(1, 67);
  spi_tx(1, 112);
  spi_tx(1, 114);
  spi_tx(1, 54);
  spi_tx(1, 55);
  spi_tx(1, 111);
  spi_tx(0, 242);
  spi_tx(1, 69);
  spi_tx(1, 9);
  spi_tx(1, 8);
  spi_tx(1, 8);
  spi_tx(1, 38);
  spi_tx(1, 42);
  spi_tx(0, 243);
  spi_tx(1, 67);
  spi_tx(1, 112);
  spi_tx(1, 114);
  spi_tx(1, 54);
  spi_tx(1, 55);
  spi_tx(1, 111);
  spi_tx(0, 237);
  spi_tx(1, 27);
  spi_tx(1, 11);
  spi_tx(0, 174);
  spi_tx(1, 119);
  spi_tx(0, 205);
  spi_tx(1, 99);
  spi_tx(0, 112);
  spi_tx(1, 7);
  spi_tx(1, 7);
  spi_tx(1, 4); 
  spi_tx(1, 14);
  spi_tx(1, 16);
  spi_tx(1, 9);
  spi_tx(1, 7);
  spi_tx(1, 8);
  spi_tx(1, 3);
  spi_tx(0, 232);
  spi_tx(1, 4);
  spi_tx(0, 96);
  spi_tx(1, 56);
  spi_tx(1, 11);
  spi_tx(1, 109);
  spi_tx(1, 109);
  spi_tx(1, 57);
  spi_tx(1, 240);
  spi_tx(1, 109);
  spi_tx(1, 109);
  spi_tx(0, 97);
  spi_tx(1, 56);
  spi_tx(1, 244);
  spi_tx(1, 109);
  spi_tx(1, 109);
  spi_tx(1, 56);
  spi_tx(1, 247);
  spi_tx(1, 109);
  spi_tx(1, 109);
  spi_tx(0, 98);
  spi_tx(1, 56);
  spi_tx(1, 13);
  spi_tx(1, 113);
  spi_tx(1, 237);
  spi_tx(1, 112);
  spi_tx(1, 112);
  spi_tx(1, 56);
  spi_tx(1, 15);
  spi_tx(1, 113);
  spi_tx(1, 239);
  spi_tx(1, 112);
  spi_tx(1, 112);
  spi_tx(0, 99);
  spi_tx(1, 56);
  spi_tx(1, 17);
  spi_tx(1, 113);
  spi_tx(1, 241);
  spi_tx(1, 112);
  spi_tx(1, 112);
  spi_tx(1, 56);
  spi_tx(1, 19);
  spi_tx(1, 113);
  spi_tx(1, 243);
  spi_tx(1, 112);
  spi_tx(1, 112);
  spi_tx(0, 100);
  spi_tx(1, 40);
  spi_tx(1, 41);
  spi_tx(1, 241);
  spi_tx(1, 1);
  spi_tx(1, 241);
  spi_tx(1, 0);
  spi_tx(1, 7);
  spi_tx(0, 102);
  spi_tx(1, 60);
  spi_tx(1, 0);
  spi_tx(1, 205);
  spi_tx(1, 103);
  spi_tx(1, 69);
  spi_tx(1, 69);
  spi_tx(1, 16);
  spi_tx(1, 0);
  spi_tx(1, 0);
  spi_tx(1, 0);
  spi_tx(0, 103);
  spi_tx(1, 0);
  spi_tx(1, 60);
  spi_tx(1, 0);
  spi_tx(1, 0);
  spi_tx(1, 0);
  spi_tx(1, 1);
  spi_tx(1, 84);
  spi_tx(1, 16);
  spi_tx(1, 50);
  spi_tx(1, 152);
  spi_tx(0, 116);
  spi_tx(1, 16);
  spi_tx(1, 192);
  spi_tx(1, 128);
  spi_tx(1, 0);
  spi_tx(1, 0);
  spi_tx(1, 78);
  spi_tx(1, 0);
  spi_tx(0, 152);
  spi_tx(1, 62);
  spi_tx(1, 7);
  spi_tx(0, 53);
  spi_tx(1, 0);
  spi_tx(0, 33);
  spi_tx(0, 17);
  nrf_wait_us(120);
  spi_tx(0, 41);
  nrf_wait_us(120);
  spi_tx(0, 44);

  if (callback) setTimeout(callback, 500);
       
}

function func1(spi, dc, ce, rst, callback) {
  function spi_tx(cord, b) {
    if(cord) dc.set(); else dc.reset();
    spi.write(b, ce);
  }
  /*
  spi_tx(0,0xfe);
  spi_tx(0,0xef);
  spi_tx(0,0x84);
  spi_tx(1,0x40);
  spi_tx(0,0xb6);
  spi_tx(1,0);
  spi_tx(1,0);
  spi_tx(0,0x36);
  spi_tx(1,0x48);
  spi_tx(0,0x3a);
  spi_tx(1,5);
  spi_tx(0,0x66);
  spi_tx(1,0x3c);
  spi_tx(1,0);
  spi_tx(1,0xcd);
  spi_tx(1,0x67);
  spi_tx(1,0x45);
  spi_tx(1,0x45);
  spi_tx(1,0x10);
  spi_tx(1,0);
  spi_tx(1,0);
  spi_tx(1,0);
  spi_tx(0,0x67);
  spi_tx(1,0);
  spi_tx(1,0x3c);
  spi_tx(1,0);
  spi_tx(1,0);
  spi_tx(1,0);
  //spi_tx(1);
  spi_tx(1,0x54);
  spi_tx(1,0x10);
  spi_tx(1,0x32);
  spi_tx(1,0x98);
  */
    spi_tx(0,0xfe);
  spi_tx(0,0xef);
  spi_tx(0,0x84);
  spi_tx(1,0x40);
  spi_tx(0,0xb6);
  spi_tx(1,0);
  spi_tx(1,0x40);
  spi_tx(0,0x36);
  spi_tx(1,0x58);
  spi_tx(0,0x3a);
  spi_tx(1,5);
  spi_tx(0,0x66);
  spi_tx(1,0x3c);
  spi_tx(1,0);
  spi_tx(1,0x98);
  spi_tx(1,0x10);
  spi_tx(1,0x32);
  spi_tx(1,0x45);
  //spi_tx(1);
  spi_tx(1,0);
  spi_tx(1,0);
  spi_tx(1,0);
  spi_tx(0,0x67);
  spi_tx(1,0);
  spi_tx(1,0x3c);
  spi_tx(1,0);
  spi_tx(1,0);
  spi_tx(1,0);
  spi_tx(1,0x10);
  spi_tx(1,0x54);
  spi_tx(1,0x67);
  spi_tx(1,0x45);
  spi_tx(1,0xcd);
}

let connect = function (spi, dc, ce, rst, callback) {
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
    init(spi, dc, ce, rst, callback);
    //setTimeout(func1, 250, spi, dc, ce, rst);
    return g;
};

/*

0x50000700: 00000002 00000002 00000002 00000000 00000003 00000003 00000003 00000003 
0x50000720: 00000001 00000003 00000003 00000003 0003000c 00000003 00000003 00000003 
0x50000740: 00000003 00000003 00000003 0000000c 00000003 00000002 00000003 00000002 
0x50000760: 00000002 0003000c 0003000c 00000002 00000003 00000003 00000002 00000000 
*/



if(WATCH == "P20") {
  pinMode(D12, "input_pullup");
  pinMode(D19, "input_pullup");
  pinMode(D3, "output");
  D3.set();
  
  const gpio = [
  0x00000002, 0x00000002, 0x00000002, 0x00000000, 0x00000003, 0x00000003, 0x00000003, 0x00000003, 
  0x00000001, 0x00000003, 0x00000003, 0x00000003, 0x0003000c, 0x00000003, 0x00000003, 0x00000003, 
  0x00000003, 0x00000003, 0x00000003, 0x0000000c, 0x00000003, 0x00000002, 0x00000003, 0x00000002, 
  0x00000002, 0x0003000c, 0x0003000c, 0x00000002, 0x00000003, 0x00000003, 0x00000002, 0x00000000 
  ];
  for(let idx=0; idx < 32; idx++) {
    //poke32(0x50000700+4*idx, gpio[idx]);
  }
}

on();

var g = connect(spi, DC, CS, RST);

function test () {
  //on();
  g.clear();
  //g.setRotation(1);
 // g.drawString("Hello",0,0);
  //g.setFontVector(20);
  
  g.setColor(0.5,1,1);
  g.setFont("6x8",1);
  
  g.setFontAlign(0,0);
  g.drawString("Espruino",120,20);
  g.setFontVector(12);
  g.drawString("Espruino",120,40);
  
  g.drawCircle(60,40,20);
  g.fillCircle(180,40,20);
  g.setColor(1,0,1);
  g.drawRect(40,75,80,100);
  g.fillRect(160,75,200,100);
  g.setColor(1,1,0);
  g.drawPoly([70,130,80,110,90,130,100,110,110,130, 110,140,70,140], true);
  g.fillPoly([130,130,140,110,150,130,160,110,170,130, 170,140,130,140], true);
  g.setColor(0.5,0.5,1);
  for(let x = 90; x < 120; x+=5) {
    g.drawLine(x, 60, x, 90);
  }
  for(let y = 60; y < 90; y+=5) {
    g.drawLine(125, y, 155, y);
  }
  //g.drawImage(img,20,144);
}

function gpios() {
  for(let idx=0; idx < 32; idx++ ) {
    print(`${idx}: ${peek32(0x50000700+4*idx).toString(16)}`);
  }
}
