<template>
  <div>
    <div>
      <movie-index-header></movie-index-header>
    </div>
    <div class="layout">
      <Layout>
        <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
          <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
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
          <Content :style="{background: '#fff', minHeight: '612px'}">
            <div v-show="isNewEmail">
              <send-talk-box></send-talk-box>
            </div>
            <div v-show="isShowReceiveEmail">
              <email-list></email-list>
            </div>
            <div v-show="isShowSendEmail">
              <send-email-list></send-email-list>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
    <div>
      <common-footer></common-footer>
    </div>
  </div>
</template>
<script>
import MovieIndexHeader from "../components/MovieIndexHeader";
import CommonFooter from "../components/commonFooter";
import UserMessage from "../components/UserMessage";
import EmailList from "../components/EmailList.vue";
import SendTalkBox from "../components/SendTalkBox.vue";
import SendEmailList from "../components/SendEmailList";
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
    SendTalkBox,
    SendEmailList
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
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

