import React, { Component } from 'react'

import './index.css'

class Summary extends Component {
  render () {
    return (
      <div>
        <div className='summary-container-outer'>
          <h2>摘要</h2>
          <div className='summary-container'>
            <p>{this.props.data.summary}</p>
          </div>
        </div>
        <div className='summary-container-outer'>
          <h2>目录</h2>
          <div className='summary-container'>
            {this.props.data.catalog.split('\n').map((item, i) => {
              return <p key={i}>{item}</p>
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Summary
