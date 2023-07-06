Display: ST7789 240x240
Touch: CSTx16 (I2C addr 0x15)
Accel: SC7A20 (I2C addr 0x19)

Here's the (Espruino) pinouts I know:

| Pin No.  | Description |
| ------------- | ------------- |
|D2| analog battery (hi = 0.???, lo = ???)|
|D6 | SPI Flash CS |
|D7 | SPI Flash MISO |
|D8 | Shared: LCD/Flash MOSI / I2C SDA (SC7A20) |
|D9 | Shared: LCD/Flash CLK / I2C SCK (SC7A20) |
|D12| LCD CS |
|D13| ACCEL Interrupt |
|D16| backlight (1 == on, accepts analogWrite)|
|D18| I2C SCL (CSTx16)|
|D19| I2C SDA (CSTx16)|
|D22| battery on charger (0 = on charger) |
|D25| buzzer (1 == on, 0 == off, accepts analogWrite)|
|D26| LCD DC |
|D27| LCD RST |
|D28| CSTx16 RST|
|D29| BTN1 (0 == pressed, needs pullup)|
|D30| BTN2 (0 == pressed, needs pullup)|
