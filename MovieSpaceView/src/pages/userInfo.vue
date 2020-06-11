<template lang="html">
<!--此页面需要-->
  <div class="container">
  <div>
      <movie-index-header ></movie-index-header>   <!--  展示引入的header组件 -->
  </div>
  <div class="userMessage">
    <user-message></user-message>
  </div>
<!--用户的相关信息-->

<div>
  <div class="box">用户名：{{detail.username}}</div>
</div>
<div>
  <div class="box">用户邮箱：{{detail.userMail}}</div>
</div>
<div>
  <div class="box">用户电话：{{detail.userPhone}}</div>
</div>
<div>
  <div class="box">用户状态：{{userStatus}}</div>
</div>
<div>
  <button v-on:click=ShowChangeUserPassword()>修改密码</button>
</div>
<div  v-show="showRePassword" >
    <div class="box" >
    <label>输入旧密码:</label>
    <input type="password" v-model="password" placeholder="输入旧密码">
    </div>
    <div class="box" >
    <label>输入新密码:</label>
    <input type="password" v-model="repassword" placeholder="输入新密码">
    </div>
     <div  class="box">
    <button v-on:click=changeUserPassword()>修改密码</button>
</div>
</div>
<div style="padding-top: 10px">
  <router-link to="/sendEmail">
    <button>发送站内信</button>
</router-link>
   <div  class="box">
    <button v-on:click=LogOut()>退出登陆</button>
</div>
</div>
    <common-footer></common-footer> 
     <Modal title="提示语" v-model="alertShow" class-name="vertical-center-modal" @on-ok="LogOutConfirm()" @on-cancel="LogOutConcel()">
      <p>{{alertMessage}}</p>
  </Modal>
  </div>
</template>
<script>
import MovieIndexHeader from "../components/MovieIndexHeader";
import CommonFooter from "../components/commonFooter";
import UserMessage from "../components/UserMessage";
export default {
  name: "HelloWorld",
  data() {
    return {
      items: [],
      detail: [],
      userStatus: "",
      showRePassword: false,
      password: "",
      repassword: "",
      alertShow: false,
      alertMessage: ""
    };
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    UserMessage
  },

  //  这里用于获取数据，需要获得主页推荐，主页新闻列表，主页电影列表
  created() {
    
  },
  methods: {
    ShowChangeUserPassword(event) {
      this.showRePassword = true;
    },
    changeUserPassword(event) {
      let token = sessionStorage.token;
      let user_id = sessionStorage._id;
      this.$http
        .post("http://localhost:3000/users/findPassword", {
          token: token,
          user_id: user_id,
          repassword: this.$md5(this.repassword),
          password: this.$md5(this.password)
        })
        .then(data => {
          if (data.body.status == 1) {
            this.alertMessage = data.body.message;
            this.alertShow = true;
          } else {
            this.alertMessage = data.body.message;
            this.alertShow = true;
          }
        });
    },
    LogOut(event) {
      this.alertMessage = "您确定要退出么？";
      this.alertShow = true;
    },
    LogOutConfirm() {
      sessionStorage.clear();
      this.$router.push({ path: "loginPage" });
    },
    LogOutConcel() {
      this.alertShow = false;
    }
  }
};
</script>

<style lang="css" scoped>
.box {
  display: inline-flex;
}
.container {
  width: 100%;
  margin: 0 auto;
}
.userMessage {
  padding-top: 10px;
  margin-top: -10px;
  margin-left: -10px;
}
</style>
