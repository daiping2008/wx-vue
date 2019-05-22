import Vue from 'vue'
import Router from 'vue-router'
import Classic from './views/classic'

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
    }
  ]
})
