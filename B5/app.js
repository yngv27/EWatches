const scr = ["apw.js", "timer.js"];

let scridx = 0;
let SCR = require(scr[scridx]);
SCR.start();

wOS.UI.on("dbltap",() => {
  if(!wOS.awake) wOS.wake();
  else {
    SCR.stop();
    if(++scridx >= scr.length) scridx=0;
    SCR = require(scr[scridx]);
    SCR.start();
  }
});

wOS.UI.on("tap", ()=>{SCR.event("tap");});
//wOS.UI.on("dbltap", ()=>{SCR.event("dbltap");});
wOS.UI.on("longpress", ()=>{SCR.event("longpress");});
