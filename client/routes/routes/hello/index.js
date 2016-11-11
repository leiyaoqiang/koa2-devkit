export default {
  path: 'hello',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../../components/Hello/index.jsx'))
    })
  }
}