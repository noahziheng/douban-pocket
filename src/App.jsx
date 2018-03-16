import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Home from './views/Home'
import Detail from './views/Detail'

import './style.css'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <Route exact path='/' component={Home} />
        <Route exact path='/:type' component={Home} />
        <Route path='/detail/:resId' component={Detail} />
      </div>
    )
  }
}

export default App
