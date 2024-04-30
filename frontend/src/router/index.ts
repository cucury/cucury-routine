import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CucuryUserLogin from '@/views/CucuryUserLogin.vue'
import CucuryUserRegister from '@/views/CucuryUserRegister.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: CucuryUserLogin
    },
    {
      path: '/register',
      name: 'register',
      component: CucuryUserRegister
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name !== 'register') {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      return next({ name: 'login' })
    }
  }
  next()
})

export default router
