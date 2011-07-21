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
          var cb = this.callback;
        	setTimeout(addTimeout(500, cb), 1000);
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
         'we get an error!': function (err) {
            assert.instanceOf(err, addTimeout.TimeoutError);
         }
       }
      }
    }
  }
}).export(module, { error: false });
