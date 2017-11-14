import Vue from 'vue'
import Router from 'vue-router'
import Error404 from '../views/404.vue'
import Home from '../views/home/index.vue'
import OrderConfirm from '../views/order/confirm.vue'
import OrderDetail from '../views/order/detail.vue'



Vue.use(Router);

export const constantRouterMap = [
  { path: '/404', component:Error404, hidden: true },
  {
    path: '/home',
    component: Home,
    name: '主页',
    hidden: true,
  },
  {
    path: '/order/confirm',
    component: OrderConfirm,
    name: '确认订单页面',
    hidden: true,
  },
  {
    path: '/order/detail',
    component: OrderDetail,
    name: '订单详情页面',
    hidden: true,
  },
  {
    path: '*',
    redirect: '/home',
  }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
