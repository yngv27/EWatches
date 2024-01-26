//exports = {};
if(typeof(LCD)==="undefined")   
    var LCD=require("seglcd.js").init({EN:D15, RST:D30, i2c:wOS.I2C});

let _C = {
    min10: 0, // keep track of digit 7 for flashing the colon
    tikint: 0,
    clkint: 0,
    //inMsg: false,
};


exports.drawClock = (dt) => {
  /*
  let h = Date().getHours(), m = Date().getMinutes();
  //g.drawImage(_S.read("minHand2"), 120, 120, {rotate: Math.PI * m / 30});
  //g.drawImage(_S.read("hrHand2"), 120, 120, {rotate: Math.PI * (h * 60 + m) / 360});
  h = h%12; // no 24 hour
  if(!h) h=12;
  */
  if(dt.hr > 9)   LCD.setDigit(5, 1);
  else LCD.setDigit(5, 15); // clear
  LCD.setDigit(6, dt.hr%10, true);
  _C.min10 = Math.floor(dt.min/10);
  LCD.setDigit(7, _C.min10, true);
  LCD.setDigit(8, dt.min%10);
  
}

let drawDate = () => {
  print("DrawDate called alright...");
  let mon = Date().getMonth()+1;
  print(`mon = ${mon}`);
  LCD.setDigit(9, Math.floor(mon/10));
  LCD.setDigit(10, mon%10);
  let dt = Date().getDate();
  print(`dt = ${dt}`);
  LCD.setDigit(11, Math.floor(dt/10), true);
  LCD.setDigit(12, dt%10);
}

exports.drawDate = drawDate;
exports.drawData = (dt) => {
  // draw battery on the hour, else step count
  if((dt.min % 60) == 0) {
    /*
    s = E.getBattery().toString();
    LCD.setDigitRaw(0, 0x5450);  //b
    LCD.setDigitRaw(1, 0x5050);  //a
    LCD.setDigitRaw(2, 0x5440);  //t
    LCD.setDigit(3, Math.floor(s/10));
    LCD.setDigit(4, s%10);
    */
    let s = "<"+Math.floor(analogRead(wOS.BAT)*10000).toString();
    LCD.setEverything(s);
    icon = false;
    Bangle.buzz();
  } else {
    let s = wOS.getStepCount().toString();
    LCD.setEverything(("?????"+s).slice(-5), true);
  }

  if(!dt.hr && !dt.min) {
    wOS.resetStepCounter();
    drawDate();
  }
}

//require("FontDylex7x13").add(Graphics);
//g.setFont("Dylex7x13",2).setFontAlign(0,0);

function showMsg(m) {
  LCD.setEverything('?????'); // clear the bottom field of 5
  g.setColor(0.75,0.75,1).fillRect(0, 165, 239, 239).setColor(0);
  let y=170;
  let mstr = ''; 
  m.text.split(' ').forEach((w)=>{
    if(g.stringWidth(mstr+w) > 240 || w == '|') {
      g.drawString(mstr, 120, y);
      mstr='';
      y+=g.getFontHeight();
    }
    if(w != '|') mstr += w + ' ';
  });
  g.drawString(mstr, 120, y);
//  m.split('|').forEach((s,i)=>{g.drawString(s,120, 178+i*20, false);});
  //_C.inMsg = true;
}

exports.showMsg = (m) => showMsg(m);

exports.drawBkgd = () => {
  LCD.setEverything('?????????????');
  g.setBgColor(0.5,0.5,0.5).clear();
  drawDate();
/* save power
  _C.tikint = setInterval(()=>{
    LCD.setDigit(7, _C.min10, (Date().getSeconds() % 2) ? false : true);
  }, 1000);
  */
};
/*
exports.stop = () => {
    if(_C.clkint) clearInterval(_C.clkint);
    //if(_C.tikint) clearInterval(_C.tikint);
};

exports.click = () => {   
    if(!wOS.awake) wOS.wake();
    else {
        drawBkgd();
        _C.inMsg = false;
    }
};
*/
