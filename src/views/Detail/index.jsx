import React, { Component } from 'react'
import { NavBar, Icon, Button, WhiteSpace } from 'antd-mobile'
import Cover from '../../components/Cover'
import Casts from '../../components/Casts'
import Summary from '../../components/Summary'

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
        {this.state.type === 'movies' ? <Casts data={this.state.data} type={this.state.type} /> : ''}
        {this.state.type === 'books' ? <Summary data={this.state.data} type={this.state.type} /> : ''}
        <WhiteSpace />
        <Button type='primary' onClick={_ => {
          window.open(this.state.data.mobile_link ? this.state.data.mobile_link : this.state.data.alt, '_blank')
        }}>查看详情</Button>
        <WhiteSpace />
      </div>
    )
  }
}

export default Detail
