<template lang="html">
<div style="width: 40%;margin:20px">
  <i-input type="text" v-model="toUserName" placeholder="发送用户名">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
    </i-input>   
    <Divider />
   <i-input type="text" v-model="title" placeholder="主题">
      <Icon type="md-book" slot="prepend"></Icon>
    </i-input>
    <Divider />
     <Input v-model="context" type="textarea" :rows="4" placeholder="请输入发送内容" />
<div style="padding-top: 10px">
  <i-button type="primary" v-on:click="send_mail()">发送站内信</i-button>
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
export default {
  props: [],
  data() {
    return {
      toUserName: "",
      context: "",
      title: "",
      alertShow: false,
      alertMessage: ""
    };
  },
  methods: {
    send_mail(event) {
      let send_data = {
        token: sessionStorage.token,
        fromUserName: sessionStorage.username,
        user_id: sessionStorage._id,
        toUserName: this.toUserName,
        title: this.title,
        context: this.context
      };
      console.log(send_data);
      this.$http
        .post("http://localhost:3000/users/sendEmail", send_data)
        .then(data => {
          if (data.body.status == 1) {
            this.alertMessage = data.body.message;
            this.alertShow = true;
          } else {
            this.alertMessage = "发送成功";
            this.alertShow = true;
          }
        });
    }
  }
};
</script>
<style lang="css" scoped>
</style>
