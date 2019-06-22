import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const r = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/welcome'
    },
    {
      path: '',
      component: Home,
      children: [
        {
          path: '/welcome',
          component: () => import('./views/Welcome.vue')
        },
        {
          path: '/users',
          component: () => import('./views/User.vue')
        },
        {
          path: '/roles',
          component: () => import('./views/Role.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('./views/Login.vue')
    }
  ]
})

// 添加导航守卫：判断必须登录才能进入后台
// to：将要去的路由对象
// from ：去之后对象
// next ：函数，在这里必须要调用这个函数
//      next() ：允许通过
//      next(路径)  ： 重定向
//      next(error)  ： 触发一个错误
//      next(false) ：阻止
r.beforeEach((to, from, next) => {
  // /login 允许访问
  if (to.path === '/login') return next()
  // 取出令牌
  let token = sessionStorage.getItem('token')
  // 如果有令牌
  if (token) return next()
  else return next('/login')
})

export default r
