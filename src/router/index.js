import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import { ElMessage } from 'element-plus'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue'),
    meta: {
      title: '关于'
    }
  },
  // 用户认证路由
  {
    path: '/auth',
    name: 'auth',
    meta: {
      title: '用户认证',
    },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/auth/Login.vue'),
        meta: {
          title: '用户登录',
        }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/auth/Register.vue'),
        meta: {
          title: '用户注册',
          requiresGuest: true
        }
      }
    ]
  },
  // 管理员路由
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/users',
    meta: {
      title: '管理后台',
      requiresAuth: true,
      requiresAdmin: true
    },
    children: [
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('@/views/admin/UserManagement.vue'),
        meta: {
          title: '用户管理',
          requiresAuth: true,
          requiresAdmin: true
        }
      }
    ]
  },
  // 用户个人中心路由
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/user/Profile.vue'),
    meta: {
      title: '个人中心',
      requiresAuth: true
    }
  },
  // 图片项目路由
  {
    path: '/imageProject',
    name: 'image-project',
    meta: {
      title: 'AI创作项目',
      requiresAuth: true
    },
    children: [
      {
        path: 'create',
        name: 'create-project',
        component: () => import('@/views/imageProject/CreateProject.vue'),
        meta: {
          title: '创建项目',
          requiresAuth: true
        }
      },
      {
        path: 'chat/:projectId',
        name: 'ai-chat',
        component: () => import('@/views/imageProject/AIChat.vue'),
        meta: {
          title: 'AI对话',
          requiresAuth: true
        }
      }
    ]
  },
  // 404 页面
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '页面未找到'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// // 路由守卫
// router.beforeEach(async (to, from, next) => {
//   // 设置页面标题
//   if (to.meta.title) {
//     document.title = `${to.meta.title} - SparkCraft`
//   }

//   // 获取用户登录状态和角色信息
//   const isLoggedIn = store.getters['user/isLoggedIn']
//   const userRole = store.getters['user/userRole']
//   const token = store.getters['user/token']

//   // 如果有 token 但用户信息为空，尝试获取用户信息
//   if (token && !isLoggedIn) {
//     try {
//       await store.dispatch('user/getCurrentUser')
//     } catch (error) {
//       console.error('获取用户信息失败:', error)
//       // 清除无效的 token
//       store.commit('user/CLEAR_USER')
//     }
//   }

//   // 检查是否需要登录
//   if (to.meta.requiresAuth) {
//     if (!store.getters['user/isLoggedIn']) {
//       ElMessage.warning('请先登录')
//       next({
//         name: 'login',
//         query: { redirect: to.fullPath }
//       })
//       return
//     }
//   }

//   // 检查是否需要管理员权限
//   if (to.meta.requiresAdmin) {
//     if (!store.getters['user/isLoggedIn']) {
//       ElMessage.warning('请先登录')
//       next({
//         name: 'login',
//         query: { redirect: to.fullPath }
//       })
//       return
//     }
    
//     if (store.getters['user/userRole'] !== 'admin') {
//       ElMessage.error('权限不足，需要管理员权限')
//       next({ name: 'home' })
//       return
//     }
//   }

//   // 检查是否需要游客状态（未登录）
//   if (to.meta.requiresGuest) {
//     if (store.getters['user/isLoggedIn']) {
//       // 已登录用户访问登录/注册页面，重定向到首页
//       next({ name: 'home' })
//       return
//     }
//   }

//   next()
// })

export default router