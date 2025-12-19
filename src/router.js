import{createRouter,createWebHashHistory}from'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: 'home',
      component: ()=> import('./components/views/home/HomeIndex.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: ()=> import('./components/views/login/Login.vue')
    },
    {
      path: '/adminhome',
      name: 'adminhome',
      component: ()=> import('./components/views/adminHome/AdminHome.vue'),
      children:[
        {
          path: 'index',
          name: 'index',
          component: ()=> import('./components/views/adminHome/Index.vue')
        },
        {
          path:'book',
          name:'book',
          component:()=> import('./components/views/book/BookIndex.vue'),
          children:[
            {
              path: 'list',
              name: 'list',
              component:()=> import('./components/views/book/list/BookList.vue')
            }
          ]
        }
      ]
    }
]
})

export default router