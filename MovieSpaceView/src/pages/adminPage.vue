<template lang="html">
    <div>
        <i-button type="primary" v-on:click=getMoviesFromServer()>获取资源</i-button>
    </div>
</template>
<script>
export default {
  methods: {
    getMoviesFromServer: function(event) {
      let acquiredMovie = [];
      this.$http
        .jsonp(
          "http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=100"
        )
        .then(data => {
          console.log(data.body.subjects);
          for (let item of data.body.subjects) {
            let movie = {
              movieName: item.title,
              movieImg: item.images.small,
              movieVideo: item.images.large,
              movieDownload: item.alt,
              movieTime: item.pubdates,
              genres: item.genres,
              movieDirectors: item.directors,
              movieActors:item.casts,
              movie_id: item.id,
              movieOriginalTitle: item.original_title
            };
            acquiredMovie.push(movie);
          }
          let sendData = {
            username: localStorage.username,
            id: localStorage._id,
            token: localStorage.token,
            acquiredMovie: acquiredMovie
          };
          console.log(sendData);
          this.$http
            .post(
              "http://localhost:3000/admin/movieAdd",
              JSON.stringify(sendData)
            )
            .them(data => {
              if (data.body.status == 1) {
                alert(data.body.message);
              } else {
                alert(data.body.message);
              }
            });
        });
    }
  }
};
</script>