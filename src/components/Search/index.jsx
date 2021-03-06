import React, { Component } from 'react'
import { SearchBar } from 'antd-mobile'

import './index.css'
import EventEmiter from '../../EventEmiter'

const placeholders = {
  books: '书名、作者、ISBN',
  movies: '电影、影人、影院、电视剧',
  musics: '唱片名、表演者、条码、ISRC'
}

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  componentDidMount () {
    // this.searchInst.focus()
  }

  onChange (value) {
    this.setState({ value })
  }

  onSubmit (value) {
    EventEmiter.dispatch('updateData_' + this.props.currentTab, value)
  }

  clear () {
    this.setState({ value: '' })
    EventEmiter.dispatch('updateData_' + this.props.currentTab)
  }

  render () {
    return (<div>
      <SearchBar
        value={this.state.value}
        placeholder={placeholders[this.props.currentTab]}
        onSubmit={this.onSubmit.bind(this)}
        onClear={this.clear.bind(this)}
        onFocus={() => console.log('onFocus')}
        onBlur={() => console.log('onBlur')}
        onCancel={this.clear.bind(this)}
        onChange={this.onChange.bind(this)}
        ref={ref => { this.searchInst = ref }}
      />
    </div>)
  }
}

export default Search
