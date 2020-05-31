<template lang="html">
<div>
  <div>
      <movie-index-header ></movie-index-header> 
  </div>
  <div class="FindPasswordPage" :style ="findPasswordPage">
    <div class="box"  > 
      <div style="width: 30%;padding-top: 10%" v-show="showUserInfo">
        <label class="findPassword" :style="findPassword">FindPassword</label>
          <div class="box">
            <i-input type="text" v-model="username" placeholder="用户名">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
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
          <i-button type="primary" v-on:click=checkUser()>找回密码</i-button>
          <i-button type="ghost" v-on:click=userLogin()>登录</i-button>
        </div>
      </div>
        <div  v-show="showRePassword" >
          <div class="box" style="width: 200%">
            <i-input type="password" v-model="repassword" placeholder="输入新密码">
              <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </i-input>
          </div>
          <div  class="box" >
            <i-button type="primary" v-on:click=changeUserPassword()>修改密码</i-button>
            <i-button type="ghost" v-on:click=turnBack()>返回上一页</i-button>
          </div>
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
      userMail: "",
      userPhone: "",
      username: "",
      repassword: "",
      alertShow: false,
      alertMessage: "",
      showRePassword: false,
      showUserInfo: true,
      findPasswordPage: {
        width: "1920px",
        height: "877px",
        backgroundImage: "url(" + require("../assets/findPassword.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      findPassword: {
        fontSize: "50px",
        color: "yellow"
      }
    };
  },
  components: {
    MovieIndexHeader
  },
  methods: {
    checkUser: function(event) {
      this.$http
        .post("http://localhost:3000/users/findPassword", {
          username: this.username,
          userMail: this.userMail,
          userPhone: this.userPhone
        })
        .then(data => {
          if (data.body.status == 1) {
            this.alertMessage = data.body.message;
            this.alertShow = true;
          } else {
            this.alertMessage = data.body.message;
            this.alertShow = true;
            this.showRePassword = true;
            this.showUserInfo = false;
            console.log(this.showRePassword);
          }
        });
    },
    changeUserPassword: function(event) {
      if (this.repassword && this.repassword.length >= 6) {
        this.$http
          .post("http://localhost:3000/users/findPassword", {
            username: this.username,
            userMail: this.userMail,
            userPhone: this.userPhone,
            repassword: this.$md5(this.repassword)
          })
          .then(data => {
            if (data.body.status == 1) {
              this.alertMessage = data.body.message;
              this.alertShow = true;
            } else {
              this.alertMessage = data.body.message;
              this.alertShow = true;
              this.$router.go(-1);
            }
          });
      } else {
        this.alertMessage = "请输入6位或6位以上的密码";
        this.alertShow = true;
      }
    },
    userLogin: function(event) {
      this.$router.push({ path: "loginPage" });
    },
    turnBack: function(event) {
      this.showRePassword = false;
      this.showUserInfo = true;
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
