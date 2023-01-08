
// for use with setDigitRaw()
/*
                0x01
               ======
  0x04  ||           || 0x04
        ||           ||
          ======
        || 0x10      ||
  0x40  ||           || 0x10
               ======
                0x40
*/

function delay(ms) {
  let t = Math.floor(Date().getTime())+ms;
  while(t > Date().getTime()) {
    // something silly
    out3 = ' ';
  }
}

//I2C1.setup({sda: D6, scl: D7, bitrate: 200000});

function send(a, d) {
  wOS.I2C.writeTo(0x3f,a,d);
  //print(`Sending ${d} to ${a}`);
}
let lcd_on=() => {send(0, 0xaf);};
let lcd_off=() => {send(0, 0xae);};


// send(0, 0xae); 
function lcdInit() {
  D15.reset(); //clear 15
  D30.set(); //set 30
    delay(2);
  D30.reset(); //clear 30
    delay(2);
  D30.set(); //set 30
    delay(10);
  send(0, 0xe2);//  0xe200;
    delay(10);
  send(0,  0xff);
  send(0,  0x72);
  send(0,  0xfe);
  send(0,  0xda);
  send(0,  0x95);
  send(0,  0x99);
  send(0,  0xa0);
  send(0,  0xc8);
  send(0,  0xa4);
  send(0,  0x40);
  send(0,  0x22);
  send(0,  0x81);
  send(0,  0x3);
  send(0,  0xf8);
  send(0,  0x0);

  send(0,  0x2c);
    delay(1);
  send(0,  0x2e);
    delay(1);
  send(0,  0x2f);
    delay(1);
  send(0,  0xff);
  send(0,  0x64);
  send(0,  0xfe);
    delay(1);
  send(0,  0xaf);
}

let segData = [ 0x4455, 0x14, 0x5045, 0x1055, 0x1414, 0x1451, 0x5451, 0x15, 0x5455, 0x1455,
  0x1445, 0x5051, 0x40, 0x1000, 0x1,  0, 
  // percentage,   low,   med,  hi,   blank
  ];

// serial access
function setEverything(bigStr, icons) {
  send(0,0xb0);
  send(0,0x10);
  // offset into array
  send(0,0);
  let max = Math.min(bigStr.length, 13);
  for(let idx = 0; idx < max; idx++) {
    val = bigStr.charCodeAt(idx)-48;
    if(val > segData.length) val = 0;
    send(0x40, ((segData[val] >> 8) + (icons ? 1 : 0)) & 0xff);
    send(0x40, segData[val] & 0xff);
  }
}

// random access
function setDigit(idx, val, icon) {
  send(0,0xb0);
  // first 8 go to 0x10, the other 5 to 0x11
  send(0, 0x10 + (idx >> 3));
  send(0, (idx % 8) * 2);
  send(0x40, ((segData[val] >> 8) + (icon ? 1 : 0)) & 0xff);
  send(0x40, segData[val] & 0xff);
}

function setDigitRaw(idx, val, icon) {
  send(0,0xb0);
  send(0, 0x10 + (idx >> 3));
  send(0, (idx % 8) * 2);
  // offset into array
  send(0x40, ((val >> 8) + (icon ? 1 : 0)) & 0xff);
  send(0x40, val & 0xff);
}

let inMsg = false;

let min10 = 0; // keep track of digit 7 for flashing the colon
function clock() {
  let h = Date().getHours(), m = Date().getMinutes();
  //g.drawImage(_S.read("minHand2"), 120, 120, {rotate: Math.PI * m / 30});
  //g.drawImage(_S.read("hrHand2"), 120, 120, {rotate: Math.PI * (h * 60 + m) / 360});
  setDigit(5, Math.floor(h/10));
  setDigit(6, h%10, true);
  min10 = Math.floor(m/10);
  setDigit(7, min10, true);
  setDigit(8, m%10);
  // battery
  if(!inMsg) {
    let b = E.getBattery();
    setDigit(1, Math.floor(b/10), true);
    setDigit(2, b%10);
  }
}

function date() {
  // cool date (JA)
  setDigitRaw(9, 0x54);
  setDigitRaw(10, 0x5415);
  let dt = Date().getDate();
  setDigit(11, Math.floor(dt/10), false);
  setDigit(12, dt%10);
}

lcdInit();
setEverything('             ');
/*
setDigitRaw(0, 0x5450);  //b
setDigitRaw(1, 0x5050);  //a
setDigitRaw(2, 0x5440);  //t
*/

let clkint=setInterval(clock, 60000);
clock();
date();

// try this
setInterval(()=>{
  setDigit(7, min10, (Date().getSeconds() % 2) ? false : true);
}, 1000);

let drawBkgd = () => {
  g.setColor(.4,.6,.4).fillRect(0,0,239,239);
  setDigitRaw(0, 0x4441);  //[
  setDigitRaw(3, 0x55);  //]
};

setWatch(()=>{
  if(!wOS.awake) wOS.wake();
  else {
    drawBkgd();
    inMsg = false;
  }
}, BTN2, {repeat: true, edge: "rising"});

require("FontDylex7x13").add(Graphics);
g.setFont("Dylex7x13",2).setFontAlign(0,0);

function showMsg(m) {
  setEverything('?????'); // clear the bottom field of 5
  g.setColor(0);
  m.split('|').forEach((s,i)=>{g.drawString(s,120, 178+i*20);});
  [400,800,1200,2000,2400].forEach((t) => {setTimeout(Bangle.buzz, t, 175);});
  inMsg = true;
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
      alarmTOs.push(setTimeout(showMsg, tdiff,als[idx].msg));
    } else {
      //expired
      //logD('tossing out' + idx);
    }
  }
};

LED = {
  w: (a,d) => { wOS.I2C.writeTo(0x30, a, d);} ,
  init: () => {
    LED.w(0, 0x1f);
    LED.w(9, 0);
    LED.w(1, 0x10);
    LED.w(2, 0x68);
    LED.w(3, 0x18);
    LED.w(5, 0x31);
  },
  breathe: (rgb) => {
    LED.w(0,0x7);
    LED.w(9,0x0);
    LED.w(5,0xff);
    LED.w(4,0x40 | rgb); // rgb = red * 32 + grn * 8 + blue * 2
    LED.w(1,0x0f);
  },
};
