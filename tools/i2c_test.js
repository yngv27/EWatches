pins = [D3, D4, D9, D10, D12, D13, D14, D15, D16, D27];
//pins = [D2, D3, D6, D7];

// used to track if in a series of nested loops a pin is being used
let pinBusy = [];

function resetBusy() {
  for(let i = 0; i< pins.length; i++) {
    pinBusy[i] = false;
  }
}
function isDeviceOnBus(i2c,id) {
 try {
   return i2c.readFrom(id,1);
 }
 catch(err) {
   return -1;
 }
}
function detect(i2c,first, last) {
 first = first | 0;
 last = last | 0x77;
 var idsOnBus = Array();
 for (var id = first; id <= last; id++) {
   let r = isDeviceOnBus(i2c,id);
   if ( r != -1 && r != 255 && r != 0) {
     idsOnBus.push(id);
   }
 }
 return idsOnBus;
}

// you can use SW I2C, or use a built-in version like I2C1
myI2C = new I2C();
myI2C = I2C1;

var SDA=0, SCL=0, EN=0;

function getNextPin(idx) {
  for(let c=idx; c<pins.length && pinBusy[c] ; c++);
  return c >= pins.length ? -1 : c;
}

function test() {
  resetBusy();
  SDA = getNextPin(SDA);
  pinBusy[SDA] = true;
  SCL = getNextPin(SCL);
  pinBusy[SCL] = true;
  EN = getNextPin(EN);
  if(SCL != 3) {
    
    print(`SDA=${SDA}, SCL=${SCL}, EN=${EN} `);
    pins[EN].set();
    myI2C.setup( {scl: pins[SCL], sda: pins[SDA], bitrate: 100000} );
    let res = detect( myI2C );
    if(res.length > 0) {
      print(`Scanning SCL=${pins[SCL]} SDA=${pins[SDA]}`);
      print(`--------------- RES= ${res}--------------`);
    }
    
  }
  tik=0;
  EN=getNextPin(++EN);
  if(EN == -1) {
    pinBusy[SCL++]=false;
    SCL=getNextPin(SCL);
    if(SCL == -1) {
      pinBusy[SDA++]=false;
      SDA=getNextPin(SDA);
      if(SDA == -1) {
        print("DONE");
        if(tik) clearInterval(tik);
        return;
        SDA=0;
      }
      SCL=0;
    }
    EN=0;
  }
}

t=test;
s=setInterval;
