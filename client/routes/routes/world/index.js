export default {
  path: 'world',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../../components/World/index.jsx'))
    })
  }
}