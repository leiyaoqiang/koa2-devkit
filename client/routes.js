import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import Hello from './components/Hello/index.jsx'
import World from './components/World/index.jsx'
import Aquarium from './components/Aquarium/index.jsx'

export default (
  <Route path="/" component={App}>
    <Route path="helle" component={Hello}></Route>
    <Route path="world" component={World}></Route>
    <Route path="aquarium" component={Aquarium}></Route>
  </Route>
)

