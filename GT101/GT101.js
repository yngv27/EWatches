global.wOS = {
    CHG: D13,
    BAT: D2,
    BUZ: D28,
    BKL: D29,
    ON_TIME: 10,
    BRIGHT: 0.75,
    FACEUP:true,
    VIBRATE:true,
    awake : true,
    time_left:10,
    ticker:undefined,
    settings:undefined,
    buzz: function(v, i){
        return new Promise(function(resolve, reject) {
            v = v? v : 100;
            i=i?i:1.0; // intensity
            if (!wOS.VIBRATE) resolve();
            else if (v<=50){
                digitalPulse(wOS.BUZ,true,v);
                resolve();
            } else {
                //analogWrite(wOS.BUZ,i);
                wOS.BUZZPIN.set();
                setTimeout(()=>{wOS.BUZ.reset();resolve();},v);
            }
        });
    },
    isCharging:()=>{return wOS.CHG.read();},
  
  //screen brightness function
    brightness: (v) => {
      // analog buzz requies a hard reset for BKLT -- ??
      //wOS.BKL.reset();
      analogWrite(wOS.BKL,v*0.7);
    },
  
    setLCDTimeout:(v)=>{wOS.ON_TIME=v<5?5:v;},
    setLCDBrightness:(v)=>{wOS.BRIGHT=v; wOS.brightness(v);},
  
    sleep:() => {
        wOS.awake = false;
        wOS.brightness(0);
        wOS.emit("lcdPower",false);
        g.flip(); //make sure finished with SPI before stopping it.
        g.lcd_sleep();
       // setTimeout(anom89,100);
    },
    bright:()=>{
      //var blevel = new Uint8Array([1,1,1,1,1,2,2,9,9,9,9,9,9,9,9,9,9,9,9,7,7,2,1,1]);
      //var hrs = Date().getHours();
      wOS.brightness(Uint8Array([1,1,1,1,1,2,2,9,9,9,9,9,9,9,9,9,9,9,9,7,7,2,1,1])[Date().getHours()]/10);
    },
    wake:()=> {
        wOS.awake = true;
        wOS.time_left = wOS.ON_TIME;
        g.lcd_wake();
        wOS.emit("lcdPower",true);
        wOS.bright();
        if(wOS.ticker) 
          wOS.time_left += 5;
        else 
          wOS.ticker = setInterval(wOS.tick,1000);
    },
    setLCDPower:(b)=>{
        if (b){
            if (wOS.awake) wOS.time_left = wOS.ON_TIME; else wOS.wake();
        } else 
            wOS.sleep();
    },
    isLCDOn:()=>{ return wOS.awake;},
    tick:()=>{
        wOS.time_left--;
        if (wOS.time_left<=0){
           if (wOS.ticker) wOS.ticker=clearInterval(wOS.ticker);
           wOS.emit("sleep",true);
           wOS.sleep();
        }
    }
  };
  
  /*
  var fc=new SPI(); // font chip - 2MB SPI flash
  D22.write(1);
  fc.setup({sck:D21,miso:D18,mosi:D20,mode:0});
  fc.send([0xb9],D17); //put to deep sleep
  */
  /*
  print(fc.send([0xab],D17)); // wake from deep sleep
  print(fc.send([0x90,0,0,1,0,0],D17));
  print(fc.send([0x9f,0,0,0],D17));
  print(fc.send([0xb9],D17)); // put to deep sleep
  var w25 = require("W25");
  var fc = new w25(fc, D23 );
  */
  setWatch(()=>{
    if(!wOS.awake) wOS.wake();
    wOS.buzz();
    wOS.emit("charging",wOS.isCharging());
  },wOS.BATPIN,{edge:"both",repeat:true,debounce:500});
  
   
  //AC = require("~KX022.js").init({i2c:wOS.i2c, intpin:D1});
  //eval(_S.read("~BMA222.js"));
  //AC=ACCEL;

  
  eval(_S.read("~ST7735.js"));
  g = ST7735();
  
  E.getBattery = function (){
    let l=3.5,h=4.19;
    let v=4.20/0.320*analogRead(wOS.BAT);
    if(v>=h)return 100;
    if(v<=l)return 0;
    return Math.floor(100*(v-l)/(h-l));
  };
  
  wOS.steps = 0;
  wOS.getStepCount = () => {return wOS.steps;};
  wOS.setStepCount= (s) => {wOS.steps = s;};
  wOS.resetStepCounter = () => { wOS.setStepCount(0); };
  AC.on("STEP", ()=>{wOS.steps++;});
  AC.on("FACEUP", wOS.wake);
  wOS.showLauncher = function(){
    //load("launch.js");
  };
  wOS.UI = {};
  
  global.Bangle = wOS;
  logD = print;
  
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
  
  
  