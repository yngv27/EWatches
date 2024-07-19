E.kickWatchdog();
function KickWd(){
  if( (typeof(BTN1)=='undefined')||(!BTN1.read()) ) E.kickWatchdog();
}
var wdint=setInterval(KickWd,5000);
E.enableWatchdog(20, false);

let _S = require("Storage");
if(_S.read("GW32.js")) eval(_S.read("GW32.js"));

E.showMessage = function(msg,title) {};
()=> {
  let dt=Date();
  let m = dt.getMonth(), d=dt.getDate(), dow=dt.getDay();
  if(m<2 || m>10) E.setTimeZone(-5);
  if(m>2 && m<10) E.setTimeZone(-4);
  if(m == 2) {
    if(d-dow > 7) E.setTimeZone(-4);
    else E.setTimeZone(-5);
  } else if (m == 10) {
    if(d-dow > 0) E.setTimeZone(-5);
    else E.setTimeZone(-4);
  }
};//();
