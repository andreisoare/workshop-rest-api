var fs = require('fs')

describe('Testing with mocha:', function() {
  it("Check if file dummy exists", function(done) {
    fs.exists('dummy', function(exists) {
      if (!exists) {
        return done(new Error('File dummy doesn\'t exist'))
      }
      done(null)
    })
  })
})
