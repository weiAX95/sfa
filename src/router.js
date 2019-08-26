import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Home from './views/Home.vue';
import User from './views/User.vue';
import Notice from './views/Notice.vue';
import NoticeDetial from './views/NoticeDetail.vue';
import VisitShop from './views/VisitShop.vue';
import ShopInfo from './views/ShopInfo.vue';
import SignIn from './views/SignIn.vue';
import Order from './views/Order.vue';
import GoodsSelect from './views/GoodsSelect.vue';
import Cart from './views/Cart.vue';
import CartRemark from './views/CartRemark.vue';
import SubCart from './views/SubCart.vue';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Notice
    },
    {
      path: '/notice/:id',
      name: 'NoticeDetial',
      component: NoticeDetial
    },
    {
      path: '/visitshop',
      name: 'VisitShop',
      component: VisitShop
    },
    {
      path: '/visitshop/:id',
      name: 'ShopInfo',
      component: ShopInfo
    },
    {
      path: '/shopsignin/:id',
      name: 'shopsignin',
      component: SignIn
    },
    {
      path: '/order/:id',
      name: 'order',
      component: Order
    },
    {
      path: '/goodselect/:id',
      name: 'selectgoods',
      component: GoodsSelect
    },
    {
      path: '/order/:id',
      name: 'order',
      component: Order
    },
    {
      path: '/cart/:id',
      name: 'cart',
      component: Cart
    },
    {
      path: '/cartremark/:id',
      name: 'cartremark',
      component: CartRemark
    },
    {
      path: '/subcart',
      name: 'subcart',
      component: SubCart
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
});
