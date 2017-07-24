<template>
  <div class="home">
    <el-row class="header">
      <el-col :span="10" class="logo" :class="isCollapsed?'logo-collapse-width':'logo-normal-width'">
        <span class="brand"> {{isCollapsed ? '' : sysName}}</span>
      </el-col>
      <el-col :span="10">
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>
      <el-col :span="4" class="login-info">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link login-avatar"><img :src="loginAvatar"/>{{loginName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-row class="main">
      <aside class="menu-wrapper" :class="isCollapsed?'menu-collapsed':'menu-expanded'">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapsed"
                 unique-opened="true" router="true">
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span slot="title"> {{item.name}}</span>
              </template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">
                <span> {{child.name}}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </aside>
      <section class="content-wrapper">
        <el-row>
          <el-col :span="24" class="breadcrumb-wrapper">
            <strong class="title">{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </el-row>
      </section>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        sysName: 'VUEADMIN',
        isCollapsed: false,
        loginAvatar: '',
        loginName: '孙钦伟'
      };
    },
    methods: {
      collapse() {
        this.isCollapsed = !this.isCollapsed;
      },
      logout() {
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {}).then(() => {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/vars.styl"
  .home
    .header
      height: 60px
      line-height: 60px
      background: #20a0ff
      color: #fff
      .logo
        height: 60px
        font-size: 22px
        padding-left: 20px
        padding-right: 20px;
        border-color: rgba(238, 241, 146, 0.3);
        border-right-width: 1px;
        border-right-style: solid;
        img
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        &.logo-normal-width
          width: 230px
        &.logo-collapse-width
          width: 60px
      .tools
        padding: 0px 23px
        width: 14px
        height: 60px
        line-height: 60px
        cursor: pointer
      .login-info
        text-align: right
        padding-right: 35px
        float: right
        .login-avatar
          cursor: pointer
          img
            width: 40px
            height: 40px
            border-radius: 20px
            margin: 10px 0px 10px 10px
            float: right
    .main
      display: flex
      position: absolute
      top: 60px
      bottom: 0
      width: 100%
      overflow: hidden
      .menu-wrapper
        &.menu-collapsed
          flex: 0 0 60px
          width: 60px
        &.menu-expanded
          flex: 0 0 230px
          width: 230px
      .content-wrapper
        flex: 1
        /*overflow-y: scroll;*/
        padding: 20px
        .breadcrumb-wrapper
          .title
            width: 200px
            float: left
            color: #475669
          .breadcrumb
            float: right
        .content-wrapper
          background-color: #fff
          box-sizing: border-box
</style>
