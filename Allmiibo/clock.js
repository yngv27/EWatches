
let startX=[16,40,74,102],startY=[5,5,5,5];
let rotate=!1,xS=1,yS=1;
function setScale(t,r){xS=t;yS=r;}
/*
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
*/
delayms = (ms) => {
  digitalPulse(D4,0,ms); // just to wait 10ms
  digitalPulse(D4,0,0);
};
function getDigit(d) {
  os= [0, 1062, 1989, 2997, 3951, 5013, 6021, 7029, 7929, 8856, ];
  len= [1062, 927, 1008, 954, 1062, 1008, 1008, 900, 927, 1035, ];
  return(_S.read("Quick64.fnt", os[d], len[d]));
}

function clock() {
  g.clear();
  let dt= Date().toString();
  let idx=16;
  if(dt[9]==' ') idx--;
  for(let c=4, x=127; c>=0; c--) {
    if(c == 2) { 
      x-=2;
      g.fillCircle(x,20,2).fillCircle(x,40,2);
      x-= 6; 
      continue;
    }
    if(c == 0 && dt[idx+c] == '0') break;
    let img = getDigit(dt[idx+c]);
    x -= img.charCodeAt(0);
    x+=4;
    g.drawImage(img, x, 0);
    delayms(100);
  }
  /*
  drawDigit(0,dt[idx]);
  drawDigit(1,dt[idx+1]);
  drawDigit(2,dt[idx+3]);
  drawDigit(3,dt[idx+4]);
  */
  g.drawString(` ${dt.substring(0,10)} `, 64,60, true);
  g.flip();
  
}

Graphics.prototype.setFont6x8r=function(scale){this.setFontCustom(
    atob("AAAAAAB6AA4AAOAAAkH4JB+CQAAkFI/xSAwADCMwEBmIYAAMFIshMBIADgAAfiBAAgR+AACAqBwKgIAACAID4CAIAAAQGAACAIAgCAAAYAADAwMDAAAfCKJIoh8AAQj+AIABGIokiSGIABEIIkiSGwAAcCQRD+AQADkKIoiiJwAB8KIoiiBwACAIYiCQOAABsJIkiSGwABwIoiiKHwAA2AAAQ2AACAUCIQQABQFAUBQABBCIFAIAAQCAIokBgAAfiBJkpR9AABg4MgOAGAA/iSJIkhsAAfCCIIghEAA/iCIIRA4AA/iSJIggAP4kCQIAAB8IIkiSBwAD+BAED+AAgj+IIAAEAIAj8AA/gQCgRCCAA/gCAIAgAP4QAgEA/gAP4IAQAg/gAHwgiCIIfAAP4iCIIgcAAHwgiCIQewAP4kCYJQYgAGQkiSJITAAIAgD+IAgAAPwAgCAI/AAPADACAw8AAPgBgcAY+AAMYKAQCgxgAOAEAOBA4AAIYiiSKIwgAP8gQAMAMAMAMACBP8AAwMAMAAAEAQBAEACAEAAAcCIIg+AA/giCIHAABwIgiBQAAcCIIj+AAHAqCoGAACAfigAAHAiiKPwAP4IAgB4AC+AAIS+AA/gIBQIgAPwAgAD4IAeCAHgAD4IAgB4AAcCIIgcAAP4iCIHAABwIgiD+AA+BAIAABoKgqAwAAgPwIgADwAgCD4AA4AYBA4AAOAGAgBg4AAJgYBgJgADwAoCj8AAiCYKgyAAaycgA/wAJyawADAQAgBAYAAP///8="), 32, 
    atob("AwMEBQcGBgIDAwYGAwUCBQYEBgYGBgYGBgYCAwUFBQYGBgYGBgUFBgUEBQYFBgYGBgYGBgYGBgYGBgYDBQMEBQMFBQUFBQQFBQIDBQMGBQUFBQQFBAUFBgUFBQMCAwY="),
     10+(scale << 8)+(1 << 16));};

setWatch(()=>{
  g.wake();
  analogWrite(D30, 0.0125); 
  clock();
  setTimeout(()=>{g.sleep();D30.reset();}, 6500);
}, BTN2, {edge:"rising", repeat:true});

g.setFont("6x8r");
g.setFontAlign(0,0);
setScale(0.65,0.65);

setTimeout(()=>{g.sleep();D30.reset();}, 6500);

