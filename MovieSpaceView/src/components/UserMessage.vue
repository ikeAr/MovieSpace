<template lang="html">
    <div v-if=!isLogin class="header">
        <Row>
            <i-col span="2" offset="22">
                <router-link to="/loginPage">
                <div class="header_menu"><Icon type="person" />登录</div>
                </router-link>
            </i-col>
        </Row>
    </div>
    <div v-else class="header">
        <Row>
            <i-col span="2"  offset="22">
                <div class="header_menu" @click="showUserInfoShow()"><Icon type="person" />{{username}} | 退出登录</div>
            </i-col>
        </Row>
      <div>
      <Drawer :closable="false" width="340" v-model="userInfoShow">
            <p :style="pStyle">User Profile</p>
            <p :style="pStyle">Personal</p>
            <div class="demo-drawer-profile">
                <Row>
                    <i-col span="12">
                        用户名: {{detail.username}}
                    </i-col>
                </Row>
                <Divider />
                <Row>
                    <i-col span="12">
                        用户电话：{{detail.userPhone}}
                    </i-col>
                </Row>
                <Divider />
                <Row>
                    <i-col span="12">
                        用户邮箱：{{detail.userMail}}
                    </i-col>
                </Row>
                <Divider />
                <Row>
                    <i-col span="12">
                       用户状态：{{userStatus}}
                    </i-col>
                </Row>
                <Divider />
                <div>
                    <Row>
                        <i-col span="12">
                            <i-button type="ghost"  style="margin-right: 8px" @click="showRePassword=true">修改密码</i-button>
                        </i-col>
                        <i-col span="12">
                            <router-link to="/sendEmail">
                            <i-button type="ghost"  style="margin-right: 8px" v-on:click=changeUserPassword()>发送站内信</i-button>
                            </router-link>
                        </i-col>
                    </Row>
                </div>
            </div>
            <Divider />
            <div v-show="showRePassword">
                <div class="demo-drawer-profile" >
                    <p :style="pStyle">修改密码</p>
                    <Row>
                        <Input v-model="password" placeholder="输入旧密码"></Input>
                    </Row>    
                </div>
                <Divider />
                <div class="demo-drawer-profile">
                    <Row>
                        <Input type="password" v-model="repassword" placeholder="输入新密码"></Input>
                    </Row>
                </div>
                <Divider />
                <div>
                    <Row>
                        <i-button type="primary"  style="margin-right: 8px" v-on:click="changeUserPassword()">修改密码</i-button>
                    </Row>
                </diV>
            </div>
            <div class="demo-drawer-footer">
                <Button type="primary" @click="LogOut()">LogOut</Button>
            </div>
        </Drawer>
    </div>
         <Modal title="提示语" v-model="alertShow" class-name="vertical-center-modal" @on-ok="LogOutConfirm()" @on-cancel="LogOutConcel()">
             <p>{{alertMessage}}</p>
        </Modal>
</div>
</template>
<script>
import { Drawer } from "iview";
export default {
  data() {
    return {
      isLogin: false,
      username: "",
      userInfoShow: false,
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
      alertMessage: ""
    };
  },
  created() {
    let token = sessionStorage.getItem("token");
    if (token) {
      this.isLogin = true;
      this.username = sessionStorage.getItem("username");
      this.id = sessionStorage.getItem("_id");
    } else {
      console.log("用户获得登录失败");
    }
  },
  methods: {
    showUserInfoShow(event) {
      this.userInfoShow = true;
      let userId = this.id;
      if (userId && sessionStorage.getItem("token")) {
        this.$http
          .post("http://localhost:3000/showUser", { user_id: userId })
          .then(data => {
              console.log("hello world");
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
      } else {
        this.alertMessage = "用户信息错误，请重新登陆";
        this.alertShow = true;
        this.$router.push({ path: "loginPage" });
      }
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
.header {
  width: 100%;
  height: 30px;
  left: 0;
  top: 0;
  color: #000;
  background-color: #c3bbbb;
}
.header_menu {
  padding-top: 6px;
  color: #fff;
  font-size: 12px;
}
.demo-drawer-profile {
  font-size: 14px;
}
.demo-drawer-profile .ivu-col {
  margin-bottom: 12px;
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
