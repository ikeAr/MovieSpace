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
    <Button type="primary" v-on:click=userLogin()>账号登录</Button>
    <Button type="secondary" style="margin-left: 10px" v-on:click=userRegister()>注册</Button>
    <Button type="text" style="margin-left: 10px" v-on:click=findBackPassword()>忘记密码</Button>
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
        width: "100%",
        height: "722px",
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
            sessionStorage.setItem("token", data.body.data.token);
            sessionStorage.setItem("username", data.body.data.user[0].username);
            sessionStorage.setItem("_id", data.body.data.user[0]._id);
            sessionStorage.setItem("isAdmin", data.body.data.user[0].userAdmin);
            if (data.body.data.user[0].userAdmin) {
              this.$router.push({ path: "/admin" });
            } else {
              this.$router.push({ path: "/" });
            }
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
