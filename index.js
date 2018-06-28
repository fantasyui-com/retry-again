
class Retry {

  constructor( program , options ){
    const defaults = {count:5, delay:10, start:true, end:null, debug:false};
    const { count, delay, start, end } = Object.assign({}, defaults, options)
    this.end = end;
    this.count = count;
    this.delay = delay;
    this.program = program;
    this.tries = 0;
    this.failure = null;
    if(start) this.start();

  }

  start(){

    setTimeout(()=>{

      let error = null;
      try{
        this.tries++;
        this.program(this.tries);
      } catch(e){
        error=e;
      }
      if(error){
        if(this.tries<this.count) {
          if (this.debug) console.log('retry-again: retries: %d', this.tries);
          this.start(); // start again;
        }else{
          if (this.debug) console.log('retry-again: SOCKET MESSAGE FAILURE #%d: GIVING UP.', this.tries, error.message);
          this.failure = true;
          if(this.end) this.end(this.failure);
        }
      }else{
        if (this.debug) console.log('retry-again: SENT OK, retries: %d', this.tries);
        //no error, EXIT;
        this.failure = false;
        if(this.end) this.end(this.failure);
      }

    }, this.delay);
  }

}

module.exports = Retry;
