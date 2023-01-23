
let LCD=require("seglcd.js").init({EN:D15, RST:D30, i2c:wOS.I2C});

let inMsg = false;

let min10 = 0; // keep track of digit 7 for flashing the colon
function clock() {
  let h = Date().getHours(), m = Date().getMinutes();
  //g.drawImage(_S.read("minHand2"), 120, 120, {rotate: Math.PI * m / 30});
  //g.drawImage(_S.read("hrHand2"), 120, 120, {rotate: Math.PI * (h * 60 + m) / 360});
  LCD.setDigit(5, Math.floor(h/10));
  LCD.setDigit(6, h%10, true);
  min10 = Math.floor(m/10);
  LCD.setDigit(7, min10, true);
  LCD.setDigit(8, m%10);
  // battery
  if(!inMsg) {
    // even/odd minute: draw battery or step count
    let icon = true;
    let s = wOS.getStepCount().toString();
    if(m % 2) {
      s = E.getBattery().toString();
      icon = false;
    }
    LCD.setEverything(("?????"+s).slice(-5),icon);
  }
  if(!h && !m) drawDate();
}

function drawDate() {
  // cool date (JA)
  LCD.setDigitRaw(9, 0x54);
  LCD.setDigitRaw(10, 0x5415);
  let dt = Date().getDate();
  LCD.setDigit(11, Math.floor(dt/10), false);
  LCD.setDigit(12, dt%10);
}

LCD.setEverything('?????????????');
/*
setDigitRaw(0, 0x5450);  //b
setDigitRaw(1, 0x5050);  //a
setDigitRaw(2, 0x5440);  //t
*/

let clkint=setInterval(clock, 60000);
clock();
drawDate();

// try this
setInterval(()=>{
  LCD.setDigit(7, min10, (Date().getSeconds() % 2) ? false : true);
}, 1000);

let drawBkgd = () => {
  g.setColor(.4,.6,.4).fillRect(0,0,239,239);
  //setDigitRaw(0, 0x4441);  //[
  //setDigitRaw(3, 0x55);  //]
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
  LCD.setEverything('?????'); // clear the bottom field of 5
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

