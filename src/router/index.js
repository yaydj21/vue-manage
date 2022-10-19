import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/Main'),
    redirect:'/home',
    children:[
      {
        path:'/home',
        name:'home',
        component:() => import('@/views/home/index'),
      },
      {
        path:'/user',
        name:'user',
        component:() => import('@/views/User/index'),
      },
      {
        path:'/mall',
        name:'mall',
        component:() => import('@/views/mall/index'),
      },
      {
        path:'/page1',
        name:'page1',
        component:() => import('@/views/other/page1'),
      },
      {
        path:'/page2',
        name:'page2',
        component:() => import('@/views/other/page2'),
      },

    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
