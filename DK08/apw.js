wOS.setStepCount = (n) => {};
wOS.getStepCount = () => { return 0; };

E.setTimeZone(-4);


let logD = (msg) => { console.log(msg); };

/*
** END WATCH FACE
*/
let lastTime = '';
let lastDate = '';

let myName = NRF.getAddress().slice(-5);
console.log(myName);

function alarm() {
  [400,800,1200,2000,2400].forEach((t) => {setTimeout(Bangle.buzz, t, 175);});
}
function notify() {
  [300,800].forEach((t) => {setTimeout(Bangle.buzz, t, 250, 0.5);});
}
/*
const _C = {
  CYAN: "#80FFFF",
  WHITE: "#FFFFFF",
  YHT: g.getHeight(),
  XWID: 130,
  XMID: 130/2, 
  YMID: g.getHeight()/2,
};
*/
// to be overridden
let showMsg = (title, msg) => {};

/**** BEGIN ALARMS *******/
let _tidBits = ["tb1","tb2","tb3"];
let inAlarm = false;

let loadAlarms = () => {
  als =  _Storage.readJSON('alarms.json');
  if(als) 
    scheduleAlarms(als);
  //_Alarms.sort((a,b) => {return(a.time > b.time);});
};

let showNotes = () => {
  if((_tidBits.length > 0) && (_tidBits[0].length > 0)) {
    showMsg('', _tidBits[0]);
    return true;
  }
  return false;
};

let showBits = () => {
  // if only 1, it's a note/memo; do not disturb
  if(_tidBits.length < 2) return;
  showMsg('', _tidBits[Math.floor(Math.random()*((_tidBits.length)-1)+1)]);
  notify();
}

function showAlarm(msg) {
  console.log(`alarming w ${msg}`);
  inAlarm = true;
  showMsg('', msg);
  alarm();
}

let alarmTOs = [];
let scheduleAlarms = (als) => {
  for(let idx=0; idx < alarmTOs.length; idx++) {
    clearTimeout(alarmTOs[idx]);
  }
  alarmTOs = [];
  for(let idx=0; idx < als.length; idx++) {
    logD('idx = '+idx);
    let tdiff = Date.parse(als[idx].time) - Date.now();
    let msg = als[idx].msg;
    if(tdiff > 0) {
      logD(`will alarm ${msg} in ${tdiff}`);
      alarmTOs.push(setTimeout(showAlarm, tdiff,als[idx].msg));
    } else {
      //expired
      logD('tossing out' + idx);
    }
  }
};
//loadAlarms();
var la = loadAlarms;
let schAls = scheduleAlarms;

/*
********************************************* END ALARMS *******************************
*/

function clock() {
  //logD('checkClock START');
  let d=Date().toString().split(' ');
  
  let dt= {
    niceDate: Date().toString().substring(0,10),
    tm: d[4].substring(0,5),
    hr: d[4].substring(0,2),
    min: d[4].substring(3,5),
    sec: d[4].substring(6,8),
  }
  if (dt.tm == lastTime) {
    logD(`clock unchanged - returning`);
    return;
  }
  lastTime = dt.tm;

  if(d[2] != lastDate) {
    wOS.setStepCount(0);
    lastDate = d[2];
  }

  logD(`tm = ${dt.tm}; lastTime = ${lastTime}`);
   
  dt.isPM = dt.hr > 11;
  dt.hr %= 12;
  if (dt.hr === 0) dt.hr = 12;
  dt.min = parseInt(dt.min);

  W.drawClock(dt);
  W.drawData(dt);
}

const scrs=[ "watch1.js", "analog1.js"];
let scridx = -1;
let W={};

let nextScreen = () => {
  if(typeof(W) != "undefined" && typeof(W.stop) != "undefined") W.stop();
  // fancy round robin increment ;-)
  ++scridx >= scrs.length ? scridx = 0 : scridx;
  g.clear(); lastTime = "";
  W=require(scrs[scridx]);
  W.start();
  showMsg = W.showMsg;
  // shutdown the other intervals, restart the new ones
  clock();
  showNotes();
};
// make sure it's ready
setTimeout(nextScreen, 1000);

let ival1 = 0; 
let ival2 = 0;

// for rgular LCD
// wOS.on("wake", clock);
// for always-on
setInterval(()=>{clock(); g.flip();}, 60000);

// IF NOT NIGHT MODE
ival2 = setInterval(()=> {
  // what to show down below - if hours > 9pm & < 7am
  if(!inAlarm && (Date().getHours()+3)%24 >= 10) {
    if(!showNotes()) {
      // need a delay; OK to show bit...
      showBits();
    }
  }
}, 1.1*3600*1000);


stop = () => {
  alarmTOs.forEach((to)=>{clearInterval(to);});
  clearInterval(ival1);
  clearInterval(ival2);
};

wOS.UI.on("longpress", () => {
  console.log('longpress');
  if(wOS.isAwake) {
    showMsg('',''); // clear until next tidbit
    if(inAlarm) {
      inAlarm = false; 
      showNotes();
    } else {
      //inNotes = !inNotes;
    }
    Bangle.buzz();
  }
});
  
wOS.UI.on("tap", () => {
});

wOS.UI.on("dbltap", nextScreen);
