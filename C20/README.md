Display: ST7789 135x240
Touch: None
Accel: KXTJ3 (I2C addr 0xe)

Here's the (Espruino) pinouts I know:

| Pin No.  | Description |
| ------------- | ------------- |
|D2| analog battery (hi = 0.???, lo = ???)|
|D3| LCD MOSI  |
|D4| LCD CLK |
|D5| LCD DC |
|D6| LCD RST |
|D7| LCD CS |
|D8| battery on charger (0 = on charger) |
|D10| BTN1 (1 == pressed)|
|D11| buzzer (1 == on, 0 == off, accepts analogWrite)|
|D12| backlight (1 == on, accepts analogWrite)|
|D14| I2C SDA (KXTJ3) |
|D15| I2C SCK (KXTJ3) |
|D26| Flash MOSI / I2C SDA (SC7A20) |
|D27| Flash CLK / I2C SCK (SC7A20) |
|D28| SPI Flash CS |
|D29| SPI Flash MISO |
|D??| ACCEL Interrupt |
