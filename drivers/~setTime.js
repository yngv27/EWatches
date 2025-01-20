exports={};
exports.setDtTz=()=> {
    let gatt, _svc, _chr;
    let debug=print;

    const server = "e1:6b:57:49:c3:c7 random"; //qyx
    //c16 = "e4:c5:7d:a1:4d:10 random";
  
    function setDT(str) {
      let dt = str.substring(0,19);
      let tz = str.substring(24);
      debug(str);
      E.setTimeZone(parseInt(tz)/-100);
      setTime((new Date(str)).getTime()/1000);
    }
  
    function synch() {
      debug("SYNCH");
      let busy = true;
      NRF.setTxPower(4);
      NRF.connect(server,{minInterval:7.5, maxInterval:7.5}).then( function (gt) {
        gatt = gt;
        debug("SVC");
        return gatt.getPrimaryService(0xf000);
      }).then(function(svc) {
        _svc = svc;
        debug("CHR");
        return svc.getCharacteristic(0xf001);
      }).then(function(chr) {
        debug("Listen");
        //_chr = chr;
        chr.on('characteristicvaluechanged', function(event) {
          setDT(E.toString(event.target.value.buffer));
          NRF.setTxPower(0);
          if(gatt) { gatt.disconnect(); gatt="";}
          //setTimeout(()=>{setDtTz=()=>{};}, 1000);
        });
        return(chr.startNotifications());
      }).then(function () {
        // now the WRITEABLE char
        debug("CHW");
        return _svc.getCharacteristic(0xf002);
      }).then(function(chr) {
        debug("REQ 0");
        chr.writeValue([0]);
        busy=false;
      }).catch(function (e) {
        if(gatt) { gatt.disconnect(); gatt="";}
        debug("ERROR",e);
        busy=false;
        NRF.setTxPower(0);
        setTimeout(synch, 5*60*1000);
      }); // end NRF.requestDevice
    }
    synch();
  };
  