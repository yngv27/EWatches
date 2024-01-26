exports={
    connect: function(/*=SPI*/_spi, /*=PIN*/_cs, /*=PIN*/_vcom, width, height, callback) {
        var g = Graphics.createArrayBuffer(width,height,1);
        var spi = _spi;
        var cs = _cs;
        var vcom = 0b00000010;
        var vcomstate = false;
    
        digitalWrite(cs,1); // CS on
        spi.send(0b00000100); // clear display
        digitalWrite(cs,0); // CS off
    
        setTimeout(function() {
        digitalWrite(cs,1); // CS on
        spi.send(0b00000000); // all normal
        digitalWrite(cs,0); // CS off
        if (callback) callback();
        }, 10);  
        /* Note: it's recommended you toggle vcom every second, but doing it every 5
        allows Espruino to properly enter deep sleep modes */
        /*
        setInterval(function() {
        if(cs.read() == true) return;
        digitalWrite(cs,1); // CS on
        if(vcomstate) {
            spi.send(0b00000000); // all normal
            print("VCOM: 0");
        } else {
            spi.send(vcom);
            print("VCOM: 1");
        }
        vcomstate = !vcomstate;
        digitalWrite(cs,0); // CS off
        }, 5000);
        */
        
        g.flip = function () {
            digitalWrite(cs,1); // CS on
            spi.send([0b00000001,1]); // update, 1st row
            var w = g.getWidth()>>3;
            for (var y=0;y<g.getHeight();y++) {
                spi.send(new Uint8Array(g.buffer,y*w,w));
                spi.send([0,y+2]); // pad and do 2nd row
            }
            digitalWrite(cs,0); // CS off
            return g;
        };
        return g;
    },
  };