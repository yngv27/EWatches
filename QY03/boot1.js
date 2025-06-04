var _log = "";    
function log(str) {_log += str + "\n"; }

NRF.setServices({
    0xF000: {
      0xF001: {
        value : "A",
        maxLen : 32,
        readable: true,
        notify: true,
       },
      0xF002: {
        value : "X",
        maxLen : 32,
        writable : true,
        onWrite : function(evt) {
          // When the characteristic is written, raise flag
          handle(evt);
        }
      }
    }
  }, {});

function sendReply(val) {
  log("Updating w "+val);
  NRF.updateServices({
    0xF000: {
      0xF001: {
      value: val,
      readable: true,
      notify: true,
      }
    }
  });
}

function handle(evt) {
  log(`PERFORM: e=${JSON.stringify(evt)} and data=${JSON.stringify(evt.data)}`);
  if(evt.data == 0) sendReply((new Date()).toLocalISOString());
  if(evt.data == 1) sendReply("OWING");
}