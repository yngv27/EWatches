As of 2024/11/01, still available [https://www.aliexpress.com/item/1005006935584277.html]
Display: GC9A01 240x240
Touch: CST716 (I2C addr 0x15)
Accel: BMA421 (I2C addr 0x18)

Here's the (Espruino) pinouts I know:

| Pin No.  | Description |
| ------------- | ------------- |
|D2| SPI CLK (Shared LCD and flash)|
|D3| SPI MOSI (Shared LCD and flash)|
|D4 | SPI Flash MISO |
|D5 | SPI Flash CS |
|D6| I2C SDA (addr = 0x15 for CST716, 0x18 for BMA421 accel)|
|D7| I2C SCL (addr = 0x15 for CST716, 0x18 for BMA421 accel)|
|D13 | CST716 reset|
|D16 | Buzzer 0=on, 1=off (may interfere with the LCD backlight?)|
|D17| BTN1 (1 == pressed)|
|D18| LCD DC |
|D19| Charging 0=on charger|
|D23| LCD backlight, responds to analogWrite (see note on buzzer/D16)|
|D25| LCD CS |
|D26| LCD Reset |
|D28| CST716 interrupt |
|D31| Battery charge ; low = 0.48 high = 0.61 |
