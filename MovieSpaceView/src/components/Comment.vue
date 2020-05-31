<template lang="html">
<div>
<label >评论</label>
<hr>
<div>
    <li v-for="item in items">
    {{ item.username }}评论：{{item.context}}
  </li>
</div>

<div style="padding: 5px">
     <textarea v-model="context" style="width: 80%;height:50px ;" placeholder="内容"></textarea>
</div>
<div style="padding-top: 10px">
    <button v-on:click="send_comment">评论</button>
</div>
    <Modal
        title="提示语"
        v-model="alertShow"
        class-name="vertical-center-modal">
        <p>{{alertMessage}}</p>
    </Modal>
</div>

</template>
<!--这里获取所有的评论，并且可以进行评论,对于文章详情页也可以使用-->
<script>
export default {
  props: ["movie_id"],
  data() {
    return {
      items: [],
      context: "",
      alertShow: false,
      alertMessage: ""
    };
  },
  created() {
    //    获得所有的评论
    //    console.log(this.movie_id)
    this.$http
      .post("http://localhost:3000/movie/comment", { id: this.movie_id })
      .then(data => {
        if (data.body.status == 0) {
          this.items = data.body.data;
        } else {
          this.alertMessage = "获取失败";
          this.alertShow = true;
        }
      });
  },
  methods: {
    send_comment(event) {
      let send_data;
      if (typeofsessionStorage.username != "undefined") {
        send_data = {
          movie_id: this.movie_id,
          context: this.context,
          username: sessionStorage.username
        };
      } else {
        send_data = {
          movie_id: this.movie_id,
          context: this.context
        };
      }

      this.$http
        .post("http://localhost:3000/users/postCommment", send_data)
        .then(data => {
          this.alertMessage = data.body.message;
          this.alertShow = true;
        });
    }
  }
};
</script>
<style lang="css" scoped>
</style>
