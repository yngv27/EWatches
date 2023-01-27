const scr = ["watch.js", "timer.js"];

if(typeof(BTN2) === "undefined") BTN2 = D20;

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