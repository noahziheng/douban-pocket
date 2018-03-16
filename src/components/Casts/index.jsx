import React, { Component } from 'react'

import './index.css'
import RefererKiller from '../RefererKiller'

class Casts extends Component {
  render () {
    return (
      <div className='casts-container-outer'>
        <h2>演员</h2>
        <div className='casts-container'>
          {this.props.data.casts.map((item, i) => {
            const element = [<RefererKiller src={item.avatars.medium} key={i} />]
            if (i % 2 === 0) element.unshift(<br />)
            return element
          })}
        </div>
      </div>
    )
  }
}

export default Casts
