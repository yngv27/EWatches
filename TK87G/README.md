This is a fairly rare watch,
It is an NRF52840 with the usual smart watch sensors (accelerometer, touchscreen, heart rate sensor) PLUS a thermometer and GPS. 

Here's the (Espruino) pinouts I know:

| Pin No.  | Description |
| ------------- | ------------- |
|D3| analog battery (hi = 0.23, lo = 0.18)|
|D4| LCD CLK|
|D5| LCD CS|
|D6| LCD RST|
|D8|  backlight (0 == on, 1 == off, accepts analogWrite)|
|D11| I2C SCL (addr = 0x33  ? thermometer)|
|D18| SPI Flash CS |
|D19| SPI Flash CLK |
|D20| buzzer (1 == on, 0 == off, accepts analogWrite)|
|D21| SPI Flash MISO |
|D22| SPI Flash WP |
|D23| SPI Flash MOSI |
|D24| BTN2 (0 == pressed)|
|D26| LCD MOSI|
|D27| LCD DC|
|D29 |  GPS RX |
|D31 |  GPS TX |
|D32| SPI Flash HOLD |
|D33| CST816S SDA |
|D34| CST816S SCL |
|D35| CST816S RST |
|D36| CST816S INT |
|D37| I2C SCL - accelerometer addr=0xf (Kionix?)|
|D38| I2C SDA - accel|
|D40| Charging (0 == charging, 1 == not)|
|D41| I2C SDA (addr = 0x33  ? thermometer)|
|D46| BTN1 (0 == pressed)|

NOTES
=====
Touch panel is a CST816S. Does not support gestures automatically, but does interrupt while finger is down, so you can really control the usage.  See !(myBangle/drivers/CSTx16.js)[https://github.com/yngv27/myBangle/blob/main/drivers/~CSTx16.js]

Pins discovered on LCD connector:
Inside row:  D4, D5, D6, D9, D27, D26 (ST7789)
Outside row: D33-D36 (CST816S I2C touch panel)
D11 - sometimes

Pins discovered on HRS/BTN connector:
Inner: D7, D12
Outer: 

Test points on the back (in groups)
D29, D31 (D29 floats at 0.6v) - this is likely GPS serial, haven't found the power pin for this
D42, D43 (maybe TX,RX?)
