import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import NotFound from '@/components/404';
import Home from '@/components/Home';
import Table from '@/components/nav1/Table.vue';
import Form from '@/components/nav1/Form.vue';
import List from '@/components/nav1/List.vue';
import Page4 from '@/components/nav2/Page4.vue';
import Page5 from '@/components/nav2/Page5.vue';
import Page6 from '@/components/nav3/Page6.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      name: '导航一',
      iconCls: 'el-icon-message', // 图标样式class
      children: [
        {path: '/table', component: Table, name: 'Table'},
        {path: '/form', component: Form, name: 'Form'},
        {path: '/list', component: List, name: 'List'}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '导航二',
      iconCls: 'el-icon-menu',
      children: [
        {path: '/page4', component: Page4, name: '页面4'},
        {path: '/page5', component: Page5, name: '页面5'}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '导航三',
      iconCls: 'el-icon-setting',
      children: [
        {path: '/page6', component: Page6, name: '页面6 '}
      ]
    },
    {
      path: '/login',
      component: Login,
      hidden: true
    },
    {
      path: '*',
      redirect: {path: '/404'},
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
    }
  ]
});
