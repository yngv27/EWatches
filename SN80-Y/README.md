Not the same as the SN80. Same exact case, different board.  Here's what I know so far:
LCD: GC9A01 and needs to be enabled before init (D14)
Accel:  LIS3DH on shared pins with SPI!  Address is 0x19 with a who_am_i of 0x33
Touch: CST816: reads gestures
HRS: On same sck/sda as touch, address is 0x44 - HRS3600?
```
D3:  Touch panel / HRS SCL
D4:  Touch panel / HRS SDA
D5:  Touch panel INT
D6:  Touch panel RESET
D7:  Backlight (analog 0.0-0.1)
D8:  LCD RST, (must toggle 0->1->0) also toggles power? 
D11: LCD DC
D12: on LCD socket (?)
D13: LCD CS
D14: LCD Enable (must be high; resetting requires re-init of LCD)
D15: Buzzer (1==full, 0==off)
D16: BTN1
D17: Shared LCD / SPI Flash SI / Accel
D18: SPI Flash SO
D19: SPI Flash CS
D20: Shared LCD / SPI Flash CLK / Accel
D23: Charging (0 == charging)
D28: Battery voltage (low=.55 high =.63)
```
