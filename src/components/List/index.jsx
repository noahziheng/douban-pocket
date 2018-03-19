import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { List, Tag, PullToRefresh, ListView } from 'antd-mobile'
import apiClient from '../../api'
import EventEmitter from '../../EventEmiter'

import './index.css'
import RefererKiller from '../RefererKiller'

const Item = List.Item
const Brief = Item.Brief

const NUM_ROWS = 20
let pageIndex = 0

function genData (pIndex = 0) {
  const dataArr = []
  for (let i = 0; i < NUM_ROWS; i++) {
    dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`)
  }
  return dataArr
}

class ContentList extends Component {
  constructor (props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false,
      data: []
    }
  }

  componentDidMount () {
    EventEmitter.subscribe('updateData_' + this.props.currentTab, this.updateData.bind(this))
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop
    this.updateData().then(_ => {
      this.rData = genData()
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(genData()),
        height: hei,
        refreshing: false,
        isLoading: false
      })
    })
    console.log(this.refs['tag-list-0'])
  }

  onRefresh () {
    this.setState({ refreshing: true, isLoading: true })
    this.updateData().then(data => {
      this.rData = genData()
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false
      })
    })
  }

  onEndReached (event) {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return
    }
    console.log('reach end', event)
    this.setState({ isLoading: true })
    this.updateData(false, ++pageIndex).then(_ => {
      this.rData = [...this.rData, ...genData(pageIndex)]
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false
      })
    })
  }

  componentDidUpdate () {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
    }
  }

  updateData (query, page = 0) {
    let inst = null
    if (this.props.currentTab === 'movies') inst = apiClient.getMovies(query, page)
    if (this.props.currentTab === 'musics') inst = apiClient.getMusics(query || '周杰伦', page)
    if (this.props.currentTab === 'books' || inst === null) inst = apiClient.getBooks(query || '霍金', page)
    return inst.then(json => {
      const dataArr = json[this.props.currentTab === 'movies' ? 'subjects' : (this.props.currentTab || 'books')]
      this.setState({
        data: page === 0 ? dataArr : this.state.data.concat(dataArr)
      })
      return json
    }).catch(ex => {
      console.log('parsing failed', ex)
    })
  }

  renderItem (item, i) {
    if (this.props.currentTab === 'books') {
      return (
        <Item
          extra={item.rating.average}
          align='top'
          thumb={<RefererKiller src={item.images.small} />}
          key={i}
          multipleLine>
          {item.title}
          <span style={{color: '#888', fontSize: '12px', marginLeft: '3px'}}>{item.subtitle}</span>
          <Brief>
            {item.author.map((author, i) => (
              <span key={i} className='list-left-white'>{author}</span>
            ))}
          </Brief>
          <div className='list-tags' ref={'tags-list-' + i}>
            {item.tags.map((tag, i) => (
              <Tag key={i} small className='list-left-white tag-yellow'>{tag.name}</Tag>
            ))}
          </div>
          <Brief><span className='list-left-white'>{item.pubdate}</span></Brief>
        </Item>)
    } else if (this.props.currentTab === 'movies') {
      return (
        <Item
          extra={item.rating.average}
          align='top'
          thumb={<RefererKiller src={item.images.small} />}
          key={i}
          multipleLine>
          {item.title}
          <Brief>
            {item.casts.map((cast, i) => (
              <span key={i} className='list-left-white'>{cast.name}</span>
            ))}
          </Brief>
          {item.genres.map((tag, i) => (
            <Tag key={i} small className='list-left-white tag-red'>{tag}</Tag>
          ))}
          <Brief><span className='list-left-white'>{item.year}</span></Brief>
        </Item>)
    } else if (this.props.currentTab === 'musics') {
      return (
        <Item
          extra={item.rating.average}
          align='top'
          thumb={<RefererKiller src={item.image} />}
          key={i}
          multipleLine>
          {item.title}
          <span style={{color: '#888', fontSize: '12px', marginLeft: '3px'}}>{item.alt_title}</span>
          <Brief>
            {item.author.map((author, i) => (
              <span key={i} className='list-left-white'>{author.name}</span>
            ))}
          </Brief>
          {item.tags.map((tag, i) => (
            <Tag key={i} small className='list-left-white tag-yellow'>{tag.name}</Tag>
          ))}
        </Item>)
    }
  }

  render () {
    let index = this.state.data.length - 1
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = this.state.data.length - 1
      }
      const obj = this.state.data[index--]
      return (
        <Link to={{
          pathname: `/detail/${obj.id}`,
          state: {
            data: obj,
            type: this.props.currentTab
          }
        }} key={rowID}>
          {this.renderItem(obj, index + 1)}
        </Link>
      )
    }
    return (
      <div onScroll={console.log.bind(this)}>
        <ListView
          key={this.state.useBodyScroll ? '0' : '1'}
          ref={el => { this.lv = el }}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center', background: 'white' }}>
            {this.state.isLoading ? '正在加载...' : '加载完成'}
          </div>)}
          renderRow={row}
          useBodyScroll={this.state.useBodyScroll}
          style={this.state.useBodyScroll ? {} : {
            height: this.state.height,
            border: '1px solid #ddd',
            margin: '0 0',
            width: '100%'
          }}
          pullToRefresh={<PullToRefresh
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />}
          onEndReached={this.onEndReached.bind(this)}
          pageSize={5}
        />
      </div>
    )
  }
}

export default ContentList
