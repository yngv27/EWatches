Tools to assist in reverse engineering. This is assuming you have flashed a device with Espruino and it's running a console window.

|File|Description|
| ------------- | ------------- |
|lcdtest_sw.js|Scans all permutations of pins in pins array, trying all combinations of CS, MOSI, CLK, DC, RST, and EN. Uses a pure JS driver, so it's slower, but doesn't require any special hardware driver|
|lcdtest_hw.js|Same LCD test, but uses a compiled driver (lcd_spi_unbuf)|
|pinutils.js|Functions to toggle pins on/off, loop through list of pins to toggle, displaying pin states (with header: useful for finding buttons, charge connector), and a routine for outputing analog pins in CSV format (for finding battery level)|
|spiflash.js|Loops through candidate pins and tests for SPI flash using standard Winbond functions|
