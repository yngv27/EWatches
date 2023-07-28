function init() {
  const _C = {
    CYAN: "#80FFFF",
    WHITE: "#FFFFFF",
    YHT: g.getHeight(),
    XWID: 130,
    XMID: 130 / 2,
    YMID: g.getHeight() / 2,
  };

  g.setFontOmnigo = function () {
    this.setFontCustom(atob("AAAAAAAAB/QAAcAAAHAAAAKAPgCgD4AoAAAZgWQf8E0DMAAAQwUwKwC0A1AygwgAAM4LmE5BnAGwAAcAAAB8DjhAQAAQEOOB8AAAqAOAHAFQAAAQAIAfACABAAAABoA4AACABAAgAQAAAAYAMAAAHAeB4AAAP4MWERDRg/gAAIAP+AAAAAhwxoRkNiDhAAAggwYRENmDeAAAHAOgMQP+AEAAB4gkYSEJmEeAAA/g2YSEJmAeAABAAg4RwLgHAAAA3g2YRENmDeAAA8AzIQkM2D+AAAAAMwGYAAAAAzQZwAAAAAgA4A2AxgQQAABQAoAUAKAAAIIGMBsAcAEAAAIAMAEdDYA4AAAHwGMGDCchbQooXkEYDEA8AAAB4HwOIB0AOABwAAf8IiERCYg8wDwAAH8GDCAhAQwYIIAAH/CAhAQwIMMD8AAD/hEQiIREICAAD/hEAiARAIAAAB/BgwgIREMmCeAAB/wCABAAgAQD/gAAAAf8AAAAABAAwAIf4AAH/AYAeAZgYYIGAAD/gAQAIAEACAAD/gwAGABwBgDAD/gAA/4MABgAYADB/wAAP4MGEBCAhgwfwAAP+EICEBCAzAPAAAD+DBhBQg4YMH+AAAAB/wjARwIsGzBwgAAYQWMJiGbBHAAAgAQAP+EACAAAA/wAMACADADB/wAAeAB4AHAOAcA4AAAPAA4AHgeADAAcB4HgAABgwYwDgBwDGDBgAA4AHAA+AwBwBgAAAQcIaEZCYhYQ4IAAP+EBAAB4AHAA8AAEBD/gAAIAMAMAGABgAQAAAAEACABAAgAQAIAAMADAAAADgLYFEDiA/AAB/wEIGEDGA+AAAPgMYEEDGAiAAAPgMYGEBCH/AAAPgNYEkDSA4AAAIAf4aAIAAAAfAY0ISEbD/AAD/gMAMAGAB+AAC/gAAACADL/AAD/gGAHgGYCGAAD/gAAP4GACAA/AwAQAH4AAD+AgAwAYAH4AAB8BjAggYwHwAAD/hCAhgYwHwAAB8BjAhgQgP+AAD+AwAwAAAGIFkCaBGAAAQA/wEMAAB+ABgAwAQH8AABwAOABwDgHAAABwAOABwDgAcA4BwAAAYwGwBwBsBjAAAfgAaAJANh/gAARwJoFkDiAAAIA7ggIAAP+AACAg7gCAAACACABAAQAIAIAAAAAAAAAAAA==")
      , 32, atob("AwIEBgYIBgIEBAUGAwUDBAYEBgYGBgYGBgYEBQYFBgYLBwcHBwcGBwcEBQcGCAcHBwcHBgYHBwkHBwcDBAMHBwMGBgYGBgUGBgIEBgIIBgYGBgQFBAYGCAYGBQQCBAc="), 256 + 13);
  };
  g.setFont("Omnigo");

  /*
  ** BEGIN WATCH FACE
  */
  const startX = [18, 86, 18, 86];
  const startY = [32, 32, 138, 138];

  const w = 60;
  const h = 90;

  const xyScale = 0.75;
  const fillDigits = true;

  let lastH1 = -1;
  let lastH2 = -1;
  let lastM1 = -1;
  let lastM2 = -1;

  let setFG = (c) => { g.setColor("#FFFFFF"); };
  let setBG = (c) => { g.setColor(0); };

  function scaleArray(arrOrig) {
    let scaled = [];
    for (let i = 0; i < arrOrig.length; i++) {
      scaled.push(arrOrig[i] * xyScale);
    }
    return scaled;
  }
  function ellipse(x1, y1, x2, y2, fill) {
    if (fill) g.fillEllipse(x1 * xyScale, y1 * xyScale, x2 * xyScale, y2 * xyScale);
    else g.drawEllipse(x1 * xyScale, y1 * xyScale, x2 * xyScale, y2 * xyScale);
  }

  function poly(arr, fill) {
    let sarr = scaleArray(arr);
    if (fill) g.fillPoly(sarr, true);
    else g.drawPoly(sarr, true);
  }

  function rect(x1, y1, x2, y2, fill) {
    if (fill) g.fillRect(x1 * xyScale, y1 * xyScale, x2 * xyScale, y2 * xyScale);
    else g.drawRect(x1 * xyScale, y1 * xyScale, x2 * xyScale, y2 * xyScale);
  }


  /** DIGITS **/

  /* zero */
  function draw0(xOrig, yOrig) {
    setFG();
    ellipse(xOrig, yOrig, xOrig + w, yOrig + h, fillDigits);
    if (fillDigits) setBG();
    ellipse(xOrig + 15, yOrig + 15, xOrig + w - 15, yOrig + h - 15, fillDigits);
  }

  /* one */
  function draw1(xOrig, yOrig) {
    setFG();
    poly([xOrig + w / 2 - 6, yOrig,
    xOrig + w / 2 - 12, yOrig,
    xOrig + w / 2 - 20, yOrig + 12,
    xOrig + w / 2 - 6, yOrig + 12
    ], fillDigits);
    rect(xOrig + w / 2 - 6, yOrig, xOrig + w / 2 + 6, yOrig + h - 3, fillDigits);

  }

  /* two */
  function draw2(xOrig, yOrig) {
    setFG();
    ellipse(xOrig, yOrig, xOrig + 56, yOrig + 56, fillDigits);
    if (fillDigits) setBG();
    ellipse(xOrig + 13, yOrig + 13, xOrig + 43, yOrig + 43, fillDigits);

    setBG();
    rect(xOrig, yOrig + 27, xOrig + 40, yOrig + 61, true);

    setFG();
    poly([xOrig, yOrig + 88,
      xOrig + 56, yOrig + 88,
      xOrig + 56, yOrig + 75,
      xOrig + 25, yOrig + 75,
      xOrig + 46, yOrig + 50,
      xOrig + 42, yOrig + 36
    ], fillDigits);
  }

  /* three */
  function draw8(xOrig, yOrig) {
    setFG();
    ellipse(xOrig + 3, yOrig, xOrig + 53, yOrig + 46, fillDigits);
    ellipse(xOrig, yOrig + 33, xOrig + 56, yOrig + 89, fillDigits);
    if (fillDigits) setBG();
    ellipse(xOrig + 17, yOrig + 13, xOrig + 40, yOrig + 33, fillDigits);
    ellipse(xOrig + 13, yOrig + 46, xOrig + 43, yOrig + 76, fillDigits);
  }

  function draw3(xOrig, yOrig) {
    draw8(xOrig, yOrig);
    setBG();
    rect(xOrig, yOrig + 24, xOrig + 24, yOrig + 61, true);
  }

  /* four */
  function draw4(xOrig, yOrig) {
    setFG();
    rect(xOrig + 8, yOrig + 54, xOrig + w - 4, yOrig + 67, fillDigits);
    rect(xOrig + 36, yOrig + 12, xOrig + 49, yOrig + 88, fillDigits);
    poly([xOrig, yOrig + 67,
      xOrig + 12, yOrig + 67,
      xOrig + 49, yOrig + 12,
      xOrig + 49, yOrig + 1,
      xOrig + 42, yOrig + 1
    ], fillDigits);
  }

  function draw5(xOrig, yOrig) {
    setFG();
    ellipse(xOrig, yOrig + 33, xOrig + 56, yOrig + 89, fillDigits);
    if (fillDigits) setBG();
    ellipse(xOrig + 13, yOrig + 46, xOrig + 43, yOrig + 76, fillDigits);

    setBG();
    rect(xOrig, yOrig + 24, xOrig + 19, yOrig + 61, true);

    setFG();
    poly([xOrig + 20, yOrig + 1,
    xOrig + 7, yOrig + 47,
    xOrig + 19, yOrig + 47,
    xOrig + 32, yOrig + 1
    ], fillDigits);
    rect(xOrig + 20, yOrig + 1, xOrig + 53, yOrig + 13, fillDigits);
  }

  /* six */
  function draw6(xOrig, yOrig) {
    setFG();
    ellipse(xOrig, yOrig + 33, xOrig + 56, yOrig + 89, fillDigits);
    poly([xOrig + 2, yOrig + 48,
    xOrig + 34, yOrig,
    xOrig + 46, yOrig + 7,
    xOrig + 14, yOrig + 56
    ], fillDigits);
    if (fillDigits) setBG();
    ellipse(xOrig + 13, yOrig + 46, xOrig + 43, yOrig + 76, fillDigits);
  }

  /* seven */
  function draw7(xOrig, yOrig) {
    setFG();
    poly([xOrig + 4, yOrig + 1,
    xOrig + w - 1, yOrig + 1,
    xOrig + w - 7, yOrig + 13,
    xOrig + 4, yOrig + 13
    ], fillDigits);
    poly([xOrig + w - 1, yOrig + 1,
    xOrig + 15, yOrig + 88,
    xOrig + 5, yOrig + 81,
    xOrig + w - 19, yOrig + 9
    ], fillDigits);
  }

  function draw9(xOrig, yOrig) {
    setFG();
    ellipse(xOrig, yOrig, xOrig + 56, yOrig + 56, fillDigits);
    poly([xOrig + 54, yOrig + 41,
    xOrig + 22, yOrig + 89,
    xOrig + 10, yOrig + 82,
    xOrig + 42, yOrig + 33
    ], fillDigits);
    if (fillDigits) setBG();
    ellipse(xOrig + 13, yOrig + 13, xOrig + 43, yOrig + 43, fillDigits);
  }

  /** END DIGITS **/

  function drawDigit(pos, dig) {
    let x = startX[pos];
    let y = startY[pos];

    setBG();
    rect(x, y, (x + w), (y + h), true);
    switch (dig) {
      case 0:
        draw0(x, y);
        break;
      case 1:
        draw1(x, y);
        break;
      case 2:
        draw2(x, y);
        break;
      case 3:
        draw3(x, y);
        break;
      case 4:
        draw4(x, y);
        break;
      case 5:
        draw5(x, y);
        break;
      case 6:
        draw6(x, y);
        break;
      case 7:
        draw7(x, y);
        break;
      case 8:
        draw8(x, y);
        break;
      case 9:
        draw9(x, y);
        break;
    }
  }

  let start = () => {
    g.setBgColor(0, 0, 0.3);
    g.clear();
  }

  let drawClock = (d) => {

    g.clearRect(0, 0, _C.XWID, _C.YMID + 40);
    console.log("DrawClock: time to draw");

    rotate = false;
    let xndg = 15;
    g.setColor(_C.CYAN);
    if (Math.floor(d.hr / 10) > 0) {
      drawDigit(0, 1);
      drawDigit(1, d.hr % 10);
    } else {
      drawDigit(0, 0);
      drawDigit(1, d.hr);
    }
    g.setColor(_C.WHITE);
    drawDigit(2, Math.floor(d.min / 10));
    drawDigit(3, Math.floor(d.min % 10));
  }

  let drawData = (d) => {
    // STATUS
    g.setFontAlign(0, -1).setColor("#009800");
    let batt = E.getBattery(); //process.env.VERSION; //battInfo();
    for (let x = 0; x < 5; x++) {
      if (batt < x * 20) g.setColor("#004000");
      g.fillRect(25 + x * 17, 2, x * 17 + 38, 5);
    }
    g.setColor("#80ffcc").setFontAlign(0, -1).drawString(d.niceDate, _C.XMID, 8);

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
  
  let drawNightClock = (d) => {
    g.clear();
    rotate = true;
    inAlarm = true; // no buzzing please
    g.setColor("#800000");
    setScale(0.8, 0.8);
  //console.log("draw1: "+d.hr);
    if (d.hr>9) drawDigit(0,Math.floor(d.hr/10), true);
    drawDigit(1,Math.floor(d.hr%10), true);
  //console.log("draw2: "+d.min);
    drawDigit(2,Math.floor(d.min/10), true);
    drawDigit(3,Math.floor(d.min%10), true);
    g.fillCircle(40, 80,2);
    g.fillCircle(24, 80,2);
    let b = E.getBattery();
    for(let c=0; c<5; c++) {
      if(b > c*20) g.drawCircle(16+12*c, 8, 4);
      //else g.drawCircle(14+12*c,8,4);
    }
  }
  */
  let showMsg = (title, msg) => {
    const topY = 172;
    g.setFont("Omnigo");
    g.setColor("#000000");
    g.fillRect(0, topY, _C.XWID - 1, _C.YHT - 1);
    g.setColor("#CCCCCC");
    g.setFontAlign(0, -1);
    let y = topY + 4; //8 +  g.getFontHeight();
    let mstr = '';
    msg.split(' ').forEach((w) => {
      if (g.stringWidth(mstr + w) > _C.XWID || w == '|') {
        g.drawString(mstr, _C.XMID, y);
        mstr = '';
        y += g.getFontHeight();
      }
      if (w != '|') mstr += w + ' ';
    });
    g.drawString(mstr, _C.XMID, y);
  };

  return {
    start: start,
    drawClock: drawClock,
    drawData: drawData,
    showMsg: showMsg,
  }
}
exports = init();
/*
wOS.wake();
exports.drawBkgd();
let dt = {hr:12, min:35, niceDate: "Sun Jul 12"};
exports.drawClock(dt);
exports.drawData(dt);
exports.showMsg("Title","This would be message 1");
*/
