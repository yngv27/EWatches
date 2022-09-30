Tools to assist in reverse engineering. This is assuming you have flashed a device with Espruino and it's running a console window.

|File|Description|
| ------------- | ------------- |
|dump_spi_flash.js|Simple routine to retrieve contents of SPI flash (you must know the pins). Contents are output as base64 encoded 256-byte chunks|
|flash_test.js|Loops through candidate pins and tests for SPI flash using standard Winbond functions|
|i2c_test.js|Loops through candidate pins and tests for I2C responses on legal addresses (0x07 - 0x77). Uses hardware I2C as software I2C reports false positives|
|lcdtest_sw.js|Scans all permutations of pins in pins array, trying all combinations of CS, MOSI, CLK, DC, RST, and EN. Uses a pure JS driver, so it's slower, but doesn't require any special hardware driver. Currently supports GC9A01 (ST7789 coming)|
|lcdtest_hw.js|Same LCD test, but uses a custom compiled driver (lcd_spi_unbuf from @jeffmer)|
|pinutils.js|Functions to toggle pins on/off, loop through list of pins to toggle, displaying pin states (with header: useful for finding buttons, charge connector), and a routine for outputing analog pins in CSV format (for finding battery level)|
