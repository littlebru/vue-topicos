import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/usuario',
    name: 'usuario',
    component: () => import('../views/UsuarioView.vue')
  },
  {
    path: '/anotacao',
    name: 'anotacao',
    component: () => import('../views/AnotacaoView.vue')
  },
  {
    path: '/gasto',
    name: 'gasto',
    component: () => import('../views/GastoView.vue')
  },
  {
    path: '/lance',
    name: 'lance',
    component: () => import('../views/LanceView.vue')
  },
  {
    path: '/localidade',
    name: 'localidade',
    component: () => import('../views/LocalidadeView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
