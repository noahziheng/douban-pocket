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
        <Route path='/detail' component={Detail} />
        <h1>从零开发口袋豆瓣</h1>
      </div>
    )
  }
}

export default App
