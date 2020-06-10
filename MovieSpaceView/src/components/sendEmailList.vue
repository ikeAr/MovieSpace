
<template>
  <div class="layout">
    <Layout>
      <Sider breakpoint="md">
        <Menu active-name="1-2" theme="light" width="auto" :class="menuitemClasses">
          <div v-for="(item,index) in send_items" :key="index">
            <MenuItem :name="index" @click.native="shouEmailDetail(item)">
              <div>{{receviver}}{{item.toUser}}</div>
              <div>{{emailTitle}}{{item.title}}</div>
            </MenuItem>
          </div>
        </Menu>
      </Sider>
      <Layout>
        <Content :style="{margin: '20px', background: '#fff', minHeight: '100%'}">
          <div style="width: 30%">
            <i-input type="text" disabled :placeholder="emailDetail.toUser">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
              <span slot="prepend" :style="{padding:'10px'}">{{receviver}}</span>
            </i-input>
            <br />
            <i-input type="text" disabled :placeholder="emailDetail.title">
              <Icon type="md-book" slot="prepend"></Icon>
              <span slot="prepend" :style="{padding:'10px'}">{{emailTitle}}</span>
            </i-input>
            <br />
            <Input type="textarea" :rows="4" disabled :placeholder="emailDetail.context" />
          </div>
          <div class="reply-button">
            <Button type="ghost" @click="LogOut()">删除</Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      send_items: [
        { toUser: "111", title: "111", context: "111" },
        { toUser: "222", title: "222", context: "222" },
        { toUser: "333", title: "333", context: "333" },
        { toUser: "333", title: "333", context: "333" },
        { toUser: "333", title: "333", context: "333" },
        { toUser: "333", title: "333", context: "333" },
        { toUser: "333", title: "333", context: "333" },
        { toUser: "333", title: "333", context: "333" }
      ],
      detail: [],
      alertShow: false,
      alertMessage: "",
      emailDetail: {},
      receviver: "To：",
      emailTitle: "Subject："
    };
  },
  created() {
    // let userId = sessionStorage._id;
    // let send_data = {
    //   token: sessionStorage.token,
    //   user_id: sessionStorage._id,
    //   receive: 0
    // };
    // let receive_data = {
    //   token: sessionStorage.token,
    //   user_id: sessionStorage._id,
    //   receive: 1
    // };
    // if (userId) {
    //   this.$http
    //     .post("http://localhost:3000/users/showEmail", send_data)
    //     .then(data => {
    //       if (data.body.status == 1) {
    //         this.alertMessage = data.body.message;
    //         this.alertShow = true;
    //       } else {
    //         this.send_items = data.body.data;
    //       }
    //       console.log(data.body.data);
    //     });
    // } else {
    //   this.alertMessage = "用户信息错误";
    //   this.alertShow = true;
    // }
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    shouEmailDetail(item) {
      console.log(item);
      this.emailDetail = item;
    }
  }
};
</script>
<style scoped>
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
.reply-button {
  width: 100%;
  position: absolute;
  bottom: 50;
  left: 50;
  padding: 10px 16px;
  text-align: left;
}
</style>