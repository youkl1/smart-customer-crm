// 总路由配置
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

// 导入端选择和登录路由
const EntryRoutes = [
  {
    path: '/',
    name: 'Entry',
    component: () => import('../views/entry/Entry.vue'),
    meta: { title: '端选择' }
  },
  {
    path: '/login/:clientType',
    name: 'Login',
    component: () => import('../views/entry/Login.vue'),
    meta: { title: '登录' }
  }
]

// 导入移动端路由
import MobileRoutes from './mobile'

// 导入WEB端路由
import WebRoutes from './web'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...EntryRoutes,
    ...MobileRoutes,
    ...WebRoutes
  ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isLoggedIn = userStore.getIsLoggedIn
  const clientType = userStore.getClientType
  
  // 设置页面标题
  document.title = to.meta.title || '智客通CRM'
  
  // 未登录用户只能访问端选择和登录页面
  if (!isLoggedIn) {
    if (to.path === '/' || to.path.startsWith('/login/')) {
      next()
    } else {
      next('/')
    }
    return
  }
  
  // 登录后禁止跨端访问
  if (isLoggedIn) {
    // 移动端用户访问WEB端路由
    if (clientType === 'mobile' && to.path.startsWith('/web/')) {
      next('/mobile/home')
      return
    }
    // WEB端用户访问移动端路由
    if (clientType === 'web' && to.path.startsWith('/mobile/')) {
      next('/web/dashboard')
      return
    }
  }
  
  next()
})

export default router