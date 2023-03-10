//exports = {};
if(typeof(LCD)==="undefined")   
    var LCD=require("seglcd.js").init({EN:D15, RST:D30, i2c:wOS.I2C});

let _C = {
    min10: 0, // keep track of digit 7 for flashing the colon
    tikint: 0,
    clkint: 0,
    inMsg: false,
};

function drawBkgd() {
  g.setBgColor(0.5,0.5,0.5).clear();
}
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
  //LCD.setDigitRaw(9, 0x5401);
  //LCD.setDigitRaw(10, 0x5441);
  // crappy "M"
  LCD.setDigitRaw(9, 0x4405);
  LCD.setDigitRaw(10, 0x0415);
  let dt = Date().getDate();
  LCD.setDigit(11, Math.floor(dt/10), false);
  LCD.setDigit(12, dt%10);
}

require("FontDylex7x13").add(Graphics);
g.setFont("Dylex7x13",2).setFontAlign(0,0);

function showMsg(m) {
  LCD.setEverything('?????'); // clear the bottom field of 5
  g.setColor(0.75,0.75,1).fillRect(0, 165, 239, 239).setColor(0);
  m.split('|').forEach((s,i)=>{g.drawString(s,120, 178+i*20, false);});
  [400,800,1200,2000,2400].forEach((t) => {setTimeout(Bangle.buzz, t, 175);});
  _C.inMsg = true;
}

exports.showMsg = (m) => showMsg(m);

exports.start = () => {
  LCD.setEverything('?????????????');
  drawBkgd();
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

