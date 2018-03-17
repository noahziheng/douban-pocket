import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import Search from '../../components/Search'
import List from '../../components/List'

const TAB_BOOKS = 'books'
const TAB_MOVIES = 'movies'
const TAB_MUSICS = 'musics'

class Home extends Component {
  constructor (props) {
    super(props)
    let type = false
    if (this.props.match) type = this.props.match.params.type
    this.state = {
      selectedTab: type || TAB_BOOKS
    }
  }

  componentDidMount () {
    this.refs.mainView_books.addEventListener('scroll', console.log.bind(this))
  }

  handleSelectTab (target) {
    this.setState({
      selectedTab: target
    })
  }

  renderContent (pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }} ref={'mainView_' + pageText} onScroll={console.log.bind(this)}>
        <Search currentTab={pageText} />
        <List currentTab={pageText} />
      </div>
    )
  }

  renderIcon (name, active = false) {
    return (<div style={{
      width: '22px',
      height: '22px',
      background: 'url(/assets/images/' + name + (active ? '_1' : '') + '.svg) center center /  21px 21px no-repeat' }}
    />)
  }

  render () {
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor='#949494'
          tintColor='#33A3F4'
          barTintColor='white'
        >
          <TabBar.Item
            title='图书'
            key='Books'
            icon={this.renderIcon('book')}
            selectedIcon={this.renderIcon('book', true)}
            selected={this.state.selectedTab === TAB_BOOKS}
            onPress={this.handleSelectTab.bind(this, TAB_BOOKS)}
            data-seed='logId'
          >
            {this.renderContent(TAB_BOOKS)}
          </TabBar.Item>
          <TabBar.Item
            title='电影'
            key='Movies'
            icon={this.renderIcon('movie')}
            selectedIcon={this.renderIcon('movie', true)}
            selected={this.state.selectedTab === TAB_MOVIES}
            onPress={this.handleSelectTab.bind(this, TAB_MOVIES)}
            data-seed='logId'
          >
            {this.renderContent(TAB_MOVIES)}
          </TabBar.Item>
          <TabBar.Item
            title='音乐'
            key='Musics'
            icon={this.renderIcon('music')}
            selectedIcon={this.renderIcon('music', true)}
            selected={this.state.selectedTab === TAB_MUSICS}
            onPress={this.handleSelectTab.bind(this, TAB_MUSICS)}
            data-seed='logId'
          >
            {this.renderContent(TAB_MUSICS)}
          </TabBar.Item>
        </TabBar>
      </div>
    )
  }
}

export default Home
