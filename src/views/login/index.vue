<template>
  <div class="login">
    <div class="div1">
      <div style="margin-top: 100px; font-size: 40px;text-align: center;">易巡智能识别</br>模型管理平台</div>
      <div style="margin-top: 30px; font-size: 15px">欢迎使用本系统</div>
    </div>
    <div class="div2">
      <div style="
          width: 100%;
          align-self: flex-end;
          display: flex;
          justify-content: center;
        ">
        <el-form
          ref="loginForm"
          :model="loginForm"
          class="login-form"
        >
          <!-- <div class="title">系统登录</div>

        <div
          style="
            margin-top: 60px;
            margin-bottom: 30px;
            text-align: center;
            font-size: 15px;
            font-weight: bold;
            color: #bac4d2;
          "
        >
          请输入账号密码登录系统
        </div> -->

          <div style="
              width: 100%;
              font-size: 30px;
              text-align: center;
              margin-bottom: 50px;
            ">
            系统登录
          </div>

          <div style="
              width: 100%;
              font-size: 15px;
              color: #bac4d2;
              text-align: center;
              margin-bottom: 30px;
            ">
            请输入账号密码登录系统
          </div>

          <el-form-item prop="name">
            <el-input
              v-model="loginForm.name"
              type="text"
              auto-complete="off"
              placeholder="账号"
            >
              <template slot="prepend"><svg-icon icon-class="user" /></template>
              <!-- <svg-icon
              slot="prefix"
              icon-class="user"
              class="el-input__icon input-icon"
            /> -->
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              auto-complete="off"
              placeholder="密码"
              @keyup.enter.native="handleLogin"
            >
              <template slot="prepend"><svg-icon icon-class="password" /></template>
              <!-- <svg-icon
              slot="prefix"
              icon-class="password"
              class="el-input__icon input-icon"
            /> -->
            </el-input>
          </el-form-item>

          <el-checkbox
            v-model="rememberMe"
            style="margin: 0px 0px 25px 0px"
          >记住密码</el-checkbox>
          <el-form-item style="width: 100%; margin-top: 20px">
            <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width: 100%"
              @click.native.prevent="handleLogin"
            >
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="
          font-size: 12px;
          letter-spacing: 1px;
          align-self: flex-end;
          width: 100%;
          text-align: center;
          margin-bottom: 10px;
        ">
        上海锦绣蓝图信息科技有限公司
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { mapActions } from "vuex";
import {login} from "@/api/user"
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        name: '',
        password: ''
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      rememberMe:true
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    this.getCookie();
  },
  methods: {
    ...mapActions(["user/login"]),
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    getCookie() {
      const name = Cookies.get("name");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        name: name === undefined ? this.loginForm.name : name,
        password:
          password === undefined ? this.loginForm.password : password
      };
      // this.rememberMe = rememberMe === undefined ? false : rememberMe;
    },
     handleLogin() {
        this.loading = true;
        this['user/login'](this.loginForm).then(res=>{
          if (this.rememberMe) {
            Cookies.set("name", this.loginForm.name, { expires: 30 });
            Cookies.set("password", this.loginForm.password, {
              expires: 30,
            });
            // Cookies.set("rememberMe", this.rememberMe, {
            //   expires: 30,
            // });
          } else {
            Cookies.remove("name");
            Cookies.remove("password");
            // Cookies.remove("rememberMe");
          }
          
        this.$router.push("/");
        }).catch(error=>{
          this.$message.error('用户名或密码错误')
          this.loading = false;
        console.log(error);
        
        })
    },
  },
};
</script>

<style lang="scss" scope >
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: "宋体";
  background: #dbdbdb;
  padding: 10vh 20vh;
}

.div1 {
  display: flex;
  width: 450px;
  height: 620px;
  // background: linear-gradient(148deg, #2057b5 0%, #6ab2f8 101%);
  background-image: url('../../assets/images/login.png');
  background-size: 101% 100%;
  flex-direction: column;
  align-items: center;
  color: #fff;
}

.div2 {
  display: flex;
  height: 620px;
  flex-flow: row wrap;
  align-items: center;
  background: #fff;
  width: 650px;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>
