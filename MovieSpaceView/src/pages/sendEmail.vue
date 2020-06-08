<template>
  <div>
    <div>
      <movie-index-header></movie-index-header>
    </div>
    <div class="userMessage">
      <user-message></user-message>
    </div>
    <div class="layout">
      <Layout>
        <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
          <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
            <MenuItem name="1-1">
              <Icon type="ios-mail" />
              <span @click="BuildNewEmail()">新建邮件</span>
            </MenuItem>
            <MenuItem name="1-2">
              <Icon type="ios-archive" />
              <span @click="ShowReceiveEmail()">收件箱</span>
            </MenuItem>
            <MenuItem name="1-3">
              <Icon type="ios-send" />
              <span @click="ShowSendEmail()">发件箱</span>
            </MenuItem>
          </Menu>
          <div slot="trigger"></div>
        </Sider>
        <Layout>
          <Header class="layout-header-bar"></Header>
          <Content :style="{margin: '20px', background: '#fff', minHeight: '593.4px'}">
            <div v-show="isNewEmail">
              <send-talk-box></send-talk-box>
            </div>
            <div v-show="isShowReceiveEmail">
              <email-list></email-list>
            </div>
            <div v-show="isShowSendEmail">
              <send-talk-box></send-talk-box>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  </div>
</template>
<script>
import MovieIndexHeader from "../components/MovieIndexHeader";
import CommonFooter from "../components/commonFooter";
import UserMessage from "../components/UserMessage";
import EmailList from "../components/EmailList.vue";
import SendTalkBox from "../components/SendTalkBox.vue";
export default {
  name: "HelloWorld",
  data() {
    return {
      receive_items: [],
      send_items: [],
      detail: [],
      alertShow: false,
      alertMessage: "",
      isCollapsed: false,
      isNewEmail: true,
      isShowReceiveEmail: false,
      isShowSendEmail: false
    };
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    UserMessage,
    EmailList,
    SendTalkBox
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  created() {
    let userId = sessionStorage._id;
    let send_data = {
      token: sessionStorage.token,
      user_id: sessionStorage._id,
      receive: 0
    };
    let receive_data = {
      token: sessionStorage.token,
      user_id: sessionStorage._id,
      receive: 1
    };

    if (userId) {
      this.$http
        .post("http://localhost:3000/users/showEmail", send_data)
        .then(data => {
          if (data.body.status == 1) {
            this.alertMessage = data.body.message;
            this.alertShow = true;
          } else {
            this.send_items = data.body.data;
          }
          console.log(data.body.data);
        });
      this.$http
        .post("http://localhost:3000/users/showEmail", receive_data)
        .then(data => {
          if (data.body.status == 1) {
            this.alertMessage = data.body.message;
            this.alertShow = true;
          } else {
            this.receive_items = data.body.data;
          }
          console.log(data.body.data);
        });
    } else {
      this.alertMessage = "用户信息错误";
      this.alertShow = true;
    }
  },
  methods: {
    BuildNewEmail: function(event) {
      this.isNewEmail = true;
      this.isShowReceiveEmail = false;
      this.isShowSendEmail = false;
    },
    ShowReceiveEmail: function(event) {
      console.log("hello");
      this.isNewEmail = false;
      this.isShowReceiveEmail = true;
      this.isShowSendEmail = false;
    },
    ShowSendEmail() {
      this.isNewEmail = false;
      this.isShowReceiveEmail = false;
      this.isShowSendEmail = true;
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
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>

