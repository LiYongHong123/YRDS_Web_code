import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import code from '@/components/code'
import succ from '@/components/succ'
import info from '@/components/info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/code',
      name: 'code',
      component: code
    },
    {
      path: '/succ',
      name: 'succ',
      component: succ
    },
    {
      path: '/info',
      name: 'info',
      component: info
    }
  ]
})
