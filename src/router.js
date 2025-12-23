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
              path: 'bookList',
              name: 'bookList',
              component:()=> import('./components/views/book/list/BookList.vue')
            },
            {
              path: 'addBook',
              name: 'addBook',
              component:()=> import('./components/views/book/add/AddBook.vue')
            },
            {
              path: 'bookCategory',
              name: 'bookCategory',
              component:()=> import('./components/views/book/category/BookCategory.vue')
            },
            {
              path: 'bookCopy',
              name: 'bookCopy',
              component:()=> import('./components/views/book/copy/BookCopyList.vue')
            }
          ]
        },
        {
          path: 'user',
          name: 'user',
          component: ()=> import('./components/views/user/UserIndex.vue'),
          children:[
            {
              path: 'userList',
              name: 'userList',
              component: ()=> import('./components/views/user/list/UserList.vue')
            },
            {
              path: 'blackUser',
              name: 'blackUser',
              component: ()=> import('./components/views/user/black/BlackUserList.vue')
            }
          ]
        },
        {
          path: 'menu',
          name: 'menu',
          component: ()=> import('./components/views/menu/MenuIndex.vue'),
          children:[
            {
              path: 'frontMenuList',
              name: 'frontMenuList',
              component: ()=> import('./components/views/menu/frontMenuList/FrontMenuList.vue')
            },
            {
              path: 'preview',
              name: 'preview',
              component: ()=> import('./components/views/menu/preview/FrontMenuPreview.vue')
            },
            {
              path: 'backMenuList',
              name: 'backMenuList',
              component: ()=> import('./components/views/menu/backMenuList/BackMenuList.vue')
            }
          ]
        }
      ]
    }
]
})

export default router