let ACCEL = {
    fc: {},
    init: () => {
      ACCEL.fc=new SPI(); // font chip - 2MB SPI flash
      D23.write(1);
      ACCEL.fc.setup({sck:D19,miso:D22,mosi:D20,mode:0});
      ACCEL.fc.send([0xb9],D23); //put to deep sleep
  
      // BMA 222E accelerometer on shared spi with fontchip, CS=D18
      D18.set();
      D31.set();
      setInterval(()=>{
        ACCEL.checkFaceup();
        ACCEL.checkStep();
      }, 375);
    },
    accRegRead: (r) => {
        return ACCEL.fc.send([0x80|r,0x00],D18)[1];
    },
    accWriteReg: (r,v) => {
        ACCEL.fc.send([0x7f & r,v],D18);
    },
    accSetBit: (r,b)=>{
        var v = accRegRead(r);
        accWriteReg(r,v | 1<<b);
    },
    accResetBit: (r,b) => {
        var v = accRegRead(r);
        accWriteReg(r,v & ~(1<<b));
    },
    accLowPowerMode: (b) => {
        if (b)
            accSetBit(0x11,6);
        else
            accResetBit(0x11,6);
    },
    read: () => {
        let coords=Int8Array(ACCEL.fc.send([0x82,0,0,0,0,0,0],D18).buffer,2);
        return ({ax:coords[0],ay:coords[2],az:coords[4]});
    },
    checkStep: () => {
      let xyz = ACCEL.read();
      // step check
      if((xyz.ax < 0 && xyz.ax > -40) && (xyz.ay < 0 && xyz.ay > -30) && xyz.az < -30) {
        if(!ACCEL.inStep) {
            ACCEL.emit("STEP");
            ACCEL.inStep = true;
        } 
      } else {
        ACCEL.inStep = false;
      }
    },
    checkFaceup: () => {
      let xyz = ACCEL.read();
      //console.log(JSON.stringify(xyz));
      if((xyz.ax > 35 && xyz.ax < 60) && xyz.ay > 0 && xyz.ay < 20 && xyz.az < 0) {
        if(ACCEL.isFaceUp == false) {
          ACCEL.isFaceUp = true;
          ACCEL.emit("FACEUP");
          return;
        }
      } else {
      // have we switched?
        ACCEL.isFaceUp = false;
      }
    }
  };
  ACCEL.init();
    /* try tap detection feature
    D17.mode("input_pulldown"); // irq2 pin
    accWriteReg(0x21,0x0E); // //latch irq for 50ms
    accSetBit(0x16,5); // single tap enable
    accSetBit(0x1b,5); // map it to int2
    accLowPowerMode(1);
    accWriteReg(0x2b,(3<<6)|4) //tap sensitivity  

    // values are 4=face tap, 2=side tap, 1=bottom or top side tap
    setWatch(()=>{
        var rv = accRegRead(0x0b);
        var v = (rv&0x7f)>>4;
        v  = rv&0x80?-v:v;
        print("tap ",v);
    },D17,{ repeat:true, debounce:false, edge:'rising' });
    */
