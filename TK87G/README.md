This is a fairly rare watch, it now seems gone from Aliexpress (https://www.aliexpress.com/item/1005003230390620.html?spm=a2g0o.order_list.0.0.4c321802S26tb9). 
It is an NRF52840 with the usual smart watch sensors (accelerometer, touchscreen, heart rate sensor) PLUS a thermometer and GPS. 

Here's the (Espruino) pinouts I know:

| Pin No.  | Description |
| ------------- | ------------- |
|D3| analog battery (hi = 0.23, lo = 0.18)|
|D8|  backlight (0 == on, 1 == off, accepts analogWrite)|
|D19| SPI Flash CLK |
|D20| buzzer (1 == on, 0 == off, accepts analogWrite)|
|D21| SPI Flash MISO |
|D22| SPI Flash WP |
|D23| SPI Flash MOSI |
|D24| BTN2 (0 == pressed)|
|D32| SPI Flash HOLD |
|D33| CST816S SDA |
|D34| CST816S SCL |
|D35| CST816S RST |
|D36| CST816S INT |
|D40| Charging (0 == charging, 1 == not)|
|D46| BTN1 (0 == pressed)|

NOTES
=====
Pins discovered on LCD connector:
Inside row:  D4, D5, D6, D9, D27, D26
Outside row: D33-D36 (CST816S I2C touch panel)
D11 - sometimes

Pins discovered on HRS/BTN connector:
Inner: D7, D12
Outer: 

Test points on the back (in groups)
D29, D31 (D29 floats at 0.6v)
D42, D43
