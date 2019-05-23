import Vue from 'vue'
import Router from 'vue-router'
import Classic from './views/classic'
import BookDetail from './views/book-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/classic'
    },
    {
      path: '/classic',
      name: 'classic',
      component: Classic
    },
    {
      path: '/book',
      name: 'book',
      component: () => (import('./views/book'))
    },
    {
      path: '/book-detail/:bid',
      name: 'book-detail',
      props: true,
      component: BookDetail
    }
  ]
})
