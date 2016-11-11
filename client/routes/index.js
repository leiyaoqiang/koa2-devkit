export default {
  path: '/',
  component: require('../containers/App'),
  childRoutes: [
    require('./routes/hello'),
    require('./routes/world'),
    require('./routes/aquarium')
  ]
}