import Vue from 'vue'
import Router from 'vue-router'
import Frontpage from '@/components/Frontpage'
import Assignment from '@/components/Assignment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'frontpage',
      component: Frontpage
    },
    {
      path: '/assignment',
      name: 'assignment',
      component: Assignment
    }
  ]
})
