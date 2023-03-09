//exports = {};

if(typeof(LCD)==="undefined")   
    var LCD=require("seglcd.js").init({EN:D15, RST:D30, i2c:wOS.I2C});


let _C = {
    elapsed: 0,
    min10: 0, // keep track of digit 7 for flashing the colon
    tikint: 0,
    clkint: 0,
};


function clock() {
  let h = Date().getHours(), m = Date().getMinutes();
  //g.drawImage(_S.read("minHand2"), 120, 120, {rotate: Math.PI * m / 30});
  //g.drawImage(_S.read("hrHand2"), 120, 120, {rotate: Math.PI * (h * 60 + m) / 360});
  LCD.setDigit(9, Math.floor(h/10));
  LCD.setDigit(10, h%10, true);
  _C.min10 = Math.floor(m/10);
  LCD.setDigit(11, _C.min10, false);
  LCD.setDigit(12, m%10);
  if(!h && !m) {
    wOS.resetStepCounter();
  }
}

/*
setDigitRaw(0, 0x5450);  //b
setDigitRaw(1, 0x5050);  //a
setDigitRaw(2, 0x5440);  //t
*/

function display() {
    let emin=Math.floor(_C.elapsed / 60);
    let esec = _C.elapsed % 60;
    LCD.setDigit(5, Math.floor(emin/10));
    LCD.setDigit(6, emin%10);
    es10 = Math.floor(esec/10);
    LCD.setDigit(7, es10, true);
    LCD.setDigit(8, esec%10);
    setTimeout((d)=>{LCD.setDigit(7, d, false);},500,es10);
    if(_C.elapsed % 600 == 0) {
        [10,250].forEach((t) => {setTimeout(Bangle.buzz, t, 125);});
    } else if(_C.elapsed % 300 == 0) {
        Bangle.buzz(250);
    }
}


exports.start = () => {
    LCD.setEverything('?????????????');
    //STOP or SW
    LCD.setDigitRaw(0, 0x1451);
    LCD.setDigitRaw(1, 0x4450);
    LCD.setDigitRaw(2, 0x4054);
    //LCD.setDigit(1, 7);
    //LCD.setDigitRaw(2, 0x1);
    //LCD.setDigit(3, 0);
    //LCD.setDigitRaw(4, 0x5405);

    clock();
    _C.clkint=setInterval(clock, 60000);
    display();

    g.clear().setColor(.5,.5,.5).fillRect(0,0,239,239);
};
exports.stop = () => {
    if(_C.clkint) clearInterval(_C.clkint);
    if(_C.tikint) clearInterval(_C.tikint);
    if(_C.watch) clearWatch(_C.watch);
}
exports.click = () => {
    if(!wOS.awake) wOS.wake();
    else if (!_C.tikint) {
    if(_C.elapsed) {
        //clear
        _C.elapsed=0;display();
    } else {
        //start
        _C.tikint = setInterval(()=>{
        display(_C.elapsed++);
        if(_C.elapsed >= 100*60) {
            Bangle.buzz(500);
            _C.elapsed=0;
        }
        }, 1000);
    }
    } else {
    //stop
    clearInterval(_C.tikint);
    _C.tikint=0;
    }
};
  