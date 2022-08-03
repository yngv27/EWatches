E.kickWatchdog();
function KickWd(){
  if( (typeof(BTN1)=='undefined')||(!BTN1.read()) ) E.kickWatchdog();
}
var wdint=setInterval(KickWd,5000);
E.enableWatchdog(20, false);

let _S = require("Storage");
if(_S.read("GW32.js")) eval(_S.read("GW32.js"));
