function init() {
  
  g.setFontOmnigo = function() {
      this.setFontCustom( atob("AAAAAAAAB/QAAcAAAHAAAAKAPgCgD4AoAAAZgWQf8E0DMAAAQwUwKwC0A1AygwgAAM4LmE5BnAGwAAcAAAB8DjhAQAAQEOOB8AAAqAOAHAFQAAAQAIAfACABAAAABoA4AACABAAgAQAAAAYAMAAAHAeB4AAAP4MWERDRg/gAAIAP+AAAAAhwxoRkNiDhAAAggwYRENmDeAAAHAOgMQP+AEAAB4gkYSEJmEeAAA/g2YSEJmAeAABAAg4RwLgHAAAA3g2YRENmDeAAA8AzIQkM2D+AAAAAMwGYAAAAAzQZwAAAAAgA4A2AxgQQAABQAoAUAKAAAIIGMBsAcAEAAAIAMAEdDYA4AAAHwGMGDCchbQooXkEYDEA8AAAB4HwOIB0AOABwAAf8IiERCYg8wDwAAH8GDCAhAQwYIIAAH/CAhAQwIMMD8AAD/hEQiIREICAAD/hEAiARAIAAAB/BgwgIREMmCeAAB/wCABAAgAQD/gAAAAf8AAAAABAAwAIf4AAH/AYAeAZgYYIGAAD/gAQAIAEACAAD/gwAGABwBgDAD/gAA/4MABgAYADB/wAAP4MGEBCAhgwfwAAP+EICEBCAzAPAAAD+DBhBQg4YMH+AAAAB/wjARwIsGzBwgAAYQWMJiGbBHAAAgAQAP+EACAAAA/wAMACADADB/wAAeAB4AHAOAcA4AAAPAA4AHgeADAAcB4HgAABgwYwDgBwDGDBgAA4AHAA+AwBwBgAAAQcIaEZCYhYQ4IAAP+EBAAB4AHAA8AAEBD/gAAIAMAMAGABgAQAAAAEACABAAgAQAIAAMADAAAADgLYFEDiA/AAB/wEIGEDGA+AAAPgMYEEDGAiAAAPgMYGEBCH/AAAPgNYEkDSA4AAAIAf4aAIAAAAfAY0ISEbD/AAD/gMAMAGAB+AAC/gAAACADL/AAD/gGAHgGYCGAAD/gAAP4GACAA/AwAQAH4AAD+AgAwAYAH4AAB8BjAggYwHwAAD/hCAhgYwHwAAB8BjAhgQgP+AAD+AwAwAAAGIFkCaBGAAAQA/wEMAAB+ABgAwAQH8AABwAOABwDgHAAABwAOABwDgAcA4BwAAAYwGwBwBsBjAAAfgAaAJANh/gAARwJoFkDiAAAIA7ggIAAP+AACAg7gCAAACACABAAQAIAIAAAAAAAAAAAA==")
  , 32, atob("AwIEBgYIBgIEBAUGAwUDBAYEBgYGBgYGBgYEBQYFBgYLBwcHBwcGBwcEBQcGCAcHBwcHBgYHBwkHBwcDBAMHBwMGBgYGBgUGBgIEBgIIBgYGBgQFBAYGCAYGBQQCBAc="), 256 + 13);
  };
  g.setFont("Omnigo");

  let LF = {
    xS: 4,
    yS: 6,
    sp: 2,

    drawChar: (arr, xOff, yOff) => {
    if(!arr) return;
    let newArr = [];
    for(let idx = 0; idx < arr.length; idx++) {
      let x = Math.floor(arr[idx]/10);
      let y = arr[idx]%10;
      newArr.push(x*LF.xS+xOff, y*LF.yS+yOff);
    }
    g.drawPoly(newArr, false);
  },

    setScale: (xs, ys) => {
      LF.xS = xs/2;
      LF.yS = ys/2;
    },

    setSpacing: (s) => { LF.sp = s; },

    drawString: (str, x, y) => {
      let _lf_ch = {
        "A":new Uint8Array([2,01,10,21,1,21,22]),
        "C":new Uint8Array([20,10,1,12,22]),
        "B":new Uint8Array([0,10,11,1,21,22,02,0]),
        "D":new Uint8Array([0,10,21,12,2,0]),
        "E":new Uint8Array([20,0,1,11,1,2,22]),
        "F":new Uint8Array([20,0,1,11,1,2]),
        "G":new Uint8Array([21,22,2,0,20]),
        "H":new Uint8Array([0,2,1,21,20,22]),
        "I":new Uint8Array([0,20,10,12,02,22]),
        "J":new Uint8Array([20,22,2,1]),
        "K":new Uint8Array([0,2,1,11,20,11,22]),
        "L":new Uint8Array([0,2,22]),
        "M":new Uint8Array([2,0,11,20,22]),
        "N":new Uint8Array([2,0,22,20]),
        "O":new Uint8Array([0,20,22,2,0]),
        "P":new Uint8Array([2,0,20,21,1]),
        "Q":new Uint8Array([22,2,0,20,22,11]),
        "R":new Uint8Array([2,0,20,21,1,11,22]),
        "S":new Uint8Array([20,0,1,21,22,02]),
        "T":new Uint8Array([0,20,10,12]),
        "U":new Uint8Array([0,2,22,20]),
        "V":new Uint8Array([0,12,20]),
        "W":new Uint8Array([0,2,11,22,20]),
        "X":new Uint8Array([0,22,11,20,2]),
        "Y":new Uint8Array([0,11,20,11,12]),
        "Z":new Uint8Array([0,20,02,22]),

        "0":new Uint8Array([2,0,20,22,02,20]),
        "1":new Uint8Array([10,12]),
        "2":new Uint8Array([0,20,21,1,2,22]),
        "3":new Uint8Array([0,20,21,01,21,22,02]),
        "4":new Uint8Array([0,1,21,20,22]),
        "5":new Uint8Array([20,0,1,21,22,2]),
        "6":new Uint8Array([20,0,1,21,22,2,1]),
        "7":new Uint8Array([0,20,11,12]),
        "8":new Uint8Array([0,20,22,2,0,1,21]),
        "9":new Uint8Array([21,1,0,20,22,2]),
        ",":new Uint8Array([11,12,2]),
        ".":new Uint8Array([11,12]),
        "!":new Uint8Array([0,10,2,0]),
        " ":new Uint8Array([11,11]),
        };
      let xOff = x;
      str = str.toUpperCase();
      for(let idx = 0; idx < str.length; idx++ ) {
        //console.log((1+xS)*idx);
        LF.drawChar(_lf_ch[str[idx]], xOff, y);
        xOff += LF.sp +LF.xS*2;
        if(xOff > 239) break;
      }
    },
  };

  //g.setRotation(1, false);
  const startX=[-25,45,110,180],startY=[60,60,60,60];
  optFilled = true;
  const hht = 50;
  const vht = 50;

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
    g.setBgColor(0);
  }

  let drawClock = (d) => {
    g.clearRect(0,0,239,180);
    rotate = false;
    g.setColor(0,1,1);
    drawSegments(1,d.hr%10);
    if(!Math.floor(d.hr/10))  
      g.setColor(0);
    drawSegments(0,1);
    g.setColor(1,1,1);
    drawSegments(2,Math.floor(d.min/10)); //52);
    drawSegments(3,Math.floor(d.min%10)); //52);
  }

  let drawData = (d) => {
      // STATUS
    //g.setFontAlign(0,-1).setColor("#909800");
    let batt = E.getBattery(); //process.env.VERSION; //battInfo();
    g.setColor("#a0a0a0");
    for(let x=0; x<5; x++) {
      if(batt < x*20) 
        g.drawRect( 86+x*16,6,96+x*16, 9);
      else
        g.fillRect( 86+x*16,6,96+x*16, 9);  
    }
    g.setColor(_C.DATA_BRIGHT).setFontAlign(0,-1);
    LF.drawString(d.niceDate,72,30);
  }

  let showMsg = (title, msg) => {  
  // g.setFont("Omnigo");
    g.setBgColor(_C.BKGD);
    let y = 172;
    g.clearRect(0, y,_C.XWID-1,_C.YHT-1).flip();
    g.setColor(_C.DATA_BRIGHT);
    g.setFontAlign(0,-1);
    let mstr = ''; 
    y+= 8;
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

  let stop = () => {
  };
  
  return { 
    drawClock: drawClock,
    drawBkgd: drawBkgd,
    drawData: drawData,
    showMsg: showMsg,
    stop: stop,
  };
}
exports = init();

const _C = {
CYAN: "#80FFFF",
WHITE: "#FFFFFF",
  FRGD: "#E0E0FF",
  BKGD: "#000000",
  DATA_BRIGHT: "#F0F080",
YHT: g.getHeight(),
XWID: g.getWidth(),
XMID: g.getWidth()/2, 
YMID: g.getHeight()/2,
};
wOS.BLK.set();
exports.drawBkgd();
let dt = {hr:12, min:35, niceDate: "Sun Jul 12"};
exports.drawClock(dt);
exports.drawData(dt);
exports.showMsg("Title","This would be message 1");
