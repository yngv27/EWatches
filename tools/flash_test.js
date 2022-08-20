let pins = [
    D0, D1, D2, D3,  D5, D6, D7,  D9,
    D10, D11, D12, D13,  D15,  D17, D18, D19,
     D21, D22, D23,  D25, D26, D27,  D29,
     D31, 
    D32, D33, D34, D35, D36, D37, D38, 
    D40, D41, D42, D43,  D46
    ];

let plbl = '';
function makeLabels() {
  plbl = '';
  for(let p=0; p<pins.length; p++) {
    plbl += (' '+pins[p].toString()).slice(-3);
  }
}

// outputs a header for each pin (in groups of four for legibility) to console
function h() {
  makeLabels();
  out1 = '';
  out2 = '';
  out3 = '';
  for(let p=0; p < pins.length; p++) {
    if(p%4 == 0) {
      out1 += ' ';
      out2 += ' ';
      out3 += ' ';
    }
    out1 += plbl.charAt(p*3);
    out2 += plbl.charAt(p*3+1);
    out3 += plbl.charAt(p*3+2);

  }
  print (out1); print(out2); print(out3);
}

let out1 = '';
let out2 = '';
let out3 = '';

// shows the state of each pin in pin list (1/0 for high/low)
function d() {
  out1 = '';
  for(let p=0; p < pins.length; p++) {
    if(p%4 == 0) {
      out1 += ' ';
    }
    out1 += pins[p].read() ? '1' : '0';

  }
  print (out1);
}

function delay(ms) {
  let t = Math.floor(Date().getTime())+ms;
  while(t > Date().getTime()) {
    // something silly
    out3 = ' ';
  }
}

// used to track if in a series of nested loops a pin is being used
let pinBusy = [];

function resetBusy() {
  for(let i = 0; i< pins.length; i++) {
    pinBusy[i] = false;
  }
}

var CS=0, SI=0, CLK=0, SO=0;


function getNextPin(idx) {
  let c=idx;
  for(; c<pins.length && pinBusy[c] ; c++);
  return c >= pins.length ? -1 : c;
}

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
  //RST = getNextPin(RST);
  print(`CS=${CS}, SI=${SI}, CLK=${CLK}, SO=${SO} `);

        var spif=new SPI(); 
        pins[CS].set();
        spif.setup({sck:pins[CLK],miso:pins[SO],mosi:pins[SI],mode:0});
        //spif.send([0xb9],cs); //put to deep sleep

        spif.send([0xab],pins[CS]); // wake from deep sleep
        delay(20);
        cmdAB = spif.send([0xab,0,0,0,0],pins[CS]);
        cmd90 = spif.send([0x90,0,0,1,0,0],pins[CS]);
        cmd9f = spif.send([0x9f,0,0,0],pins[CS]);

        if((cmd9f[3] > 16 && cmd9f[3] < 32) || cmd9f[1] == 0x68) {
          Bangle.buzz();
          print(`CS:${pins[CS]} SO:${pins[SO]} SI:${pins[SI]} CLK:${pins[CLK]}  AB=${cmdAB}`);
          print(`90=${cmd90}`);
        }

  //RST=getNextPin(++RST);
  //if(RST == -1) {
    pinBusy[SO++]=false;
    SO=getNextPin(SO);
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
            return;
          }
          SI=0;
        }
        CLK=0;
      }
      SO=0;
    }
    //RST=0;
  //}
}

t=test;
