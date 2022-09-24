This is a fairly rare watch, it now seems gone from Aliexpress (https://www.aliexpress.com/item/1005003230390620.html?spm=a2g0o.order_list.0.0.4c321802S26tb9). 
It is an NRF52840 with the usual smart watch sensors (accelerometer, touchscreen, heart rate sensor) PLUS a thermometer and GPS. 

I've just started working on it. Here's the (Espruino) pinouts I know:

|PIN|Purpose|
|D3| analog battery (hi = 0.23, lo = ???)|
|D8|  backlight (0 == on, 1 == off, accepts analogWrite)|
|D20| buzzer (1 == on, 0 == off, accepts analogWrite)|
|D24| BTN2 (0 == pressed)|
|D40| Charging (0 == charging, 1 == not)|
|D46| BTN1 (0 == pressed)|
