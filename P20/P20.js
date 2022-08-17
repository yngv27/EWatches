// P20 startup code
eval(_S.read("lcd.js"));
eval(_S.read("accel.js"));
eval(_S.read("touch.js"));
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
// full: 0.307. empty: 0.255
E.getBattery = () => { return Math.floor((analogRead(wOS.BAT) - 0.255) * 1923); };
E.setTimeZone(-4);

ACCEL.on("faceup",()=>{
  if(! wOS.awake) wOS.wake();
  //else wOS.time_left = 10;
});
TC.stop();
Bangle = wOS;
