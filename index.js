function TimeoutError(message) {
    this.name = "TimeoutError";
    this.message = (message || "");
}
TimeoutError.prototype = Error.prototype;

function addTimeout(/*in ms*/duration, callback, /*optional*/errHandler) {
  var timedOut = false;

  //starts the timer
	var timeoutId = setTimeout(
	  function onTimeout(){
    	timedOut = true;
    	var err = new TimeoutError("A timeout of "+duration+"ms occured for callback ["+
        	(callback.name||"Anonymous (you should name your callback!)")
        	 +"]");
        	 
			if(errHandler)
				return errHandler(err, duration, callback);
			else
        return callback(err);
        
		}, duration);
	
	return function checksTimeout(){
	  if(timedOut) // setTimeout already fired callback or errHandler
	    return;
		clearTimeout(timeoutId);
		return callback.apply(this, arguments);
	}
}

module.exports = addTimeout;

module.exports.TimeoutError = TimeoutError;
