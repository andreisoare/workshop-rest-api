var nconf = require('nconf')
  , path = require('path')

nconf.env()

var configFile = 'config-' + nconf.get('NODE_ENV') + '.json'

nconf.file(path.join(__dirname, configFile))

module.exports = nconf
