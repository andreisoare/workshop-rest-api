var config = require('./config')
  , app = require('./app')

var server = app.listen(config.get('server:port'), config.get('server:host'))

module.exports = server
