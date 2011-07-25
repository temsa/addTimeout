function TimeoutError(message) {
  var e = new Error(message);
  for (var prop in e) {
    this[prop]=e[prop];
  }
}
TimeoutError.prototype = new Error();

function addTimeout(/*in ms*/duration, callback, /*optional*/errHandler) {
  var startDate = new Date();
  
  //starts the timer
  var timeoutId = setTimeout(
    function onTimeout(){
      timedOut = true;
      var err = new TimeoutError( "A timeout of "+duration+"ms occured for callback ["+
        (callback.name||"Anonymous (you should name your callback!)")
        +"]");
      	 
      if(errHandler)
        return errHandler(err, duration, callback);
      else
        return callback(err);
    }, duration);
	
  return function checksTimeout(){
    if(new Date() - startDate > duration) // if time to get there is longer than timout, let the onTimeoutHappen. Useful for very short delay
      return;
    clearTimeout(timeoutId);
    return callback.apply(this, arguments);
  }
}

module.exports = addTimeout;

module.exports.TimeoutError = TimeoutError;
