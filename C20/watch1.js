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

    let xS=.8,yS=.8;
    const startX=[10,45,10,45],startY=[18,18,80,80],nmX=[16,42,88,126],nmY=[12,12,12,12];
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
    
    let drawBkgd = () => {
        g.setBgColor(0,0,0.25);
        g.clear();
    }  

  let drawClock = (d) => {
  
    g.clearRect(0,0,_C.XWID,_C.YMID);
    console.log("DrawClock: time to draw");
  
    rotate = false;
    let xndg = 15;
    g.setColor(_C.CYAN);
    if(Math.floor(d.hr/10) > 0) {
      setScale(0.75, 1); //0.6,0.8);
      drawScaledPoly(darr[1],xndg+0,22); //52);
      drawScaledPoly(darr[d.hr%10],xndg+18,22); //52);
    } else {
      setScale(1,1); //0.8,0.8);
      drawScaledPoly(darr[d.hr],xndg+8,22); //52);
    }
    g.setColor(_C.WHITE);
    setScale(0.75, 0.75); //0.5,0.55);
    drawScaledPoly(darr[Math.floor(d.min/10)], xndg+50,22); //52);
    drawScaledPoly(darr[Math.floor(d.min%10)], xndg+82,22); //52);
  }

  let drawData = (d) => {
      // STATUS
    g.setFontAlign(0,-1).setColor("#009800");
    let batt = E.getBattery(); //process.env.VERSION; //battInfo();
    for(let x=0; x<5; x++) {
      if(batt < x*20) g.setColor("#004000");
      g.fillRect(x*17,0,x*17+12,2);
    }
    g.setColor("#80ffcc").setFontAlign(0,-1).drawString(d.niceDate,_C.XMID,6);
    
    // MID BAR 
    /*
    let steps = Bangle.getStepCount();
    g.setColor("#6161ea")
    for(let x=0; x<10; x++) {
      if(steps < x*1000) g.setColor("#808080");
      g.fillRect(x*5+1,83,x*5+4,85);
    }
    g.setColor(0.8,1,0.9).setFontAlign(1,1).drawString(steps, _C.XWID, 87,true);
    */
  };
  /*
  lgfont = require("QuickL.js");
  smfont = require("QuickS.js");
  
  let x1 = 8, x2 = 8, x3 = 48, x4 = 62;
  let xh1 = -10, xh2 = 18;
  
  let drawCoolClock = (d) => {
    if(Date().getFullYear() < 2000) showAlarm('','TIME IS NOT SET')
    g.clearRect(0,0,79,79);
    console.log("DrawCoolClock: time to draw");
    g.setColor(_C.CYAN);
    if(Math.floor(d.hr/10) > 0) {
      g.drawImage(lgfont.getDigit(1),xh1,22); 
      g.drawImage(lgfont.getDigit(d.hr%10),xh2,22); //52);
    } else {
      g.drawImage(lgfont.getDigit(d.hr),x2,22); //52);
    }
    g.setColor(_C.WHITE);
    g.drawImage(smfont.getDigit(Math.floor(d.min/10)), x3,22); //52);
    g.drawImage(smfont.getDigit(d.min%10), x4,22); //52);
    drawThings(d);
  }
  
  let drawNightClock = (d) => {
    g.clear();
    rotate = true;
    inAlarm = true; // no buzzing please
    g.setColor("#800000");
    setScale(0.8, 0.8);
  //console.log("draw1: "+d.hr);
    if (d.hr>9) drawDigit(0,Math.floor(d.hr/10), true);
    drawDigit(1,Math.floor(d.hr%10), true);
  //console.log("draw2: "+d.min);
    drawDigit(2,Math.floor(d.min/10), true);
    drawDigit(3,Math.floor(d.min%10), true);
    g.fillCircle(40, 80,2);
    g.fillCircle(24, 80,2);
    let b = E.getBattery();
    for(let c=0; c<5; c++) {
      if(b > c*20) g.drawCircle(16+12*c, 8, 4);
      //else g.drawCircle(14+12*c,8,4);
    }
  }
  */
  let showMsg = (title, msg) => {  
    g.setFont("Omnigo");
    g.setColor("#000000");
    g.fillRect(0,_C.YHT/2,_C.XWID-1,_C.YHT-1);
    g.setColor("#CCCCCC");
    g.setFontAlign(0,-1);
    let y = _C.YHT/2; //8 +  g.getFontHeight();
    let mstr = ''; 
    msg.split(' ').forEach((w)=>{
      if(g.stringWidth(mstr+w) > _C.XWID || w == '|') {
        g.drawString(mstr, _C.XMID, y);
        mstr='';
        y+=g.getFontHeight();
      }
      if(w != '|') mstr += w + ' ';
    });
    g.drawString(mstr, _C.XMID, y);
  };

  return { 
    drawClock: drawClock,
    drawBkgd: drawBkgd,
    drawData: drawData,
    showMsg: showMsg,
  }
}
exports = init();