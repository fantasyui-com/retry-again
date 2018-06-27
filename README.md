# retry-again
Retry function execution N ms later, controlled by try/catch error events, just new Retry(funct)


```JavaScript


  const payload = function(){

    throw new Error('Man yells at clouds!');

  }

  // npm i retry-again
  const Retry = require('retry-again');
  new Retry(payload);
  new Retry(payload, {count:2, delay:10});

  // awaits ms
  // retry error Man yells at clouds!
  // retry again still error Man yells at clouds!
  // give up

  //Note: execution will begin with .ms delay, thus use this way for 3 retries.
  try{
    sendMessage();
  }catch(e){
   new Retry(sendMessage, {count:2, delay:10}); // a total of 3 tries.
  }


```
