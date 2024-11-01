// MSA301 for GT101
var exports = {};
exports.connect = (i2c, opts) => {
  let A = {};
  let addr= opts.addr ? opts.addr : 0x19;
  let writeByte=(a,d) => { 
    i2c.writeTo(addr,a,d);
  }; 
  let readBytes=(a,n) => {
    i2c.writeTo(addr, a);
    return i2c.readFrom(addr,n); 
  };
  let init=() => {
    var id = readBytes(0x01,1)[0];
    writeByte(0x10,0x3); // enable axes
    writeByte(0x11,0x3); //power mode
    writeByte(0x16,0x77); //enable freefall / active int
    writeByte(0x17,0x1); //enable freefall / active int
    writeByte(0x19,0x75); //set to INT pin
    writeByte(0x1a,0x1); //data too

    writeByte(0x21,0x5);
    
    if(opts.pin) {
      pinMode(opts.pin,"input",false);
      setWatch(()=> {
        print("ACCEL INT");
        setTimeout(()=>{
          var  xyz = read();
          if(xyz.x > 200 && xyz.x < 250 && (xyz.y < 20 || xyz.y > 240) && xyz.z < 200) {
            this.emit("faceup");
          }
        }, 200);
      }, opts.pin,{repeat:true,edge:"rising",debounce:50});
    }
    /**/
    setInterval(()=>{
      var  xyz = read();
      if(xyz.x > 240  && (xyz.y < 220 || xyz.y > 200) && xyz.z > 130) {
        A.emit("faceup");
      }
    }, 300);
    /**/
    return id;
  };
  let read=()=>{
    /*
      function conv(lo,hi) { 
        var i = (hi<<8)+lo;
        return ((i & 0x7FFF) - (i & 0x8000))/16;
      }
    */
      var a = readBytes(0x2,6);
      //return {x:conv(a[0],a[1]), y:conv(a[2],a[3]), z:conv(a[4],a[5])};
    return {x:a[1], y:a[3], z:a[5]};
  };
  A.id= init(); A.read= read;
  return A;
};

/*
let i2c=new I2C();

i2c.setup({sda: D13, scl: D15, bitrate: 200000});

opts={addr: 0x27};

A = exports.connect(i2c, opts);
A.on("faceup", ()=>{
  if(!wOS.awake) {
    clock();
    wOS.wake();
  }
});
//*/