<template lang="html">
  <div class="movieList">
    <div class="singleMovie"> 
        <div>
        <img class="movieImg" v-bind:src=movieImage>
        </div>
        <div class="movieTitle">
        <router-link :to="{path: '/movieDetail', query:{ id: id }}" class="goods-list-link">
          {{movieName}}
          <div class="movieTime">{{movieTime}}</div>
          <div class="movieActors">{{movieActors[0].name}}</div>
        </router-link>   
      </div>
    </div>
     
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
    movieActors: []
  }
};
</script>
<style lang="css" scoped>
img {
  width: 60%;
  height: 15vw;
  margin-bottom: 10px;
}
.singleMovie {
  width:256px;
  height: 318px;
  margin-top: 20px;
}
.movieList {
  padding: 5px;
  border-bottom: 1px dashed #ababab;
}
.movieTime .movieActors {
  text-align: center;
  font-size: 15px;
}
</style>
