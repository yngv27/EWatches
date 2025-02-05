//Kionix?? 


function _ACCEL(opts)  {
  this.i2c = opts.i2c;
  this.intr = opts.intr; //D13?
  this.addr = 0x0F;
  this.wasFaceUp = false;
}
_ACCEL.prototype.writeByte = function(a,d) { 
this.i2c.writeTo(this.addr,a,d);
}; 
_ACCEL.prototype.readBytes = function(a,n) {
this.i2c.writeTo(this.addr, a);
return this.i2c.readFrom(this.addr,n); 
};
_ACCEL.prototype.init = function () {
setInterval(()=> {
  this.isFaceUp();
}, 500);
//return id;  
};

_ACCEL.prototype.read = function () {
var a = this.readBytes(0x2,6);
// just return MSB
return {x:a[1], y:a[3], z:a[5]};
};

_ACCEL.prototype.isFaceUp = function () {
let a = this.read();
if((a.x < 25 ) && (a.y < 220) && (a.y > 180) &&  a.z > 128) {
  if(!this.wasFaceUp) this.emit('faceup');
  this.wasFaceUp = true;
  return true;
}
this.wasFaceUp = false;
return false;
};
exports={};
exports.connect = function(opts) {
return new _ACCEL(opts);
};
//ACCEL.init();
//ACCEL.intvl = setInterval(ACCEL.isFaceUp, 300);
/*
setInterval(()=>{print(peek32(0x50000510).toString(2).padStart(32,'0'));}, 250);
0010000000100000 1110 0100 0000 1000
>ACCEL.readBytes(0x1a,1)
=new Uint8Array(1)
0000000000100000 1100 0100 0000 1000
*/