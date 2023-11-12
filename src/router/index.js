import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/errors/NotFoundView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/RootView.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('../views/errors/DataErrorView.vue')
    },
  ]
})

export default router
