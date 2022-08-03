
/*
D2   board HR_IN
D3   HRS3300 CLK (I2C) (pairs with D47) / board SCL
D4   SC7A20 CLK (I2C) (pairs with D27) / ??? SPI Flash CLK
D5   SPI Flash CS
D6   SPI Flash IO1 / SO
D7   GC9A01 Display SPI DC
D8   GC9A01 Display SPI CS

D9
D10
D11  TP Interrupt
D12  TP Power (set to power TP)
D13
D14  GC9A01 Display SPI CLK
D15  GC9A01 Display SPI IO
D16  Display ????

D17
D18
D19  SC7A20 Interrupt
D20  board HR_3V3
D21
D22  Charging (on == HIGH)
D23  TP Reset / board TP_3V0
D24  LCD Backlight (analog)

D25  GC9A01 Display SPI ENable
D26
D27  SC7A20 DATA (I2C) (pairs with D4) / ??? SPI Flash IO0 / SI 
D28
D29
D30
D31  Battery level (analog  low = 0.542, high =  0.721)
D32  Buzzer (analog)

D33
D34
D35
D36  Display ????
D37  Display ????
D38  GC9A01 Display SPI Reset
D39
D40  IT7529 TP DATA (I2C) / board SDA1

D41  IT7529 TP CLK (I2C) / board SCL1
D42
D43
D44  BTN1 (normal == LOW)
D45
D46
D47  HRS3300 DATA (I2C) (pairs with D3) / board SDA
*/

let battLevel = () => { 
  return analogRead(D31).toFixed(6);
};

delayms = (ms) => {
  digitalPulse(D2,0,[ms,0]); // D2 is unused?
};

wOS = {
  time_left: 0,
  brightLevel: .75,
  buzz: (ms) => {  D32.set(); delayms(ms); D32.reset(); },
  setLCDBrightness: (v) => { analogWrite(D24,v); },
};

if (_S.read("lcd.js")) eval(_S.read("lcd.js"));
// g should be set
// setup accel i2c
//var wOSI2C = new I2C();
//wOSI2C.setup({scl:D7,sda:D6,bitrate:200000});

if (_S.read("accel.js")) eval(_S.read("accel.js"));
// accel should be init'd
if (_S.read("it7259.js")) eval(_S.read("it7259.js"));


ACCEL.on("faceup", ()=>{
  g.lcd_wake();
  wOS.setLCDBrightness(wOS.brightLevel);
  TC.start();
  setTimeout(()=> {
    g.lcd_sleep();
    wOS.setLCDBrightness(0);
    TC.stop();
  }, 10000);
});
E.showMessage = function(msg,title) {};
E.setTimeZone(-4);
let batLo = 0.542, batHi = 0.721;
E.getBattery = () => {
  let pct = Math.floor((analogRead(D31) - batLo) * 100 / (batHi-batLo));
  return (pct > 100) ? 100 : pct;
};

// Bangle up
Bangle = wOS;
