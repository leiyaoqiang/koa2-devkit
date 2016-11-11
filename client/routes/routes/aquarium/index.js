export default {
  path: 'aquarium',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../../components/Aquarium/index.jsx'))
    })
  }
}