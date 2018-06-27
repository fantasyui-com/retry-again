
class Retry {

  constructor( program , options ){
    const defaults = {count:5, delay:10, start:true};
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
          this.start(); // start again;
        }else{
          // console.log('SOCKET MESSAGE FAILURE #%d: GIVING UP.', this.session, this.tries, error.message);
          this.failure = true;
          if(end) this.end(this.failure);
        }
      }else{
        // console.log('SENT OK, retries: %d', this.session, this.tries);
        //no error, EXIT;
        this.failure = false;
        if(end) this.end(this.failure);
      }

    }, this.delay);
  }

}

module.exports = Retry;
