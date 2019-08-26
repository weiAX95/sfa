import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidate from 'vee-validate';
import helper from './lib/helper';
import TopHead from './components/TopHead.vue';

import './lib/hotcss/hotcss.js';
// 引入mint ui的样式
import 'mint-ui/lib/style.css';

Vue.config.productionTip = false;

Vue.use(VeeValidate);

Vue.component('TopHead', TopHead);

router.beforeEach((to, from, next) => {
  if (to.path != '/') {
    // 校验用户是否登录
    if (helper.getTypes(store.getters.getLoginUser) === 'Object') {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
