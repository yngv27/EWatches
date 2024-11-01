/*
** Simple analog with polygon hands, date and rotated triangle ticks on gray bkgd
*/ 
function init() {
  const _C = {
    CYAN: "#80FFFF",
    WHITE: "#FFFFFF",
    YHT: g.getHeight(),
    XWID: g.getWidth(),
    XMID: g.getWidth() / 2,
    YMID: g.getHeight() * 3 / 8 - 1,
    fgColor: "#fff5d9",
    BKGD: "#181818",
  };

//let digits = require("QuickS.js");
g.setFontDefault = function () {
 this.setFontCustom(atob("AAAAAAAAAAAAAAAAAAAAAAAD/mAAAAAAADAAAAAAMAAAAAAAAAASAAEgAP/AASAA/8ABIAASAAAAAAAADggBEEAgggf/8CCCAQRACDgAAAAAAAAAAAwGASGADGAAGMAGEgGAwAAAAAAAADgBzEAjAgI4IBxkAAGAAGYAAAAAAACAADAAAAAAAAAAfwA4DgQAEAAAAAAAQAEDgOAH8AAAAAAAAAQAAkgAFQAA4AAVAAJIAAQAAAAAAAAAQAAEAABAAD+AAEAABAAAQAAAAAAAAAAQAAYAAAAAAAAAAABAAAQAAEAABAAAQAAEAABAAAAAAAAAAGAAAAAAAAAGAAGAAGAAGAAGAAGAAAAAAAAAD/gBAkAgQgIIICECASBAD/gAAAAAAABAAAgAAQAAP/4AAAAAAADAYBAKAgEgICICBCAQggDwIAAAAAAACAgBAEAgggIIICCCARRADjgAAAAAAAADgADIADCADAgDAIAA/gAAgAAAAAAAPwgCEEAhAgIQICECAghAIHgAAAAAAAA/gAyEARAgIQICECAghAAHgAAAAAAAIAACAAAgAAIA4CBwAjgAPAAAAAAAAADjgBFEAgggIIICCCARRADjgAAAAAAADwABCCAgQgIEICBEAQmAD+AAAAAAAAAwYAAAAAAAAAEAMGAAAAAAAABAAAoAARAAIIAEBAAAAAAAABEAARAAEQABEAARAAEQABEAAAAAAAAEBAAggAEQAAoAAEAAAAAAAADAABAAAgAAIHYCCAARAADgAAAAAAAAB/gAgEAR4gEhIBISAJIgB/QAAAAAAAAB4AHwAOEAMBAA4QAB8AAB4AAAAAAAP/4CECAhAgIQICECAShADHgAAAAAAAD/gBAEAgAgIAICACAQBACAgAAAAAAAP/4CACAgAgIAICACAQBAD/gAAAAAAAP/4CCCAgggIIICCCAgAgIAIAAAAAAAP/4CCAAggAIIACCAAgAAIAAAAAAAAAD/gBAEAgAgIAICBCAQRACH4AAAAAAAP/4ACAAAgAAIAACAAAgAP/4AAAAAAAIAID/+AgAgAAAAAAAACAAAQAACAAAgAAIAAEA/+AAAAAAAA//gAIAAFAACIABBAAgIAwBgAAAAAAA//gAAIAACAAAgAAIAACAAAgAAAAAAA//gDAAAMAAAwAAwAAwAA//gAAAAAAA//gDAAAMAAAwAADAAAMA//gAAAAAAAP+AEAQCACAgAgIAIBAEAP+AAAAAAAA//gIEACBAAgQAIEABCAAPAAAAAAAAAP+AEAQCACAgAgIAoBAEAP+gAAAAAAA//gIEACBAAgQAIGABCYAPBgAAAAAAAOCAEQQCCCAgggIIIBBEAIOAAAAAAAAgAAIAACAAA//gIAACAAAgAAAAAAAAA/+AAAQAACAAAgAAIAAEA/+AAAAAAAA8AAA8AAA4AABgADgAPAA8AAAAAAAAA+AAAeAAAeAB4APgAAHgAAHgAeAD4AAAAAAAADAGAMGAA2AACAADYADBgDAGAAAAAAADAAAMAAAwAAD+ADAADAADAAAAAAAAACAeAgIgIEICCCAhAgIgIDwCAAAAAAAH//BAAQQAEAAAAAAAMAAAwAADAAAMAAAwAADAAAAAAABAAQQAEH//AAAAAAAAQAAIAAEAACAAAQAACAAAQAAAAAAAAAACAAAgAAIAACAAAgAAIAACAAAAAAADAAAIAAAAAAAAAAGAASQAJCACQgAkIAJEAB/gAAAAAAA//gAQQAICACAgAgIAEEAA+AAAAAAAAA+AAQQAICACAgAgIAICABBAAAAAAAAA+AAQQAICACAgAgIAEEA//gAAAAAAAA+AASQAIiACIgAiIAEiAA5AAAAAAAACAAAgAB/+AiAAIgACAAAAAAAAAAD4QBBCAgIgICICAiAQRAP/gAAAAAAD/+ABAAAgAAIAACAAAQAAD+AAAAAAAAIAAb/gAAAAAAAAAIAABAAAQb/4AAAAAAA//gACAAAgAAUAAIgAEEACAgAAAAAAAgAAP/wAACAAAgAAAAAAAD/gAgAAIAAB/gAgAAIAAB/gAAAAAAAD/gAQAAIAACAAAgAAEAAA/gAAAAAAAA+AAQQAICACAgAgIAEEAA+AAAAAAAAD/8AQQAICACAgAgIAEEAA+AAAAAAAAA+AAQQAICACAgAgIAEEAD/8AAAAAAAD/gAIAAEAACAAAgAAIAABAAAAAAAAABxAAiIAIiACIgAiIAIiABHAAAAAAAACAAAgAA/8ACAgAgIAACAAAAAAAAP4AABAAAIAACAAAgAAQAP+AAAAAAAAOAAAYAABgAAGAAGAAGAAOAAAAAAAAAPwAADgADAAHAAAMAAA4APwAAAAAAAAMGAAiAAFAAAgAAUAAIgAMGAAAAAAAAOAQAYEABmAAGAAGAAGAAOAAAAAAAAAIGACCgAhIAIiACQgAoIAMCAAAAAAAACAA/fgQAEAAAAAAAAAAD/+AAAAAAAAAABAAQP34ACAAAAAAAAAgAAQAAEAAAgAAEAABAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="), 32, atob("BgMFCQkJCQQFBQkJBAkDCQoGCQkJCQkJCQkDBAcJBwkJCQkJCQkJCQkFCQkJCQkJCQkJCQkJCQkJCQkFCAUJCQQJCQkJCQgJCQQGCQYJCQkJCQkJCAkJCQkJCQUFBQk="), 256 + 20);

};


  g.setFont("Default");
let pRad = Math.PI / 180;
  //if(!_C) let _C = {};
let rotatePoly = (pArr, angle, xoff, yoff) => {
  let newArr = [];
  let a = angle;// * pRad;
  for(let i=0; i<pArr.length ; i+= 2) {
    newArr[i] = xoff + Math.cos(a)*pArr[i] + Math.sin(a)*pArr[i+1];
    newArr[i+1] = yoff + Math.sin(a)*pArr[i] - Math.cos(a)*pArr[i+1];
  }
  return newArr;
};
let r1 = 7, r2 = 5, r3 = 72, r4 = 104;
let hrHand = [ -1,r1, 0-r1,r1*2, 0,r3, r1,r1*2, 1,r1 ];
let minHand = [ -1,r1, 0-r2,r2+r1, 0,r4, r2,r2+r1, 1,r1];
/*
g.setBgColor(_C.BKGD);
g.clear();
g.setColor(0);
g.fillPolyAA(rotatePoly(minHand, 30, 120, 122));
g.fillPolyAA(rotatePoly(hrHand, 47, 120, 122)); 
g.setColor(0.7,0.7,0.7);
g.fillPolyAA(rotatePoly(minHand, 30, 120, 119));
g.fillPolyAA(rotatePoly(hrHand, 47, 120, 119)); 
g.setColor(0).fillCircle(120,120,r2);
g.setColor(0.7,0.7,0.7);
for(let r= 8; r> 5; r--)
  g.drawCircleAA(120,120,r);
g.setColor("#608060");
let tic = [ -8,120, 8,120, 0,112];
for(let t=0; t<12; t++) g.fillPolyAA(rotatePoly(tic, t*30, 120,120));
wOS.wake();
*/

let start = () => {
  g.setBgColor(_C.BKGD);
  g.clear();
  //let img = _S.read("wbkgd1.png");
  //if (img) g.drawImage(img, 26, 0);
  g.setColor(0);
  let tic = [ -8,120, 8,120, 0,112];
  for(let t=0; t<12; t++) g.fillPolyAA(rotatePoly(tic, t*Math.PI/6, 120,120));

};

let drawClock = (d) => {
  g.setColor(_C.BKGD).fillCircle(120, 120, r4);
    //let hrAngle = (d.hr * 60 + d.min) * Math.PI / 360;
    //let minAngle = d.min / 30 * Math.PI;
    //g.drawImage(_S.read("minHand.png"), _C.XMID, _C.YMID, { rotate: minAngle });
    //g.drawImage(_S.read("hourHand.png"), _C.XMID, _C.YMID, { rotate: hrAngle });
  let hrAngle = (d.hr * 60 + d.min) * Math.PI / 360;
  let minAngle = d.min / 30 * Math.PI;
  g.setColor(0);
  g.fillPolyAA(rotatePoly(minHand, minAngle, 120, 122));
  g.fillPolyAA(rotatePoly(hrHand, hrAngle, 120, 122)); 
  g.setColor( _C.fgColor);
  g.fillPolyAA(rotatePoly(minHand, minAngle, 120, 119));
  g.fillPolyAA(rotatePoly(hrHand, hrAngle, 120, 119)); 

};

let drawData = (d) => {
  // STATUS

  g.setFontAlign(0, -1).setColor(_C.fgColor);
  let batt = E.getBattery(); //process.env.VERSION; //battInfo();
  for (let x = 0; x < 5; x++) {
    if (batt < x * 20) g.setColor("#d6825e");
    //g.fillRect(24-x*4,  165- x * 7, 35-x*5, 170-x * 7 );
  }
  //g.clearRect(30, 133, 100, 146);
  let dow = d.niceDate.substring(0,3);
  let dt = d.niceDate.substring(7);
  g.setColor( _C.fgColor).setFontAlign(1, 0);
  //g.drawString(` ${dow} `, _C.XWID-12, 150, true);
  g.drawString(` ${dt} `, _C.XWID-12, 120, true);
};

let showMsg = (msgobj) => {
  /*
  g.setFont("Default");
  g.setColor("#000000");
  g.fillRect(0, 180, _C.XWID - 1, _C.YHT - 1);
  g.setColor( _C.fgColor);
  g.setFontAlign(0, -1);
  let y = 184;
  let mstr = '';
  msgobj.text.split(' ').forEach((w) => {
    if (g.stringWidth(mstr + w) > _C.XWID || w == '|') {
      g.drawString(mstr, _C.XMID, y);
      mstr = '';
      y += g.getFontHeight();
    }
    if (w != '|') mstr += w + ' ';
  });
  g.drawString(mstr, _C.XMID, y);
  */
};

return {
  start: start,
  drawClock: drawClock,
  drawData: drawData,
  showMsg: showMsg,
};
}
exports = init();
const _C = {
  CYAN: "#80FFFF",
  WHITE: "#FFFFFF",
  YHT: g.getHeight(),
  XWID: 130,
  XMID: 130 / 2,
  YMID: g.getHeight() / 2,
};
wOS.BKL.reset();
exports.start();
let dt = { hr: 12, min: 35, niceDate: "Sun Jul 12" };
exports.drawClock(dt);
exports.drawData(dt);
//exports.showMsg({title:"Title", text:"This would be message 1"});