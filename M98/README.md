As of 2024/09/13, still available [https://www.aliexpress.com/item/1005006730125008.html]
Display: GC9A01 240x240
Touch: ZT2628 (I2C addr 0x??)
Accel: unknown (I2C addr 0x??)

Here's the (Espruino) pinouts I know:

| Pin No.  | Description |
| ------------- | ------------- |
|D2| analog battery (hi = 0.???, lo = ???)|
|D4| LCD MOSI |
|D5| LCD DC |
|D6| LCD CLK |
|D7| LCD CS |
|D9| I2C SCL (answers to address 0x20)|
|D10| I2C SDA (answers to address 0x20)|
|D11 | SPI Flash CS |
|D12 | SPI Flash MISO |
|D13 | SPI Flash CLK |
|D14 | SPI Flash MOSI |
|D15| I2C INT |
|D16| I2C RST ?? |
|D21| buzzer (0 == on, 1 == off, accepts analogWrite)|
|D22| battery on charger (0 = on charger) |
|D28| BTN1 (0 == pressed, needs pullup)|
|D29| Battery voltage (hi = 0.???, lo = ???)|
|D30| Backlight for LCD (analog)|
|D31| LCD RST |