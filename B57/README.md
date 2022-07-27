These files are for the B57 NRF52832 smart watch (as of summer 2022). This uess Hero Band III firmware, which is similar to DaFit, 
therefore it is upgradeable OTA for your own firmware. 

240x240 ST7789 LCD
single capacitive button
I2C accelerometer (SC7A20) and HRS (HRS3300)
NO TOUCHSCREEN

Follow OTA upgrading for the P8 using enaon's instructions, but instead of the P8 firmware use the one here (you CAN use the P8 firmware, but you won't
have a BTN1 defined correctly, which makes a difference when you reboot your watch)

Drivers are included here as well. 

This is just to get you off the ground. This will NOT run Bangle.js apps out of the box, nor anything from jeffmer's P8 app site as they expect more hardware,
but you can download and tweak to get most software working. HRS works out of the box.

