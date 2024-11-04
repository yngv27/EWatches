let exports={};
  g.setFontDefault = function () {
    this.setFontCustom(atob("AAAAAAAAB/QAAcAAAHAAAAKAPgCgD4AoAAAZgWQf8E0DMAAAQwUwKwC0A1AygwgAAM4LmE5BnAGwAAcAAAB8DjhAQAAQEOOB8AAAqAOAHAFQAAAQAIAfACABAAAABoA4AACABAAgAQAAAAYAMAAAHAeB4AAAP4MWERDRg/gAAIAP+AAAAAhwxoRkNiDhAAAggwYRENmDeAAAHAOgMQP+AEAAB4gkYSEJmEeAAA/g2YSEJmAeAABAAg4RwLgHAAAA3g2YRENmDeAAA8AzIQkM2D+AAAAAMwGYAAAAAzQZwAAAAAgA4A2AxgQQAABQAoAUAKAAAIIGMBsAcAEAAAIAMAEdDYA4AAAHwGMGDCchbQooXkEYDEA8AAAB4HwOIB0AOABwAAf8IiERCYg8wDwAAH8GDCAhAQwYIIAAH/CAhAQwIMMD8AAD/hEQiIREICAAD/hEAiARAIAAAB/BgwgIREMmCeAAB/wCABAAgAQD/gAAAAf8AAAAABAAwAIf4AAH/AYAeAZgYYIGAAD/gAQAIAEACAAD/gwAGABwBgDAD/gAA/4MABgAYADB/wAAP4MGEBCAhgwfwAAP+EICEBCAzAPAAAD+DBhBQg4YMH+AAAAB/wjARwIsGzBwgAAYQWMJiGbBHAAAgAQAP+EACAAAA/wAMACADADB/wAAeAB4AHAOAcA4AAAPAA4AHgeADAAcB4HgAABgwYwDgBwDGDBgAA4AHAA+AwBwBgAAAQcIaEZCYhYQ4IAAP+EBAAB4AHAA8AAEBD/gAAIAMAMAGABgAQAAAAEACABAAgAQAIAAMADAAAADgLYFEDiA/AAB/wEIGEDGA+AAAPgMYEEDGAiAAAPgMYGEBCH/AAAPgNYEkDSA4AAAIAf4aAIAAAAfAY0ISEbD/AAD/gMAMAGAB+AAC/gAAACADL/AAD/gGAHgGYCGAAD/gAAP4GACAA/AwAQAH4AAD+AgAwAYAH4AAB8BjAggYwHwAAD/hCAhgYwHwAAB8BjAhgQgP+AAD+AwAwAAAGIFkCaBGAAAQA/wEMAAB+ABgAwAQH8AABwAOABwDgHAAABwAOABwDgAcA4BwAAAYwGwBwBsBjAAAfgAaAJANh/gAARwJoFkDiAAAIA7ggIAAP+AACAg7gCAAACACABAAQAIAIAAAAAAAAAAAA==")
      , 32, atob("AwIEBgYIBgIEBAUGAwUDBAYEBgYGBgYGBgYEBQYFBgYLBwcHBwcGBwcEBQcGCAcHBwcHBgYHBwkHBwcDBAMHBwMGBgYGBgUGBgIEBgIIBgYGBgQFBAYGCAYGBQQCBAc="), 256 + 13);
  };


  g.setFont("Default");

let start = () => {
  g.setBgColor("#141414").clear();
  //g.setColor(0).fillCircle(120,120,120);
  g.setColor("#181818");
  g.fillPoly([ 120,120, 240,0, 240,240]); //, 239,180, 180,180 ]);
  g.setColor("#404040");
  g.drawLine(60,60,180,180).drawLine(60,180,180,60);
  g.setColor(-1);
  //g.setFontVector(40).setFontAlign(1,0);
};
exports.start = start;
//_S=require("Storage");
function getDigit54(d) {
  return(_S.read("Urbanist54",
    [0, 804, 1224, 1956, 2640, 3372, 4104, 4860, 5640, 6348, ][d],
    [804, 420, 732, 684, 732, 732, 756, 780, 708, 756, ][d]));
}
function getDigit18(d) {
   return(_S.read("Urbanist18",
      [0, 124, 200, 308, 416, 524, 640, 756, 872, 988, ][d],
      [124, 76, 108, 108, 108, 116, 116, 116, 116, 116, ][d]));
}

function getWidth(d) {
  return(getDigit18(d)[0].charCodeAt(0));
}
let rotatePoly = (pArr, angle, xoff, yoff) => {
  let newArr = [];
  let a = angle;// * pRad;
  for(let i=0; i<pArr.length ; i+= 2) {
    newArr[i] = xoff + Math.cos(a)*pArr[i] + Math.sin(a)*pArr[i+1];
    newArr[i+1] = yoff + Math.sin(a)*pArr[i] - Math.cos(a)*pArr[i+1];
  }
  return newArr;
};
let r1 = 4, r3 = 5, rh = 25;
let tik=[ 0,29, 0,32];
let needle = [ 0-r1,rh-8,  0-r1,rh, 0,r3+rh, r1,rh, r1,rh-8 ];
function gauge(num, pct, x, y) {
  ///g.drawImage(_S.read("gauge.png"), x, y, {rotate: 0});
  g.setColor(0).fillCircle(x,y,32);
  if(pct > 100) pct=100;
  if(pct < 0) pct=0;
  let ang = pct/100 * Math.PI -Math.PI/2;
  //g.drawImage(_S.read("needle.png"), x,y, {rotate: a, scale: 2});
  g.setColor("#808080");
  for(let a=0; a<=100; a+=12.5) g.drawPolyAA(rotatePoly(tik, a/100*Math.PI-Math.PI/2, x, y));
  g.setColor("#c0c0c0");
  g.fillPolyAA(rotatePoly(needle, ang, x, y), true);
  let w = 0, ds = [];
  for(let i=0; i<5; i++) {
    ds.unshift(num % 10);
    w += getWidth(num %10);
    num = Math.floor(num / 10);
    if(num <= 0) break; // skip leading zeroes
  }
  //print("Width is "+w+"; ds = " + ds);
  x-=w/2-1; y+=4;
  ds.forEach((d)=>{
    let img=getDigit18(d);
    g.drawImage(img,x,y);
    x+= img[0].charCodeAt(0);
  });
}

exports.drawClock=(dt)=> {
  let tm=dt.hr.toString().padStart(2,'0')+':'+dt.min.toString().padStart(2,'0'); //Date().toString().substring(16,21);
  //print(tm);
  g.setColor("#181818");
  g.fillPoly([ 121,120, 239,0, 239,239]); //, 239,180, 180,180 ]);

  let x = 230; let y = 120;
  for(let i=4; i>=0; i--) {
    if(i == 2) { x=230; y-= 44; continue;}
    let img = getDigit54(tm[i]);
    x-= img.charCodeAt(0);
    g.drawImage(img, x, y);
    print(`x=${x} y=${y} i=${i} tm=${tm[i]}`);
  }
};

exports.drawData = (dat)=>{
  g.setColor("#141414");
  g.fillPoly([ 120,119, 239,0, 1,0]);
  let bat = E.getBattery();
  gauge(bat,bat, 120, 48);
  gauge(wOS.getStepCount(), Math.floor(wOS.getStepCount()/100), 120, 192);
  let d=new Date();
  gauge(d.getDate(), d.getDay()/6*100, 48, 120);
};

exports.showMsg = (msgobj) => {
  g.setColor("#141414");
  g.fillPoly([ 120,119, 239,0, 1,0]).setColor("#c0c0c0");
  
  g.setFont("Default"); //"6x8");
  g.setFontAlign(0,0);
  g.drawString(g.wrapString(msgobj.text, 96).join("\n"),120, 48);
};
_S=require("Storage");

if(process.env.BOARD == "EMSCRIPTEN") {
  wOS = { getStepCount: ()=>{return(3456);} };
} else {
  wOS.wake();
}
exports.start();
//*
let dt = { hr: 4, min: 1, niceDate: "Sun Jul 12" };
exports.drawClock(dt);
exports.drawData(dt);
exports.showMsg({title:"Title", text:"This would be message 1"});
//*/

if(typeof(TC) != "undefined") {
  TC.on("touch", (p) => {
    if(p.x > 80 && p.x < 160 && p.y < 100) {
      showBits();
      setTimeout(start, 60*1000);
    }
  });
}