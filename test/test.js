var vows = require("vows"),
    assert = require("assert"),
    addTimeout = require("../index");

vows.describe('addTimeout').addBatch({
  'Using addTimeout': {
    'with a timeout of 500ms': {
     'and a callback that is called': {
      '*before* timeout (100ms)': {
        topic: function () {
          var cb = this.callback;
        	setTimeout(addTimeout(500, cb), 100);
        },
        'we get no error': function (err) {
            assert.isUndefined (err);
        }
      },
      '*after* timeout (1000ms)': {
        topic: function () {
	   var self  = this;
       	    setTimeout(addTimeout(500, function namedCallback(err) { return self.callback(err); }), 1000);
        },
        'we get an error!': function (err) {
          assert.instanceOf(err, addTimeout.TimeoutError);
          assert.equal('TimeoutError', err.name);
          assert.equal(err.toString(), 'TimeoutError: A timeout of 500ms occured for callback [namedCallback]');
        }
       }
      }
    },
    'with a negative timeout (-500)': {
     'and a named callback that is called': {
      '*as soon as possible* (synchronously)': {
        topic: function () {
          var cb = this.callback;
          addTimeout(-500, cb);
        },
        'we get *an* error (this delay is unereachable)': function (err) {
          assert.instanceOf(err, addTimeout.TimeoutError);
          assert.equal(err.toString(), 'TimeoutError: A timeout of -500ms occured for callback [Anonymous (you should name your callback!)]');
        }
      },
      '*after* timeout (10ms)': {
        topic: function () {
          var cb = this.callback;
          setTimeout(addTimeout(-500, cb), 10);
        },
        'we get an error!': function (err) {
          assert.instanceOf(err, addTimeout.TimeoutError);
        }
       }
      }
    },
    'with a short timeout of 1ms (shorter than what is able to prive setTimeout)': {
     'and a callback that is called': {
      '*before* timeout (synchronously)': {
        topic: function () {
          var cb = this.callback;
          (addTimeout(1, cb))();
        },
        'we get no error': function (err) {
            assert.isUndefined (err);
        }
      },
      '*after* timeout (2ms)': {
        topic: function () {
          var cb = this.callback;
        	setTimeout(addTimeout(1, cb), 2);
        },
        'we get an error!': function (err) {
          assert.instanceOf(err, addTimeout.TimeoutError);
        }
       }
      }
    },
    'with an *error handler* for a timeout of 500ms': {
     'and a callback that is called': {
       '*before* timeout (100ms)': {
         topic: function () {
           var cb = this.callback;
           setTimeout(addTimeout(500, cb, function(err){console.log("Called errHandler with arguments: ", argument)}), 100);
         },
         'we get no error': function (err) {
             assert.isUndefined (err);
         }
       },
       '*after* timeout (1000ms)': {
         topic: function () {
          var cb = this.callback;
         	setTimeout(addTimeout(500, function(err){console.log("Called callback with arguments: ", argument)}, cb), 1000);
         },
         'we get an error': function (err) {
            assert.isObject(err);
         },
         'we get a TimeoutError': function (err) {
            assert.instanceOf(err, addTimeout.TimeoutError);
         },
         'we have a stacktrace in the TimeoutError': function (err) {
           console.log(err.stack);
            //assert.instanceOf(err, addTimeout.TimeoutError);
         }
       }
      }
    }
  }
}).export(module, { error: false });
