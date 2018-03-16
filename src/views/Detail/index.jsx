import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import Cover from '../../components/Cover'

class Detail extends Component {
  constructor (props) {
    super(props)
    this.state = this.props.location.state
    console.log(this.state)
  }

  handleBack () {
    this.props.history.replace('/' + this.state.type)
  }

  render () {
    return (
      <div>
        <NavBar
          mode='dark'
          leftContent={(
            <Icon type='left' />
          )}
          onLeftClick={this.handleBack.bind(this)}
        >{this.state.data.title}</NavBar>
        <Cover data={this.state.data} type={this.state.type} />
      </div>
    )
  }
}

export default Detail
