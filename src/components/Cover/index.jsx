import React, { Component } from 'react'
import { Tag } from 'antd-mobile'

import './index.css'
import RefererKiller from '../RefererKiller'

class Cover extends Component {
  render () {
    if (this.props.type === 'books') {
      return (
        <div className='cover-container'>
          <img src={this.props.data.image} />
          <div className='cover-info'>
            <p>名称：{this.props.data.title}</p>
            <p>作者：{this.props.data.author.map((author, i) => <span key={i} style={{marginRight: '5px'}}>{author}</span>)}</p>
            {this.props.data.translator ? <p>译者：{this.props.data.translator.map((author, i) => <span key={i} style={{marginRight: '5px'}}>{author}</span>)}</p> : ''}
            <p>出版社：{this.props.data.publisher}</p>
            <p>发行日期：{this.props.data.pubdate}</p>
            <p>评分：<span className='rating'>{this.props.data.rating.average}</span></p>
            <p>售价：{this.props.data.price}</p>
          </div>
          <div className='cover-tags'>
            {this.props.data.tags.map((tag, i) => (
              <Tag key={i} small className='list-left-white tag-yellow'>{tag.name}</Tag>
            ))}
          </div>
        </div>
      )
    }
    if (this.props.type === 'movies') {
      return (
        <div>
          <div className='cover-container cover-container-movie'>
            <img src={this.props.data.images.large} />
            <div className='cover-tags'>
              {this.props.data.genres.map((tag, i) => (
                <Tag key={i} small className='list-left-white tag-red'>{tag}</Tag>
              ))}
            </div>
          </div>
          <div className='cover-container cover-container-movie'>
            <div className='cover-movie-title'>
              <h2>简介</h2>
              <span className='rating'>{this.props.data.rating.average}</span>
            </div>
            <div className='cover-info'>
              <p>名称：{this.props.data.title}</p>
              <p>上映时间：{this.props.data.year}</p>
              <p>导演：{this.props.data.directors.map((author, i) => <span key={i} style={{marginRight: '5px'}}>{author.name}</span>)}</p>
              <p>{this.props.data.original_title}</p>
            </div>
          </div>
        </div>
      )
    }
    if (this.props.type === 'musics') {
      return (
        <div className='cover-container'>
          <RefererKiller src={this.props.data.image} />
          <div className='cover-info'>
            <p>名称：{this.props.data.title}</p>
            <p>作者：{this.props.data.author.map((author, i) => <span key={i} style={{marginRight: '5px'}}>{author.name}</span>)}</p>
            <p>发行方：{this.props.data.attrs.publisher}</p>
            <p>发行日期：{this.props.data.attrs.pubdate}</p>
            <p>评分：<span className='rating'>{this.props.data.rating.average}</span></p>
          </div>
          <div className='cover-tags'>
            {this.props.data.tags.map((tag, i) => (
              <Tag key={i} small className='list-left-white tag-yellow'>{tag.name}</Tag>
            ))}
          </div>
        </div>
      )
    }
    return (
      <div />
    )
  }
}

export default Cover
