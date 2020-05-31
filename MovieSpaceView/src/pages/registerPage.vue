<template lang="html">
<div>
  <div>
      <movie-index-header ></movie-index-header> 
  </div>
  <div class="registerPage" :style ="registerPage">
    <div class="box" > 
      <div style="width: 30%;padding-top: 10%">
        <label class="registerHeader" :style="registerHeader">Register</label>
          <div class="box">
            <i-input type="text" v-model="username" placeholder="用户名">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
          </div>
          <div class="box">
            <i-input type="password" v-model="password" placeholder="密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </i-input>
          </div>
          <div class="box">
            <i-input type="password" v-model="rePassword" placeholder="确认密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
          </div>
          <div class="box">
            <i-input type="text" v-model="userMail" placeholder="邮箱">
              <Icon type="ios-mail-outline" slot="prepend"></Icon>
            </i-input>
          </div>
          <div class="box">
            <i-input type="text" v-model="userPhone" placeholder="电话">
              <Icon type="ios-call-outline" slot="prepend"></Icon>
            </i-input>
          </div>
        <div class="box">
          <i-button type="primary" v-on:click=userRegister()>注册</i-button>
          <i-button type="ghost" v-on:click=userLogin()>登录</i-button>
        </div>
      </div>   
    </div>
  </div>
    <Modal
        title="提示语"
        v-model="alertShow"
        class-name="vertical-center-modal">
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
      userMail: "",
      userPhone: "",
      rePassword: "",
      registerPage: {
        width: "1920px",
        height: "877px",
        backgroundImage: "url(" + require("../assets/register.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      registerHeader: {
        fontSize: "50px",
        color: "yellow"
      },
      alertShow: false,
      alertMessage: ""
    };
  },
  components: {
    MovieIndexHeader
  },
  methods: {
    userRegister: function(event) {
      if (this.password != this.rePassword) {
        this.alertMessage = "两次密码不一致";
        this.alertShow = true;
      } else {
        let sendDate = {
          username: this.username,
          password: this.$md5(this.password),
          userMail: this.userMail,
          userPhone: this.userPhone
        };
        this.$http
          .post("http://localhost:3000/users/register", sendDate)
          .then(data => {
            if (data.body.status == 1) {
              this.alertMessage = data.body.message;
              this.alertShow = true;
            } else {
              this.alertMessage = data.body.message;
              this.alertShow = true;
            }
          });
      }
    },
    userLogin: function(event) {
      this.$router.push({ path: "loginPage" });
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
</style>
