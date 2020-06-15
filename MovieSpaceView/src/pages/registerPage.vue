<template lang="html">
<div>
  <div>
      <movie-index-header ></movie-index-header> 
  </div>
  <div class="registerPage" :style ="registerPage">
    <div class="box" > 
      <div style="width: 30%;padding-top: 5%">
        <label class="registerHeader" :style="registerHeader">Register</label>
          <div class="box">
            <i-input type="text" test-id="username" v-model="username" placeholder="用户名">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
          </div>
          <div class="box">
            <i-input type="password" test-id="password" v-model="password" placeholder="密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </i-input>
          </div>
          <div class="box">
            <i-input type="password" test-id="repassword" v-model="rePassword" placeholder="确认密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
          </div>
           <div class="box">
            <i-input type="text" test-id="age" v-model="age" placeholder="年龄">
              <Icon type="md-aperture" slot="prepend"></Icon>
            </i-input>
            </div>
          <div class="box">
            <i-input type="text" test-id="mail" v-model="userMail" placeholder="邮箱">
              <Icon type="ios-mail-outline" slot="prepend"></Icon>
            </i-input>
          </div>
          <div class="box">
            <i-input type="text" test-id="tel"v-model="userPhone" placeholder="电话">
              <Icon type="ios-call-outline" slot="prepend"></Icon>
            </i-input>
          </div>
        <div class="box">
          <i-button type="primary" test-id="registerbutton" v-on:click=userRegister()>注册</i-button>
          <i-button type="ghost" test-id="loginbutton" v-on:click=userLogin()>登录</i-button>
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
      age: "",
      password: "",
      userMail: "",
      userPhone: "",
      rePassword: "",
      registerPage: {
        width: "100%",
        height: "662px",
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
      if (!this.username) {
        this.alertMessage = "用户名为空";
        this.alertShow = true;
      } else if (!this.password) {
        this.alertMessage = "密码为空";
        this.alertShow = true;
      } else if (this.password.length < 6) {
        this.alertMessage = "密码长度最低为6位";
        this.alertShow = true;
      } else if (!this.rePassword) {
        this.alertMessage = "确认密码为空";
        this.alertShow = true;
      } else if (this.password != this.rePassword) {
        this.alertMessage = "两次密码不一致";
        this.alertShow = true;
      } else {
        let sendDate = {
          username: this.username,
          password: this.$md5(this.password),
          userMail: this.userMail,
          userPhone: this.userPhone,
          age: this.age
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
  padding-top: 20px;
}
</style>
