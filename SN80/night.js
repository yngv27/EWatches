function init() {
    const _C = {
      CYAN: "#80FFFF",
      WHITE: "#FFFFFF",
      YHT: g.getHeight(),
      XWID: 240,
      XMID: 240/2, 
      YMID: g.getHeight()/2,
    };
    
      g.setFontOmnigo = function() {
          this.setFontCustom( atob("AAAAAAAAB/QAAcAAAHAAAAKAPgCgD4AoAAAZgWQf8E0DMAAAQwUwKwC0A1AygwgAAM4LmE5BnAGwAAcAAAB8DjhAQAAQEOOB8AAAqAOAHAFQAAAQAIAfACABAAAABoA4AACABAAgAQAAAAYAMAAAHAeB4AAAP4MWERDRg/gAAIAP+AAAAAhwxoRkNiDhAAAggwYRENmDeAAAHAOgMQP+AEAAB4gkYSEJmEeAAA/g2YSEJmAeAABAAg4RwLgHAAAA3g2YRENmDeAAA8AzIQkM2D+AAAAAMwGYAAAAAzQZwAAAAAgA4A2AxgQQAABQAoAUAKAAAIIGMBsAcAEAAAIAMAEdDYA4AAAHwGMGDCchbQooXkEYDEA8AAAB4HwOIB0AOABwAAf8IiERCYg8wDwAAH8GDCAhAQwYIIAAH/CAhAQwIMMD8AAD/hEQiIREICAAD/hEAiARAIAAAB/BgwgIREMmCeAAB/wCABAAgAQD/gAAAAf8AAAAABAAwAIf4AAH/AYAeAZgYYIGAAD/gAQAIAEACAAD/gwAGABwBgDAD/gAA/4MABgAYADB/wAAP4MGEBCAhgwfwAAP+EICEBCAzAPAAAD+DBhBQg4YMH+AAAAB/wjARwIsGzBwgAAYQWMJiGbBHAAAgAQAP+EACAAAA/wAMACADADB/wAAeAB4AHAOAcA4AAAPAA4AHgeADAAcB4HgAABgwYwDgBwDGDBgAA4AHAA+AwBwBgAAAQcIaEZCYhYQ4IAAP+EBAAB4AHAA8AAEBD/gAAIAMAMAGABgAQAAAAEACABAAgAQAIAAMADAAAADgLYFEDiA/AAB/wEIGEDGA+AAAPgMYEEDGAiAAAPgMYGEBCH/AAAPgNYEkDSA4AAAIAf4aAIAAAAfAY0ISEbD/AAD/gMAMAGAB+AAC/gAAACADL/AAD/gGAHgGYCGAAD/gAAP4GACAA/AwAQAH4AAD+AgAwAYAH4AAB8BjAggYwHwAAD/hCAhgYwHwAAB8BjAhgQgP+AAD+AwAwAAAGIFkCaBGAAAQA/wEMAAB+ABgAwAQH8AABwAOABwDgHAAABwAOABwDgAcA4BwAAAYwGwBwBsBjAAAfgAaAJANh/gAARwJoFkDiAAAIA7ggIAAP+AACAg7gCAAACACABAAQAIAIAAAAAAAAAAAA==")
      , 32, atob("AwIEBgYIBgIEBAUGAwUDBAYEBgYGBgYGBgYEBQYFBgYLBwcHBwcGBwcEBQcGCAcHBwcHBgYHBwkHBwcDBAMHBwMGBgYGBgUGBgIEBgIIBgYGBgQFBAYGCAYGBQQCBAc="), 256 + 13);
      };
      g.setFont("Omnigo");
               
    
      const startX=[-20,45,110,180],startY=[60,60,60,60];
      optFilled = true;
      const hht = 50;
      const vht = 50;
    
      function Poly(arr, fill) {
        if (fill) g.fillPoly(arr, true);
        else g.drawPoly(arr, true);
      }
    
      function drawVertSeg(x, y) {
        let d = 4;
        Poly([x, y, x+d, y+d, x+d, y+vht-d, x, y+vht, x-d, y+vht-d, x-d, y+d], optFilled);
    
        g.drawLine(x, y, x, y+vht);
      }
    
      function drawHorizSeg(x, y) {
        let d = 4;
        Poly([x, y, x+d, y-d, x+hht-d, y-d, x+hht, y, x+hht-d, y+d, x+d, y+d], optFilled);
    
        g.drawLine(x, y, x+hht, y);
      }
    
      function drawSegments(slot, val) {
      let xOff = startX[slot];
      let yOff = startY[slot];
      if (val != 1 && val != 4)
        drawHorizSeg(xOff, yOff);
      if (val != 1 && val != 2 && val != 3 && val != 7)
        drawVertSeg(xOff, yOff+1);
      if (val != 5 && val != 6)
        drawVertSeg(xOff+hht, yOff+1);
      if (val != 0 && val !=1 && val != 7)
        drawHorizSeg(xOff, yOff+vht+2);
      if (val == 0 || val == 2 || val == 6 || val == 8)
        drawVertSeg(xOff, yOff+vht+2);
      if (val != 2 )
        drawVertSeg(xOff+hht, yOff+vht+2);
      if (val != 1 && val != 4 && val != 7)
        drawHorizSeg(xOff, yOff+vht*2+3);
      }
    
      /***********
      Shared bits
      ************/
      let ping = 0; //setWatch(wOS.wake, ACCEL.INTPIN, {repeat: true, edge: "rising"});
  
      let drawBkgd = () => {
        g.setRotation(1, false);
        g.setBgColor(0);
        // allow ANY motion to wake us up
        ping = setWatch(wOS.wake, ACCEL.INTPIN, {repeat: true, edge: "rising"});
      }
    
      let drawClock = (d) => {
        g.clear();
        rotate = false;
        g.setColor(0,0.25,0);
        if(!Math.floor(d.hr/10))  
          g.setColor(0);
        drawSegments(0,1);
        g.setColor(0,0.25,0);
        drawSegments(1,d.hr%10);
        drawSegments(2,Math.floor(d.min/10)); //52);
        drawSegments(3,Math.floor(d.min%10)); //52);
      }
    
      let drawData = (d) => {
          // STATUS
        //g.setFontAlign(0,-1).setColor("#909800");
        let batt = E.getBattery(); //process.env.VERSION; //battInfo();
        for(let x=0; x<5; x++) {
          if(batt < x*20) break; //g.setColor(0);
          g.fillRect( 90+x*16,206,100+x*16, 209);
        }
    
      }
    
      let showMsg = (title, msg) => {
      };
    
      let stop = () => {
        clearWatch(ping);
        g.setRotation(0,0);
      };
      
      return { 
        drawBkgd: drawBkgd,
        drawClock: drawClock,
        drawData: drawData,
        showMsg: showMsg,
        stop: stop,
      };
    }
    exports = init();
    
    const _C = {
    CYAN: "#80FFFF",
    WHITE: "#FFFFFF",
    YHT: g.getHeight(),
    XWID: 240,
    XMID: 240/2, 
    YMID: g.getHeight()/2,
    };
    //D12.set();
    exports.drawBkgd();
    let dt = {hr:12, min:35, niceDate: "Sun Jul 12"};
    exports.drawClock(dt);
    exports.drawData(dt);
    exports.showMsg("Title","This would be message 1");
    