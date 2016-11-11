export default {
  path: '/',
  component: require('../containers/App'),
  getChildRoutes (partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
          require('./routes/hello'),
          require('./routes/world'),
          require('./routes/aquarium')
      ])
    })
  }
}