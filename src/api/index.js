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

  getBooks (query) {
    return this.getClient('/book/search?q=' + encodeURI(query))
  }

  getMovies (query) {
    let url = query ? '/movie/search?q=' + encodeURI(query) : '/movie/top250'
    return this.getClient(url)
  }

  getMusics (query) {
    return this.getClient('/music/search?q=' + encodeURI(query))
  }
}

export default new ApiClient()
