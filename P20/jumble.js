
function getDigit(d) {
  return(_S.read("montserrat.fnt",
    [0, 2016, 3060, 4896, 6660, 8820, 10620, 12492, 14364, 16272][d],
    [2016, 1044, 1836, 1764, 2160, 1800, 1872, 1872, 1908, 1872][d]
  ));
}
function getDigitMini(d) {
  return(_S.read("montmini.fnt",
    [0, 449, 749, 1165, 1581, 2046, 2478, 2910, 3359, 3808, ][d],
    [449, 300, 416, 416, 465, 432, 432, 449, 449, 449, ][d]
  ));
}

function str2ab(str) {
    let buf = new Uint16Array(str.length/2);
    for (let i=0; i < str.length; i++) {
      buf[i] = str.charCodeAt(i*2)+(str.charCodeAt(i*2+1)<<8);
    }
    return buf;
}

function palAdjust(pal, pct) {
  // pal is Uint16Array of 565 RGB
  for(let c=0; c<16; c++) {
    let r1=pal[c] >> 11, g1=(pal[c] >> 5) & 63, b1=pal[c] & 31;
    r1 = Math.floor(r1*pct[0]); g1 = Math.floor(g1*pct[1]); b1 = Math.floor(b1*pct[2]); 
    pal[c] = (((r1<<6)+g1)<<5)+b1;
  }
  return pal;
}
function getDigitObj(img) {
  return {
    width: img.charCodeAt(0),
    height: img.charCodeAt(1),
    bpp: img.charCodeAt(2) & 63, //remove transparent bit
    transparent: 0,
    palette: str2ab(img.substring(4,36)),
    buffer: img.substring(36),
  };
}

let lastTm = -1;
let tm=new Uint8Array([0,0,0,0]);
function clock() {
  let dt = new Date();
  tm[0] = dt.getHours();
  if(tm[0] > 12) tm[0] -= 12;
  if(tm[0] == 0) tm[0] = 12;
  tm[1] = tm[0] % 10;
  tm[0] = Math.floor(tm[0]/10);
  tm[2] = dt.getMinutes();
  tm[3] = tm[2] % 10;
  tm[2] = Math.floor(tm[2]/10);
  if(tm[3] == lastTm) return;
  lastTm = tm[3];

  for(let i=0, x=22; i<4; i++) {
    g.drawImage(getDigitObj(getDigit(tm[i])), x, 85);
    if(tm[i]==1) x+=30; else x+=50;
  }
  
  tm[0] = dt.getMonth()+1;
  tm[1] = tm[0] % 10;
  tm[0] = Math.floor(tm[0]/10);
  tm[2] = dt.getDate();
  tm[3] = tm[2] % 10;
  tm[2] = Math.floor(tm[2]/10);

  for(let i=0, x=75; i<4; i++) {
    g.drawImage(getDigitObj(getDigitMini(tm[i])), x, 180);
    if(tm[i]==1) x+=15; else x+=25;
  }

  
  tm[0] = E.getBattery();
  if(tm[0] > 99) tm[0]=99;
  if(tm[0] < 0) tm[0] = 0;
  tm[1] = tm[0] % 10;
  tm[0] = Math.floor(tm[0]/10);

  for(let i=0, x=100; i<2; i++) {
    let obj = getDigitObj(getDigitMini(tm[i]));
    obj.palette = palAdjust(obj.palette, [0.6,0.4,0.6]);
    obj.transparent = -1;
    g.drawImage(obj, x, 40,{"scale":0.8});
    x+=20;
  }


  for(let i=0; i<30; i++) {
    setTimeout(rand, 10000+i*500);
  }
}
function rand() {
  let obj = getDigitObj(getDigit(Math.floor(Math.random()*10)));
  obj.palette = palAdjust(obj.palette, [0.4,0.4,0.4]);
  g.drawImage(obj, Math.random()*240, Math.random()*240);
}

()=>{
  g.clear();
}();

wOS.on("wake", ()=> {clock();});
wOS.showLauncher = clock;

let batRdgs = [];
let batBurn = [];
//let batAvgs = [];
let oldBatAvg = 0;

let avgInt = setInterval(()=>{
  if(batRdgs.length > 10) batRdgs.shift();
  batRdgs.push(analogRead(D30));
}, 4000);

let batAvg = () => { 
  return batRdgs.reduce( (prev, curr) => prev + curr) / batRdgs.length;
};

let checkInt = setInterval(()=> {
  let newBatAvg = batAvg();
  if(oldBatAvg) batBurn.push((oldBatAvg - newBatAvg).toFixed(6));
  if(batBurn.length > 60) batBurn.shift();
  oldBatAvg = newBatAvg;
}, 300000);


