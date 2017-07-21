import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import NotFound from '@/components/404';
import Home from '@/components/Home';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '*',
      hidden: true,
      redirect: {path: '/404'}
    },
    {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
    }
  ]
});
