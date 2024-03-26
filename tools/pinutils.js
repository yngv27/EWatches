// all pins on a 52840; remove D32+ for a 52832
let pins = [
    D0, D1, D2, D3, D4, D5, D6, D7, D8, D9,
    D10, D11, D12, D13, D14, D15, D16, D17, D18, D19,
    D20, D21, D22, D23, D24, D25, D26, D27, D28, D29,
    D30, D31, 
    D32, D33, D34, D35, D36, D37, D38, D39,
    D40, D41, D42, D43, D44, D45, D46, D47
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

// handy f() for quick delays that block
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
   

// loops through each pin, toggling it high/low at for 1 sec; useful for testing
// a single pin with a multimeter
let r = {
  pinIdx: 0,
  intvl: 0,
  isSet: false,
  stop: ()=>{
    if(r.intvl) clearInterval(r.intvl);
    print("* * * * * * * * * * * * * * * * Stopped");
  },
  start: () => {
    print("started");
    r.pinIdx=0;
    setTimeout(()=>{
      r.intvl = setInterval(r.tick, 1000);
    }, 3000);
  },
  tick: () => {
    if(r.pinIdx >= pins.length) r.stop();
    if(!r.isSet) {
      pins[r.pinIdx].set();
      print(pins[r.pinIdx] + " SET");
    } else {
      pins[r.pinIdx].reset();
      print(pins[r.pinIdx++] + " RESET");
    }
    r.isSet = !r.isSet;
  }
};

// repeatedly toggles a single pin high/low for 1 sec pulses; useful for testing
// multiple leads quickly (such as a ribbon connector)
let t = {
  intvl: 0,
  isSet: false,
  pin: 0,
  stop: ()=>{
    if(t.intvl) clearInterval(t.intvl);
    print("* * * * * * * * * * * * * * * * Stopped");
  },
  start: (p) => {
    print("started");
    t.pin=p;
    t.intvl = setInterval(t.tick, 1000);
  },
  tick: () => {
    if(!t.isSet) {
      print(t.pin + " SET");
      t.pin.set();
    } else {
      print(t.pin + " RESET");
      t.pin.reset();
    }
    t.isSet = !t.isSet;
  }
};

// analog pins (battery level test)
let apins = [
    D2, D3, D4, D5, D28, D29, D30, D31, 
];

function adump() {
  let out1 = '';
  for(let p=0; p < apins.length; p++) {
    out1 += analogRead(apins[p])+",";
  }
  print(out1);
}

  
