<template lang="html">
<!--此页面需要-->
  <div class="container">
  <div>
      <movie-index-header ></movie-index-header>   <!--  展示引入的header组件 -->
  </div>
  <div class="contentPic">
      <index-header-pic v-for="item in headerItems" :key="item._id"  :recommendImg="item.recommendImg" :recommendSrc="item.recommendSrc" :recommendTitle="item.recommendTitle"></index-header-pic>
  </div>
  <div class="contentMain" >
    <Row>
    <!--改写成栅格布局-->
    <i-col span="11" offset="1">
    <!--使用card组件-->
      <Card>
        <p class="cardTitle" slot="title">
            <Icon type="ios-film-outline"></Icon>
            推荐电影
        </p>
        <div>
        <Row >
          <Col span="8"  v-for="item in movieItems" :key="item._id" >
            <movies-list 
              :id="item._id" 
              :movieName="item.movieName" 
              :movieTime="item.movieTime[0]" 
              :movieImage="item.movieImg"
              :movieOriginalTitle="item.movieOriginalTitle"
              :movieActors="item.movieActors">
            </movies-list>
          </Col>
        </Row>
     </div> 
    </Card>
    </i-col>
    <i-col span="10" offset="1">
    <!--使用card组件-->
      <Card>
        <p class="cardTitle" slot="title">
            <Icon type="edit"></Icon>
            即将上映
        </p>
       <Row >
          <Col span="10"  v-for="item in newsItems"  :key="item.id" >
            <movies-list 
              :id="item.id" 
              :movieName="item.title" 
              :movieTime="item.mainland_pubdate" 
              :movieImage="item.images.small"
              :movieOriginalTitle="item.original_title"
              :movieActors="item.casts">
            </movies-list>
          </Col>
        </Row>
      </Card>
    </i-col>
</Row>
</div>
    <common-footer></common-footer>  <!--  展示引入的footer组件 -->
  </div>
</template>
<script>
import MovieIndexHeader from "../components/MovieIndexHeader";
import CommonFooter from "../components/commonFooter";
import NewsList from "../components/NewsList";
import MoviesList from "../components/MoviesList";
import IndexHeaderPic from "../components/IndexHeaderPic";
import UserMessage from "../components/UserMessage";
export default {
  name: "HelloWorld",
  data() {
    return {
      headerItems: [],
      newsItems: [],
      movieItems: []
    };
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    NewsList,
    MoviesList,
    IndexHeaderPic,
    UserMessage
  },

  //  这里用于获取数据，需要获得主页推荐，主页新闻列表，主页电影列表
  created() {
    //主页推荐
    this.$http.get("http://localhost:3000/showIndex").then(data => {
      this.headerItems = data.body.data;
      console.log(data.body.data);
    });
    //    获取新闻
    this.$http.jsonp("https://api.douban.com/v2/movie/coming_soon?apikey=0df993c66c0c636e29ecbb5344252a4a").then(data => {
      this.newsItems = data.body.subjects;
      console.log(this.newsItems);
    });
    //    获取所有电影
    this.$http.get("http://localhost:3000/showRanking").then(data => {
      this.movieItems = data.body.data;
      console.log(this.movieItems);
    });
  },
  ready() {}
};
</script>

<style lang="css" scoped>
.container {
  width: 100%;
  margin: 0 auto;
}
.contentMain {
  padding-top: 15px;
}
.userMessage {
  margin-top: 0px;
  margin-left: 0px;
}
.contentPic {
  padding-top: 5px;
}

.cont-ul {
  padding-top: 0.5rem;
  background-color: #fff;
}
.cardTitle{
  color: blue;
}
/* .cont-ul::after {
  content: "";
  display: block;
  clear: both;
  width: 0;
  height: 0;
} */
</style>
