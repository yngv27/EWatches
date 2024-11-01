As of 2024/09/13, still available [https://www.aliexpress.com/item/1005006730125008.html]
Display: GC9A01 240x240
Touch: ZT2628 (I2C addr 0x??)
Accel: KXTJ3 (I2C addr 0xf)

Here's the (Espruino) pinouts I know:

| Pin No.  | Description |
| ------------- | ------------- |
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
|D16 | I2C EN  original firmware sets this to float on startup |
|D17 | HRS : lights up LED  original firmware sets this to float on startup |
|D18 | HRS: LED goes hi/lo (reset to brighten)|
|D19 ||
|D20| |
|D21| buzzer (0 == on, 1 == off, accepts analogWrite)|
|D22| battery on charger (0 = on charger) |
|D26 | I2C SDA - KXTJ3 Accel (address = 0x0f)|
|D27 | I2C SCL - KXTJ3 Accel (address = 0x0f)|
|D28| BTN1 (0 == pressed, needs pullup)|
|D29| Battery voltage (hi = 0.365, lo = 0.328)|
|D30| Backlight for LCD (analog)|
|D31| LCD RST |