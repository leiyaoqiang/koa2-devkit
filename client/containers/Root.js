if (process.env.NODE_PORT === 'production') {
  module.exports = require('./Root.prod')
} else {
  module.exports = require('./Root.dev')
}