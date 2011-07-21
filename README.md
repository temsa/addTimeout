## Usage
```javascript
var addTimeout = require("addTimeout");

var callback = function(err){
  if(err)
    throw err;
  console.log("hello, world : this has been firef before the timeout !"
};

// here is some examples with setTimeout
setTimeout(addTimeout(500, callback), 100); //max timeout: 500ms, settimout will call the callback in 100ms -> OK !
setTimeout(addTimeout(500, callback), 1000); //max timeout: 500ms, settimout will call the callback in 1000ms -> TimeoutError
```

## License
MIT
