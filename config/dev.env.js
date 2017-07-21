var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://www.easy-mock.com/mock/596ee5e1a1d30433d837634c/sell"'
})
