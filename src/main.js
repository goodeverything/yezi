// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import vuex from 'vuex';
import elementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import 'font-awesome/css/font-awesome.min.css';
import './common/stylus/index.styl';

router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.path === '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path !== '/login') {
    next({ path: '/login' });
  } else {
    next();
  }
});

Vue.use(elementUI);
Vue.use(vuex);

let store = new vuex.Store({
  state: {
    count: 10
  },
  mutations: {
    inc: state => state.count++,
    dec: state => state.count--
  }
});
Vue.prototype.store = store;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
