function delay(ms) {
  let t = Math.floor(Date().getTime())+ms;
  while(t > Date().getTime()) {  }
}

I2C1.setup({sda: D6, scl: D7, bitrate: 200000});

function send(a, d) {
  I2C1.writeTo(0x3f,a,d);
  print(`Sending ${d} to ${a}`);
}
let on=() => {send(0, 0xaf);};
let off=() => {send(0, 0xae);};

function lcdInit() {
  D15.reset(); //clear 15
  D30.set(); //set 30
    delay(2);
  D30.reset(); //clear 30
    delay(2);
  D30.set(); //set 30
    delay(10);
  send(0, 0xe2);//  0xe200;
    delay(10);
  send(0,  0xff);
  send(0,  0x72);
  send(0,  0xfe);
  send(0,  0xda);
  send(0,  0x95);
  send(0,  0x99);
  send(0,  0xa0);
  send(0,  0xc8);
  send(0,  0xa4);
  send(0,  0x40);
  send(0,  0x22);
  send(0,  0x81);
  send(0,  0x3);
  send(0,  0xf8);
  send(0,  0x0);

  send(0,  0x2c);
    delay(1);
  send(0,  0x2e);
    delay(1);
  send(0,  0x2f);
    delay(1);
  send(0,  0xff);
  send(0,  0x64);
  send(0,  0xfe);
    delay(1);
  send(0,  0xaf);
}

let segData = [ 0x4455, 0x14, 0x5045, 0x1055, 0x1414, 0x1451, 0x5451, 0x15, 0x5455, 0x1455,
  0x1445, 0x5051, 0x40, 0x1000, 0x1,  0, 
  // percentage,   low,   med,  hi,   blank
  ];

// serial access
function setEverything(bigStr, icons) {
  send(0,0xb0);
  send(0,0x10);
  // offset into array
  send(0,0);
  let max = Math.min(bigStr.length, 13);
  for(let idx = 0; idx < max; idx++) {
    val = bigStr.charCodeAt(idx)-48;
    if(val > segData.length) val = 0;
    send(0x40, ((segData[val] >> 8) + (icons ? 1 : 0)) & 0xff);
    send(0x40, segData[val] & 0xff);
  }
}

// random access
function setDigit(idx, val, icon) {
  send(0,0xb0);
  // first 8 go to 0x10, the other 5 to 0x11
  send(0, 0x10 + (idx >> 3));
  send(0, (idx % 8) * 2);
  send(0x40, ((segData[val] >> 8) + (icon ? 1 : 0)) & 0xff);
  send(0x40, segData[val] & 0xff);
}

function setDigitRaw(idx, val, icon) {
  send(0,0xb0);
  send(0,0x10);
  // offset into array
  send(0,idx*2);
  send(0x40, ((val >> 8) + (icon ? 1 : 0)) & 0xff);
  send(0x40, val & 0xff);
}
