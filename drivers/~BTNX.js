  // MANAGE EVENTS
  let btnSrc = D28; // normally BTN1

  class Button {
    constructor(btnSrc) {
      this.lastUp= 0;
      this.longpressTO= 0;
      this.tapTO= 0;
      this.longTime= 1000;
      this.tapTime= 250;
      this.dbltap= false;
      this.watchUp= false;
      // switch if BTN is not inverted
      this.upOpts= { repeat:false, edge:'falling', debounce:25};
      this.dnOpts= { repeat:false, edge:'rising', debounce:25};
      this.src = btnSrc;
      setWatch(btnDown, this.src, this.dnOpts); 
    }
    
   btnDown = (b) => {
    //longpress = b.time;
    if(this.tapTO) {
      clearTimeout(BUTTON.tapTO);
      this.tapTO = 0;
      this.dbltap = true;
    }
    BUTTON.longpressTO = setTimeout(function(){
      // long press behaviour
      this.emit('longpress');
      //wOS.UI.emit('longpress');
      this.longpressTO = 0;
      // ignore button up
      this.watchUp = false;
    }, this.longTime);
    //debug(`lpto=${BUTTON.longpressTO}`);
    this.watchUp = true;
    setWatch(btnUp, this.src, this.upOpts);
  };
  
  btnUp = (b) => {
    if(this.longpressTO) {
      clearTimeout(this.longpressTO);
      this.longpressTO = 0;
    } 
    if(this.dbltap) {
      this.emit('dbltap');
      //wOS.UI.emit('dbltap');
      this.dbltap = false;
    } else if (BUTTON.watchUp) {
      this.tapTO = setTimeout(function(){
        // long press behaviour
        BUTTON.emit('tap');
        //wOS.UI.emit('tap');
        this.tapTO = 0;
        this.dbltap = false;
      }, this.tapTime);
      //debug(`lpto=${BUTTON.tapTO}`);
    }
    this.lastUp = b.time;
    setWatch(btnDown, this.src, this.dnOpts);
  };
}