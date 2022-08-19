for(let CS=3; CS < pins.length; CS++) {
  resetBusy();
  pinBusy[CS] = true;
  //print(`CS=${CS}`);
  for(let SI= 0 ; SI < pins.length; SI++) {
    if(pinBusy[SI]) continue;
    pinBusy[SI] = true;
    print(`${Date().toString().substring(16,24)} CS=${CS} SI = ${SI}`);
    for(let SO=0; SO < pins.length; SO++) {
      if(pinBusy[SO]) continue;
      pinBusy[SO] = true;
      for(let CLK=0; CLK < pins.length; CLK++) {
        if(pinBusy[CLK]) continue;
        pinBusy[CLK] = true;
        //print(`CLK = ${CLK}`);
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
        delay(99);
        pinBusy[CLK] = false;
      }
      pinBusy[SO] = false;
    }
    pinBusy[SI] = false;
  }
  pinBusy[CS] = false;
}
