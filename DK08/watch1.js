function init() {
  g.setFontOmnigo = function() {
      this.setFontCustom( atob("AAAAAAAAB/QAAcAAAHAAAAKAPgCgD4AoAAAZgWQf8E0DMAAAQwUwKwC0A1AygwgAAM4LmE5BnAGwAAcAAAB8DjhAQAAQEOOB8AAAqAOAHAFQAAAQAIAfACABAAAABoA4AACABAAgAQAAAAYAMAAAHAeB4AAAP4MWERDRg/gAAIAP+AAAAAhwxoRkNiDhAAAggwYRENmDeAAAHAOgMQP+AEAAB4gkYSEJmEeAAA/g2YSEJmAeAABAAg4RwLgHAAAA3g2YRENmDeAAA8AzIQkM2D+AAAAAMwGYAAAAAzQZwAAAAAgA4A2AxgQQAABQAoAUAKAAAIIGMBsAcAEAAAIAMAEdDYA4AAAHwGMGDCchbQooXkEYDEA8AAAB4HwOIB0AOABwAAf8IiERCYg8wDwAAH8GDCAhAQwYIIAAH/CAhAQwIMMD8AAD/hEQiIREICAAD/hEAiARAIAAAB/BgwgIREMmCeAAB/wCABAAgAQD/gAAAAf8AAAAABAAwAIf4AAH/AYAeAZgYYIGAAD/gAQAIAEACAAD/gwAGABwBgDAD/gAA/4MABgAYADB/wAAP4MGEBCAhgwfwAAP+EICEBCAzAPAAAD+DBhBQg4YMH+AAAAB/wjARwIsGzBwgAAYQWMJiGbBHAAAgAQAP+EACAAAA/wAMACADADB/wAAeAB4AHAOAcA4AAAPAA4AHgeADAAcB4HgAABgwYwDgBwDGDBgAA4AHAA+AwBwBgAAAQcIaEZCYhYQ4IAAP+EBAAB4AHAA8AAEBD/gAAIAMAMAGABgAQAAAAEACABAAgAQAIAAMADAAAADgLYFEDiA/AAB/wEIGEDGA+AAAPgMYEEDGAiAAAPgMYGEBCH/AAAPgNYEkDSA4AAAIAf4aAIAAAAfAY0ISEbD/AAD/gMAMAGAB+AAC/gAAACADL/AAD/gGAHgGYCGAAD/gAAP4GACAA/AwAQAH4AAD+AgAwAYAH4AAB8BjAggYwHwAAD/hCAhgYwHwAAB8BjAhgQgP+AAD+AwAwAAAGIFkCaBGAAAQA/wEMAAB+ABgAwAQH8AABwAOABwDgHAAABwAOABwDgAcA4BwAAAYwGwBwBsBjAAAfgAaAJANh/gAARwJoFkDiAAAIA7ggIAAP+AACAg7gCAAACACABAAQAIAIAAAAAAAAAAAA==")
  , 32, atob("AwIEBgYIBgIEBAUGAwUDBAYEBgYGBgYGBgYEBQYFBgYLBwcHBwcGBwcEBQcGCAcHBwcHBgYHBwkHBwcDBAMHBwMGBgYGBgUGBgIEBgIIBgYGBgQFBAYGCAYGBQQCBAc="), 256 + 13);
  };
  g.setFont("Omnigo");

  /*
  ** BEGIN WATCH FACE
  */
  /*
  ROTATION
  let cy = (m) => {
  return Math.floor(Math.cos(Math.PI * m/30) * -80);
  };

  let cx = (m) => {
  return Math.floor(Math.sin(Math.PI * m/30) * 80);
  };
  */              
  const _C = {
    CYAN: 47,
    WHITE: 63,
    BKGD: 0,
    FRGD: 63,
    DATA_BRIGHT: 60,
    DATA_DARK: 21,
    YHT: g.getHeight(),
    XWID: g.getWidth(),
    XMID: g.getWidth()/2, 
    YMID: g.getHeight()/2,
  };
  
  let xS=.8,yS=.8;
  const startX=[-4,45,10,45],startY=[18,18,80,80],nmX=[16,42,88,126],nmY=[12,12,12,12];
  let rotate=!1;function setScale(t,r){xS=t,yS=r}
  function drawScaledPoly(r,n,a){let d=[];for(let t=0;t<r.length;t+=2){var e;d[t]=Math.floor(r[t]*xS)+n,d[t+1]=Math.floor(r[t+1]*yS)+a,rotate&&(e=d[t],d[t]=80-d[t+1],d[t+1]=e)}g.fillPoly(d,!1)}
  const darr = [
      Uint8Array([0,4,4,0,32,0,36,4,36,65,25,65,25,5,11,5,11,65,36,65,36,66,32,70,4,70,0,66]),
      Uint8Array([7,4,11,0,20,0,24,4,24,70,13,70,13,5,7,5]),
      Uint8Array([0,4,4,0,32,0,36,4,36,34,32,38,11,38,11,65,36,65,36,66,32,70,0,70,0,36,4,32,25,32,25,5,0,5]),
      Uint8Array([0,4,4,0,32,0,36,4,36,66,32,70,4,70,0,66,0,65,25,65,25,38,0,38,0,32,25,32,25,5,0,5]),
      Uint8Array([0,4,4,0,11,0,11,32,25,32,25,0,32,0,36,4,36,70,25,70,25,38,0,38]),
      Uint8Array([0,0,32,0,36,4,36,5,11,5,11,32,32,32,36,36,36,66,32,70,4,70,0,66,0,65,25,65,25,38,0,38]),
      Uint8Array([0,4,4,0,32,0,36,4,36,5,11,5,11,65,25,65,25,38,11,38,11,32,32,32,36,36,36,66,32,70,4,70,0,66]),
      Uint8Array([0,4,4,0,32,0,36,4,36,70,25,70,25,5,0,5]),
      Uint8Array([0,4,4,0,32,0,36,4,36,32,33,35,36,38,36,66,32,70,18,70,18,65,25,65,25,38,18,38,18,32,25,32,25,5,11,5,11,32,18,32,18,38,11,38,11,65,18,65,18,70,4,70,0,66,0,38,3,35,0,32]),
      Uint8Array([0,4,4,0,32,0,36,4,36,66,32,70,4,70,0,65,0,65,25,65,25,5,11,5,11,32,25,32,25,38,4,38,0,34])
  ];
  function drawDigit(t,r,n){
      let a=(n?nmX:startX)[t];t=(n?nmY:startY)[t];
      drawScaledPoly(darr[r],a,t);
  }
  
  let start = () => {
      g.setBgColor(0,0,0.25);
      g.clear();
  }  

let drawClock = (d) => {

  g.clearRect(0,0,_C.XWID,_C.YMID+20);

  rotate = false;
  let xndg = 0;
  if(Math.floor(d.hr/10) > 0) 
    g.setColor(_C.CYAN);
  else
    g.setColor(_C.BKGD);

  setScale(1.25, 1.25); //0.6,0.8);
  drawScaledPoly(darr[1],xndg+0,22);
  g.flip();
  g.setColor(_C.CYAN);
  drawScaledPoly(darr[d.hr%10],xndg+40,22); //52);
  
  g.flip();
  g.setColor(_C.WHITE);
  setScale(1, 1); //0.5,0.55);
  drawScaledPoly(darr[Math.floor(d.min/10)], xndg+92,24); //52);
  drawScaledPoly(darr[Math.floor(d.min%10)], xndg+132,24); //52);
  g.flip();
};

let drawData = (d) => {
    // STATUS
  g.setFontAlign(0,-1).setColor(_C.DATA_BRIGHT);
  let batt = E.getBattery(); //process.env.VERSION; //battInfo();
  for(let x=0; x<5; x++) {
    if(batt < x*20) {
      g.flip();
      g.setColor(_C.DATA_DARK);
    }
    g.fillRect(50+x*17,0,62+x*17,3);
  }
  g.flip();
  g.setColor(_C.DATA_BRIGHT).setFontAlign(0,-1).drawString(d.niceDate,_C.XMID,8);
  g.flip();
  
};

let showMsg = (title, msg) => {  
 // g.setFont("Omnigo");
  g.setBgColor(_C.BKGD);
  let y = _C.YHT/2 + 20; //8 +  g.getFontHeight();
  g.clearRect(0, y,_C.XWID-1,_C.YHT-1).flip();
  g.setColor(_C.FRGD);
  g.setFontAlign(0,-1);
  let mstr = ''; 
  y+= 8;
  msg.split(' ').forEach((w)=>{
    if(g.stringWidth(mstr+w) > _C.XWID || w == '|') {
      g.drawString(mstr, _C.XMID, y);
      mstr='';
      y+=g.getFontHeight();
    }
    if(w != '|') mstr += w + ' ';
  });
  g.drawString(mstr, _C.XMID, y).flip();
};

return { 
  start: start,
  drawClock: drawClock,
  drawData: drawData,
  showMsg: showMsg,
}
}
exports = init();

exports.drawBkgd();
let dt = {hr:12, min:35, niceDate: "Sun Jul 12"};
exports.drawClock(dt);
exports.drawData(dt);
exports.showMsg("Title","This would be message 1");
g.flip();