import React, { Component } from 'react'

class RefererKiller extends Component {
  componentDidMount () {
    // this.searchInst.focus()
  }

  getHtml () {
    return `<img src="${this.props.src}" onLoad="this.height = window.innerHeight"/>`
  }

  render () {
    return (<iframe src={`javascript:void(function(){document.open();document.write('${this.getHtml()}');document.close();document.body.style.margin=0;}())`} frameBorder='0' scrolling='no' />)
  }
}

export default RefererKiller
