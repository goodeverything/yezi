<template>
  <div class="login-wrapper">
    <el-form :model="loginUser" :rules="validateRule" ref="loginUser" labelPosition="left" labelWidth="0"
             class="login-form">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="userId">
        <el-input type="text" v-model="loginUser.userId" autoComplete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="userPwd">
        <el-input type="password" v-model="loginUser.userPwd" autoComplete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember-me">记住密码</el-checkbox>
      <el-form-item class="submit-wrapper">
        <el-button class="submit-button" type="primary" @click.prevent="verifyLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script type="text/ecmascript-6">
  import {requestLogin} from '../api/api';

  export default {
    data() {
      return {
        loginUser: {
          userId: 'admin',
          userPwd: '123456'
        },
        validateRule: {
          userId: [
            {
              required: true,
              message: '请输入账号',
              trigger: 'blur'
            }
          ],
          userPwd: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            }
          ]
        },
        checked: false,
        user: {}
      };
    },
    methods: {
      verifyLogin() {
        this.$refs.loginUser.validate(valid => {
          if (valid) {
            let loginParams = {username: this.loginUser.userId, password: this.loginUser.userPwd};
            requestLogin(loginParams).then(response => {
              console.log(response);
              if (response.success) {
                this.user = response.data;
                console.log(this.user);
                sessionStorage.setItem('user', JSON.stringify(this.user));
                this.$router.push({path: '/table'});
              } else {
                this.$message(response.message);
              }
            });
          } else {
            console.log('submit error!!');
            return false;
          }
        });
      },
      reset() {
        this.$refs.loginUser.resetFields();
      }
    },
    name: 'login'
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .login-wrapper
    .login-form
      border-radius: 5px
      background-clip: padding-box
      margin: 180px auto
      width: 350px
      padding: 35px 35px 15px 35px
      background: #fff
      border: 1px solid #eaeaea
      box-shadow: 0 0 25px #cac6c6
      .title
        margin: 0 auto 40px auto
        text-align: center
        color: #505458;
      .remember-me
        margin: 0 0 35px 0
      .submit-wrapper
        width: 100%
        .submit-button
          width: 100%

</style>
