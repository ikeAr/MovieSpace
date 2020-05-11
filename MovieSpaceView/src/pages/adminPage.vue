<template lang="html">
    <div>
        <i-button type="primary" v-on:click=getMoviesFromSerice()>获取资源</i-button>
    </div>
</template>
<script>
export default {
  methods: {
    getMoviesFromServices: function(event) {
      this.$http
        .get(
          "http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10"
        )
        .then((data) => {
          for (let item of data.subjects) {
            let sendData = {
              username: localStorage.username,
              id: localStorage.id,
              token: localStorage.token,
              movieName: item.title,
              movieImage: item.images.small,
              MovieDownload: ""
            };
          }
        });
    }
  }
};
</script>