Graphics.prototype.setFont6x8r=function(scale){this.setFontCustom(
    atob("AAAAAAB6AA4AAOAAAkH4JB+CQAAkFI/xSAwADCMwEBmIYAAMFIshMBIADgAAfiBAAgR+AACAqBwKgIAACAID4CAIAAAQGAACAIAgCAAAYAADAwMDAAAfCKJIoh8AAQj+AIABGIokiSGIABEIIkiSGwAAcCQRD+AQADkKIoiiJwAB8KIoiiBwACAIYiCQOAABsJIkiSGwABwIoiiKHwAA2AAAQ2AACAUCIQQABQFAUBQABBCIFAIAAQCAIokBgAAfiBJkpR9AABg4MgOAGAA/iSJIkhsAAfCCIIghEAA/iCIIRA4AA/iSJIggAP4kCQIAAB8IIkiSBwAD+BAED+AAgj+IIAAEAIAj8AA/gQCgRCCAA/gCAIAgAP4QAgEA/gAP4IAQAg/gAHwgiCIIfAAP4iCIIgcAAHwgiCIQewAP4kCYJQYgAGQkiSJITAAIAgD+IAgAAPwAgCAI/AAPADACAw8AAPgBgcAY+AAMYKAQCgxgAOAEAOBA4AAIYiiSKIwgAP8gQAMAMAMAMACBP8AAwMAMAAAEAQBAEACAEAAAcCIIg+AA/giCIHAABwIgiBQAAcCIIj+AAHAqCoGAACAfigAAHAiiKPwAP4IAgB4AC+AAIS+AA/gIBQIgAPwAgAD4IAeCAHgAD4IAgB4AAcCIIgcAAP4iCIHAABwIgiD+AA+BAIAABoKgqAwAAgPwIgADwAgCD4AA4AYBA4AAOAGAgBg4AAJgYBgJgADwAoCj8AAiCYKgyAAaycgA/wAJyawADAQAgBAYAAP///8="), 32, 
    atob("AwMEBQcGBgIDAwYGAwUCBQYEBgYGBgYGBgYCAwUFBQYGBgYGBgUFBgUEBQYFBgYGBgYGBgYGBgYGBgYDBQMEBQMFBQUFBQQFBQIDBQMGBQUFBQQFBAUFBgUFBQMCAwY="),
     10+(scale << 8)+(1 << 16));};
g.setFont6x8r();
let CLIK = {
    server: "ca:f6:59:bd:e3:5e random", // Schedule
    srvS: "ca:f6:59:bd:e3:5e random", // Schedule
    srvD: "e2:96:8a:4f:49:3a random", // Deskpal
    LED1: 0,
    LED2: 0,
    LED3: 0,
    log : [],
    gatt: 0,
    lpp: 5,

  blink: function(thing, num) {},
  sleep: function() {
    g.flip(); 
    setTimeout(()=>{
      D30.reset(); 
      g.sleep();
    }, 15*1000); 
  },
  
  debug: function(m) {
    CLIK.log.push(m);
    if(CLIK.log.length > CLIK.lpp) CLIK.log.shift();
    g.clear(); g.drawString( CLIK.log.join("\n"), 0, 0);
  },
  sendCmd: function (cmd) {
    //debug = CLIK.debug;
    CLIK.debug("CMD");
    let busy = true;
    var gatt;
    NRF.wake();
    NRF.setTxPower(4);
    NRF.connect(this.server,{minInterval:7.5, maxInterval:7.5}).then( function (gt) {
      CLIK.gatt = gt;
      CLIK.debug("SVC");
      return CLIK.gatt.getPrimaryService(0xf000);
    }).then(function(svc) {
      _svc = svc;
      CLIK.debug("CHR");
      return svc.getCharacteristic(0xf001);
    }).then(function(chr) {
      CLIK.debug("Listen");
      //_chr = chr;
      chr.on('characteristicvaluechanged', function(event) {
        CLIK.debug(E.toString(event.target.value.buffer));
        CLIK.blink(this.LED2,1);
        NRF.setTxPower(0);
        if(CLIK.gatt) { 
          CLIK.gatt.disconnect().then(function() {
            CLIK.debug("Sleep");
            CLIK.sleep();
          }); 
          CLIK.gatt="";
        }
      });
      return(chr.startNotifications());
    }).then(function () {
      // now the WRITEABLE char
      CLIK.debug("CHW");
      return _svc.getCharacteristic(0xf002);
    }).then(function(chr) {
      CLIK.debug("SEND "+cmd);
      chr.writeValue([cmd]);
      busy=false;
    }).catch(function (e) {
      if(CLIK.gatt) { CLIK.gatt.disconnect(); CLIK.gatt="";}
      CLIK.debug("ERROR",e);
      busy=false;
      NRF.setTxPower(0);
      CLIK.blink(this.LED1,3);
      CLIK.sleep();
    }); // end NRF.requestDevice

  }
};

if(NRF.getAddress() == "e1:b3:9a:94:14:31") {
  // Pocketpal
  g.sleep = ()=>{}; g.wake = g.sleep;
  //BTN3 = D8;
  CLIK.lpp=20;
  g.flip();
  setTimeout(g.setPartial, 2500);
}
//let C=new CLICKER();
setWatch(()=>{
  analogWrite(D30, 0.25);
  g.clear().flip(); g.wake();
  CLIK.debug(Date().toString().substring(0,24));
  CLIK.sendCmd(0);
}, BTN3, {edge: "rising", repeat: true});
setWatch(()=>{
  analogWrite(D30, 0.25);
  g.clear().flip(); g.wake();
  CLIK.debug(Date().toString().substring(0,24));
  CLIK.sendCmd(1);
}, BTN1, {edge: "rising", repeat: true});
setWatch(()=>{
  analogWrite(D30, 0.25);
  g.clear().flip(); g.wake();
  CLIK.debug(Date().toString().substring(0,24));
  if(CLIK.server == CLIK.srvS) {
    CLIK.server = CLIK.srvD;
    CLIK.debug("SRV=Deskpal");
  } else {
    CLIK.server = CLIK.srvS;
    CLIK.debug("SRV=Schedule");
  }
  CLIK.sleep();
}, BTN2, {edge: "rising", repeat: true});

/*
function sleep() {
  //setTimeout(()=>{NRF.sleep();}, 20*1000); // delay 30 sec to allow for connections
}

function scan() {
  packets=10;
  NRF.findDevices(function(d) {
    console.log(d); // print packet info
  }, {interval: 25, filters: [{id:server}]});
}

function blink(led, n) {
  let dur = 1000 / n;
  while(n--) {
    setTimeout((led)=>{led.set();}, n*dur, led);
    setTimeout((led)=>{led.reset();}, n*dur + dur/2, led);
  }
}

let tap1 = ()=>{blink(LED3, 1); sendCmd(0);};
let tap2 = ()=>{blink(LED3, 2); sendCmd(1);};
let tap3 = ()=>{blink(LED3, 3); sendCmd(2);};

B = require("~SWBTN.js");
B.f = function(k){
  console.log("BTN1 detected " + k); // log key press pattern
  if (k === "L"  )  tap1();
  else if (k === "LL" )   tap2();
  else if (k === "LLL" )  tap3();
};
B.b = BTN1;
B.i = B.b.read(); // inverted btn?
B.disable(false);

*/
