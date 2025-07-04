/*
** digital sidebar
** this one is for TK w SSD1681, rotation is custom
** uses Knx18 and Blocky fonts
*/
Graphics.prototype.setFontKnx18 = function () {
    this.setFontCustom(atob("AAAAAAAAAAAAAAAAAAP8gAAAAAAMAAAAAMAAAAAAAAGAQJBgGGAAYABhgGCQIBgAAAAAAEAAIAAAAAB+AOBgQAQAAAAAAQAQOBgB+AAAAAAAAIABJAAqAAUAAqABJAAIAAAAAAAAIAAIAAIAB/AAIAAIAAIAAAAAAAAAIAAwAAAAAAAIAAIAAIAAIAAIAAIAAAAAAAAAwAAAAAAABwAGAAIABwAOAAAAAAAAD/AEAgIAQIQQIAQEAgD/AAAAAAACAAEAAP/wAAAAAACBwECQIEQIIQEQQDgQAAAAAACBAEAgIQQIQQEogDHAAAAAAAAHAAZABhAOBAAfwABAAAAAAAPhAIggIgQIgQIQgIPAAAAAAAB/ACQgEgQIgQIQgAPAAAAAAAIAAIAAIBwIOAJwAOAAAAAAAADHAEogIQQIQQIQQEogDHAAAAAAADgAEQAIIQIIQIIgETAD8AAAAAAAAxgAAAAAACAAEAAIAAIMwIQAEgADAAAAAAAAADwA+ADCAMCADCAA+AADwAAAAAAP/wIQQIQQIQQEogDHAAAAAAAD/AEAgIAQIAQEAgCBAAAAAAAP/wIAQIAQIAQEAgD/AAAAAAAP/wIQQIQQIQQIQQIAQAAAAAAP/wIQAIQAIQAIQAIAAAAAAAAD/AEAgIAQIAQIIQEIgAPgAAAAAAP/wAQAAQAAQAAQAAQAP/wAAAAAAIAQP/wIAQAAAAAAABAAAgAAQAAQAAgP/AAAAAAAP/wAQAAoABEACCAMBwAAAAAAP/wAAQAAQAAQAAQAAQAAAAAAP/wGAABgAAYABgAGAAP/wAAAAAAP/wGAABgAAYAAGAABgP/wAAAAAAD/AEAgIAQIAQIAQEAgD/AAAAAAAP/wIIAIIAIIAEQADgAAAAAAAD/AEAgIAQIBQEAgD/QAAAAAAP/wIIAIIAIMAETADgwAAAAAADBAEggIQQIQQEIgCHAAAAAAAIAAIAAP/wIAAIAAAAAAAAP/AAAgAAQAAQAAgP/AAAAAAAOAAB4AAHAAAwAHAB4AOAAAAAAAAPAAA8AADwA8APAAA8AADwA8APAAAAAAAAIAwGDABsAAQABsAGDAIAwAAAAAAIAAGAABgAAfwBgAGAAIAAAAAAAAIBwIGQIIQIQQJgQOAQAAAAAAADAAkgBIQBIQBIQA/gAAAAAAP/gAggBAQBAQAggAfAAAAAAAAfAAggBAQBAQBAQAggAAAAAAAfAAggBAQBAQAggP/gAAAAAAAfAAkgBEQBEQAkQAcgAAAAAABAAH/wJAAIAAAAAAAAAfAAgiBASBASBASAgkA/4AAAAAAP/wAgABAABAABAAAgAAfwAAAAAAF/wAAAAAAAAIAAEAAEE/4AAAAAAP/wAEAAEAAKAARAAggBAQAAAAAAP/AAAgAAQAAAAAAB/wAgABAAA/wBAAAgAAfwAAAAAAB/wAgABAABAAAgAAfwAAAAAAAfAAggBAQBAQAggAfAAAAAAAA/8AggBAQBAQBAQAggAfAAAAAAAAfAAggBAQBAQBAQAggA/8AAAAAAA/wAQAAgABAABAAAAAAAAARAAogBIQBEQBEQAigARAAAAAAABAAH/ABAgBAQAAAAAAB/AAAgAAQAAQAAgB/wAAAAAABwAAMAADAAAwADAAMABwAAAAAAAB+AABwAGAAYAAGAABwB+AAAAAAABgwARAAKAAEAAKAARABgwAAAAAABwEAMEADYAAgADAAMABwAAAAAAABAwBBQBCQBEQBIQBwQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"), 32,atob("BgMFAAAJAAMFBQgJBAgDBwkFCAgICAgICQkDAAAAAAkACQgICAgICQgFCAgICQkJCAgICAcICQsJCQgAAAAAAAAICAgICAYJCQMGCQUJCAgJCQcJBggJCQkJCA=="), 256 | 18);
    };
    /* Blocky
    Graphics.prototype.setFontDefault=function(scale){this.setFontCustom(atob("AAAAAAAD+QfyAAAAADgAcAAAAcADgAAAACACeAfwfwDzwD+D+AeQAQAAABwQZCH/4RCCHwAcAAAOAD4ARCD4wOcAGADABzgY+CEQA+ADgAAB3gf+CIQRiD+wOeABgAeACQAADQAcAAAAP8D/wwDEAIAAEAIwDD/wP8AAANgA4AfwA4ANgAAAAgAEAD4AfAAgAEAAAAAAAGgA4AAAEAAgAEAAgAAAAGAAwAAAAAADAB4B8A+AeADAAAAB/gf+CAQQCCAQf+B/gAACAAf+D/wAAAAAA8CPwRCCIQRCD4QOAAAAQCCIQRCCIQf+B3gAAAMADgA0AMgD/wf+AEAAAD4AfCCIQRCCIQR+AHgAAB/gf+CIQRCCIQR+AHgAACAAQACBwQ+CeAfADgAAAB3gf+CIQRCCIQf+B3gAAB4AfiCEQQiCEQf+B/gAAAxgGMAAAGNAxwAAAEABwAbAGMAggAAASACQASACQASAAAAggGMAbABwAEAAABAAYACGQRyD4AOAAAAH4B/gYGGeQn6EhQn6EeQwaDDAPwAAAP+D/wQQCCAQQD/wP+AAAf+D/wRCCIQRCD/wO8AAAP8D/wQCCAQQCDAwIEAAAf+D/wQCCAQQCD/wP8AAAf+D/wRCCIQRCAAAf+D/wRACIARAAAAP8D/wQCCAQQiDHwI+AAAf+D/wBAAIABAD/wf+AAAf+D/wAAAAgAGAAQACAAQf+D/gAAD/wf+AeAGYBhgYGCAQAAD/wf+AAQACAAQACAAAf+D/wGAAcADgAwAf+D/wAAD/wf+BgAGAAYAf+D/wAAB/gf+CAQQCCAQf+B/gAAD/wf+CIARACIAfABwAAAB/gf+CAQQCCBwf/B/oAAD/wf+CIARACIAf+B3wAABxgfOCIQRCCIQd+BngAACAAQAD/wf+CAAQAAAAf8D/wACAAQACD/wf8AAAfgD/AAeAAwAeD/AfgAAAfgD/AAeABwf0D/AAeAAwf8D/AAADAweeA/ABgA/AeeDAwAADwAfAAPwB+D4AeAAAAQeCHwRiCIQTCDwQcCAAA//H/4gBAAAYADwAHwAPgAPAAYAAEAI//H/4AAAYAPADgAwADgAPAAYAAAAAIABAAIABAAIABAAAcABgAAAAJgDeASQCSAfwB+AAAf+D/wCCAQQD+APgAAAPgD+AQQCCAQQAAAPgD+AQQCCD/wf+AAAB8AfwCSASQDyAOAAAAQAP+D/wSAAAAB8AfyCCQQSD/wf8AAD/wf+AQACAAfwB+AAAT+CfwAAAACAASf+T/gAAf+D/wAgAOAHeAxwAAD/wf+AAAD+AfwCAAfwD+AQAD+APwAAAfwD+AQACAAfwB+AAAB8AfwCCAQQD+APgAAAf+D/wQQCCAfwB8AAAB8AfwCCAQQD/wf+AAAfwD+AQACAAYABAAAABkAewCSASQDeAJgAAAQAH8A/wCCAAAD8AfwACAAQD+AfwAAAfAD8AAwAGAfgD4AAAD4AfgAGAfwD8AAwD+AfAAAAYwDuAHAA4AdwDGAAADwAfAAMAAiD/wf8AAAQwCOATQCyAcQDCAAAAwB/4fPiAEAAH/+//wAAQAj58P/AGAAAAgAMABAAMAAwACAAwAEAAAAAAAAAAAAAA"), 32, atob("AwQGCAgNCgMFBQYHBAUEBwgFCAcICAgICAgDAwYGBgcMCAgICAYGCAgDCAgHCQgICAgICAcICAsIBwgEBwQIBwMHBwYHBwUHBwMFBwMJBwcHBwcHBQcHCQcHBwUDBQk="), 15+(scale << 8)+(1 << 16));};
    */
    require("Font5x9Numeric7Seg").add(Graphics);
    
    function init() {
      var _C = {
        WHITE: "#FFFFFF",
        YHT: g.getHeight(),
        XWID: g.getWidth()-20,
        XMID: g.getWidth() / 2 - 10,
        YMID: g.getHeight() / 2,
        FG: "#000000", //"#fff5d9",
        BG: "#FFFFFF",
        MSGBG: "#FFFFFF" //#8079a0"
      };
      
      g.setBgColor(_C.BG).setColor(_C.FG).clear();
    
      /* segments are 12 bytes each; ordered top,topL,topR,mid,botL,botR,bottom
      const segdata = new Uint8Array([5, 3, 8, 0, 40, 0, 43, 3, 36, 10, 12, 10,
        0, 8, 3, 5, 10, 12, 10, 41, 4, 47, 0, 43,
        48, 8, 45, 5, 38, 12, 38, 41, 44, 47, 48, 43,
        7, 48, 12, 43, 36, 43, 41, 48, 36, 53, 12, 53,
        0, 88, 3, 91, 10, 84, 10, 55, 4, 49, 0, 53,
        48, 88, 45, 91, 38, 84, 38, 55, 44, 49, 48, 53,
        5, 93, 8, 96, 40, 96, 43, 93, 36, 86, 12, 86
      ]);
      //*/
      const segdata = new Uint8Array(E.toArrayBuffer(atob('BQMIACgAKwMkCgwKAAgDBQoMCikELwArMAgtBSYMJiksLzArBzAMKyQrKTAkNQw1AFgDWwpUCjcEMQA1MFgtWyZUJjcsMTA1BV0IYChgK10kVgxW')));
      //*/
    
      function drawSegment(seg, xoff, yoff, xscale, yscale) {
        let arrTmp = new Uint8Array(12);
        let beg = seg * 12;
        for(let i=0; i<12; i+=2) {
          arrTmp[i] = segdata[beg+i]*xscale+xoff;
          arrTmp[i+1] = segdata[beg+i+1]*yscale+yoff;
        }
        g.fillPoly(arrTmp,true);
      }
    
      function drawDigit(d, x, y, xscale, yscale) {
        let mask = [0x77,0x24,0x5d,0x6d,0x2e,0x6b,0x7b,0x25,0x7f,0x6f,0,8][d];
        for(let s=0; s<7; s++) {
          // special case: first digit, only draw 2 segs (2 & 5)
          if( x<=0 &&  s!=2 && s!=5 ) {
            //print(`x=${x} d=${d} s=${s} mask=${mask}  continuing`);
          } else {
            //if(! (mask & 1)) continue;
            if(mask & 1)  g.setColor(_C.FG);
            else g.setColor(_C.BG);
            //if((mask & 1) || (d != 1) || x) 
            drawSegment(s, x, y,xscale, yscale);
          }
          mask >>= 1;
        }
      }
    
      let lastDate = '';
      
      let start = () => {
        let y = 80;
        g.setBgColor(_C.BG).setColor(_C.FG).fillCircle(78,y,4).fillCircle(78,y+32,4);
        //g.fillPoly([0,0, 4,0, 0,4 ], true);
      };
    
      function clrDtWdw(r,gr,b) {
        if(typeof(r) == "string")
          g.setColor(r);
        else
          g.setColor(r,gr,b);
        g.fillRect(0, 144,_C.XWID,_C.YHT).setColor(_C.FG);  
      }
    
      function drawDate(dt) {
        //let dtstr = dt.toString().substring(0,16);
        let m = dt.getMonth()+1;
        let d = dt.getDate();
        if(lastDate != d) {
          lastDate = d;
          let digs = [Math.floor(m / 10), m % 10, 11, Math.floor(d / 10), d % 10]; //11 = '-'
          let x = 32;
          //g.drawLine(116,59,124,39).drawLine(117,59,125,39);
          for(let d = 0; d < digs.length; d++) {
            if(!d && !digs[d]) continue;
            drawDigit(digs[d], [x,x+22,x+40,x+58,x+80][d], 24, 0.33, 0.33);
          }
        }
      }
    
      function drawBattery(b) {
        x=105;
        g.clearRect(x,8,x+29,22);
        //g.setColor(1,1,1);
        if(b > 35) g.fillRect(x+1,9,x+8,20);
        if(b > 55) g.fillRect(x+10,9,x+17,20);
        if(b > 75) g.fillRect(x+19,9,x+26,20);
      }
    
    
      let drawClock = (t) => {
        //logD("drawClock");
        let digs = [Math.floor(t.hr / 10), t.hr % 10, Math.floor(t.min / 10), t.min % 10];
        g.setFontAlign(0,0);
        for(let d = 0; d < digs.length; d++) {
          if(!d && !digs[d]) { digs[d]=10; }
          let x=-14;
          drawDigit(digs[d], [x,x+44,x+100,x+140][d], 48, 0.75, 0.75);
        }
        sidebar(t);
    
      };
      let drawData = (d) => {
        g.setFont("Knx18",1).setFontAlign(-1,0).setBgColor(_C.BG).setColor(_C.FG);
        //drawBattery(E.getBattery());
        //drawDate(new Date());
        let str = `  ${d.niceDate.toUpperCase()}  `;
        g.drawBold(str, (180-g.stringWidth(str))/2, 28, true);
      };
    
      function sidebar(d) {
        g.setFont("5x9Numeric7Seg",2);
    
        g.setFontAlign(0,-1);
        g.setRotation(1,1).setColor(_C.FG);
        g.fillRect(0,0,199,22).setColor(_C.BG);
        g.drawBold(`${d.hr24}:${('0'+d.min).slice(-2)}`,100, 2);
        g.setRotation(2,1).setColor(_C.FG);
      }
      
      let showMsg = (msgobj) => {
        g.setFont("Knx18",1).setFontAlign(0,-1);
        g.drawRect(0,144,_C.XWID-22,_C.YHT);
        g.drawBold( g.wrapString(msgobj.text, _C.XWID-22).join("\n"), _C.XMID-11, 144);
        //g.drawString( msgobj.text.split('|').join("\n"), _C.XMID+1, 160);
        lastDate = '';
      };
    
    
      /*
      let stop = () => {
        wOS.removeListener("tick", secs);
      };
      */
    
      return {
        start: start,
        drawClock: drawClock,
        drawData: drawData,
        showMsg: showMsg,
        //stop: stop
      };
    }
    exports = init();
    g.drawBold = (str, x, y, bkgd) => {
      g.drawString(str, x, y, bkgd);
      g.drawString(str, x+1, y, false);
    };
    /*
    if(process.env.BOARD != "EMSCRIPTEN") {
      wOS.wake();
    } else {
      wOS = { BAT: D0 };
    }
    //E.getBattery = () => {return 100;};
    */
    /*
    exports.start();
    let dt = { hr: 12, min: 35, niceDate: "Sun Jul 12", hr24:14, isPM: true };
    //g.setColor("#808080").fillRect(0,0,200,200);
    exports.drawClock(dt);
    exports.drawData(dt);
    exports.showMsg({title:"Title", text:"This would be message 1 | That's it"});
    g.flip();
    //*/
    /*
    function mooo() {
      let d = new Date();
      let hr=d.getHours();
      let pm=false;
      if(hr > 12) pm=true;
      hr %= 12; if (hr == 0) hr=12;
      exports.drawClock({hr: hr, min: d.getMinutes()});
      exports.drawData();
      g.flip();
    }
    setWatch(mooo, BTN1, {edge: "rising", repeat: true});
    setInterval(mooo, 90*1000);
    
    setTimeout(()=>{
      g.drawImage(_S.read("ghee.jpg"));
    }, 1000);
    
    >_log.forEach((l)=>{print(l);})
    
    */