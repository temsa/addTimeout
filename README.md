[![build status](https://secure.travis-ci.org/temsa/addTimeout.png)](http://travis-ci.org/temsa/addTimeout)
## Usage
```javascript
var addTimeout = require("addTimeout");

var callback = function(err){
  if(err)
    throw err;
  console.log("hello, world : this has been fired before the timeout !"
};

// here is some examples with setTimeout
setTimeout(addTimeout(500, callback), 100); //max timeout: 500ms, setTimeout will call the callback in 100ms -> result is OK !
setTimeout(addTimeout(500, callback), 1000); //max timeout: 500ms, setTimeout will call the callback in 1000ms -> too late : TimeoutError as the first callback argument!

// with an error handler
function errHandler(err) {
  console.log("Timeout !", err);
}
setTimeout(addTimeout(500, callback, errHandler), 100); //max timeout: 500ms, setTimeout will call the callback in 100ms -> result is OK !
setTimeout(addTimeout(500, callback, errHandler), 1000); //max timeout: 500ms, setTimeout will call the callback in 1000ms -> too late : TimeoutError ! -> callback will not be called, but errHandler will, getting the Error as first argument
```

## Notes

Supports negative timeout (always fail) as well a short time (<20ms) timeout. In those cases,
the callback will be called asap, but it's likely to be in ~20ms after addTimeout call

## License
MIT license
