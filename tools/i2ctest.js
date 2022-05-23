// requires pinutils for pinBusy, resetBusy, delay

// loop through pin list, trying each for ENable, I2C SDA and SCL to see if any 
// component answers

// recommend you use a watchdog here, it's easy to hang the MCU by poking too much

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
   if ( isDeviceOnBus(i2c,id) != -1) {
     idsOnBus.push(id);
   }
 }
 return idsOnBus;
}

// you can use SW I2C, or use a built-in version like I2C1
myI2C = new I2C();
//myI2C = I2C1;

for(let EN=0; EN < pins.length; EN++) {
  resetBusy();
  pinBusy[EN] = true;
  pins[EN].set();
  // comment out above 4 lines is you don't need to ENable a pin to use I2C (and the last two lines)
  for(let SDA=0; SDA < pins.length; SDA++) {
    if(pinBusy[SDA]) continue;
    pinBusy[SDA] = true;
    print(`Scanning EN=${pins[EN]} SDA=${pins[SDA]}`);
    for(let SCL=0; SCL < pins.length; SCL++) {
      if(pinBusy[SCL]) continue;
      pinBusy[SCL] = true;
      myI2C.setup( {scl: pins[SCL], sda: pins[SDA], bitrate: 100000} );
      let res = detect( myI2C );
      if(res.length > 0) {
        print(`Scanning SCL=${pins[SCL]} SDA=${pins[SDA]}`);
        print(`--------------- RES= ${res}--------------`);
      }
      delay(500);
      pinBusy[SCL] = false;
    }
    pinBusy[SDA] = false;
  }
   // comment out below 2 lines is you don't need to ENable a pin to use I2C 
  pinBusy[EN] = false;
}
