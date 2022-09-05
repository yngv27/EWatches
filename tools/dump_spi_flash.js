CS=D5;
CLK=D4;
SI=D27;
SO=D6;

spif = new SPI();
spif.setup({sck: SCK, miso: SO, mosi: SI, mode:0});
spif.send([0xab], CS);
print(spif.send([0x90,0,0,1,0,0], CS));
print(spif.send([0x9f,0,0,0], CS));
let hex = (d) => { return ('0'+d.toString(16)).slice(-2);};
let buf = new Uint8Array(256);
// 3 byte address: 0x7f 0xff 0xff (0x7f = 8MB, 0x3f = 4MB, 0x1f = 2MB)
for(let b1=39; b1 < 128; b1++) {
  for(let b2=0; b2 < 256; b2++) {
    for(let b3 = 0; b3 < 256; b3++) {
      res = spif.send([0x03, b1, b2, b3,0], CS);
      buf[b3] = res[4];
    }
    print(`${hex(b1)} ${hex(b2)} ${hex(b3)}: ${btoa(buf)}`);

  }
}
