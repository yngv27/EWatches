/*
** ST7789 display driver
*/

function init(spi, cfg, callback) {
  //print(`INIT called opts=${JSON.stringify(cfg)}`);

  function cmd(c, d) {
    cfg.DC.reset();
    spi.write(c, cfg.CS);
    if (d !== undefined) {
        cfg.DC.set();
        spi.write(d, cfg.CS);
    }
  }

  if (cfg.RST) {
    digitalPulse(cfg.RST, 0, 10);
  } else {
    cmd(0x01); //Software reset
  }
  
  const ST7789_INIT_CODE = [
      [0x11, 0],     //SLPOUT (11h):
      // This is an unrotated screen
      [0x36, 0],     // MADCTL
      [0x3A, 0x55],  // COLMOD - interface pixel format - 16bpp
      [0xB2, [0xC, 0xC, 0, 0x33, 0x33]], // PORCTRL (B2h): Porch Setting
      [0xB7, 0],     // GCTRL (B7h): Gate Control
      [0xBB, 0x3E],  // VCOMS (BBh): VCOM Setting 
      [0xC2, 1],     // VDVVRHEN (C2h): VDV and VRH Command Enable
      [0xC3, 0x19],  // VRHS (C3h): VRH Set 
      [0xC4, 0x20],  // VDVS (C4h): VDV Set
      [0xC5, 0xF],   // VCMOFSET (C5h): VCOM Offset Set .
      [0xD0, [0xA4, 0xA1]],   // PWCTRL1 (D0h): Power Control 1 
      [0xe0, [0x70, 0x15, 0x20, 0x15, 0x10, 0x09, 0x48, 0x33, 0x53, 0x0B, 0x19, 0x15, 0x2a, 0x2f]],   // PVGAMCTRL (E0h): Positive Voltage Gamma Control
      [0xe1, [0x70, 0x15, 0x20, 0x15, 0x10, 0x09, 0x48, 0x33, 0x53, 0x0B, 0x19, 0x15, 0x2a, 0x2f]],   // NVGAMCTRL (E1h): Negative Voltage Gamma Contro
      [0x29, 0], // DISPON (29h): Display On 
      [0x21, 0], // INVON (21h): Display Inversion On
      // End
      [0, 0]// 255//DATA_LEN = 255 => END
  ];

  setTimeout(function () {
      cmd(0x11); //Exit Sleep
      setTimeout(function () {
          ST7789_INIT_CODE.forEach(function (e) {
              cmd(e[0], e[1]);
          });
          if (callback) callback();
      }, 20);
  }, 120);
  
  return {
    lcd_sleep: function(){cmd(0x10);cmd(0x28);},
    lcd_wake: function(){cmd(0x29);cmd(0x11);}
  };

}

exports.connect = function(spi, cfg) {
  //opts = {spi:SPI1, cs: lcd.CS, rst:lcd.RST, dc:lcd.DC};
  spi.setup({sck:cfg.SCK, mosi:cfg.SI, baud: 32000000});

  var g = lcd_spi_unbuf.connect(spi, {
      height: 240,
      width: 240,
      colstart: 0,
      rowstart: 0,
      "dc": cfg.DC,
      "cs": cfg.CS,
  });

  let cmds = init(spi, cfg, ()=>{g.clear(1).setFont("6x8").drawString("Loading...",20,20);});

  g.lcd_sleep = cmds.lcd_sleep;
  g.lcd_wake = cmds.lcd_wake;

  return g;

};
