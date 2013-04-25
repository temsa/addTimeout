function TimeoutError(message) {
  var e = new Error(message);
  this.name = 'TimeoutError';
  this.message = message;
  this.stack = e.stack;
}
TimeoutError.prototype = new Error();

function addTimeout(/*in ms*/duration, callback, /*optional*/errHandler, /*optional*/callbackName) {
  var startDate = new Date();
  var timeoutLength = (duration > 0) ? duration : 0;
  
  //starts the timer
  var timeoutId = setTimeout(
    function onTimeout(){
      timedOut = true;
      var err = new TimeoutError( "A timeout of "+duration+"ms occured for callback ["+
        (callbackName||callback.name||"Anonymous (you should name your callback!)") +
        "]");
         
      if(errHandler) {
        return errHandler(err, duration, callback);
      } else {
        return callback(err);
      }
    }, timeoutLength);
    
  return function checksTimeout(){
    if(new Date() - startDate > duration) {
      // if time to get there is longer than timeout, let the onTimeoutHappen. Useful for very short delay
      return;
    }
    clearTimeout(timeoutId);
    return callback.apply(this, arguments);
  };
}

module.exports = addTimeout;

module.exports.TimeoutError = TimeoutError;
