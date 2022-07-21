
E.kickWatchdog();
function KickWd(){
  E.kickWatchdog();
}
var wdint=setInterval(KickWd,2000);
E.enableWatchdog(15, false);

let _S = require("Storage");
eval(_S.read("lcd.js"));
eval(_S.read("accel.js"));
eval(_S.read("hrs.js"));
E.getBattery = () => { return Math.floor((analogRead(D30) - 0.255) * 1613); };
pinMode(D25,"input_pullup");
pinMode(D26,"input_pullup");


require("FontDylex7x13").add(Graphics);
setfont = (sz) => {g.setFont("Dylex7x13", sz);};

E.setTimeZone(-4);
g.setFontAlign(0,0);


let bx=128, by = 15;
//g.setColor(1,1,1).fillRect(bx,by+1,bx+29,by+14).fillRect(bx+1,by,bx+28,by+15).fillRect(bx+30,by+3,bx+32,by+12);

function drawBattery(b) {
  g.setColor(0.6, 0.57, 0.4).fillRect(bx,by+1,bx+29,by+14);
  g.fillRect(bx+1,by,bx+28,by+15).fillRect(bx+30,by+3,bx+32,by+12);
  g.setColor(0.2, 0.25, 0.2).fillRect(bx+1,by+1,bx+28,by+14);
  g.setColor(0.6, 0.57, 0.4);
  if(b > 25) g.fillRect(bx+2,by+2,bx+9,by+13);
  if(b > 50) g.fillRect(bx+11,by+2,bx+18,by+13);
  if(b > 75) g.fillRect(bx+20,by+2,bx+27,by+13);
}

function clock() {
  wOS.awake = true;
  g.clear();
  let dt=Date();
  setfont(2);
  g.setColor(0.2, 0.25, 0.2).fillRect(0,0,239,40);
  drawBattery(E.getBattery());
  g.drawString('P20', 94, 24);
  setfont(6);
  g.setColor(0.95, 0.9, 0.6).drawString(dt.toString().slice(16,21), 120, 120);
  setfont(2);
  g.setColor(0.6, 0.57, 0.4).drawString(dt.toString().slice(4,15), 120, 180);
  for(y=0; y<6; y++) {
    g.setColor(0.5*y/5, 0.5*y/5, 0.4*y/5).drawPolyAA([0,240-y*4,120,220-y*4,239,240-y*4], false);
    //print(y);
  }
  g.lcd_wake();
  setTimeout(()=>{
    g.lcd_sleep();
    wOS.awake = false;
  }, wOS.ON_TIME*1000);

}

ACCEL.on("faceup",()=>{
  print(`0: ${JSON.stringify(ACCEL.read())}`);
  setTimeout(()=> {
    let xyz = ACCEL.read();
  print(`1: ${JSON.stringify(xyz)}`);
    if(xyz.x > 400 && xyz.x < 800 && xyz.y < 300 && xyz.y > -200 && xyz.z > 0) {
      clock();
    }
  }, 500);
});
setWatch(clock, D25, {repeat:true, edge:"falling"});
