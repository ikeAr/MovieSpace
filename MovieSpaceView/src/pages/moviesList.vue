<template lang="html">
  <div class="container">
    <div>
      <movie-index-header ></movie-index-header> 
    </div>
    <span class="genre">
      <lable v-for="(genre,index) in genres" :key="index" for="idnex" @change="checkedGenres"><input type="checkbox" id='index' :v-model="checkedGenres"/>{{genre}}<lable>
    </span>
    <div class="contentMain">
      <div>
        <div class="contentLeft">
          <ul class="cont-ul">
            <movies-list v-for="item in movieItems" :key="item._id" :id="item._id" :movieName="item.movieName" :movieTime="item.movieTime"></movies-list><!--引入MovieList-->
          </ul>
        </div>
      </div>
    </div>
    <div>
      <common-footer></common-footer>
    </div>
  </div>
</template>
<script>
import MovieIndexHeader from "../components/MovieIndexHeader";
import CommonFooter from "../components/commonFooter";
import MoviesList from "../components/MoviesList";

export default {
  name: "movieList",
  data() {
    return {
      movieItems: [],
      genres: [],
      checkedGenres: [],
      allMovies: []
    };
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    MoviesList
  },

  //  这里用于获取数据
  created() {
    //    获取所有电影
    this.$http.get("http://localhost:3000/movie/list").then(data => {
      this.allMovies = data.body.data;
      this.movieItems = data.body.data.slice(0);
      for (let movie of this.movieItems) {
        for (let genre of movie.genres) {
          if (!this.genres.includes(genre)) {
            this.genres.push(genre);
          }
        }
      }
      console.log(data.body);
    });
  },
  methods: {
    checkedGenres() {
      this.movieItems = [];
      for (let movie of this.allMovies) {
        if (this.checkedGenres.includes(movie.genres)) {
          this.movieItems.push(movie);
        }
      }
    }
  }
};
</script>

<style lang="css" scoped>
.container {
  width: 100%;
  margin: 0 auto;
}
.contentMain {
  padding-top: 150px;
}
.genre {
  width: 20px;
  height: 10px;
  background-color: darkgray;
}
.contentText {
  font-size: 15px;
  padding-top: 20px;
}
</style>
