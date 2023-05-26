Modules.addCached("ble_simple_uart",function(){exports.write=function(h,b,c){var d;return h.gatt.connect().then(function(a){d=a;return a.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca9e")}).then(function(a){return a.getCharacteristic("6e400002-b5a3-f393-e0a9-e50e24dcca9e")}).then(function(a){function e(f,g){b.length?(a.writeValue(b.substr(0,20)).then(function(){e(f,g)}).catch(g),b=b.substr(20)):f()}return new Promise(e)}).then(function(){d.disconnect();c&&c()})}});
function pad0(s) {return ("0"+s).slice(-2);}
let allMsgs = [];

let font = "AAAAAAAAAAAAAAAAAAAAAAAD/mAAAAAAADAAAAAAMAAAAAAAAAASAAEgAP/AASAA/8ABIAASAAAAAAAADggBEEAgggf/8CCCAQRACDgAAAAAAAAAAAwGASGADGAAGMAGEgGAwAAAAAAAADgBzEAjAgI4IBxkAAGAAGYAAAAAAACAADAAAAAAAAAAfwA4DgQAEAAAAAAAQAEDgOAH8AAAAAAAAAQAAkgAFQAA4AAVAAJIAAQAAAAAAAAAQAAEAABAAD+AAEAABAAAQAAAAAAAAAAQAAYAAAAAAAAAAABAAAQAAEAABAAAQAAEAABAAAAAAAAAAGAAAAAAAAAGAAGAAGAAGAAGAAGAAAAAAAAAD/gBAkAgQgIIICECASBAD/gAAAAAAABAAAgAAQAAP/4AAAAAAADAYBAKAgEgICICBCAQggDwIAAAAAAACAgBAEAgggIIICCCARRADjgAAAAAAAADgADIADCADAgDAIAA/gAAgAAAAAAAPwgCEEAhAgIQICECAghAIHgAAAAAAAA/gAyEARAgIQICECAghAAHgAAAAAAAIAACAAAgAAIA4CBwAjgAPAAAAAAAAADjgBFEAgggIIICCCARRADjgAAAAAAADwABCCAgQgIEICBEAQmAD+AAAAAAAAAwYAAAAAAAAAEAMGAAAAAAAABAAAoAARAAIIAEBAAAAAAAABEAARAAEQABEAARAAEQABEAAAAAAAAEBAAggAEQAAoAAEAAAAAAAADAABAAAgAAIHYCCAARAADgAAAAAAAAB/gAgEAR4gEhIBISAJIgB/QAAAAAAAAB4AHwAOEAMBAA4QAB8AAB4AAAAAAAP/4CECAhAgIQICECAShADHgAAAAAAAD/gBAEAgAgIAICACAQBACAgAAAAAAAP/4CACAgAgIAICACAQBAD/gAAAAAAAP/4CCCAgggIIICCCAgAgIAIAAAAAAAP/4CCAAggAIIACCAAgAAIAAAAAAAAAD/gBAEAgAgIAICBCAQRACH4AAAAAAAP/4ACAAAgAAIAACAAAgAP/4AAAAAAAIAID/+AgAgAAAAAAAACAAAQAACAAAgAAIAAEA/+AAAAAAAA//gAIAAFAACIABBAAgIAwBgAAAAAAA//gAAIAACAAAgAAIAACAAAgAAAAAAA//gDAAAMAAAwAAwAAwAA//gAAAAAAA//gDAAAMAAAwAADAAAMA//gAAAAAAAP+AEAQCACAgAgIAIBAEAP+AAAAAAAA//gIEACBAAgQAIEABCAAPAAAAAAAAAP+AEAQCACAgAgIAoBAEAP+gAAAAAAA//gIEACBAAgQAIGABCYAPBgAAAAAAAOCAEQQCCCAgggIIIBBEAIOAAAAAAAAgAAIAACAAA//gIAACAAAgAAAAAAAAA/+AAAQAACAAAgAAIAAEA/+AAAAAAAA8AAA8AAA4AABgADgAPAA8AAAAAAAAA+AAAeAAAeAB4APgAAHgAAHgAeAD4AAAAAAAADAGAMGAA2AACAADYADBgDAGAAAAAAADAAAMAAAwAAD+ADAADAADAAAAAAAAACAeAgIgIEICCCAhAgIgIDwCAAAAAAAH//BAAQQAEAAAAAAAMAAAwAADAAAMAAAwAADAAAAAAABAAQQAEH//AAAAAAAAQAAIAAEAACAAAQAACAAAQAAAAAAAAAACAAAgAAIAACAAAgAAIAACAAAAAAADAAAIAAAAAAAAAAGAASQAJCACQgAkIAJEAB/gAAAAAAA//gAQQAICACAgAgIAEEAA+AAAAAAAAA+AAQQAICACAgAgIAICABBAAAAAAAAA+AAQQAICACAgAgIAEEA//gAAAAAAAA+AASQAIiACIgAiIAEiAA5AAAAAAAACAAAgAB/+AiAAIgACAAAAAAAAAAD4QBBCAgIgICICAiAQRAP/gAAAAAAD/+ABAAAgAAIAACAAAQAAD+AAAAAAAAIAAb/gAAAAAAAAAIAABAAAQb/4AAAAAAA//gACAAAgAAUAAIgAEEACAgAAAAAAAgAAP/wAACAAAgAAAAAAAD/gAgAAIAAB/gAgAAIAAB/gAAAAAAAD/gAQAAIAACAAAgAAEAAA/gAAAAAAAA+AAQQAICACAgAgIAEEAA+AAAAAAAAD/8AQQAICACAgAgIAEEAA+AAAAAAAAA+AAQQAICACAgAgIAEEAD/8AAAAAAAD/gAIAAEAACAAAgAAIAABAAAAAAAAABxAAiIAIiACIgAiIAIiABHAAAAAAAACAAAgAA/8ACAgAgIAACAAAAAAAAP4AABAAAIAACAAAgAAQAP+AAAAAAAAOAAAYAABgAAGAAGAAGAAOAAAAAAAAAPwAADgADAAHAAAMAAA4APwAAAAAAAAMGAAiAAFAAAgAAUAAIgAMGAAAAAAAAOAQAYEABmAAGAAGAAGAAOAAAAAAAAAIGACCgAhIAIiACQgAoIAMCAAAAAAAACAA/fgQAEAAAAAAAAAAD/+AAAAAAAAAABAAQP34ACAAAAAAAAAgAAQAAEAAAgAAEAABAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
let widths = "BgMFCQkJCQQFBQkJBAkDCQoGCQkJCQkJCQkDBAcJBwkJCQkJCQkJCQkFCQkJCQkJCQkJCQkJCQkJCQkFCAUJCQQJCQkJCQgJCQQGCQYJCQkJCQkJCAkJCQkJCQUFBQk=";

/*
exports.add = function(graphics) {
  graphics.prototype.setFontOmnigo = function() {
    this.setFontCustom(font, 32, widths, 256 + 13);
  };
};
*/
g.setFontCustom(atob(font), 32, atob(widths), 256 + 20);
g.setFontAlign(-1,-1);


let blinkTO = 0;

const blink = () => {
  LED1.set();
  setTimeout(()=>{
    LED1.reset();
    setTimeout(()=>{
      LED1.set();
      setTimeout(()=>{
        LED1.reset();
      }, 150);
    }, 150);
  }, 150);
};

function saveInfo(msg) {
  // save weather info from googly
  if(msg.title.indexOf("forecast") >- 0) {
    // save the weather forecast
  } else {
    gmsg = msg.title.replace("\xB0","*");
  }
}

GB = (msg) => {
  // filter
  if(msg.t != "notify" && msg.t != "call") return;
  // let's get pickier; ignore the annoyances
  if(msg.src === "Gmail") return;
  if(msg.src === "Google") { saveInfo(msg); return; }
  
  let dt = new Date();
  let dtStr = `${dt.getFullYear()}-${pad0(dt.getMonth()+1)}-${pad0(dt.getDate())}`;
  dtStr += ` ${pad0(dt.getHours())}:${pad0(dt.getMinutes())}:${pad0(dt.getSeconds())}`;
  //print(dtStr);
  msg.time = dtStr;
  allMsgs.push(msg);
  dispMsg(msg, allMsgs.length-1);
  wOS.buzz(150); setTimeout(()=>{wOS.buzz(150);}, 200);  setTimeout(()=>{wOS.buzz(150);}, 400);
  if(!blinkTO) blinkTO = setInterval(blink, 2000);
};

function disp(n) {
  if(n >= allMsgs.length) wOS.buzz();
  else dispMsg(allMsgs[n], n);
}

let curMsg = -1;
let delMsg = false;
let gmsg = '';

function dispMsg(msg, n) {
  g.clear();
  let y=0;
  if(n || n === 0) {
    g.drawString(`MSG: ${n+1}/${allMsgs.length}`, 0, y); y += 30; curMsg = n;
  }
  if(allMsgs.length == 0) return;
  
  // if we know it, print more nicerer
  if(msg.t === "notify" && msg.src === "Outlook") {
    g.drawString(`${msg.title} (${msg.src})`, 0, y); y+= 30;
    while((msg.body.length > 30) && (y < 180)) {
      g.drawString(`${msg.body.substring(0, 30)}`, 0, y); y+=15;
      msg.body = msg.body.slice(30);
    }
    if(msg.body.length > 0) {
      g.drawString(`${msg.body}`, 0, y); y+=15;
    }
  } else if(msg.t == "call") {
      g.drawString(`Call from:`, 0, y); y+=15;
      g.drawString(`${msg.name}`, 0, y); y+=30;
      g.drawString(`${msg.number}`, 0, y); y+=30;
  } else {
    for(let keys=Object.keys(msg), k=0; k < keys.length; k++) {
      g.drawString(`${keys[k]} : ${msg[keys[k]]}`, 0, y); y+= 15;
    }
  }
  g.drawString(`Weather: ${gmsg}`, 0, 220);
  wOS.wake();
}

//eval(_S.read("button.js"));
wOS.UI.on('tap',()=>{
  if(! wOS.isAwake) {
    wOS.wake();
    if(blinkTO) {
      clearInterval(blinkTO);
      blinkTO=0;
    }
  } else {
    // release delete
    delMsg = false;
    g.setBgColor(0,0,0);
    if(--curMsg < 0) curMsg = allMsgs.length-1;
    disp(curMsg);
    wOS.ticker = 10;
  }
});
wOS.UI.on('longpress',()=>{
  console.log('longpress');
  if(delMsg) {
    allMsgs.splice(curMsg,1);
    g.clear();
    g.setBgColor(0,0,0);
    g.drawString("Deleted",0,0);
    delMsg = false;
  } 
  wOS.ticker = 10;

});
wOS.UI.on('dbltap',()=>{
  console.log('dbltap');
  if(curMsg >= 0) {
    g.setBgColor(0.5,0,0);
    delMsg = true;
    disp(curMsg);
  }
  wOS.ticker = 10;
});

Modules.addCached("ble_simple_uart",function(){exports.write=function(h,b,c){var d;return h.gatt.connect().then(function(a){d=a;return a.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca9e")}).then(function(a){return a.getCharacteristic("6e400002-b5a3-f393-e0a9-e50e24dcca9e")}).then(function(a){function e(f,g){b.length?(a.writeValue(b.substr(0,20)).then(function(){e(f,g)}).catch(g),b=b.substr(20)):f()}return new Promise(e)}).then(function(){d.disconnect();c&&c()})}});

let ble = require("ble_simple_uart");

function fwd() {
  NRF.requestDevice({ filters: [{ namePrefix: 'ID205L' }]
                    }).then(function(device) {
    ble.write(
          device,
          "wOS.wake()\nwOS.buzz()\n",
          function() {
            print('Forwarded to...');
          });
  });
}
/*
allMsgs
=[
  {
    t: "notify",
    id: 1662748007,
    src: "Gmail",
    title: "pCloud Team",
    body: "New login on your pCloud account",
    time: "2022-09-09 16:38:50"
   },
  {
    t: "notify",
    id: 1662748008,
    src: "Gmail",
    title: "Peter Smith via Members",
    body: "[Members] Reminder",
    time: "2022-09-09 16:38:51"
   },
  {
    t: "call",
    cmd: "incoming",
    name: "Brenda Smallman",
    number: "15192072269",
    time: "2022-09-09 17:08:51"
   },
  {
    t: "notify",
    id: 1663076557,
    src: "Outlook",
    title: "Thomas Briggs",
    body: "RE: BEST Status a...ady COOA messages",
    time: "2022-09-13 09:42:35"
   },
  {
    t: "notify",
    id: 1663076563,
    src: "Outlook",
    title: "Seymour/SCRM Activities Tracking",
    body: "11:00 a.m. - 11:3...oft Teams Meeting",
    time: "2022-09-13 10:46:23"
   },  
  {
    t: "notify",
    id: 1663161024,
    src: "Google",
    title: "Today's forecast \xB7 London",
    body: "23\xB0 / 6\xB0 \xB7 Partly...the full forecast",
    time: "2022-09-14 09:15:02"
   },
  {
    t: "notify",
    id: 1663161028,
    src: "Outlook",
    title: "IDM Notification",
    body: "ACTION REQUIRED: ...ll have access to",
    time: "2022-09-14 10:16:58"
   },
  {
    t: "notify",
    id: 1663161030,
    src: "Outlook",
    title: "Canada SHS ECP",
    body: "Last chance to re...mber 15th stating",
    time: "2022-09-14 10:19:40"
   },
  {
    t: "notify",
    id: 1663161032,
    src: "Outlook",
    title: "IT Announcements",
    body: "Notice to all Ari...y returning to Ar",
    time: "2022-09-14 10:23:12"
   },
  {
    t: "notify",
    id: 1663161034,
    src: "Google",
    title: "19\xB0 in London",
    body: "Partly cloudy \xB7 See more",
    time: "2022-09-14 10:27:02"
   }
 ];
 */
/*
GB({t:"notify", "msg":"anthrax", "body":"mybody", "tel": "0001"});
GB({t:"notify", "msg":"anthrax?", "body":"my body", "tel": "0002"});
GB({t:"notify", "msg":"anthrax!", "body":"my odd body", "tel": "0003"});
*/
