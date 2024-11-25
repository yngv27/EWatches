
E.showMessage = function(msg,title) {};
delayms = (ms) => {
  digitalPulse(D4,0,ms); // just to wait ms - D4 is a "dummy" (broken button)
  digitalPulse(D4,0,0);
};
wOS = {
  BUZ: D6,
  CHG: D8,
  BAT: D30,
  buzz: (ms) => {  wOS.BUZ.reset(); setTimeout(()=>{wOS.BUZ.set();}, ms?ms:200);  },
  isCharging: ()=>{return !(wOS.CHG.read());},
};

wOS.BUZ.set(); // in case we go nuts on start up

setWatch(()=>{wOS.buzz();}, wOS.CHG, {"edge":"both", "repeat":true});
logD = ()=>{};

// battery is D2, hi=0.347 lo=0.275
E.getBattery = () => { 
  var l=3.5,h=4.19;
  v=4.20/0.59*analogRead(wOS.BAT);
  if(v>=h)return 100;
  if(v<=l)return 0;
  return 100*(v-l)/(h-l);
}
wOS.setStepCount = (n) => {};
wOS.getStepCount = () => { return 0; };

// we're "special"
NRF.setAdvertising({},{name:"QY03X "+NRF.getAddress().split(':').slice(-2).join('')});

setInterval(()=>{  // advertise battery level every 5 min
  NRF.setAdvertising({0x180F : [E.getBattery()] });
}, 300000);
/*
// The 2.13 E-ink display
var spi1 = new SPI();
spi1.setup({sck: D45, mosi: D2, baud: 2000000});
//DC = D44;
//RST=D47;
D3.reset();  // "CS"

var g = require("~SSD1681.js").connect({spi: spi1, cs: 0, dc: D44, rst: D47, width: 128, height: 250}, ()=>{
  g.setRotation(3,1);
  g.getHeight = () => {return 122;};
  g.setBgColor(1).setColor(0);
  g.clear();
  g.flip();
});
*/