/*
eval(_S.read("apw.js"))
*/
let font = atob("AAAAAAAAB/QAAcAAAHAAAAKAPgCgD4AoAAAZgWQf8E0DMAAAQwUwKwC0A1AygwgAAM4LmE5BnAGwAAcAAAB8DjhAQAAQEOOB8AAAqAOAHAFQAAAQAIAfACABAAAABoA4AACABAAgAQAAAAYAMAAAHAeB4AAAP4MWERDRg/gAAIAP+AAAAAhwxoRkNiDhAAAggwYRENmDeAAAHAOgMQP+AEAAB4gkYSEJmEeAAA/g2YSEJmAeAABAAg4RwLgHAAAA3g2YRENmDeAAA8AzIQkM2D+AAAAAMwGYAAAAAzQZwAAAAAgA4A2AxgQQAABQAoAUAKAAAIIGMBsAcAEAAAIAMAEdDYA4AAAHwGMGDCchbQooXkEYDEA8AAAB4HwOIB0AOABwAAf8IiERCYg8wDwAAH8GDCAhAQwYIIAAH/CAhAQwIMMD8AAD/hEQiIREICAAD/hEAiARAIAAAB/BgwgIREMmCeAAB/wCABAAgAQD/gAAAAf8AAAAABAAwAIf4AAH/AYAeAZgYYIGAAD/gAQAIAEACAAD/gwAGABwBgDAD/gAA/4MABgAYADB/wAAP4MGEBCAhgwfwAAP+EICEBCAzAPAAAD+DBhBQg4YMH+AAAAB/wjARwIsGzBwgAAYQWMJiGbBHAAAgAQAP+EACAAAA/wAMACADADB/wAAeAB4AHAOAcA4AAAPAA4AHgeADAAcB4HgAABgwYwDgBwDGDBgAA4AHAA+AwBwBgAAAQcIaEZCYhYQ4IAAP+EBAAB4AHAA8AAEBD/gAAIAMAMAGABgAQAAAAEACABAAgAQAIAAMADAAAADgLYFEDiA/AAB/wEIGEDGA+AAAPgMYEEDGAiAAAPgMYGEBCH/AAAPgNYEkDSA4AAAIAf4aAIAAAAfAY0ISEbD/AAD/gMAMAGAB+AAC/gAAACADL/AAD/gGAHgGYCGAAD/gAAP4GACAA/AwAQAH4AAD+AgAwAYAH4AAB8BjAggYwHwAAD/hCAhgYwHwAAB8BjAhgQgP+AAD+AwAwAAAGIFkCaBGAAAQA/wEMAAB+ABgAwAQH8AABwAOABwDgHAAABwAOABwDgAcA4BwAAAYwGwBwBsBjAAAfgAaAJANh/gAARwJoFkDiAAAIA7ggIAAP+AACAg7gCAAACACABAAQAIAIAAAAAAAAAAAA==");
let widths = atob("AwIEBgYIBgIEBAUGAwUDBAYEBgYGBgYGBgYEBQYFBgYLBwcHBwcGBwcEBQcGCAcHBwcHBgYHBwkHBwcDBAMHBwMGBgYGBgUGBgIEBgIIBgYGBgQFBAYGCAYGBQQCBAc=");


g.setFontOmnigo = function() {
  this.setFontCustom(font, 32, widths, 256 + 13);
};
g.setFont("Omnigo");


let logD = (msg) => { console.log(msg); };


/*
** BEGIN WATCH FACE
*/
let cy = (m) => {
 return Math.floor(Math.cos(Math.PI * m/30) * -80);
};

let cx = (m) => {
return Math.floor(Math.sin(Math.PI * m/30) * 80);
};
               
let xS=.8,yS=.8;
const startX=[10,45,10,45],startY=[18,18,80,80],nmX=[16,42,88,126],nmY=[12,12,12,12];let rotate=!1;function setScale(t,r){xS=t,yS=r}function drawScaledPoly(r,n,a){let d=[];for(let t=0;t<r.length;t+=2){var e;d[t]=Math.floor(r[t]*xS)+n,d[t+1]=Math.floor(r[t+1]*yS)+a,rotate&&(e=d[t],d[t]=80-d[t+1],d[t+1]=e)}g.fillPoly(d,!1)}let d0=new Uint8Array([0,4,4,0,32,0,36,4,36,65,25,65,25,5,11,5,11,65,36,65,36,66,32,70,4,70,0,66]),d1=new Uint8Array([7,4,11,0,20,0,24,4,24,70,13,70,13,5,7,5]),d2=new Uint8Array([0,4,4,0,32,0,36,4,36,34,32,38,11,38,11,65,36,65,36,66,32,70,0,70,0,36,4,32,25,32,25,5,0,5]),d3=new Uint8Array([0,4,4,0,32,0,36,4,36,66,32,70,4,70,0,66,0,65,25,65,25,38,0,38,0,32,25,32,25,5,0,5]),d4=new Uint8Array([0,4,4,0,11,0,11,32,25,32,25,0,32,0,36,4,36,70,25,70,25,38,0,38]),d5=new Uint8Array([0,0,32,0,36,4,36,5,11,5,11,32,32,32,36,36,36,66,32,70,4,70,0,66,0,65,25,65,25,38,0,38]),d6=new Uint8Array([0,4,4,0,32,0,36,4,36,5,11,5,11,65,25,65,25,38,11,38,11,32,32,32,36,36,36,66,32,70,4,70,0,66]),d7=new Uint8Array([0,4,4,0,32,0,36,4,36,70,25,70,25,5,0,5]),d8=new Uint8Array([0,4,4,0,32,0,36,4,36,32,33,35,36,38,36,66,32,70,18,70,18,65,25,65,25,38,18,38,18,32,25,32,25,5,11,5,11,32,18,32,18,38,11,38,11,65,18,65,18,70,4,70,0,66,0,38,3,35,0,32]),d9=new Uint8Array([0,4,4,0,32,0,36,4,36,66,32,70,4,70,0,65,0,65,25,65,25,5,11,5,11,32,25,32,25,38,4,38,0,34]);function drawDigit(t,r,n){let a=(n?nmX:startX)[t];t=(n?nmY:startY)[t];EMULATOR&&(a+=80),drawScaledPoly([d0,d1,d2,d3,d4,d5,d6,d7,d8,d9][r],a,t)}

let drawMin = (m) => {
  g.setColor(7);
  for(let a=0; a<=m; a++) {
    g.drawLine(40,80,40+cx(a),80+cy(a));
    //g.flip();
  }
  g.flip();
};
function pct2col(r,g,b,p) {
  let r1 = Math.floor(r*32*p);
  if(r1 > 31) r1 = 31;
    let g1 = Math.floor(g*32*p);
  if(g1 > 31) g1 = 31;
    let b1 = Math.floor(b*32*p);
  if(b1 > 31) b1 = 31;
  //r1 *= p; g1 *= p; b1 *= p;
  return (r1 << 11) + (g1 << 6) + b1;
}

/*
** END WATCH FACE
*/
var batt=E.getBattery();
let lastTime = '';
let EMULATOR = false; 
let showClockTO = 0;

let myName = NRF.getAddress().slice(-5);
console.log(myName);

/**** BEGIN ALARMS *******/
let _Alarms = [];
let inAlarm = false;
let loadAlarms = () => {
  _Alarms =  _Storage.readJSON('alarms.json');
  if(!_Alarms) _Alarms = [{"msg":"13:53|Stop|working|today","time":"2021-12-21T13:53:00"}];
  //_Alarms.sort((a,b) => {return(a.time > b.time);});
  scheduleAlarms();
};


function notify() {
  logD('notify START');
  [400,800,1200,2000,2400].forEach((t) => {setTimeout(Bangle.buzz, t, 175);});
  logD('notify END');
}

g.sc = (n) => {g.setColor([
    "#000000","#000080","#008000","#008080",
    "#800000","#800080","#808000","#808080",
    "#8080FF","#8080FF","#80FF80","#80FFFF",
    "#FF80FF","#FF80FF","#FFFF80","#FFFFFF",
][n]);};


let showMsg = (title, msg) => {  inAlarm = true;
  g.setFont("Omnigo");
  g.setColor("#000000");
  g.fillRect(0,80,79,159);
  g.setColor("#CCCCCC");
  g.setFontAlign(0,-1);
  let y = 90; //8 +  g.getFontHeight();
  let mstr = ''; 
  msg.split(' ').forEach((w)=>{
    if(g.stringWidth(mstr+w) > 80 || w == '|') {
      g.drawString(mstr, 40, y);
      mstr='';
      y+=g.getFontHeight();
    }
    if(w != '|') mstr += w + ' ';
  });
  g.drawString(mstr, 40, y);
  notify();
};

/*
** alarms are in order, pop the top and show it
*/

function showAlarm(msg) {
  console.log(`alarming w ${msg}`);
  showMsg('', msg);
  // remove the TO from the list, so we don't kill something by accident
}

let alarmTOs = [];
let scheduleAlarms = () => {
  for(let idx=0; idx < alarmTOs.length; idx++) {
    clearTimeout(alarmTOs[idx]);
  }
  alarmTOs = [];
  for(let idx=0; idx < _Alarms.length; idx++) {
    logD('idx = '+idx);
    let tdiff = Date.parse(_Alarms[idx].time) - Date.now();
    let msg = _Alarms[idx].msg;
    if(tdiff > 0) {
      logD(`will alarm ${msg} in ${tdiff}`);
      alarmTOs.push(setTimeout(showAlarm, tdiff,_Alarms[idx].msg));
    } else {
      //expired
      logD('tossing out' + idx);
    }
  }
};
//loadAlarms();
var la = loadAlarms;
let schAls = (als) => {_Alarms = als; scheduleAlarms(); };

/*
********************************************* END ALARMS *******************************
*/

/*
var buzzLock = 0;
function buzzClock (h,m) {
  // skip if either lockout or canceled: 10 or 01 (i.e. not 0)
  if(buzzLock) {
    buzzLock &= 0b10;
    console.log('no buzz..resetting');
    return;
  }
  console.log('buzzing');
  // vibrate: long = 5, short = 1
  const lvl = 0.8, LONGBZ = 600, SHORTBZ = 150;
  // hours
  let n = Math.floor(h/5);
  if(n) vibrate(lvl, n, LONGBZ, 100);
  vibrate(lvl, h%5, SHORTBZ, 200);
  // delay
  vibrate(0.0, 1, 500, 500);
  // 10 mins - always single pulses
  n = Math.floor(m/10);
  if(n) vibrate(lvl, n, SHORTBZ, 200);
  vibrate(0.0, 1, 500, 500);
  // 1 mins
  if(m % 10 >= 5){ vibrate(lvl, 1, LONGBZ, 100); m -= 5; }
  vibrate(lvl, m%5, SHORTBZ, 200);
  // lockout for one minute
  buzzLock |= 0b10;
  setTimeout(function() { buzzLock &= 0b01; digitalWrite(VIB, 0);}, 60000);
}
*/
ACCEL.isFaceUp = false;

function checkFaceup() {
  let xyz = ACCEL.read();
  //console.log(JSON.stringify(xyz));
  if((xyz.ax > 20 && xyz.ax < 240) || xyz.ay > 40 || xyz.ay < 20) {
    ACCEL.isFaceUp = false;
    return;
  }
  // have we switched?
  if(ACCEL.isFaceUp == false) {
    ACCEL.emit("faceup");
  }
  ACCEL.isFaceUp = true;
}

ACCEL.on("faceup", ()=>{
  logD(`** FACE UP! **`);
  wOS.wake();
  drawDayClock();

});

function drawDayClock() {
  //logD('checkClock START');
  let d=Date();
  let dt=d.toString().substr(0,10);
  d=d.toString().split(' ');
  let tm=d[4].substring(0,5);
  let hr=d[4].substr(0,2);
  let min=d[4].substr(3,2);
  //let sec=d[4].substr(6,2);

  if (tm == lastTime) {
    logD(`clock unchanged - returning`);
    return;
  }
  lastTime = tm;

  logD(`tm = ${tm}; lastTime = ${lastTime}`);
  
  //if(inAlarm) { } // we all share the screen now

  let nm = false;
  
  hr %= 12;
  if (hr === 0) hr = 12;
  min = parseInt(min);
  xmid = g.getWidth()/2;

  g.clearRect(0,0,79,79);
  console.log("DrawClock: time to draw");

  rotate = false;
  
  const darr = [d0,d1,d2,d3,d4,d5,d6,d7,d8,d9];
  
  g.sc(11);
  if(Math.floor(hr/10) > 0) {
    setScale(0.6,0.8);
    drawScaledPoly(d1,0,22); //52);
    drawScaledPoly(darr[hr%10],18,22); //52);
  } else {
    setScale(0.8,0.8);
    drawScaledPoly(darr[hr],8,22); //52);
  }
  g.sc(15);
  setScale(0.5,0.55);
  drawScaledPoly(darr[Math.floor(min/10)], 42,22); //52);
  drawScaledPoly(darr[Math.floor(min%10)], 62,22); //52);
  //g.flip();

    // TOP BAR
  //g.setFont("Dylex7x13");
  g.setFontAlign(0,-1);
  g.setColor("#009800");
  let batt = E.getBattery(); //process.env.VERSION; //battInfo();
  for(let x=0; x<5; x++) {
    if(batt < x*20) g.setColor("#004000");
    g.fillRect(x*17,0,x*17+12,2);
  }
  // full bkgd
  //g.fillPoly([0,0,8,12,71,12,79,0],true);
  // par'l bkgd
  //g.fillPoly([0,0,8,8,71,8,79,0],true);
  //g.setFontAlign(-1,-1).drawString(dt,0,1);
  g.setColor("#80ffcc");
  //g.setClipRect(0,0,79,7)
  g.setFontAlign(0,-1).drawString(dt,40,6);
  //g.setFontAlign(1,-1).drawString(`[${batt}]`,80,1);
//g.setClipRect(0,0,79,159);

  
  // MID BAR 
  let steps = 0;
  g.setColor("#aaaaaa")
  for(let x=0; x<10; x++) {
    if(steps < x*10) g.setColor("#555555");
    g.fillRect(x*8+1,83,x*8+7,85);
  }
}

function drawNightClock(d) {
  g.clear();
    rotate = true;
    g.setColor(4);
    if(EMULATOR) g.setColor(0.5,0.5,0.5);
  //console.log("draw1: "+d.hr);
    if (d.hr>9) drawDigit(0,Math.floor(d.hr/10), true);
    drawDigit(1,Math.floor(d.hr%10), true);
  //console.log("draw2: "+d.min);
    drawDigit(2,Math.floor(d.min/10), true);
    drawDigit(3,Math.floor(d.min%10), true);
    g.fillCircle(40, 80,2);
    g.fillCircle(24, 80,2);
    let b = battLevel();
    for(let c=0; c<5; c++) {
      if(b > c*20) g.drawCircle(16+12*c, 8, 4);
      //else g.drawCircle(14+12*c,8,4);
    }
    g.flip();
}

function clock(){
  volts=0;
  showClockTO = 0;
  return setInterval(checkFaceup,555);
}

function sleep(){
  g.clear();//g.flip();
  inAlarm = false;
  // clean up the last screen's mess...
  if(showClockTO)   clearTimeout(showClockTO);
  // just in case - shutdown the buzzer
  analogWrite(VIB,0);
  //currscr=-1;
  return 0;
}

var screens=[clock,sleep];
var currscr= 0;
var currint=screens[currscr]();
//let longpress = 0;
let longpressTO = 0;

let nextScreen = () => {
  currscr++;if (currscr>=screens.length) currscr=0;
  if (currint > 0) clearInterval(currint);
  logD(`Running screen ${currscr}`);
  currint = screens[currscr]();
  Bangle.buzz();
};
/* */


let BUTTON = {
  lastUp: 0,
  longpressTO: 0,
  tapTO: 0,
  longTime: 1000,
  tapTime: 250,
  dbltap: false,
  watchUp: false,
  upOpts: { repeat:false, edge:'falling', debounce:25},
  dnOpts: { repeat:false, edge:'rising', debounce:25},
};

  
const btnDown = (b) => {
  //longpress = b.time;
  if(BUTTON.tapTO) {
    clearTimeout(BUTTON.tapTO);
    BUTTON.tapTO = 0;
    BUTTON.dbltap = true;
  }
  BUTTON.longpressTO = setTimeout(function(){
    // long press behaviour
    BUTTON.emit('longpress');
    BUTTON.longpressTO = 0;
    // ignore button up
    BUTTON.watchUp = false;
  }, BUTTON.longTime);
  logD(`lpto=${BUTTON.longpressTO}`);
  BUTTON.watchUp = true;
  setWatch(btnUp, BTN1, BUTTON.upOpts);
};

const btnUp = (b) => {
  if(BUTTON.longpressTO) {
    clearTimeout(BUTTON.longpressTO);
    BUTTON.longpressTO = 0;
  } 
  if(BUTTON.dbltap) {
    BUTTON.emit('dbltap');
    BUTTON.dbltap = false;
  } else if (BUTTON.watchUp) {
    BUTTON.tapTO = setTimeout(function(){
      // long press behaviour
      BUTTON.emit('tap');
      BUTTON.tapTO = 0;
      BUTTON.dbltap = false;
    }, BUTTON.tapTime);
    logD(`lpto=${BUTTON.tapTO}`);
  }
  BUTTON.lastUp = b.time;
  setWatch(btnDown, BTN1, BUTTON.downOpts);
};

setWatch(btnDown, BTN1, BUTTON.downOpts);
BUTTON.on('tap',()=>{console.log('tap');});
BUTTON.on('longpress',()=>{
  console.log('longpress');
  if(wOS.awake) {
    inAlarm = false;lastTime='';
    Bangle.buzz();
  }
});
BUTTON.on('dbltap',()=>{
  console.log('dbltap');
  nextScreen();
});
