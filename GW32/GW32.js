
wOS = {
    BUZ: D32,
    CHG: D22,
    BKL: D24,
    BAT: D31,
    time_left: 0,
    buzz: (ms) => {  wOS.BUZ.set(); setTimeout(()=>{wOS.BUZ.reset();}, ms?ms:200);  },
    isCharging: ()=>{return !(wOS.CHG.read());},
    ticker: 0,
    tikint: 0,
    isAwake: false,
    sleep: ()=> {
      g.lcd_sleep();
      wOS.setLCDBrightness(0);
      wOS.emit("sleep");
      wOS.isAwake = false;
    },
    wake: ()=>{
      wOS.ticker = 7;
      if(wOS.isAwake) return;
      g.lcd_wake();
      wOS.setLCDBrightness(wOS.brightLevel());
      if(!wOS.tikint) wOS.tikint = setInterval(wOS.tick, 1000);
      wOS.emit("wake");
      wOS.isAwake = true;
    },
    tick: ()=>{
      wOS.ticker--;
      wOS.emit("tick");
      if(wOS.ticker <= 0){
        clearInterval(wOS.tikint);
        wOS.tikint = 0;
        wOS.sleep();
      }
    },
    brightLevel: ()=> { 
      let c=Math.floor(Date().getHours()/3);
      return [0.55,0.75,0.8,0.99][c > 3 ? 7-c : c]; 
    },
    setLCDBrightness: (lvl)=>{analogWrite(wOS.BKL, lvl);},
  };
  
  wOS.BUZ.reset(); // in case we go nuts on start up
  
  if (_S.list().includes("lcd.js")) eval(_S.read("lcd.js"));
  if (_S.list().includes("~SC7A20.js")) eval(_S.read("~SC7A20.js"));
  //ACCEL={};
  ACCEL.on("faceup", wOS.wake);
  
  setWatch(()=>{wOS.buzz();}, wOS.CHG, {"edge":"both", "repeat":true});
  Bangle = wOS;
  wOS.UI = {};
  logD = ()=>{};
  
  
  // battery is D31, lo = 0.542, high = 0.721
  //E.getBattery = () => { return (analogRead(wOS.BAT)-0.54)*555; };
  let batLo = 0.542, batHi = 0.721;
  E.getBattery = () => {
    let pct = Math.floor((analogRead(wOS.BAT) - batLo) * 100 / (batHi-batLo));
    return (pct > 100) ? 100 : pct;
  };
  
  
  wOS.setStepCount = (n) => {};
  wOS.getStepCount = () => { return 0; };
  
  setInterval(()=>{  // advertise battery level every 5 min
    NRF.setAdvertising({0x180F : [E.getBattery()] });
  }, 300000);
  
  // MANAGE EVENTS
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
      //BUTTON.emit('longpress');
      wOS.UI.emit('longpress');
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
      //BUTTON.emit('dbltap');
      wOS.UI.emit('dbltap');
      BUTTON.dbltap = false;
    } else if (BUTTON.watchUp) {
      BUTTON.tapTO = setTimeout(function(){
        // long press behaviour
        //BUTTON.emit('tap');
        wOS.UI.emit('tap');
        BUTTON.tapTO = 0;
        BUTTON.dbltap = false;
      }, BUTTON.tapTime);
      logD(`lpto=${BUTTON.tapTO}`);
    }
    BUTTON.lastUp = b.time;
    setWatch(btnDown, BTN1, BUTTON.downOpts);
  };
  
  setWatch(btnDown, BTN1, BUTTON.downOpts);