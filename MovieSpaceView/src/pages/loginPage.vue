<template lang="html">
<div> 
<div class="container" :style ="container">
  <div class="header">
    <movie-index-header ></movie-index-header>   <!--  展示引入的header组件 -->
  </div>
  <div class="loginFrame">
    <div class="box">
      <div class="loginLogo" style="width: 20%;padding-top: 10%">
        <label>LOGIN</label>
      <div>
        <i-input type="text" v-model="username" placeholder="用户名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </i-input>
      </div>
      <div class="box">
        <i-input type="password" v-model="password" placeholder="密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </i-input>
      </div>
    </div>
  </div>
  <div  class="box">
    <i-button type="primary" v-on:click=userLogin()>账号登录</i-button>
    <i-button type="secondary" style="margin-left: 10px" v-on:click=userRegister()>注册</i-button>
    <i-button type="text" style="margin-left: 10px" v-on:click=findBackPassword()>忘记密码</i-button>
  </div>
  </div>
</div>
 <Modal title="提示语" v-model="alertShow" class-name="vertical-center-modal">
      <p>{{alertMessage}}</p>
  </Modal>
</div>
</template>
<script>
import MovieIndexHeader from "../components/MovieIndexHeader";
export default {
  data() {
    return {
      username: "",
      password: "",
      alertShow: false,
      alertMessage: "",
      container: {
        width: "1920px",
        height: "937px",
        backgroundImage: "url(" + require("../assets/OIP.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      }
    };
  },
  components: {
    MovieIndexHeader
  },
  methods: {
    userLogin: function(event) {
      this.$http
        .post("http://localhost:3000/users/login", {
          username: this.username,
          password: this.$md5(this.password)
        })
        .then(data => {
          if (data.body.status == 1) {
            this.alertMessage = data.body.message;
            this.alertShow = true;
          } else {
            let save_token = {
              token: data.body.data.token,
              username: this.username
            };
            sessionStorage.setItem("token", data.body.data.token);
            sessionStorage.setItem("username", data.body.data.user[0].username);
            sessionStorage.setItem("_id", data.body.data.user[0]._id);
            this.$router.push({path:"/"});
          }
        });
    },

    userRegister: function(event) {
      this.$router.push({ path: "register" });
    },

    findBackPassword: function(event) {
      this.$router.push({ path: "findPassword" });
    }
  }
};
</script>
<style>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
}
.loginLogo {
  font-size: 50px;
}
</style>
