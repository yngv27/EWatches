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


  let xs = 0.5;
  let ys = 0.625;

  let points0 = new Uint8Array([
    0, 40,
    1, 35,
    7, 20,
    16, 8,
    28, 2,
    40, 0,

    51, 2,
    63, 10,
    72, 20,
    77, 35,
    78, 40,

    78, 59,
    77, 64,
    72, 79,
    63, 89,
    51, 97,

    40, 99,
    28, 97,
    16, 91,
    7, 79,
    1, 64,
    0, 59,
    0, 40
  ]);

  let points1 = new Uint8Array([40, 99, 40, 0]);

  let points2 = new Uint8Array([0, 25,
    2, 22,
    6, 13,
    17, 5,
    28, 2,
    40, 0,
    52, 2,
    63, 5,
    74, 13,
    79, 23,
    79, 28,
    74, 38,
    63, 46,
    51, 54,
    40, 58,
    29, 62,
    17, 68,
    8, 80,
    0, 99,
    79, 99
  ]);

  let points4 = new Uint8Array([60, 99, 60, 0, 0, 75, 79, 75]);

  let points8 = new Uint8Array([
    40, 40,
    26, 42,
    15, 46,
    4, 56,
    1, 66,
    1, 77,
    6, 87,
    17, 94,
    28, 97,
    38, 99,
    42, 99,
    52, 97,
    63, 94,
    74, 87,
    79, 77,
    79, 66,
    75, 56,
    64, 46,
    54, 42,
    40, 40,

    52, 39,
    62, 34,
    69, 29,
    72, 23,
    72, 19,
    69, 12,
    62, 6,
    52, 2,
    40, 0,

    28, 2,
    18, 6,
    11, 12,
    8, 19,
    8, 23,
    11, 29,
    18, 34,
    28, 39,
    40, 40,
  ]);

  let points6 = new Uint8Array([
    50, 0,
    4, 56,
    1, 66,
    1, 77,
    6, 87,
    17, 94,
    28, 97,
    40, 99,
    52, 97,
    63, 94,
    74, 87,
    79, 77,
    79, 66,
    75, 56,
    64, 46,
    52, 42,
    40, 40,
    26, 42,
    15, 46,
    4, 56,
  ]);

  let points3 = new Uint8Array([
    1, 77,
    6, 87,
    17, 94,
    28, 97,
    40, 99,
    52, 97,
    63, 94,
    74, 87,
    79, 77,
    79, 66,
    75, 56,
    64, 46,
    52, 42,
    39, 40,
    79, 0,
    1, 0
  ]);

  let points7 = new Uint8Array([0, 0, 79, 0, 30, 99]);

  let points5 = new Uint8Array([
    1, 77,
    6, 87,
    17, 94,
    28, 97,
    38, 99,
    42, 99,
    52, 97,
    63, 94,
    74, 87,
    79, 77,
    79, 66,
    75, 56,
    64, 46,
    54, 42,
    40, 40,
    26, 42,
    15, 46,
    27, 0,
    79, 0,
  ]);

  let points9 = new Uint8Array(points6.length);
  /* create 5 from 2  */
  /* uncomment if you want the 5 to look more authentic (but uglier)
  for (let idx=0; idx*2 < points2.length; idx++) {
     points5[idx*2] = points2[idx*2];
     points5[idx*2+1] = 99-points2[idx*2+1];
  }
  */
  /* create 9 from 6 */
  for (let idx = 0; idx * 2 < points6.length; idx++) {
    points9[idx * 2] = 79 - points6[idx * 2];
    points9[idx * 2 + 1] = 99 - points6[idx * 2 + 1];
  }


  function drawPoints(points, x0, y0) {
    let x = points[0] * xs + x0, y = points[1] * ys + y0;
    //g.drawEllipse(x-2, y-2, x+2, y+2);
    g.moveTo(x, y);
    for (let idx = 1; idx * 2 < points.length; idx++) {
      let x = points[idx * 2] * xs + x0;
      let y = points[idx * 2 + 1] * ys + y0;
      //g.drawEllipse(x-2, y-2, x+2, y+2);
      g.lineTo(x, y);
    }
  }

  pointsArray = [points0, points1, points2, points3, points4, points5, points6, points7, points8, points9];

  function eraseDigit(d, x, y) {
    if (d < 0) return;
    g.setColor("#000000");
    if (nightMode) {
      drawPoints(pointsArray[d], x, y);
      return;
    }
    drawPoints(pointsArray[d], x, y);
    drawPoints(pointsArray[d], x - 1, y - 1);
    drawPoints(pointsArray[d], x + 1, y - 1);
    drawPoints(pointsArray[d], x - 1, y + 1);
    drawPoints(pointsArray[d], x + 1, y + 1);
  }

  function drawDigit(d, x, y) {
    let halo = "#808080"; /* #FF6000 */
    let colour = "#F0F0F0"; /* #FFC000 */
    if (nightMode) {
      g.setColor("#206040");
      drawPoints(pointsArray[d], x, y);
      return;
    }

    g.setColor(halo);
    drawPoints(pointsArray[d], x - 1, y - 1);
    drawPoints(pointsArray[d], x + 1, y - 1);
    drawPoints(pointsArray[d], x - 1, y + 1);
    drawPoints(pointsArray[d], x + 1, y + 1);

    g.setColor(colour);
    drawPoints(pointsArray[d], x, y);

  }

  let drawBkgd = () => {
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
    drawClock: drawClock,
    drawBkgd: drawBkgd,
    drawData: drawData,
    showMsg: showMsg,
  }
}
exports = init();

D12.set();
exports.drawBkgd();
let dt = { hr: 12, min: 35, niceDate: "Sun Jul 12" };
exports.drawClock(dt);
exports.drawData(dt);
exports.showMsg("Title", "This would be message 1");
