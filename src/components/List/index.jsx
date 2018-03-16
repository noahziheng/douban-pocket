import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { List, Tag } from 'antd-mobile'
import apiClient from '../../api'
import EventEmitter from '../../EventEmiter'

import './index.css'
import RefererKiller from '../RefererKiller'

const Item = List.Item
const Brief = Item.Brief

class ContentList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount () {
    EventEmitter.subscribe('updateData_' + this.props.currentTab, this.updateData.bind(this))
    this.updateData()
  }

  updateData (query) {
    let inst = null
    if (this.props.currentTab === 'movies') inst = apiClient.getMovies(query)
    if (this.props.currentTab === 'musics') inst = apiClient.getMusics(query || '周杰伦')
    if (this.props.currentTab === 'books' || inst === null) inst = apiClient.getBooks(query || '霍金')
    inst.then(json => {
      this.setState({
        data: json[this.props.currentTab === 'movies' ? 'subjects' : (this.props.currentTab || 'books')]
      })
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
          thumb={item.images.small}
          key={i}
          multipleLine>
          {item.title}
          <span style={{color: '#888', fontSize: '12px', marginLeft: '3px'}}>{item.subtitle}</span>
          <Brief>
            {item.author.map((author, i) => (
              <span key={i} className='list-left-white'>{author}</span>
            ))}
          </Brief>
          {item.tags.map((tag, i) => (
            <Tag key={i} small className='list-left-white tag-yellow'>{tag.name}</Tag>
          ))}
          <Brief><span className='list-left-white'>{item.pubdate}</span></Brief>
        </Item>)
    } else if (this.props.currentTab === 'movies') {
      return (
        <Item
          extra={item.rating.average}
          align='top'
          thumb={item.images.small}
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
    return (
      <div>
        <List className='my-list'>
          {this.state.data.map((item, i) => (
            <Link to={{
              pathname: `/detail/${item.id}`,
              state: {
                data: item,
                type: this.props.currentTab
              }
            }} key={i}>
              {this.renderItem(item, i)}
            </Link>
          ))}
        </List>
      </div>
    )
  }
}

export default ContentList
