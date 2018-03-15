import App from './App'
import Home from './views/Home'
import Detail from './views/Detail'

export default {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    { path: 'detail', component: Detail }
  ]
}
