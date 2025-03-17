import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../modules/auth/index.vue'
import { useAuthStore } from '../modules/auth/store'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'main',
    component: () => import('../modules/main/index.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'product-master',
        name: 'product-master',
        component: () => import('../modules/product/index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'customer-product-master',
        name: 'customer-product-master',
        component: () => import('../modules/customer/index.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
