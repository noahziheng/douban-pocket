import fetchJsonp from 'fetch-jsonp'

const BASE_URL = 'https://api.douban.com/v2'

class ApiClient {
  getClient (url) {
    return fetchJsonp(BASE_URL + url)
      .then(function (response) {
        return response.json()
      })
  }

  getBooks (query) {
    return this.getClient('/book/search?q=' + encodeURI(query))
  }

  getMovies (query) {
    return this.getClient('/movie/search?q=' + encodeURI(query))
  }

  getMusics (query) {
    return this.getClient('/music/search?q=' + encodeURI(query))
  }
}

export default new ApiClient()
