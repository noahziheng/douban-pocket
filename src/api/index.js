import fetchJsonp from 'fetch-jsonp'

const BASE_URL = 'https://api.douban.com/v2'

class ApiClient {
  getClient (url) {
    let cache = JSON.parse(localStorage.getItem('cache_' + url))
    // Check cache expire
    if (!cache || !cache.expire || Math.floor((new Date().getTime() - cache.expire) / (24 * 3600 * 1000)) >= 1) cache = false
    if (!cache) {
      return fetchJsonp(BASE_URL + url)
        .then(response => response.json())
        .then(json => {
          // Save cache for API limit
          cache = {
            data: json,
            expire: new Date().getTime()
          }
          localStorage.setItem('cache_' + url, JSON.stringify(cache))
          return json
        })
    } else {
      return new Promise((resolve, reject) => {
        resolve(cache.data)
      })
    }
  }

  getBooks (query, page = 0) {
    return this.getClient('/book/search?q=' + encodeURI(query) + '&start=' + page * 20)
  }

  getMovies (query, page = 0) {
    let url = query ? '/movie/search?q=' + encodeURI(query) + '&start=' + page * 20 : '/movie/top250?start=' + page * 20
    return this.getClient(url)
  }

  getMusics (query, page = 0) {
    return this.getClient('/music/search?q=' + encodeURI(query) + '&start=' + page * 20)
  }
}

export default new ApiClient()
