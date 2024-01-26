
// MIT License (c) 2020 fanoush https://github.com/fanoush
// see full license text at https://choosealicense.com/licenses/mit/
// compiled with options LCD_BPP=12,SHARED_SPIFLASH,SPIFLASH_CS=(1<<5)
var SPI2 = (function(){
    var bin=atob("//////////8AAAAAAAAAAP////8AAAAAAAAAAAAAAL8QtQZMfETE6QABIDsBIQH6AvKZQKJg4WAQvQC/2P///wZLACLD+AAlw/gIIQEiWmDT+AQjCrHD+AgjcEcA8AJAEkvT+AAlELXqudP4BCMKscP4CCMOSnpEAAYUaMP4CEVUaMP4DEUSacP4ECVJAE/w/zLD+BQlw/hsJcP4JAXD+FQVASAQvU/w/zD75wDwAkCG////CEt7RJuKU7EFStL4GDEAK/vQACPC+BgxA0p6RJOCcEcA8AJARv///y7///8QtQNMfETigiCDYYOjgxC9GP////i1FUb/99z/FEsAJMP4NEX/J8P4OEUBIsP4GEEmRv8pAOsEDMP4RMWLv/80w/hIFcP4SHUAIYi//zkaYSWxGbkHS3tEmoL4vdP4GMG88QAP+tDD+BhhACnh0fTnAPACQMb+//8bSnpEOLUMRtFoWbMXTQcjxfgANU/woEPD+AwYkmgKscP4DCUAIgEh//e4/xFLe0QBLNpoT/CgQ8P4CCgE3QAiYR4BMP/3qv8LS3tEm2gbsU/woELC+Ag1ACABI8X4AAVrYDi9T/D/MPvnAL8A8AJAov7//3b+//9a/v//cLUERoixRhgAJSBGEPgBGxmxRBi0QgLZbUIoRnC9//ex/wAo+dEBNe/nBUb15xO1ACgd2wAppr+N+AUQAiQBJAAqob8CqQkZATQB+AQsACuivwKqEhkBNI34BACovwL4BDwhRgGo//eN/yBGArAQvQAk+uct6fBPobDN6QESU0p6RAdGkvgWkAAoAPCZgAApAPCWgAnx/zMHKwDykYABIwP6CfMBOwVG27I1+AJLA5MCm0VJsvgagBxBByPB+AA1k2ikshuxT/CgQsL4DDVP6kkD27IEkz5Le0QUqAWTCKvN6QYwT/AAC1lGBZsCnrP4GKADmwGaI0BE+gn0MvgTwAObI0BE+gn0MvgTIASbHkT2sgcugb8IPhX4ATv2ssbxCA6EvwP6DvMcQ0/qHBNDVBMKAfECDkPqDBxDGAMxqvECCi8pg/gBwKSyAPgOIB/6ivoJ3QEi//fj/tvxAQsLvweYBphZRgAhuvEAD8HRGUt7RAjx/zibix9EPUYCmzX4Aksf+oj4HEGksrjxAA+s0ZmxQkb/98T+D0t7RJtoG7FP8KBCwvgINQdKACABI8L4AAVTYCGwvejwj//3kf7r50/w/zD25wC/APACQKj9//9Q/f//uPz//478//8=");
    return {
      cmd:E.nativeCall(345, "int(int,int)", bin),
      cmds:E.nativeCall(469, "int(int,int)", bin),
      cmd4:E.nativeCall(515, "int(int,int,int,int)", bin),
      setpins:E.nativeCall(33, "void(int,int,int,int)", bin),
      enable:E.nativeCall(97, "int(int,int)", bin),
      disable:E.nativeCall(65, "void()", bin),
      blit_setup:E.nativeCall(225, "void(int,int,int,int)", bin),
      blt_pal:E.nativeCall(585, "int(int,int,int)", bin),
    };
  })();
  
  // this method would produce code string that can replace bin declaration above with heatshrink compressed variant
  // however it seems the gain is very small so is not worth it
  //    shrink:function(){return `var bin=E.toString(require("heatshrink").decompress(atob("${btoa(require("heatshrink").compress(bin))}")))`;}
  //*/
  E.kickWatchdog();
  
  //MAGIC3 pins
  CS=D3;DC=D47;RST=D2;BL=D12;
  SCK=D45;MOSI=D44;
  RST.reset();
  // CLK,MOSI,CS,DC
  SCK.write(0);MOSI.write(0);CS.write(1);DC.write(1);
  SPI2.setpins(SCK,MOSI,CS,DC);
  SPI2.enable(0x14,0); //32MBit, mode 0
  
  function delayms(ms){
    digitalPulse(DC,0,ms);
    digitalPulse(DC,0,0); // 0=wait for previous
  }
  
  function toFlatString(arr){
    var b=E.toString(arr);if (b) return b   ;
    print("toFlatString() fail&retry!");E.defrag();b=E.toString(arr);if (b) return b;
    print("fail&retry again!");E.defrag();b=E.toString(arr);if (b) return b;
    print("failed!"); return b;
  }
  function toFlatBuffer(a){return E.toArrayBuffer(toFlatString(a));}
  
  function cmd(a){
    var l=a.length;
    if (!l)return SPI2.cmd4(a,-1,-1,-1);
    if (l==2)return SPI2.cmd4(a[0],a[1],-1,-1);
    if (l==3)return SPI2.cmd4(a[0],a[1],a[2],-1);
    if (l==4)return SPI2.cmd4(a[0],a[1],a[2],a[3]);
    if (l==1)return SPI2.cmd4(a[0],-1,-1,-1);
    var b=toFlatString(a);
    SPI2.cmd(E.getAddressOf(b,true),b.length);
  }
  
  function cmds(arr){
    var b=toFlatString(arr);
    var c=SPI2.cmds(E.getAddressOf(b,true),b.length);
    if (c<0)print('lcd_cmds: buffer mismatch, cnt='+c);
    return c;
  }
  
  RST.set();
  
  function init(){
    cmd(0x11); // sleep out
    delayms(120);
    cmd([0x36, 0x48]);     // MADCTL - This is an unrotated screen
    //if(thisWatch == 'C16')
    //  cmd([0x36, 0]);     // MADCTL - This is an unrotated screen
  //cmd([0x37,0,0]);
    // These 2 rotate the screen by 180 degrees
    //[0x36,0xC0],     // MADCTL
    //[0x37,0,80],   // VSCSAD (37h): Vertical Scroll Start Address of RAM
    cmd([0x3A, 0x03]);  // COLMOD - interface pixel format - 03 - 12bpp, 05 - 16bpp
    //RAM Control - affects how LSB of Green is handled
    cmd([0xB0, 0, 0xE0]);
    cmd([0xB2, 0xb, 0xb, 0x00, 0x33, 0x33]); // PORCTRL (B2h): Porch Setting
    cmd([0xB7, 0x11]);     // GCTRL (B7h): Gate Control
    cmd([0xBB, 0x35]);  // VCOMS (BBh): VCOM Setting 
    cmd([0xC0, 0x2c]);
    cmd([0xC2, 1]);     // VDVVRHEN (C2h): VDV and VRH Command Enable
    cmd([0xC3, 8]);  // VRHS (C3h): VRH Set 
    cmd([0xC4, 0x20]);  // VDVS (C4h): VDV Set
    cmd([0xC6, 0x1F]);   // VCMOFSET (C5h): VCOM Offset Set .
    cmd([0xD0, 0xA4, 0xA1]);   // PWCTRL1 (D0h): Power Control 1 
    // originale
    /*
    cmd([0xe0, 0xF0, 0x4, 0xa, 0xa, 0x8, 0x25, 0x33, 0x27, 0x3d, 0x38, 0x14, 0x14, 0x25, 0x2a]);   // PVGAMCTRL (E0h): Positive Voltage Gamma Control
    cmd([0xe1, 0xf0, 0x05, 0x08, 0x7, 0x6, 0x2, 0x26, 0x32, 0x3d, 0x3a, 0x16, 0x16, 0x26, 0x2c]);   // NVGAMCTRL (E1h): Negative Voltage Gamma Contro
    */
    cmd([0xe0, 0x70, 0x15, 0x20, 0x15, 0x10, 0x09, 0x48, 0x33, 0x53, 0x0B, 0x19, 0x15, 0x2a, 0x2f]);   // PVGAMCTRL (E0h): Positive Voltage Gamma Control
    cmd([0xe1, 0x70, 0x15, 0x20, 0x15, 0x10, 0x09, 0x48, 0x33, 0x53, 0x0B, 0x19, 0x15, 0x2a, 0x2f]);   // NVGAMCTRL (E1h): Negative Voltage Gamma Control
  
    //cmd(0x21); // INVON (21h): Display Inversion On
    cmd(0x20);
    cmd([0x35, 0]);
    cmd([0x44, 0x25,0,0]);
    delayms(120);
    cmd([0x2a,0,0,0,239]);
    cmd([0x2b,0,0x14,1,0x2b]);
    cmd(0x29);
    cmd([0x35, 0]);
    //cmd([0x2a,0,0,0,239]);
    //cmd([0x2b,0,0,0,239]);
    //cmd([0x2c]);
  }
  
  var bpp=4; // powers of two work, 3=8 colors would be nice
  var g=Graphics.createArrayBuffer(240,280,bpp);
  var pal;
  switch(bpp){
    case 2: pal= Uint16Array([0x000,0xf00,0x0f0,0x00f]);break; // white won't fit
  //  case 1: pal= Uint16Array([0x000,0xfff]);break;
    case 1:
    pal= Uint16Array( // same as 16color below, use for dynamic colors
      [ 0x000,0x00a,0x0a0,0x0aa,0xa00,0xa0a,0xa50,0xaaa,
        0x555,0x55f,0x5f5,0x5ff,0xf55,0xf5f,0xff5,0xfff ]);
    g.sc=g.setColor;
    c1=pal[1]; //save color 1
    g.setColor=function(c){ //change color 1 dynamically
      c=Math.floor(c);
      if (c > 1) {
        pal[1]=pal[c]; g.sc(1);
      } else if (c==1) {
        pal[1]=c1; g.sc(1);
      } else g.sc(c);
    }; break;
    case 4: pal= Uint16Array( // CGA
      [
  // 12bit RGB444
        0x000,0x00a,0x0a0,0x0aa,0xa00,0xa0a,0xa50,0xaaa,
       0x555,0x55f,0x5f5,0x5ff,0xf55,0xf5f,0xff5,0xfff
  //16bit RGB565
  //      0x0000,0x00a8,0x0540,0x0555,0xa800,0xa815,0xaaa0,0xad55,
  //      0x52aa,0x52bf,0x57ea,0x57ff,0xfaaa,0xfabf,0xffea,0xffff
  
      ]);break;
  }
  
  // preallocate setwindow command buffer for flip
  g.winCmd=toFlatBuffer([
    5, 0x2a, 0,0, 0,0,
    5, 0x2b, 0,0, 0,0,
    1, 0x2c,
    0 ]);
  /*
    cmd([0x2a,0,x1,0,x2-1]);
    cmd([0x2b,0,r.y1,0,r.y2]);
    cmd([0x2c]);
  */
  // precompute addresses for flip
  g.winA=E.getAddressOf(g.winCmd,true);
  g.palA=E.getAddressOf(pal.buffer,true); // pallete address
  g.buffA=E.getAddressOf(g.buffer,true); // framebuffer address
  g.stride=g.getWidth()*bpp/8;
  
  g.flip=function(force){
    var r=g.getModified(true);
    if (force)
      r={x1:0,y1:0,x2:this.getWidth()-1,y2:this.getHeight()-1};
    if (r === undefined) return;
    var x1=r.x1&0xfe;var x2=(r.x2+2)&0xfe; // for 12bit mode align to 2 pixels
    var xw=(x2-x1);
    var yw=(r.y2-r.y1+1);
    if (xw<1||yw<1) {print("empty rect ",xw,yw);return;}
    var c=g.winCmd;
    c[3]=x1;c[5]=x2-1; //0x2a params
    var y=r.y1+20;c[9]=y%256;c[8]=y>>8;
    y=r.y2+20;c[11]=y%256;c[10]=y>>8; // 0x2b params
    SPI2.blit_setup(xw,yw,bpp,g.stride);
    var xbits=x1*bpp;
    var bitoff=xbits%8;
    var addr=g.buffA+(xbits-bitoff)/8+r.y1*g.stride; // address of upper left corner
    //VIB.set();//debug
    SPI2.cmds(g.winA,c.length);
    SPI2.blt_pal(addr,g.palA,bitoff);
    //VIB.reset();//debug
  };
  
  g.isOn=false;
  init();
  
  g.lcd_wake=function(){
    if (this.isOn) return;
    cmd(0x11);
    g.flip();
    //cmd(0x13); //ST7735_NORON: Set Normal display on, no args, w/delay: 10 ms delay
    //cmd(0x29); //ST7735_DISPON: Set Main screen turn on, no args w/delay: 100 ms delay
    this.isOn=true;
    this.setBrightness();
  };
  
  
  g.lcd_sleep=function(){
    if (!this.isOn) return;
    //cmd(0x28);
    cmd(0x10);
    BL.reset();
    this.isOn=false;
  };
  
  // does PWM on BL pin, not best for P8 as it has 3 BL pins
  g.lev=256;
  g.setBrightness=function(lev){
    if (lev>=0 && lev<=256)
      this.lev=lev;
    else
      lev=this.lev;
    if (this.isOn){
      val=lev/256;
      if (val==0||val==1)
        digitalWrite(BL,val);
      else
        analogWrite(BL,val,{freq:60});
    }
  };
