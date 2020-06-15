<template lang="html">
  <div class="container">
    <div>
      <movie-index-header ></movie-index-header>   
    </div>
    <div class="movieWrap">
      <div class="movieContent">
        <div class="movieDtail">
          <h1>{{detail.movieName}}</h1>
          <img class="headerImg" :src="detail.movieImg" width="70%" height="70%">
        </div>
        <div class="movieDetail movie-des">
          原名：{{detail.movieOriginalTitle}}<br/>
          导演：{{detail.movieDirectors[0].name}}<br/>
          主演：{{detail.movieActors[0].name+" "+detail.movieActors[1].name}}<br/>
          类型：{{detail.genres[0]+" "+detail.genres[1]}}<br/>
          上映日期：{{detail.movieTime[0]+" "+detail.movieTime[1]}}<br/>
          <span>
            <Icon type="ios-star" color="orange" v-for="n in 4" :key="n"></Icon>
            <Icon type="ios-star" color="orange" v-if="detail.rate >= 9.5"></Icon>
            <Icon type="ios-star-half" color="orange" v-else></Icon>
             {{ detail.rate }}
           </span>
           <div @click="support()">
            <Icon type="ios-star" color="gold">点赞</Icon>
            {{detail["movieNumSuppose"]+" "}}赞
           </div>
        </div>
     </div>
     <div class="movieInfo">
        <p class="desTitle" >
          {{detail.movieName+"剧情简介"}}
        </p>
        <p>{{content}}</p>
     </div>
     <div class="movieInfo">
       <p class="desTitle">
          {{detail.movieName+"的演员们"}}
       </p>
        <div class="movieInfo_actors">
          <div v-for="actor in actors" style="margin:10px">
            <a :href="actor.alt" >
            <img :src="actor.avatars.small">
            <div style="text-align:center">
              <p>{{actor.name}}</p>
            </div> 
            </a>  
          </div>
        </div>
     </div>
     <Divider/>
      <div v-show="showRecommended" class="movieInfo">
        <p class="desTitle">
          看过这个电影的其他人还看了：
       </p>
       <div>
           <Row >
          <Col span="4"  v-for="item in recommendedMovies" :key="item._id">
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
      </div>
     <Divider/>
      <div class="movieInfo">
         <span class="desTitle">
          {{detail.movieName+"的影视短评"}}
        </span>
        <span class="commentButton" style="float:right">
          <Button type="primary" color="orange" @click="commentCard=true">
            <Icon type="ios-book-outline" color="orange" size="30"/>
          </Button>
        </span>
        <Divider/>
        <div v-show="commentCard" class="movieComment">
          <Card style="width:100%">
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              写影评
            </p>
            <div class=“commentInput”>
             <p> 给个评价吧</p>
              <div style="margin-left:10px">
                <Poptip trigger="focus">
                  <Input v-model="movieGrade" prefix="logo-usd" placeholder="Enter number" style="width:100%" />
                  <div slot="content">请输入一个 0-10 以内的数</div>
                </Poptip>
             </div>
            </div>
              <Icon type="ios-loop-strong"></Icon>
            <div>
               <Input v-model="movieCommentContent" show-word-limit type="textarea" placeholder="Enter something..." style="width: 100%" />
            </div>
            <div class="commentFooter">
              <Row :gutter="20">
                <Col  :span="12">
                  <Button class="commentButton" type="primary" @click="submitComment()">
                   提交评论
                </Button>
                </Col> 
                  <Button class="commentButton" type="ghost" @click="cancelComment()">
                   取消
                </Button>
              </Row>
            </div>
          </Card>
        </div>
           <Divider/>
        <List>
          <ListItem v-for="(commentItem,index) in comments" :key="index">
            <ListItemMeta :title="commentItem.username + commentTitle+' 打了 '+ commentItem.movieGrade+' 分'" :description="commentItem.context" />
          </ListItem>
        </List>
     </div>
    </div>
    <Modal title="提示语" v-model="alertShow" class-name="vertical-center-modal">
      <p>{{alertMessage}}</p>
    </Modal>
  </div>
</template>
<script>
import MovieIndexHeader from "../components/MovieIndexHeader";
import CommonFooter from "../components/commonFooter";
import Comment from "../components/Comment.vue";
import MoviesList from "../components/MoviesList";
let movie_id = 0;
export default {
  name: "MovieDetail",
  data() {
    return {
      detail: [],
      alertShow: false,
      alertMessage: "",
      movie_id: "",
      content: "",
      actors: [],
      commentCard: false,
      movieCommentContent: "",
      movieGrade: "",
      movieCheck: true,
      comments: [],
      commentTitle: "看过",
      recommendedMovies: [],
      recommendedUsers: [],
      recommendedMoviesId: [],
      showRecommended: false
    };
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    Comment,
    MoviesList
  },

  created() {
    this.movie_id = this.$route.query.id;
    movie_id = this.$route.query.id;
    this.$http
      .post("http://localhost:3000/movie/detail", { id: movie_id })
      .then(data => {
        this.detail = data.body.data;
        this.$http
          .jsonp(
            `https://api.douban.com/v2/movie/subject/${this.detail.movie_id}?apikey=0df993c66c0c636e29ecbb5344252a4a`
          )
          .then(data => {
            this.content = data.body.summary;
            this.actors = data.body.casts;
          });
      });
    this.$http
      .post("http://localhost:3000/movie/comment", { id: movie_id })
      .then(comments => {
        if (comments.body.status === 0) {
          this.comments = comments.body.data;
        }
      });
    // this.recommendedMovies.push(
    //   // JSON.parse(localStorage.getItem("recommendedMovies"))
    // );
  },
  methods: {
    support: function(event) {
      this.$http
        .post("http://localhost:3000/movie/support", { id: movie_id })
        .then(data1 => {
          let data_temp = data1.body;
          let that = this;
          console.log(data_temp);
          if (data_temp.status === 0) {
            this.$http
              .post("http://localhost:3000/movie/showNumber", { id: movie_id })
              .then(data2 => {
                that.detail["movieNumSuppose"] =
                  data2.body.data.movieNumSuppose;
              });
          } else {
            this.alertMessage = data_temp.message;
            this.alertShow = true;
          }
        });
    },
    movieDownload: function(event) {
      this.$http
        .post("http://localhost:3000/movie/download", { movie_id: movie_id })
        .then(data1 => {
          if (data1.status == 1) {
            this.alertMessage = data1.message;
            this.alertShow = true;
          } else {
            window.location = data1.data;
          }
        });
    },
    submitComment() {
      if (!this.movieGrade) {
        this.alertMessage = "请为电影打分";
        this.alertShow = true;
      } else if (!this.movieCommentContent) {
        this.alertMessage = "请输入评论内容";
        this.alertShow = true;
      } else {
        let sendData = {
          movie_id: this.movie_id,
          moviename: this.detail.movieName,
          username: sessionStorage.getItem("username"),
          movieGrade: this.movieGrade,
          check: this.movieCheck,
          context: this.movieCommentContent
        };
        this.$http
          .post("http://localhost:3000/movie/comment", { id: movie_id })
          .then(comments => {
            if (comments.body.status === 0) {
              this.comments = comments.body.data;
              this.comments.forEach(commentItem => {
                if (
                  commentItem.movieGrade === this.movieGrade &&
                  commentItem.username !== sessionStorage.getItem("username")
                ) {
                  if (!this.recommendedUsers.includes(commentItem.username)) {
                    this.recommendedUsers.push(commentItem.username);
                  }
                }
              });
              this.recommendedUsers.forEach(recommendedUser => {
                this.$http
                  .post("http://localhost:3000/movie/getMovieComment", {
                    username: recommendedUser
                  })
                  .then(allComments => {
                    if (allComments.body.status === 0) {
                      allComments.body.data.forEach(singleComment => {
                        if (
                          singleComment.movieGrade > 8.0 &&
                          singleComment.movie_id !== this.movie_id &&
                          !this.recommendedMoviesId.includes(
                            singleComment.movie_id
                          )
                        ) {
                          this.recommendedMoviesId.push(singleComment.movie_id);
                        }
                      });
                    }
                    this.recommendedMoviesId.forEach(recommendedMovieId => {
                      this.$http
                        .post("http://localhost:3000/movie/detail", {
                          id: recommendedMovieId
                        })
                        .then(getMovieDetail => {
                          if (getMovieDetail.body.status === 0) {
                            this.recommendedMovies.push(
                              getMovieDetail.body.data
                            );
                          }
                        });
                    });
                  });
              });
            }
          });
        this.$http.post("http://localhost:3000/users/postComment", sendData);
        this.commentCard = false;
        this.showRecommended = true;
        // this.$router.go(0);
      }
    },
    cancelComment() {
      this.commentCard = false;
    }
  }
};
</script>

<style lang="css" scoped>
.movieWrap {
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 3%;
}
.movieInfo_actors {
  display: flex;
  margin: 10px;
}
.movieContent {
  display: flex;
  align-items: flex-start;
}
.movieContent .movie-des {
  text-align: left;
  margin-top: 40px;
  margin-left: 20px;
}
.movieInfo {
  margin-top: 30px;
  text-align: left;
}
.movieInfo .desTitle {
  font-size: 18px;
  margin-top: 8px;
  margin-bottom: 8px;
  color: blue;
}
img {
  width: 100%;
  height: 20vw;
}
.commentInput {
  display: flex;
}
.commentButton {
  margin-top: 20px;
}
.movieComment {
  margin-top: 20px;
  align-items: center;
}
.contentMain {
  padding-top: 150px;
  width: 30%;
}
.commentFooter {
  margin-left: 800px;
}
</style>
