<template lang="html">
  <div class="container">
    <div>
      <movie-index-header ></movie-index-header> 
    </div>
     <div class="genre" >
       <span v-for="(genre,index) in genres" :key="index">
        <input class="singleMovie" type="checkbox"  @change="checkedGenresMovies" :v-model="checkedGenres" />
        <label class="detailedGener" >{{genre}}</label>      
       </span>
    </div>
    <div class="contentMain">
      <div>
        <div class="contentLeft">
          <ul class="cont-ul">
            <movies-list 
              v-for="item in dataShow" 
              :key="item._id" 
              :id="item._id" 
              :movieName="item.movieName" 
              :movieTime="item.movieTime[0]" 
              :movieImage="item.movieImg"
              :movieOriginalTitle="item.movieOriginalTitle">
            </movies-list><!--引入MovieList-->
          </ul>
        </div>
      </div>
    </div>
     <div class="primaryButton">
        <i-button type="primary" v-on:click=prePage()>上一页</i-button>
        <span>{{currentPage+1}}&#8194|&#8194{{pageNum}}</span>
         <i-button type="primary"v-on:click=nextPage()>下一页</i-button>
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
      allMovies: [],
      checkedGenres: [],
      totalPage: [],
      pageSize: 5,
      pageNum: 1,
      dataShow: [],
      currentPage: 0
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
      this.allMovies = JSON.parse(JSON.stringify(data.body.data));
      this.movieItems = data.body.data.slice(0);
      this.pageNum = Math.ceil(this.movieItems.length / this.pageSize) || 1;
      console.log(this.pageNum)
      for (let i = 0; i < this.pageNum; i++) {
        this.totalPage[i] = this.movieItems.slice(
          this.pageSize * i,
          this.pageSize * (i + 1)
        );
      }
      this.dataShow = this.totalPage[this.currentPage];
      for (let movie of this.movieItems) {
        for (let genre of movie.genres) {
          if (!this.genres.includes(genre)) {
            this.genres.push(genre);
          }
        }
      }
    });
  },
  methods: {
    checkedGenresMovies() {
      this.movieItems = [];
      console.log(this.checkedGenres);
      for (let movie of this.allMovies) {
        if (this.checkedGenres.includes(movie.genres)) {
          this.movieItems.push(movie);
        }
      }
    },
    nextPage() {
      console.log(this.currentPage);
      console.log(this.pageNum);
      if (this.currentPage === this.pageNum - 1) return;
      this.dataShow = this.totalPage[++this.currentPage];
    },
    prePage() {
      if (this.currentPage === 0) return;
      this.dataShow = this.totalPage[--this.currentPage];
    }
  }
};
</script>

<style lang="css" scoped>
.primaryButton{
  height: 100px;
}
.container {
  width: 100%;
  margin: 0 auto;
}

.genre {
  text-align: left;
  line-height: 30px;
  height: 30px;
  font-size: 10px;
  background-color: #c3bbbb;
}
.contentText {
  font-size: 15px;
  padding-top: 20px;
}
.detailedGener {
  padding-right: 20px;
  color: #fff;
  font-size: 12px;
}
</style>
