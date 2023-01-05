// rename to ".boot0" to run at startup
E.kickWatchdog();
function KickWd(){
  if( (typeof(BTN1)=='undefined')||(!BTN1.read()) ) E.kickWatchdog();
}
var wdint=setInterval(KickWd,5000);
E.enableWatchdog(20, false);

let _S = require("Storage");
if(_S.read("CV16.js")) eval(_S.read("CV16.js"));
