
class Retry {

  constructor( program , options ){
    const defaults = {count:5, delay:10, start:true};
    const { count, delay, start } = Object.assign({},defaults,options)
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
        }
      }else{
        // console.log('SENT OK, retries: %d', this.session, this.tries);
        //no error, EXIT;
        this.failure = false;
      }

    }, this.delay);
  }

}

module.exports = Retry;
