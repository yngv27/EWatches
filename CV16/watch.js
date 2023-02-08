//exports = {};
if(typeof(LCD)==="undefined")   
    var LCD=require("seglcd.js").init({EN:D15, RST:D30, i2c:wOS.I2C});

let _C = {
    min10: 0, // keep track of digit 7 for flashing the colon
    tikint: 0,
    clkint: 0,
    inMsg: false,
};

function clock() {
  let h = Date().getHours(), m = Date().getMinutes();
  //g.drawImage(_S.read("minHand2"), 120, 120, {rotate: Math.PI * m / 30});
  //g.drawImage(_S.read("hrHand2"), 120, 120, {rotate: Math.PI * (h * 60 + m) / 360});
  LCD.setDigit(5, Math.floor(h/10));
  LCD.setDigit(6, h%10, true);
  _C.min10 = Math.floor(m/10);
  LCD.setDigit(7, _C.min10, true);
  LCD.setDigit(8, m%10);
  // battery
  if(!_C.inMsg) {
    // even/odd minute: draw battery or step count
    if(m % 2) {
        /*
      s = E.getBattery().toString();
      LCD.setDigitRaw(0, 0x5450);  //b
      LCD.setDigitRaw(1, 0x5050);  //a
      LCD.setDigitRaw(2, 0x5440);  //t
      LCD.setDigit(3, Math.floor(s/10));
      LCD.setDigit(4, s%10);
      */
     let s = "<"+Math.floor(analogRead(D31)*10000).toString();
     LCD.setEverything(s);
      icon = false;
    } else {
      let s = wOS.getStepCount().toString();
      LCD.setEverything(("?????"+s).slice(-5),true);
    }
  }
  if(!h && !m) {
    wOS.resetStepCounter();
    drawDate();
  }
}

function drawDate() {
  // cool date (JA)
  //LCD.setDigitRaw(9, 0x54);
  //LCD.setDigitRaw(10, 0x5415);
  LCD.setDigitRaw(9, 0x5401);
  LCD.setDigitRaw(10, 0x5441);
  let dt = Date().getDate();
  LCD.setDigit(11, Math.floor(dt/10), false);
  LCD.setDigit(12, dt%10);
}


let drawBkgd = () => {
  g.setColor(.4,.6,.4).fillRect(0,0,239,239);
  //setDigitRaw(0, 0x4441);  //[
  //setDigitRaw(3, 0x55);  //]
};


require("FontDylex7x13").add(Graphics);
g.setFont("Dylex7x13",2).setFontAlign(0,0);

function showMsg(m) {
  LCD.setEverything('?????'); // clear the bottom field of 5
  g.setBgColor(1,1,1).setColor(0);
  m.split('|').forEach((s,i)=>{g.drawString(s,120, 178+i*20, true);});
  [400,800,1200,2000,2400].forEach((t) => {setTimeout(Bangle.buzz, t, 175);});
  _C.inMsg = true;
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

exports.start = () => {
  LCD.setEverything('?????????????');
  _C.clkint=setInterval(clock, 60000);
  clock();
  drawDate();

  _C.tikint = setInterval(()=>{
    LCD.setDigit(7, _C.min10, (Date().getSeconds() % 2) ? false : true);
  }, 1000);
};

exports.stop = () => {
    if(_C.clkint) clearInterval(_C.clkint);
    if(_C.tikint) clearInterval(_C.tikint);
};

exports.click = () => {   
    if(!wOS.awake) wOS.wake();
    else {
        drawBkgd();
        _C.inMsg = false;
    }
};

