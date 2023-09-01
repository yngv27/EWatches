let font = atob("AAAAAAAAB/QAAcAAAHAAAAKAPgCgD4AoAAAZgWQf8E0DMAAAQwUwKwC0A1AygwgAAM4LmE5BnAGwAAcAAAB8DjhAQAAQEOOB8AAAqAOAHAFQAAAQAIAfACABAAAABoA4AACABAAgAQAAAAYAMAAAHAeB4AAAP4MWERDRg/gAAIAP+AAAAAhwxoRkNiDhAAAggwYRENmDeAAAHAOgMQP+AEAAB4gkYSEJmEeAAA/g2YSEJmAeAABAAg4RwLgHAAAA3g2YRENmDeAAA8AzIQkM2D+AAAAAMwGYAAAAAzQZwAAAAAgA4A2AxgQQAABQAoAUAKAAAIIGMBsAcAEAAAIAMAEdDYA4AAAHwGMGDCchbQooXkEYDEA8AAAB4HwOIB0AOABwAAf8IiERCYg8wDwAAH8GDCAhAQwYIIAAH/CAhAQwIMMD8AAD/hEQiIREICAAD/hEAiARAIAAAB/BgwgIREMmCeAAB/wCABAAgAQD/gAAAAf8AAAAABAAwAIf4AAH/AYAeAZgYYIGAAD/gAQAIAEACAAD/gwAGABwBgDAD/gAA/4MABgAYADB/wAAP4MGEBCAhgwfwAAP+EICEBCAzAPAAAD+DBhBQg4YMH+AAAAB/wjARwIsGzBwgAAYQWMJiGbBHAAAgAQAP+EACAAAA/wAMACADADB/wAAeAB4AHAOAcA4AAAPAA4AHgeADAAcB4HgAABgwYwDgBwDGDBgAA4AHAA+AwBwBgAAAQcIaEZCYhYQ4IAAP+EBAAB4AHAA8AAEBD/gAAIAMAMAGABgAQAAAAEACABAAgAQAIAAMADAAAADgLYFEDiA/AAB/wEIGEDGA+AAAPgMYEEDGAiAAAPgMYGEBCH/AAAPgNYEkDSA4AAAIAf4aAIAAAAfAY0ISEbD/AAD/gMAMAGAB+AAC/gAAACADL/AAD/gGAHgGYCGAAD/gAAP4GACAA/AwAQAH4AAD+AgAwAYAH4AAB8BjAggYwHwAAD/hCAhgYwHwAAB8BjAhgQgP+AAD+AwAwAAAGIFkCaBGAAAQA/wEMAAB+ABgAwAQH8AABwAOABwDgHAAABwAOABwDgAcA4BwAAAYwGwBwBsBjAAAfgAaAJANh/gAARwJoFkDiAAAIA7ggIAAP+AACAg7gCAAACACABAAQAIAIAAAAAAAAAAAA==");
let widths = atob("AwIEBgYIBgIEBAUGAwUDBAYEBgYGBgYGBgYEBQYFBgYLBwcHBwcGBwcEBQcGCAcHBwcHBgYHBwkHBwcDBAMHBwMGBgYGBgUGBgIEBgIIBgYGBgQFBAYGCAYGBQQCBAc=");


g.setFontOmnigo = function() {
  this.setFontCustom(font, 32, widths, 256 + 13);
};
g.setFont("Omnigo", 1).setFontAlign(0,-1);

const scr = ["watch.js", "timer.js"];

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

function alarm() {
  [400,800,1200,2000,2400].forEach((t) => {setTimeout(Bangle.buzz, t, 175);});
}
function notify() {
  [300,800].forEach((t) => {setTimeout(Bangle.buzz, t, 250, 0.5);});
}
let _tidBits = ["tb1","tb2","tb3"];

let showBits = () => {
  SCR.showMsg(_tidBits[Math.floor(Math.random()*(_tidBits.length))]);
  notify();
};

let showAlarm = (m) => {
  SCR.showMsg(m);
  alarm();
  inAlarm = true;
}

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
      alarmTOs.push(setTimeout(showAlarm, tdiff, als[idx].msg));
    } else {
      //expired
      //logD('tossing out' + idx);
    }
  }
};

setInterval(()=> {
  // what to show down below
  if(!inAlarm) {
   // if(!showNotes()) {
      // need a delay; OK to show bit...
      showBits();
    //}
  }
}, 1.7*3600*1000);