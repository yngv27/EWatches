/*
** ST7571
** customized F07: removed ST7735 and added 7571
*/

var spi1 = new SPI();
spi1.setup({mosi: D7, sck: D2, baud: 2000000});
let CS=D8, RST=D6;
//PWR.set();

// use unused GPIO
function delay_ms(ms) {
  digitalPulse(D3, 0, ms);
  digitalPulse(D3, 0, 0);
}
function write_com(com) {
  spi1.write(com,CS);
}
write_data = write_com;
//========================================================
/*
function initOrig()
{   
    	RST.reset();
    	delay_ms(2);
    	RST.set();
    	delay_ms(2);
  write_com(0xae);
	write_com(0xa9);
	write_com(0xc0);	//MY
	write_com(0xa1);
	write_com(0xab);
	write_com(0xa6);
	write_com(0xa4);
	write_com(0x4c);	//n-line
	write_com(0x00);	//0x0a
	write_com(0x38);
	write_com(0x08);
	write_com(0x48);	//duty
	write_com(0x80);	//1/128
	write_com(0x40);
	write_com(0x00);
	write_com(0x44);
	write_com(0x00);
	write_com(0x57);	//bias
	write_com(0x26);	//vop
	write_com(0x81);	//vop
	write_com(0x35);
	write_com(0xa8);
	
	write_com(0x2c);
	delay_ms(200);
	write_com(0x2e);
	delay_ms(200);
	write_com(0x2f);
	delay_ms(200);
	write_com(0xaf);
	write_com(0xb0);
	write_com(0xa2);
	write_com(0x10);
	write_com(0x00);
}
*/
function init() {
  RST.reset();
  delay_ms(2);
  RST.set();
  delay_ms(2);
  write_com(new Uint8Array([0xae,0xa9,0xc0,0xa1,0xab,0xa6, 0xa4,0x4c,0x00,0x38,0x08,0x48, 
                            0x80,0x40,0x00,0x44,0x00,0x57,0x26,0x81,0x35,0xa8,0x2c]));
	delay_ms(200);
	write_com(0x2e);
	delay_ms(200);
	write_com(0x2f);
	delay_ms(200);
	write_com(0xaf,0xb0,0xa2,0x10,0x00);
}
/*
function flipSlow() {
  let b=new Uint8Array(258);
  let bidx = 0;
  
  write_com(0xb0);

  b[0] = 0xe8; // set data length cmd
  b[1] = 255; // 1 means 2!!! (0=>1...255=>256)
 for(let x=0; x<16; x++) {
   bidx = 2;
   for(let y=0; y< 128; y++) {
     //write_com(0xe8); write_com(0x1); 
     
       let d = g.buffer[x+y*16];
     //write_data(d); write_data(0);
     b[bidx++]=d; b[bidx++]=d;
   }
   write_data(b); // write a row at a time
 }
}
function flipfaster() {
  let b=new Uint8Array(258*16);
  let bidx = 0;
  
  write_com(0xb0);

 for(let x=0; x<16; x++) {
   b[bidx++] = 0xe8; // set data length cmd
   b[bidx++] = 255; // 1 means 2!!! (0=>1...255=>256)
   for(let y=0; y< 128; y++) {
     let d = g.buffer[x+y*16];
     b[bidx++]=d; b[bidx++]=d;
   }
 }
 write_data(b); // write the block
}
*/
/*
var c = E.compiledC(`
// void munge(int, int);

typedef unsigned int uint32_t;
typedef signed int int32_t;
typedef unsigned short uint16_t;
typedef unsigned char uint8_t;
typedef signed char int8_t;
#define NULL ((void*)0)

void munge(unsigned char *src, unsigned char *tgt) {
  // darn well better be 2048!
  int tidx=0;
  int x;
  int y;
  unsigned char d;

 for( x=0; x<16; x++) {
   tgt[tidx++] = 0xe8; // set data length cmd
   tgt[tidx++] = 255; // 1 means 2!!! (0=>1...255=>256)
   for(y=0; y< 128; y++) {
     d = src[x+y*16];
     tgt[tidx++]=d; tgt[tidx++]=d;
   }
 }
}
`);


var src = new Uint8Array(2048);
var tgt = new Uint8Array(2048);
//var res = c.munge(E.getAddressOf(src,true),E.getAddressOf(tgt,true));


*/
let c=(function(){
  var bin=atob("8LUAI+gm/ycOcE9wDEYAIgDrAw4e+DJQpXACMrL1gH/lcATxAgT10QEzECsB9YFx6tHwvQ==");
  return {
    munge:E.nativeCall(1, "void(int, int)", bin),
  };
})();

function flip() {
  let b=new Uint8Array(258*16);
  write_com(0xb0);
  c.munge(E.getAddressOf(g.buffer,true),E.getAddressOf(b,true));
  write_data(b); // write the block
}
var g = Graphics.createArrayBuffer(128,128,1);
g.setRotation(1,1);
g.flip = flip;
init();

eval(_S.read("atcfont.js"));
Graphics.prototype.setFontOmnigo = function() {
  this.setFontCustom(atob("AAAAAAAAB/QAAcAAAHAAAAKAPgCgD4AoAAAZgWQf8E0DMAAAQwUwKwC0A1AygwgAAM4LmE5BnAGwAAcAAAB8DjhAQAAQEOOB8AAAqAOAHAFQAAAQAIAfACABAAAABoA4AACABAAgAQAAAAYAMAAAHAeB4AAAP4MWERDRg/gAAIAP+AAAAAhwxoRkNiDhAAAggwYRENmDeAAAHAOgMQP+AEAAB4gkYSEJmEeAAA/g2YSEJmAeAABAAg4RwLgHAAAA3g2YRENmDeAAA8AzIQkM2D+AAAAAMwGYAAAAAzQZwAAAAAgA4A2AxgQQAABQAoAUAKAAAIIGMBsAcAEAAAIAMAEdDYA4AAAHwGMGDCchbQooXkEYDEA8AAAB4HwOIB0AOABwAAf8IiERCYg8wDwAAH8GDCAhAQwYIIAAH/CAhAQwIMMD8AAD/hEQiIREICAAD/hEAiARAIAAAB/BgwgIREMmCeAAB/wCABAAgAQD/gAAAAf8AAAAABAAwAIf4AAH/AYAeAZgYYIGAAD/gAQAIAEACAAD/gwAGABwBgDAD/gAA/4MABgAYADB/wAAP4MGEBCAhgwfwAAP+EICEBCAzAPAAAD+DBhBQg4YMH+AAAAB/wjARwIsGzBwgAAYQWMJiGbBHAAAgAQAP+EACAAAA/wAMACADADB/wAAeAB4AHAOAcA4AAAPAA4AHgeADAAcB4HgAABgwYwDgBwDGDBgAA4AHAA+AwBwBgAAAQcIaEZCYhYQ4IAAP+EBAAB4AHAA8AAEBD/gAAIAMAMAGABgAQAAAAEACABAAgAQAIAAMADAAAADgLYFEDiA/AAB/wEIGEDGA+AAAPgMYEEDGAiAAAPgMYGEBCH/AAAPgNYEkDSA4AAAIAf4aAIAAAAfAY0ISEbD/AAD/gMAMAGAB+AAC/gAAACADL/AAD/gGAHgGYCGAAD/gAAP4GACAA/AwAQAH4AAD+AgAwAYAH4AAB8BjAggYwHwAAD/hCAhgYwHwAAB8BjAhgQgP+AAD+AwAwAAAGIFkCaBGAAAQA/wEMAAB+ABgAwAQH8AABwAOABwDgHAAABwAOABwDgAcA4BwAAAYwGwBwBsBjAAAfgAaAJANh/gAARwJoFkDiAAAIA7ggIAAP+AACAg7gCAAACACABAAQAIAIAAAAAAAAAAAA=="), 32, atob("AwIEBgYIBgIEBAUGAwUDBAYEBgYGBgYGBgYEBQYFBgYLBwcHBwcGBwcEBQcGCAcHBwcHBgYHBwkHBwcDBAMHBwMGBgYGBgUGBgIEBgIIBgYGBgQFBAYGCAYGBQQCBAc="), 256 + 13);
};
Graphics.prototype.setFontAgency=function(scale){this.setFontCustom(atob("AAAAAAAAAAD/kAAAAADwAAAA8AAAAAAAEIB/4BCAEIB/4BCAAAB4cIQQ//iCEOHgAAD8AIQw/EABgAYAGAAj8MIQA/AAAPHwihCEEIAQ5/AEEAAAAADwAAAAB4A4cMAMAAAAAMAMOHAHgAAAUAAgAPgAIABQAAAAAgACAA+AAgACAAAAAAAAOAAAAQABAAEAAQAAAAAwAAAAAABwAYAGABgA4AAAAP/wgBCAEIAQ//AAAP/wAADx8IIQhBCIEPAQAADw8IAQhBCKEPHwAAD/gACAAIAf8ACAAAD48IgQiBCIEI/wAAD/8IQQhBCEEOfwAADAAIAAh/CIAPAAAAD78IQQhBCEEPvwAAD+cIIQghCCEP/wAAAGMAAAAAAGOAAAAAAGABmAYGAAAASABIAEgASABIAAAGBgGYAGAAAA8ACAAIewiADwAAAA//CAEL+QoJCgkL+QgJD/kAAA//CEAIQAhAD/8AAA//CEEIQQhBD78AAA//CAEIAQgBDg8AAA//CAEIAQgBB/4AAA//CEEIQQhBCAEAAA//CEAIQAhACAAAAA//CAEIQQhBDn8AAA//AEAAQABAD/8AAA//AAAADwABAAEAAQ//AAAP/wCAAUACIAwfAAAP/wABAAEAAQAAD/8DAADAAwAP/wAAD/8DAADAADAP/wAAB/4IAQgBCAEH/gAAD/8IIAggCCAP4AAAB/4IAQgFCAMH/wAAD/8IIAgwCCgP5wAADw8IgQhBCCEPHwAACAAIAA//CAAIAAAAD/8AAQABAAEP/wAAD/AADAADAAwP8AAAD/AADwBwAA8P8AAADg8BsABAAbAODwAADgABgAB/AYAOAAAACAcIGQhhCYEOAQAAD//IAEgAQAAOAAGAAGAAGAAHAAAIAEgAT//AAAMADAADAAAAAAAgACAAIAAgAAwABgAAAADfAJEAkQD/AAAP/wCBAIEA/wAAAP8AgQCBAOcAAAD/AIEAgQ//AAAA/wCRAJEA8wAAAIAP/wiAAAAA/2CBIIEg/+AAD/8AgACAAP8AAAb/AAAAACb/4AAP/wAYAGYAgQAAD/8AAAD/AIAA/wCAAP8AAAD/AIAAgAD/AAAA/wCBAIEA/wAAAP/ggQCBAP8AAAD/AIEAgQD/4AAA/wCAAIAA4AAAAOcAkQCJAMcAAACAB/8AgQAAAP8AAQABAP8AAADAADwAAwA8AMAAAAD8AAcAHAAHAPwAAADnABgAGADnAAAA/gACIAIg/+AAAMcAiQCRAOMAAAAgB9+IAEgAQAAP/+AACABIAEffgCAAAAAAAAAAAAgAD/8AAAAAA="), 32, atob("AwMFCAYKBwMFBAYGAwUDBgYCBgYGBgYGBgYDAwQGBAYJBgYGBgYGBgYCBgYFBgYGBgYGBgYGBgYGBgYEBgQEBQMFBQUFBQQFBQIDBQIGBQUFBQUFBAUGBgUFBQUCBQYB"), 16+(scale << 8)+(1 << 16));};

let motd = "I do hurl kegs..";
function clock() {
  g.clear().setFontAlign(0,-1);
  let dt = Date().toString();
  let offset = 9;
  if(dt[offset]!=' ') offset++;
  let tm = dt.substring(offset+6,offset+11);
  let sec = dt.substring(offset+12,offset+14);
  dt = dt.substring(0,offset);
  g.setFontAgency();
  g.setColor(1);
  g.fillRect(0,0,127,16);
  g.setColor(0);
  g.drawString(dt, 64, 3);
  g.setColor(1);
  g.drawString(motd, 64, 110);
  /*g.setFont("Agency",2);
  g.setFontAlign(1,1);
  g.drawString(sec, 124, 92);
  */
  //g.setFontATC();
  //g.drawString(tm, 64,32);
  g.setFont("Agency",4);
  g.setFontAlign(0,1);
  g.drawString(tm, 64, 100);
  g.flip();
}
