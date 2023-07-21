function init() {
  g.setFontOmnigo = function() {
      this.setFontCustom( atob("AAAAAAAAB/QAAcAAAHAAAAKAPgCgD4AoAAAZgWQf8E0DMAAAQwUwKwC0A1AygwgAAM4LmE5BnAGwAAcAAAB8DjhAQAAQEOOB8AAAqAOAHAFQAAAQAIAfACABAAAABoA4AACABAAgAQAAAAYAMAAAHAeB4AAAP4MWERDRg/gAAIAP+AAAAAhwxoRkNiDhAAAggwYRENmDeAAAHAOgMQP+AEAAB4gkYSEJmEeAAA/g2YSEJmAeAABAAg4RwLgHAAAA3g2YRENmDeAAA8AzIQkM2D+AAAAAMwGYAAAAAzQZwAAAAAgA4A2AxgQQAABQAoAUAKAAAIIGMBsAcAEAAAIAMAEdDYA4AAAHwGMGDCchbQooXkEYDEA8AAAB4HwOIB0AOABwAAf8IiERCYg8wDwAAH8GDCAhAQwYIIAAH/CAhAQwIMMD8AAD/hEQiIREICAAD/hEAiARAIAAAB/BgwgIREMmCeAAB/wCABAAgAQD/gAAAAf8AAAAABAAwAIf4AAH/AYAeAZgYYIGAAD/gAQAIAEACAAD/gwAGABwBgDAD/gAA/4MABgAYADB/wAAP4MGEBCAhgwfwAAP+EICEBCAzAPAAAD+DBhBQg4YMH+AAAAB/wjARwIsGzBwgAAYQWMJiGbBHAAAgAQAP+EACAAAA/wAMACADADB/wAAeAB4AHAOAcA4AAAPAA4AHgeADAAcB4HgAABgwYwDgBwDGDBgAA4AHAA+AwBwBgAAAQcIaEZCYhYQ4IAAP+EBAAB4AHAA8AAEBD/gAAIAMAMAGABgAQAAAAEACABAAgAQAIAAMADAAAADgLYFEDiA/AAB/wEIGEDGA+AAAPgMYEEDGAiAAAPgMYGEBCH/AAAPgNYEkDSA4AAAIAf4aAIAAAAfAY0ISEbD/AAD/gMAMAGAB+AAC/gAAACADL/AAD/gGAHgGYCGAAD/gAAP4GACAA/AwAQAH4AAD+AgAwAYAH4AAB8BjAggYwHwAAD/hCAhgYwHwAAB8BjAhgQgP+AAD+AwAwAAAGIFkCaBGAAAQA/wEMAAB+ABgAwAQH8AABwAOABwDgHAAABwAOABwDgAcA4BwAAAYwGwBwBsBjAAAfgAaAJANh/gAARwJoFkDiAAAIA7ggIAAP+AACAg7gCAAACACABAAQAIAIAAAAAAAAAAAA==")
  , 32, atob("AwIEBgYIBgIEBAUGAwUDBAYEBgYGBgYGBgYEBQYFBgYLBwcHBwcGBwcEBQcGCAcHBwcHBgYHBwkHBwcDBAMHBwMGBgYGBgUGBgIEBgIIBgYGBgQFBAYGCAYGBQQCBAc="), 256 + 13);
  };
  g.setFont("Omnigo");

  /*
  ** BEGIN WATCH FACE
  */
  /*
  ROTATION
  let cy = (m) => {
  return Math.floor(Math.cos(Math.PI * m/30) * -80);
  };

  let cx = (m) => {
  return Math.floor(Math.sin(Math.PI * m/30) * 80);
  };
  */              


const startX=[-4,29,62,95],startY=[48,48,48,48];
optFilled = true;
const hht = 20;
const vht = 30;
 
function Poly(arr, fill) {
  if (fill) g.fillPoly(arr, true);
  else g.drawPoly(arr, true);
}

function drawVertSeg(x, y) {
  let d = 4;
  Poly([x, y, x+d, y+d, x+d, y+vht-d, x, y+vht, x-d, y+vht-d, x-d, y+d], optFilled);

  g.drawLine(x, y, x, y+vht);
}

function drawHorizSeg(x, y) {
  let d = 4;
  Poly([x, y, x+d, y-d, x+hht-d, y-d, x+hht, y, x+hht-d, y+d, x+d, y+d], optFilled);

  g.drawLine(x, y, x+hht, y);
}

function drawSegments(slot, val) {
let xOff = startX[slot];
let yOff = startY[slot];
if (val != 1 && val != 4)
  drawHorizSeg(xOff, yOff);
if (val != 1 && val != 2 && val != 3 && val != 7)
  drawVertSeg(xOff, yOff+1);
if (val != 5 && val != 6)
  drawVertSeg(xOff+hht, yOff+1);
if (val != 0 && val !=1 && val != 7)
  drawHorizSeg(xOff, yOff+vht+2);
if (val == 0 || val == 2 || val == 6 || val == 8)
  drawVertSeg(xOff, yOff+vht+2);
if (val != 2 )
  drawVertSeg(xOff+hht, yOff+vht+2);
if (val != 1 && val != 4 && val != 7)
  drawHorizSeg(xOff, yOff+vht*2+3);
}

/***********
Shared bits
************/
let drawBkgd = () => {
  g.setBgColor("#260a00");
  let img = _S.read("wbkgd.png");
  if(img) g.drawImage(img, 0, 0);
}

let drawClock = (d) => {
  g.clearRect(10,30,118,114);
  console.log("DrawClock: time to draw");
  rotate = false;
  g.setColor("#c0a000");
  drawSegments(1,d.hr%10);
  if(!Math.floor(d.hr/10))  
    g.setColor("#260a00");
  drawSegments(0,1);
  g.setColor(_C.WHITE);
  drawSegments(2,Math.floor(d.min/10)); //52);
  drawSegments(3,Math.floor(d.min%10)); //52);
}

let drawData = (d) => {
    // STATUS
  g.setFontAlign(0,-1).setColor("#909800");
  let batt = E.getBattery(); //process.env.VERSION; //battInfo();
  for(let x=0; x<5; x++) {
    if(batt < x*20) g.setColor("#404000");
    g.fillRect(25+x*17,124,x*17+38,127);
  }
  //g.clearRect(30, 133, 100, 146);
  g.setColor("#D0C000").setFontAlign(0,-1).drawString(` ${d.niceDate} `,_C.XMID,135,true);
  
  // MID BAR 
  /*
  let steps = Bangle.getStepCount();
  g.setColor("#6161ea")
  for(let x=0; x<10; x++) {
    if(steps < x*1000) g.setColor("#808080");
    g.fillRect(x*5+1,83,x*5+4,85);
  }
  g.setColor(0.8,1,0.9).setFontAlign(1,1).drawString(steps, _C.XWID, 87,true);
  */
};
/*
lgfont = require("QuickL.js");
smfont = require("QuickS.js");

let x1 = 8, x2 = 8, x3 = 48, x4 = 62;
let xh1 = -10, xh2 = 18;

let drawCoolClock = (d) => {
  if(Date().getFullYear() < 2000) showAlarm('','TIME IS NOT SET')
  g.clearRect(0,0,79,79);
  console.log("DrawCoolClock: time to draw");
  g.setColor(_C.CYAN);
  if(Math.floor(d.hr/10) > 0) {
    g.drawImage(lgfont.getDigit(1),xh1,22); 
    g.drawImage(lgfont.getDigit(d.hr%10),xh2,22); //52);
  } else {
    g.drawImage(lgfont.getDigit(d.hr),x2,22); //52);
  }
  g.setColor(_C.WHITE);
  g.drawImage(smfont.getDigit(Math.floor(d.min/10)), x3,22); //52);
  g.drawImage(smfont.getDigit(d.min%10), x4,22); //52);
  drawThings(d);
}
*/
let showMsg = (title, msg) => {  
  g.setFont("Omnigo");
  g.setColor("#000000");
  g.fillRect(0,160,_C.XWID-1,_C.YHT-1);
  g.setColor("#CCCCCC");
  g.setFontAlign(0,-1);
  let y = 168;
  let mstr = ''; 
  msg.split(' ').forEach((w)=>{
    if(g.stringWidth(mstr+w) > _C.XWID || w == '|') {
      g.drawString(mstr, _C.XMID, y);
      mstr='';
      y+=g.getFontHeight();
    }
    if(w != '|') mstr += w + ' ';
  });
  g.drawString(mstr, _C.XMID, y);
};

return { 
  drawClock: drawClock,
  drawBkgd: drawBkgd,
  drawData: drawData,
  showMsg: showMsg,
};
}
exports = init();
/*
const _C = {
CYAN: "#80FFFF",
WHITE: "#FFFFFF",
YHT: g.getHeight(),
XWID: 130,
XMID: 130/2, 
YMID: g.getHeight()/2,
};
D12.set();
exports.drawBkgd();
let dt = {hr:12, min:35, niceDate: "Sun Jul 12"};
exports.drawClock(dt);
exports.drawData(dt);
exports.showMsg("Title","This would be message 1");
*/