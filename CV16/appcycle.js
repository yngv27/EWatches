const scr = ["watch.js", "timer.js"];

if(typeof(BTN2) === "undefined") BTN2 = D20;
if(typeof(LCD)==="undefined")   
    var LCD=require("seglcd.js").init({EN:D15, RST:D30, i2c:wOS.I2C});

let scridx = 0;
let SCR = require(scr[scridx]);
SCR.start();

setWatch(() => {
  if(!wOS.awake) wOS.wake();
  else {
    SCR.stop();
    if(++scridx >= scr.length) scridx=0;
    SCR = require(scr[scridx]);
    SCR.start();
  }
}, BTN1, {"edge":"rising", "repeat":true});

setWatch(() => {
  SCR.click();
}, BTN2, {"edge":"rising", "repeat":true});

let drawBkgd = () => {
  g.setColor(.4,.6,.4).fillRect(0,0,239,239);
  //setDigitRaw(0, 0x4441);  //[
  //setDigitRaw(3, 0x55);  //]
};

let alarmTOs = [];
let schAls = (als) => {
  for(let idx=0; idx < alarmTOs.length; idx++) {
    clearTimeout(alarmTOs[idx]);
  }
  alarmTOs = [];
  for(let idx=0; idx < als.length; idx++) {
    //logD('idx = '+idx);
    let tdiff = Date.parse(als[idx].time) - Date.now();
    let msg = als[idx].msg;
    if(tdiff > 0) {
      //logD(`will alarm ${msg} in ${tdiff}`);
      alarmTOs.push(setTimeout(SCR.showMsg, tdiff, als[idx].msg));
    } else {
      //expired
      //logD('tossing out' + idx);
    }
  }
};
