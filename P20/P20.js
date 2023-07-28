/* P20 startup code
** Custom pin setup for this watch
*/

eval(_S.read("lcd.js"));
g = GC9A01({SCK:D8,IO: D9,DC:D6,CS:D14, RST:D7});
 
pinMode(D15, "output");
pinMode(D16, "output");
D15.write(1);
D16.write(1);
pinMode(D5, "output");
D5.write(0);
//D23.write(0); ?? D24?
// set CSs high
//D14.set();
//D20.set();

eval(_S.read("accel.js"));
//let i2c = new I2C();
//i2c.setup ({sda: D15, scl: D16});
//ACCEL = SC7A20({I2C: i2c, ADDR: 0x18, INT: D5});

//eval(_S.read("touch.js"));
//i2c = new I2C();
//i2c.setup ({sda: D10, scl: D11});
//TC.init({I2C: i2c, ADDR: 0x15, INT: D12, RST:D13});
TC = { stop: ()=>{} };

eval(_S.read("hrs.js")); //just shuts down the LED
wOS = {
  BKL: D4,
  BUZ: D22,
  BAT: D30,
  CHG: D3, 
  time_left: 0,
  tikint: 0,
  awake: false,
  buzz: (ms)=> {wOS.BUZ.set(); setTimeout(()=>{wOS.BUZ.reset();},ms?ms:250);},
  isCharging: ()=>{return !wOS.CHG.read();},
  wake: ()=> {
    g.lcd_wake();
    wOS.BKL.set(); // make this smarter
    wOS.emit("wake");
    wOS.time_left = 10;
    //print(`TL: ${wOS.time_left}`);
    wOS.awake = true;
    if(!wOS.tikint) wOS.tikint = setInterval(wOS.tick, 1000);
  },
  tick: (t)=> {
    wOS.emit("tick");
    if(typeof(wOS.time_left) === "undefined") wOS.time_left = 10;
    //print(`Tick: ${wOS.time_left}`);
    if(--wOS.time_left <= 0) {
      wOS.sleep();
      clearInterval(wOS.tikint);
      wOS.tikint = 0;
    }
  },
  sleep: ()=> {
    TC.stop();
    wOS.BKL.reset();
    g.lcd_sleep();
    wOS.awake = false;
  }
};
setWatch(()=>{
  wOS.buzz();
}, wOS.CHG, {"edge": "both", "repeat":true});
// full: 0.317. empty: 0.255 Multiplicant: 100/diff
E.getBattery = () => { return Math.floor((analogRead(wOS.BAT) - 0.255) * 1612); };
E.setTimeZone(-4);

NRF.setAdvertising({
  0x180F : [E.getBattery()] // Service data 0x180F = 95
});
  
ACCEL.on("faceup",()=>{
  if(! wOS.awake) wOS.wake();
  //else wOS.time_left = 10;
});
TC.stop();
Bangle = wOS;

//wOS.on("wake",()=>{print("WAKEY");});
//wOS.on("tick",()=>{print(`TICK`);});
