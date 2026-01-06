import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import { ElMessage } from "element-plus";
import Cookies from "js-cookie";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/home",
      name: "home",
      component: () => import("./components/views/home/HomeIndex.vue"),
      meta: {
        title: "主页",
        requireAuth: false,
      },
      children: [
        {
          path: "/",
          name: "frist",
          component: () => import("./components/views/home/index/Index.vue"),
          meta: {
            title: "首页",
          },
        },
        {
          path: "readerGuide",
          name: "readerGuide",
          component: () =>
            import("./components/views/home/readerGuide/ReaderGuide.vue"),
          children: [
            {
              path: "index1",
              name: " index1",
              component: () =>
                import("./components/views/home/readerGuide/index/Index1.vue"),
            },
            {
              path: "index2",
              name: " index2",
              component: () =>
                import("./components/views/home/readerGuide/index/Index2.vue"),
            },
            {
              path: "index3",
              name: " index3",
              component: () =>
                import("./components/views/home/readerGuide/index/Index3.vue"),
            },
            {
              path: "index4",
              name: " index4",
              component: () =>
                import("./components/views/home/readerGuide/index/Index4.vue"),
            },
            {
              path: "index5",
              name: " index5",
              component: () =>
                import("./components/views/home/readerGuide/index/Index5.vue"),
            },
          ],
          meta: {
            title: "读者指南",
          },
        },
        {
          path: "collectionOverview",
          name: "collectionOverview",
          component: () =>
            import("./components/views/home/collectionOverview/CollectionOverview.vue"),
          meta: {
            title: "馆藏一览",
          },
        },
        {
          path: "newBook",
          name: "newBook",
          component: () =>
            import("./components/views/home/newBook/NewBook.vue"),
          meta: {
            title: "新书速递",
          },
        },
        {
          path: "personalCenter",
          name: "personalCenter",
          component: () =>
            import("./components/views/home/personalCenter/PersonalCenter.vue"),
          meta: {
            title: "个人中心",
          },
        },
        {
          path: 'search',
          name: 'search',
          component: ()=> import("./components/views/home/search/Search.vue"),
          meta: {
            title: "搜索结果",
          },
        }
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./components/views/login/Login.vue"),
    },
    {
      path: "/adminhome",
      name: "adminhome",
      component: () => import("./components/views/adminHome/AdminHome.vue"),
      meta: {
        title: "后台",
        requireAuth: true,
        roles: ["admin"],
      },
      children: [
        {
          path: "index",
          name: "index",
          component: () => import("./components/views/adminHome/Index.vue"),
        },
        {
          path: "book",
          name: "book",
          component: () => import("./components/views/book/BookIndex.vue"),
          children: [
            {
              path: "bookList",
              name: "bookList",
              component: () =>
                import("./components/views/book/list/BookList.vue"),
              meta: {
                title: "图书列表",
                requireAuth: true,
                roles: ["admin"],
              },
            },
            {
              path: "addBook",
              name: "addBook",
              component: () =>
                import("./components/views/book/add/AddBook.vue"),
              meta: {
                title: "新增图书",
              },
            },
            {
              path: "bookCategory",
              name: "bookCategory",
              component: () =>
                import("./components/views/book/category/BookCategory.vue"),
              meta: {
                title: "图书分类",
              },
            },
            {
              path: "bookCopy",
              name: "bookCopy",
              component: () =>
                import("./components/views/book/copy/BookCopyList.vue"),
              meta: {
                title: "图书馆藏",
              },
            },
          ],
        },
        {
          path: "user",
          name: "user",
          component: () => import("./components/views/user/UserIndex.vue"),
          meta: {
            title: "用户",
          },
          children: [
            {
              path: "userList",
              name: "userList",
              component: () =>
                import("./components/views/user/list/UserList.vue"),
              meta: {
                title: "用户列表",
              },
            },
            {
              path: "blackUser",
              name: "blackUser",
              component: () =>
                import("./components/views/user/black/BlackUserList.vue"),
              meta: {
                title: "用户黑名单",
              },
            },
          ],
        },
        {
          path: "menu",
          name: "menu",
          component: () => import("./components/views/menu/MenuIndex.vue"),
          meta: {
            title: "菜单",
          },
          children: [
            {
              path: "frontMenuList",
              name: "frontMenuList",
              component: () =>
                import(
                  "./components/views/menu/frontMenuList/FrontMenuList.vue"
                ),
              meta: {
                title: "前台菜单列表",
              },
            },
            {
              path: "preview",
              name: "preview",
              component: () =>
                import("./components/views/menu/preview/FrontMenuPreview.vue"),
              meta: {
                title: "前台菜单预览",
              },
            },
            {
              path: "backMenuList",
              name: "backMenuList",
              component: () =>
                import("./components/views/menu/backMenuList/BackMenuList.vue"),
              meta: {
                title: "后台菜单列表",
              },
            },
          ],
        },
        {
          path: "borrow",
          name: "borrow",
          component: () => import("./components/views/borrow/BorrowIndex.vue"),
          meta: {
            title: "借阅",
          },
          children: [
            {
              path: "borrowRecord",
              name: "borrowRecord",
              component: () =>
                import("./components/views/borrow/record/BorrowRecord.vue"),
              meta: {
                title: "借阅记录",
              },
            },
            {
              path: "borrowPermit",
              name: "borrowPermit",
              component: () =>
                import("./components/views/borrow/permit/BorrowPermit.vue"),
              meta: {
                title: "借阅批准",
              },
            },
          ],
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  const user = Cookies.get("user");
  const admin = Cookies.get("admin");

  // 检查当前路由是否需要认证
  // 使用 to.matched 检查所有匹配的路由记录
  const requiresAuth = to.matched.some(
    (record) => record.meta.requireAuth === true
  );

  // 如果不需要认证，直接放行
  if (!requiresAuth) {
    return next();
  }

  // 需要认证但未登录
  if (!user && !admin) {
    return next({
      name: "login",
    });
  }

  // 检查角色权限
  if (requiresAuth) {
    // 获取当前用户角色
    const userRole = user ? "user" : "admin";

    // 收集所有匹配路由的角色要求
    const requiredRoles = [];
    to.matched.forEach((record) => {
      if (record.meta.roles) {
        requiredRoles.push(...record.meta.roles);
      }
    });

    // 如果有角色要求，检查当前用户角色
    if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
      // 角色不匹配
      if (userRole === "admin") {
        // 管理员试图访问普通用户页面，跳转到管理后台
        return next();
      } else {
        // 普通用户试图访问管理员页面，跳转到首页
        ElMessage.error("您没有权限访问该页面");
        return next("/");
      }
    }
  }
  next();
});

router.afterEach((to) => {
  NProgress.done();
  document.title = to.meta?.title || "图书管理系统";
});

export default router;
