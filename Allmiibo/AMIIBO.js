SPI1.setup({sck: D26, mosi: D25, baud: 2000000});
g = require("~ST7567.js").connect({spi:SPI1, cs:D27 , rst:D29 , dc: D28},()=>{  g.clear().setContrast(0.25); });
