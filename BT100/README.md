This is an NRF52832 watch that can easily run Espruino. It requires opening up (which is REALLY easy... use your fingernail under the display cover
CS D15, MISO D14 MOS D12, CLK D13,  RX D22 TX D23
SCL = D20
SDA + D19 (0x1f) / KS023
HRS: SCL D9, SDA D10

|Pin|Function|
|D3|Charging |
|D5|BTN 1 (high == pressed|
|D7|Buzzer ( 0 == off)|
| D11 | Backlight (0 == full, 1 == off|
|D13 ||
|D19|I2C SDA|
|D20| I2C SCL |
| D27| LCD DC|
|D28 | LCD CLK|
|D29| LCD MOSI |
|D30 | LCD CS |
|D31 | LCD RST |
