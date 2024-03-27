
function KX022(c,o,k,i) {
  c.set(); // CS
  //INT.mode("input"); // IRQ
  acc=new SPI();
  acc.setup({sck:k,miso:i,mosi:o,mode:0});
  acc.readReg=function(reg){return this.send([0x80+reg,0],c)[1];};
  acc.writeReg=function(reg,val){this.send([reg,val],c);};
  acc.readRegs=function(reg,len){
    c.reset();this.write(0x80+reg);
    return this.send({data:0,count:len},c);
  };
  acc.readCoords=function(){
    return new Int16Array(this.readRegs(6,6).buffer);
  };

  let res = acc.readReg(0x0f);
  if(255 != res && 0 != res) {
    print(`CLK=${k} CS=${c} MISO=${i} MOSI=${o}  WHOAMI=${res}`);
  }// read whoami register = 20 for KX022
}

pins = [D3, D4, D11, D12, D13, D14, D15. D16, D27];
// used to track if in a series of nested loops a pin is being used
let pinBusy = [];

function resetBusy() {
  for(let i = 0; i< pins.length; i++) {
    pinBusy[i] = false;
  }
}
   
function getNextPin(idx) {
  for(let c=idx; c<pins.length && pinBusy[c] ; c++);
  return c >= pins.length ? -1 : c;
}


var CS=0, SI=0, CLK=0, SO=0;

function getNextPin(idx) {
  for(let c=idx; c<pins.length && pinBusy[c] ; c++);
  return c >= pins.length ? -1 : c;
}
tik=0;
function test() {
  
  resetBusy();
  CS = getNextPin(CS);
  pinBusy[CS] = true;
  SI = getNextPin(SI);
  pinBusy[SI] = true;
  CLK = getNextPin(CLK);
  pinBusy[CLK] = true;
  SO = getNextPin(SO);
  pinBusy[SO] = true;
  
  print(`CS=${CS}, SI=${SI}, CLK=${CLK}, SO=${SO}`);
  KX022(pins[CS], pins[SI], pins[CLK], pins[SO]);

  SO=getNextPin(++SO);
  if(SO == -1) {
    pinBusy[CLK++]=false;
    CLK=getNextPin(CLK);
    if(CLK == -1) {
      pinBusy[SI++]=false;
      SI=getNextPin(SI);
      if(SI == -1) {
        CS++;
        if(CS >= pins.length) {
          print("DONE");
          if(tik) clearInterval(tik);
          return;
        }
        SI=0;
      }
      CLK=0;
    }
    SO=0;
  }
}



t=test;
s=setInterval;
