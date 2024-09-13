//*
const startX=[24,44,74,94],startY=[8,8,8,8];
let rotate=!1,xS=1,yS=1;
function setScale(t,r){xS=t;yS=r;}
function drawScaledPoly(r,n,a){
  let d=[];
  for(let t=0;t<r.length;t+=2){
    var e;
    d[t]=Math.round(r[t]*xS)+n;
    d[t+1]=Math.round(r[t+1]*yS)+a;
//    rotate&&(e=d[t],d[t]=80-d[t+1],d[t+1]=e)
  }
  g.fillPoly(d,!1);
}
let d0=new Uint8Array([0,4,4,0,32,0,36,4,36,65,25,65,25,5,11,5,11,65,36,65,36,66,32,70,4,70,0,66]);
d1=new Uint8Array([7,4,11,0,20,0,24,4,24,70,13,70,13,5,7,5]);
d2=new Uint8Array([0,4,4,0,32,0,36,4,36,34,32,38,11,38,11,65,36,65,36,66,32,70,0,70,0,36,4,32,25,32,25,5,0,5]);
d3=new Uint8Array([0,4,4,0,32,0,36,4,36,66,32,70,4,70,0,66,0,65,25,65,25,38,0,38,0,32,25,32,25,5,0,5]);
d4=new Uint8Array([0,4,4,0,11,0,11,32,25,32,25,0,32,0,36,4,36,70,25,70,25,38,0,38]);
d5=new Uint8Array([0,0,32,0,36,4,36,5,11,5,11,32,32,32,36,36,36,66,32,70,4,70,0,66,0,65,25,65,25,38,0,38]);
d6=new Uint8Array([0,4,4,0,32,0,36,4,36,5,11,5,11,65,25,65,25,38,11,38,11,32,32,32,36,36,36,66,32,70,4,70,0,66]);
d7=new Uint8Array([0,4,4,0,32,0,36,4,36,70,25,70,25,5,0,5]);
d8=new Uint8Array([0,4,4,0,32,0,36,4,36,32,33,35,36,38,36,66,32,70,18,70,18,65,25,65,25,38,18,38,18,32,25,32,25,5,11,5,11,32,18,32,18,38,11,38,11,65,18,65,18,70,4,70,0,66,0,38,3,35,0,32]);
d9=new Uint8Array([0,4,4,0,32,0,36,4,36,66,32,70,4,70,0,65,0,65,25,65,25,5,11,5,11,32,25,32,25,38,4,38,0,34]);
function drawDigit(t,r,n){let a=startX[t];t=startY[t];drawScaledPoly([d0,d1,d2,d3,d4,d5,d6,d7,d8,d9][r],a,t);}

function clock() {
  g.clearRect(0,0,127, 50);
  let dt= Date().toString();
  let idx=16;
  if(dt[9]==' ') idx--;
  drawDigit(0,dt[idx]);
  drawDigit(1,dt[idx+1]);
  drawDigit(2,dt[idx+3]);
  drawDigit(3,dt[idx+4]);
  g.flip();
  
}
Graphics.prototype.setFont6x8r=function(scale){this.setFontCustom(
    atob("AAAAAAB6AA4AAOAAAkH4JB+CQAAkFI/xSAwADCMwEBmIYAAMFIshMBIADgAAfiBAAgR+AACAqBwKgIAACAID4CAIAAAQGAACAIAgCAAAYAADAwMDAAAfCKJIoh8AAQj+AIABGIokiSGIABEIIkiSGwAAcCQRD+AQADkKIoiiJwAB8KIoiiBwACAIYiCQOAABsJIkiSGwABwIoiiKHwAA2AAAQ2AACAUCIQQABQFAUBQABBCIFAIAAQCAIokBgAAfiBJkpR9AABg4MgOAGAA/iSJIkhsAAfCCIIghEAA/iCIIRA4AA/iSJIggAP4kCQIAAB8IIkiSBwAD+BAED+AAgj+IIAAEAIAj8AA/gQCgRCCAA/gCAIAgAP4QAgEA/gAP4IAQAg/gAHwgiCIIfAAP4iCIIgcAAHwgiCIQewAP4kCYJQYgAGQkiSJITAAIAgD+IAgAAPwAgCAI/AAPADACAw8AAPgBgcAY+AAMYKAQCgxgAOAEAOBA4AAIYiiSKIwgAP8gQAMAMAMAMACBP8AAwMAMAAAEAQBAEACAEAAAcCIIg+AA/giCIHAABwIgiBQAAcCIIj+AAHAqCoGAACAfigAAHAiiKPwAP4IAgB4AC+AAIS+AA/gIBQIgAPwAgAD4IAeCAHgAD4IAgB4AAcCIIgcAAP4iCIHAABwIgiD+AA+BAIAABoKgqAwAAgPwIgADwAgCD4AA4AYBA4AAOAGAgBg4AAJgYBgJgADwAoCj8AAiCYKgyAAaycgA/wAJyawADAQAgBAYAAP///8="), 32, 
    atob("AwMEBQcGBgIDAwYGAwUCBQYEBgYGBgYGBgYCAwUFBQYGBgYGBgUFBgUEBQYFBgYGBgYGBgYGBgYGBgYDBQMEBQMFBQUFBQQFBQIDBQMGBQUFBQQFBAUFBgUFBQMCAwY="),
     10+(scale << 8)+(1 << 16));};

scale=1;
function duh() {
  g.clear().setContrast(0.65); setScale(0.5,0.5);
  y=0;
  g.drawString("I do wonder how many characters", 0, y);
  y += 10;
  g.drawString("or indeed WORDS, y'all can fit", 0, y);
  y += 10;
  g.drawString("on this TINY widow skween?", 0, y);
  y += 10;
  g.drawString("Could it be ~83,407?", 0, y);
  y += 10;
  g.flip();
  }

setWatch(()=>{analogWrite(D30, 0.05); setTimeout(()=>{D30.reset();}, 5000);}, BTN2, {edge:"rising", repeat:true});
g.setFont("6x8r");

let list = {};
function found(d) {
  if(d.name != 'undefined') {
    let key = d.name;
    list[key] = d.rssi;
  }
}
function dump() {
  let k = Object.keys(list);
  g.clear();
  for(let i=0; i<Math.min(5,k.length); i++) {
    g.drawString(k[i]+": "+list[k[i]], 0, i*12);
  }
  g.flip();
}
var y0 = 0;
var whitelist = {};
NRF.on("connect",(addr)=>{
  if(addr != "dc:71:96:ea:a0:46 public") {
    NRF.disconnect();
    return;
  }
  whitelist[addr]=1;
  g.clear();
  y0=0;
  Object.keys(whitelist).forEach((a)=>{g.drawString(a, 0, y0+=12);});
  g.flip();
});


