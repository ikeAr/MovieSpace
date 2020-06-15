<template>
  <div>
    <Menu mode="horizontal" theme="dark">
      <router-link to="/">
        <MenuItem name="1">
          <Icon type="ios-paper"></Icon>主页
        </MenuItem>
      </router-link>
      <router-link to="/movieList">
        <MenuItem name="2">
          <Icon type="ios-people"></Icon>电影
        </MenuItem>
      </router-link>
      <div v-show="isShowManage">
        <router-link to="/admin">
          <MenuItem name="2">
            <Icon type="ios-people"></Icon>管理
          </MenuItem>
        </router-link>
      </div>
      <div v-if="!isLogin" test-id="login">
        <router-link to="/loginPage">
          <MenuItem name="3" class="login">登录</MenuItem>
        </router-link>
      </div>
      <div v-else>
        <MenuItem name="3" class="login" @click.native="info">
          <Icon type="md-contact" />
          {{username}} | 退出登录
        </MenuItem>
      </div>
    </Menu>
    <Drawer title="用户详情" width="440px" :closable="false" v-model="userProfile">
      <div>
        <div class="box">用户名：{{detail.username}}</div>
      </div>
      <Divider />
      <div>
        <div class="box">用户邮箱：{{detail.userMail}}</div>
      </div>
      <Divider />
      <div>
        <div class="box">用户电话：{{detail.userPhone}}</div>
      </div>
      <Divider />
      <div>
        <div class="box">用户年龄：{{detail.age}}</div>
      </div>
      <Divider />
      <div>
        <div class="box">用户状态：{{userStatus}}</div>
      </div>
      <div style="height:20px"></div>
      <Button type="ghost" @click="ShowChangeUserPassword()">修改密码</Button>
      <router-link to="/sendEmail">
        <Button type="ghost">发送站内信</Button>
      </router-link>
      <Divider />
      <div class="demo-drawer-footer">
        <Button type="ghost" style="margin-right: 8px" @click="cancel()">取消</Button>
        <Button type="primary" @click="LogOut()">退出登录</Button>
      </div>
      <div v-show="showRePassword">
        <i-input type="password" v-model="password" placeholder="输入旧密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </i-input>
        <Divider />
        <i-input type="password" v-model="repassword" placeholder="输入新密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </i-input>
        <Divider />
        <div class="box">
          <Button type="primary" @click="changeUserPassword()">修改密码</Button>
        </div>
      </div>
      <Modal
        title="提示语"
        v-model="alertShow"
        class-name="vertical-center-modal"
        @on-ok="LogOutConfirm()"
        @on-cancel="LogOutConcel()"
      >
        <p>{{alertMessage}}</p>
      </Modal>
    </Drawer>
  </div>
</template>
<script>
import CommonFooter from "../components/commonFooter";
export default {
  data() {
    return {
      isLogin: false,
      username: "",
      userProfile: false,
      pStyle: {
        fontSize: "16px",
        color: "rgba(0,0,0,0.85)",
        lineHeight: "24px",
        display: "block",
        marginBottom: "16px"
      },
      items: [],
      detail: [],
      userStatus: "",
      showRePassword: false,
      password: "",
      repassword: "",
      alertShow: false,
      alertMessage: "",
      isShowManage: false
    };
  },
  components: {
    CommonFooter
  },
  created() {
    let token = sessionStorage.getItem("token");
    if (token) {
      this.isLogin = true;
      this.username = sessionStorage.getItem("username");
      this.id = sessionStorage.getItem("_id");
      if (this.id && sessionStorage.getItem("token")) {
        this.$http
          .post("http://localhost:3000/showUser", { user_id: this.id })
          .then(data => {
            if (data.body.status == 1) {
              this.alertMessage = data.body.message;
              this.alertShow = true;
            } else {
              this.detail = data.body.data;
              if (data.body.data.userStop) {
                this.userStatus = "用户已经被封停";
              } else {
                this.userStatus = "用户状态正常";
              }
            }
            console.log(data.body.data);
          });
        if (sessionStorage.getItem("isAdmin") == "true") {
          this.isShowManage = true;
          console.log("#############");
          console.log(sessionStorage.getItem("isAdmin"));
        }
      } else {
        this.alertMessage = "用户信息错误，请重新登陆";
        this.alertShow = true;
        this.$router.push({ path: "loginPage" });
      }
    }
  },
  methods: {
    info() {
      this.userProfile = true;
    },
    cancel() {
      this.userProfile = false;
      this.showRePassword = false;
    },
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
.login {
  margin-left: 1040px;
}
.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>

