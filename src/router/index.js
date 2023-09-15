import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/IndexView'),
    meta: { keepAlive: true, title: '首页' }
  },
  {
    path: '/shoppingcar',
    name: 'shoppingcar',
    component: () => import('@/views/ShoppingCart'),
    meta: { title: '购物车' }
  },
  {
    path: '/minecenter',
    name: 'minecenter',
    component: () => import('@/views/MineCenter'),
    meta: { title: '个人中心' }
  },
  {
    path: '/classify',
    name: 'classify',
    component: () => import('@/views/ClassifyView'),
    meta: { title: '分类' }
  },
  {
    path: '/detail/id=:id',
    name: 'detail',
    component: () => import('@/views/DetailView'),
    meta: { title: '详情' }
  }, {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView'),
    meta: { title: '登陆' }
  },
  {
    path: '/pay',
    name: "pay",
    component: () => import("@/views/PayView"),
    meta: { title: 'pay' }
  },
  {
    path: "/addresslist",
    name: 'address',
    component: () => import("@/views/pay/AddressList"),
    meta: { title: 'address' }
  },
  {
    path: '/*',
    redirect: '/index'
  }]

const router = new VueRouter({
  mode: "hash",
  routes
})

export default router
