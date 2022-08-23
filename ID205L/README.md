Basic drivers for the ID205L smartwatch (nrf52840 8MB SPI flash, 240x240 ST7789 LCD, IT7259 touchscreen, unknown accelerometer)

This is very much WIP. Massive work was already done by @kvasdopil, so a big thanks to him (and @fanoush, @atc1441, et al)

So far, this is based upon the regular Espruino build stream, no custom code. @kvasdopil made a fast LCD driver using EasyDMA, but his build is quite old
so I'm trying to get it more in line with modern Espruino. 

### My work here is done
Not sure if it's just this watch, or me, or the entire line... but I'm getting spontaneous reboots, spontaneous buzzer going off, and an SPI flash that has put up a shield around itself that won't let me mess with it. So, the build stands with no external flash. 

I do not recommend this watch to anyone. It is cursed.
