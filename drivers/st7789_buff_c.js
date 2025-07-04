E.kickWatchdog();
function KickWd(){
  //if( (typeof(BTN1)=='undefined')||(!BTN1.read()) ) 
    E.kickWatchdog();
}
var wdint=setInterval(KickWd,2000);
E.enableWatchdog(15, false);

var c = E.compiledC(`
// int cmd(int,int)
// int cmds(int,int)
// int cmd4(int,int,int,int)
// int data(int, int)
// void setpins(int,int,int,int)
// int enable(int,int)
// void disable()
// void setPixel(int,int,int)
// void setFillColor(int)
// void fillRect(int, int, int, int) 

#define SHARED_SPIFLASH

// also we may need to unselect flash chip CS pin as Espruino is in a middle of read command
#define SPIFLASH_CS (1<<5)

//SPI0 0x40003000
//SPI1 0x40004000
//SPI2 0x40023000
#define REG(offset) (offset/4)

#define SPIBASE 0x40023000

#define READY REG(0x108)
#define INTENSET REG(0x304)
#define INTENCLR REG(0x308)
#define ENABLE REG(0x500)
#define PSELSCK REG(0x508)
#define PSELMOSI REG(0x50c)
#define PSELMISO REG(0x510)
#define FREQUENCY REG(0x524)
#define CONFIG REG(0x554)
#define GPIO(x) ((volatile uint32_t*)(0x50000000+x))

#define OUTSET  GPIO(0x508)
#define OUTCLR  GPIO(0x50c)

#define SPI ((volatile uint32_t*)SPIBASE)

typedef unsigned int uint32_t;
typedef signed int int32_t;
typedef unsigned short uint16_t;
typedef unsigned char uint8_t;
typedef signed char int8_t;
#define NULL ((void*)0)
// if code is in RAM we can put global data into text/code segment
// this allows simpler pc-relative addressing and shorter/faster code
#define __code __attribute__((section(".text")))

__attribute__((section(".text"))) uint32_t pSCK= -1;
__attribute__((section(".text"))) uint32_t pMOSI= -1;
__attribute__((section(".text"))) uint32_t pMISO= -1;
__attribute__((section(".text"))) uint32_t pCS= 0;
__attribute__((section(".text"))) uint32_t pCD= 0; //command/data

void setpins(int sck,int mosi,int cs,int cd){
  pSCK=sck;pMOSI=mosi;pCS=1<<cs;pCD=1<<cd;
}
__attribute__((section(".text"))) uint32_t savedintflags=0;
__attribute__((section(".text"))) uint32_t savedmode=0;

void save(){
  savedintflags=SPI[INTENSET];
  savedmode=SPI[ENABLE];
}

void restore(){
  SPI[ENABLE]=0;
  SPI[INTENSET]=savedintflags;
  SPI[ENABLE]=savedmode;
}

// pins need to be already preconfigured as gpio input/outputs
int setup(uint32_t speed,uint32_t mode){
  if (pSCK>=0 && (pMISO>=0||pMOSI>=0)){
    uint32_t flags=SPI[INTENSET];
    if (flags) SPI[INTENCLR]=flags; // clear all interrupt flags
    SPI[PSELSCK]=pSCK;
    SPI[PSELMOSI]=pMOSI;
    SPI[PSELMISO]=pMISO;
    SPI[FREQUENCY]=speed<<24; // 0x80=8mbits,0x40=4mbits,...
    SPI[CONFIG]=mode<<1; //msb first
    return 1;
  }
  return 0;
}
void disable(){
  SPI[ENABLE]=0;
  SPI[READY]=0;
  uint32_t flags=SPI[INTENSET];
  if (flags) SPI[INTENCLR]=flags; // clear all interrupt flags
}

int enable(uint32_t speed,uint32_t mode){
  if (SPI[ENABLE]) return -1;
  if (setup(speed,mode)){
#ifndef SHARED_SPIFLASH
    SPI[ENABLE]=7;//SPIM with DMA
    SPI[TASKS_STOP]=1;
    //isDMA=1;
#endif
    return 1;
  }
  return 0;
}

int write_dma(uint8_t *buffer, uint32_t len,int async);

int data(uint8_t *buffer, int len){
  if (pCD==0) return -1;
  if(buffer==NULL || len==0) return -1;
#ifdef SHARED_SPIFLASH
#ifdef SPIFLASH_CS
  *OUTSET = SPIFLASH_CS;
#endif
    SPI[ENABLE]=7;//SPIM with DMA
#endif
  if(pCS>0) *OUTCLR = pCS; // CHIP SELECT
  *OUTSET = pCD; // data
  write_dma(buffer,len,0);
  if(pCS>0) *OUTSET = pCS; // CHIP SELECT
#ifdef SHARED_SPIFLASH
    SPI[ENABLE]=0;//disable SPI
#endif
  return 0;
}
int cmd(uint8_t *buffer, int len){
  if (pCD==0) return -1;
#ifdef SHARED_SPIFLASH
#ifdef SPIFLASH_CS
  *OUTSET = SPIFLASH_CS;
#endif
    SPI[ENABLE]=7;//SPIM with DMA
#endif
  *OUTCLR = pCD; // CMD
  if(pCS>0) *OUTCLR = pCS; // CHIP SELECT
  write_dma(buffer,1,0);
  *OUTSET = pCD; // data
  if (len>1)
    write_dma(buffer+1,len-1,0);
  if(pCS>0) *OUTSET = pCS; // CHIP SELECT
#ifdef SHARED_SPIFLASH
    SPI[ENABLE]=0;//disable SPI
#endif
  return 0;
}
int cmds(uint8_t *ptr,int bufflen){
  int cnt=0;
  if (!ptr) return cnt;
  uint8_t *endptr=ptr+bufflen;
  uint8_t len;
  while ((len=*ptr++)!=0){
    if ((ptr+len)>endptr) return -cnt;// break if we would go past buffer
    if(cmd(ptr,len)) break;
    ptr+=len;cnt++;
  }
  return cnt;
}
// send command with up to 3 parameters (espruino allows methods with up to 4 parameters)
int cmd4(int c0,int d1,int d2, int d3){
  int cnt=0;
  uint8_t buff[4];
  if (c0>=0)buff[cnt++]=c0; else return 0;
  if (d1>=0)buff[cnt++]=d1;
  if (d2>=0)buff[cnt++]=d2;
  if (d3>=0)buff[cnt++]=d3;
  cmd(buff,cnt);
  return cnt;
}
#define EVENTS_END REG(0x118)
#define RXDPTR REG(0x534)
#define RXDMAXCNT REG(0x538)
#define TXDPTR REG(0x544)
#define TXDMAXCNT REG(0x548)
#define TASKS_START REG(0x010)

__code uint16_t running=0;
void wait_dma(){
  if (running) {
    while (SPI[EVENTS_END] == 0); // wait for previous transfer
    SPI[EVENTS_END]=0;
    running=0;
  }
}

int write_dma(uint8_t *ptr, uint32_t len, int async)
{
  wait_dma();
  int offset = 0;
  SPI[RXDPTR]=0;
  SPI[RXDMAXCNT]=0;
  SPI[EVENTS_END]=0;
  do {
    SPI[TXDPTR]=(uint32_t)(ptr + offset);
    if (len < 0x100) {
      SPI[TXDMAXCNT]=len;
      len = 0;
    } else {
      SPI[TXDMAXCNT]=0xff;
      offset = offset + 0xff;
      len = len - 0xff;
    }
    SPI[TASKS_START]=1;
    if (async && len==0){
      running=1; // do not wait for last part
    } else {
        while (SPI[EVENTS_END] == 0);
        SPI[EVENTS_END]=0;
    }
  } while (len != 0);
  return 0;
}
void setPixel(int x, int y, int c) 
{
  uint8_t buff[8];
  int idx=0;
  buff[idx++] = 0x2a;
  buff[idx++] = 0;
  buff[idx++] = (uint8_t)x;
  buff[idx++] = 0;
  buff[idx++] = (uint8_t)x;
  cmd(buff, 5);

  idx=0;
  buff[idx++] = 0x2b;
  buff[idx++] = 0;
  buff[idx++] = (uint8_t)y;
  buff[idx++] = 0;
  buff[idx++] = (uint8_t)y;
  cmd(buff, 5);

  idx=0;
  buff[idx++] = 0x2c;
  buff[idx++] = (uint8_t)(c >> 8);
  buff[idx++] = (uint8_t)(c & 0xff);
  cmd(buff, 3);
}

uint8_t fillColour[2];
void setFillColor(int c) {
  fillColour[0] = c>>8;
  fillColour[1] = c&0xff;
}
void fillRect(int x1, int y1, int x2, int y2) {

  uint8_t buff[240];
  uint8_t cmdBuf[8];
  int idx=0;

  cmdBuf[idx++] = 0x2a;
  cmdBuf[idx++] = 0;
  cmdBuf[idx++] = (uint8_t)x1;
  cmdBuf[idx++] = 0;
  cmdBuf[idx++] = (uint8_t)x2;
  cmd(cmdBuf, 5);

  idx=0;
  cmdBuf[idx++] = 0x2b;
  cmdBuf[idx++] = 0;
  cmdBuf[idx++] = (uint8_t)y1;
  cmdBuf[idx++] = 0;
  cmdBuf[idx++] = (uint8_t)y2;
  cmd(cmdBuf, 5);

  idx=0;
  cmdBuf[idx++] = 0x2c;
  cmd(cmdBuf, 1);

  for(idx=0; idx<120; idx+=2) {
    buff[idx]= fillColour[0];
    buff[idx+1]= fillColour[1];
  }
  
  for(idx =  (x2 - x1 + 1) * (y2 - y1 + 1); idx > 120; idx -= 120) {
    data(buff, 120);
  }
  if(idx > 0) data(buff, idx);
/*
   for(idx =  (x2 - x1 + 1) * (y2 - y1 + 1); idx > 0; idx --) {
    data(buff, 2);
  }
*/
}

`);

