import React, { Component } from 'react'
import { SearchBar } from 'antd-mobile'

import './index.css'

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
  clear () {
    this.setState({ value: '' })
  }

  render () {
    return (<div>
      <SearchBar
        value={this.state.value}
        placeholder={placeholders[this.props.currentTab]}
        onSubmit={value => console.log(value, 'onSubmit')}
        onClear={value => console.log(value, 'onClear')}
        onFocus={() => console.log('onFocus')}
        onBlur={() => console.log('onBlur')}
        onCancel={() => console.log('onCancel')}
        onChange={this.onChange.bind(this)}
        ref={ref => { this.searchInst = ref }}
      />
    </div>)
  }
}

export default Search
