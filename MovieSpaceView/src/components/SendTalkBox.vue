<template lang="html">
<div>
<div>
<input v-model="toUserName" placeholder="发送用户名">
</div>
    <div style="padding: 10px">
     <input v-model="title" placeholder="发送标题">
</div>

    <div style="padding: 5px">
     <textarea v-model="context" style="width: 80%;height:50px ;" placeholder="内容"></textarea>
</div>

<div style="padding-top: 10px">
    <button v-on:click="send_mail">发送站内信</button>
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
        user_id: sessionStorage._id,
        toUserName: this.toUserName,
        title: this.title,
        context: this.context
      };
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
