<template lang="html">
  <div class="movieList">
    <div class="singleMovie"> 
        <div>
        <img class="movieImg" v-bind:src=movieImage>
        </div>
        <div class="movieTitle">
        <router-link :to="{path: '/movieDetail', query:{ id: id }}" class="goods-list-link">
          {{movieName}}&#8194|&#8194{{movieOriginalTitle}} 
          <div class="movieTime">{{movieTime}}</div>
          <div class="movieActors" v-for="movieActor in movieActors">{{movieActor.name}}&#8194&#8194</div>
        </router-link>   
      </div>
    </div>
     <div class="clearFloat"></div>
  </div>
</template>
<script>
export default {
  props: {
    id: String,
    movieName: String,
    movieTime: String,
    movieImage: String,
    movieOriginalTitle: String,
    movieActors: [],
  }
};
</script>
<style lang="css" scoped>
.movieImg,
.movieTitle {
  font-size: 20px;
}
.movieTime {
  text-align: left;
}
img {
  width: 90%;
  height: 90%;
}
.singleMovie {
  margin-top: 50px;
  display: -webkit-box;
  float: left;
}
.clearFloat {
  clear: both;
}
.movieList {
  width: 100%;
  height: 100%;
  padding: 5px;
  border-bottom: 1px dashed #ababab;
}
.movieActors{
  text-align: left;
  font-size: 15px;
} 
</style>
