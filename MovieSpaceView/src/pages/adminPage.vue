<template>
  <div class="layout">
    <div>
      <movie-index-header></movie-index-header>
    </div>
    <Layout>
      <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
          <MenuItem name="1-1" @click.native="ManageMovie()">
            <Icon type="ios-videocam" />
            <span>电影管理</span>
          </MenuItem>
          <MenuItem name="1-2" @click.native="ManageUser()">
            <Icon type="ios-people" />
            <span>用户管理</span>
          </MenuItem>
          <MenuItem name="1-3" @click.native="ManageComment()">
            <Icon type="ios-pricetags" />
            <span>评论管理</span>
          </MenuItem>
        </Menu>
        <div slot="trigger"></div>
      </Sider>
      <Layout>
        <Header class="layout-header-bar">管理系统</Header>
        <Content :style="{margin: '20px', background: '#fff', minHeight: '771.4px'}">
          <Table :data="tableData" :columns="tableColumns" stripe></Table>
          <div style="margin: 10px;overflow: hidden">
            <div v-show="showMovieTable" style="float: right;">
              <Page
                :total="movieTotalNumber"
                :current="pageIndex"
                :page-size="pageNum"
                show-elevator
                @on-change="changePage"
              ></Page>
            </div>
            <div v-show="showUserTable" style="float: right;">
              <Page
                :total="userTotalNumber"
                :current="pageIndex"
                :page-size="pageNum"
                show-elevator
                @on-change="changePage"
              ></Page>
            </div>
            <div v-show="showCommentTable" style="float: right;">
              <Page
                :total="commentTotalNumber"
                :current="pageIndex"
                :page-size="pageNum"
                show-elevator
                @on-change="changePage"
              ></Page>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
    <Modal title="提示语" v-model="alertShow" class-name="vertical-center-modal">
      <p>{{alertMessage}}</p>
    </Modal>
  </div>
</template>
<script>
import MovieIndexHeader from "../components/MovieIndexHeader";
export default {
  data() {
    return {
      totalItem: [],
      isCollapsed: false,
      alertShow: false,
      alertMessage: "",
      tableData: [],
      tableColumns: [],
      users: [],
      movies: [],
      comments: [],
      pageIndex: 1,
      pageNum: 10,
      movieTotalNumber: 0,
      userTotalNumber: 0,
      commentTotalNumber: 0,
      showMovieTable: false,
      showUserTable: false,
      showCommentTable: false
    };
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  components: {
    MovieIndexHeader
  },
  methods: {
    getMoviesFromServer: function(event) {
      let acquiredMovie = [];
      this.$http
        .jsonp(
          "http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=100"
        )
        .then(data => {
          for (let item of data.body.subjects) {
            let movie = {
              movieName: item.title,
              movieImg: item.images.small,
              movieVideo: item.images.large,
              movieDownload: item.alt,
              movieTime: item.pubdates,
              genres: item.genres,
              movieDirectors: item.directors,
              movieActors: item.casts,
              movie_id: item.id,
              movieOriginalTitle: item.original_title,
              rate: item.average
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
                this.alertMessage = data.body.message;
                this.alertShow = true;
              } else {
                this.alertMessage = data.body.message;
                this.alertShow = true;
              }
            });
        });
    },
    ManageUser: async function() {
      this.showCommentTable = false;
      this.showMovieTable = false;
      this.showUserTable = true;
      this.tableColumns = [
        {
          title: "用户名",
          key: "name"
        },
        {
          title: "用户状态",
          key: "status",
          render: (h, params) => {
            const row = params.row;
            const color = row.status ? "primary" : "error";
            const text = row.status ? "正常" : "封停";
            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: "年龄",
          key: "age"
        },
        {
          title: "角色",
          key: "role"
        },
        {
          title: "联系方式",
          key: "telephone"
        },
        {
          title: "邮箱",
          key: "mail"
        },
        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.showUser(params.index);
                    }
                  }
                },
                "View"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "Delete"
              )
            ]);
          }
        }
      ];
      let sendData = {
        user_id: sessionStorage.getItem("_id")
      };
      if (!this.tableData.length) {
        await this.$http
          .post("http://localhost:3000/alluser", sendData)
          .then(data => {
            if (data.body.status === 0) {
              data.body.data.forEach(user => {
                this.users.push({
                  name: user.username,
                  status: !user.userStop,
                  age: user.age,
                  role: user.userAdmin ? "管理员" : "用户",
                  telephone: user.userPhone,
                  mail: user.userMail
                });
              });
              this.totalItem = this.users;
              this.userTotalNumber = this.users.length;
            }
          });
      }
      let start = (this.pageIndex - 1) * this.pageNum;
      let end = this.pageIndex * this.pageNum;
      this.tableData = this.users.slice(start, end);
    },
    ManageMovie: async function() {
      this.showCommentTable = false;
      this.showUserTable = false;
      this.showMovieTable = true;
      this.tableColumns = [
        {
          title: "电影名称",
          key: "movieName"
        },
        {
          title: "电影原名",
          key: "movieOriginalTitle"
        },
        {
          title: "上映时间",
          key: "movieTime"
        },
        {
          title: "电影分类",
          key: "genres"
        },
        {
          title: "电影导演",
          key: "movieDirectors"
        },
        {
          title: "点赞数",
          key: "movieNumSuppose"
        },
        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.showMovie(params.index);
                    }
                  }
                },
                "View"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "Delete"
              )
            ]);
          }
        }
      ];
      if (!this.tableData.length) {
        await this.$http.get("http://localhost:3000/movie/list").then(data => {
          if (data.body.status === 0) {
            data.body.data.forEach(movie => {
              this.movies.push({
                movieName: movie.movieName,
                movieOriginalTitle: movie.movieOriginalTitle,
                genres: movie.genres[0],
                movieDirectors: movie.movieDirectors[0].name,
                movieTime: movie.movieTime[0],
                movieNumSuppose: movie.movieNumSuppose
              });
            });
            this.totalItem = this.movies;
            this.movieTotalNumber = this.movies.length;
          }
        });
      }
      let start = (this.pageIndex - 1) * this.pageNum;
      let end = this.pageIndex * this.pageNum;
      this.tableData = this.movies.slice(start, end);
    },
    ManageComment() {
      this.showCommentTable = true;
      this.showUserTable = false;
      this.showMovieTable = false;
      this.tableColumns = [
        {
          title: "电影名字",
          key: "moviename"
        },
        {
          title: "评论内容",
          key: "content"
        },
        {
          title: "评论状态",
          key: "check",
          render: (h, params) => {
            const row = params.row;
            const color = row.check ? "primary" : "error";
            const text = row.check ? "通过" : "封停";
            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: color
                }
              },
              text
            );
          }
        },

        {
          title: "用户名",
          key: "username"
        },
        {
          title: "电影评分",
          key: "movieGrade"
        },
        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.showComment(params.index);
                    }
                  }
                },
                "View"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "Delete"
              )
            ]);
          }
        }
      ];
      if (!this.tableData.length) {
        this.$http
          .post("http://localhost:3000/movie/allComment", {
            id: sessionStorage.getItem("_id")
          })
          .then(data => {
            console.log(data.body.data);
            if (data.body.status === 0) {
              data.body.data.forEach(comment => {
                this.comments.push({
                  moviename: comment.moviename,
                  username: comment.username,
                  content: comment.context,
                  check: comment.check,
                  movieGrade: comment.movieGrade
                });
              });
              this.totalItem = this.comments;
              this.commentTotalNumber = this.comments.length;
            }
          });
      }
      let start = (this.pageIndex - 1) * this.pageNum;
      let end = this.pageIndex * this.pageNum;
      this.tableData = this.comments.slice(start, end);
    },
    showUser(index) {
      this.$Modal.info({
        title: "User Info",
        content: `${this.tableColumns[0].title}：${this.tableData[index].name}<br><br>${this.tableColumns[2].title}：${this.tableData[index].age}<br><br>${this.tableColumns[3].title}：${this.tableData[index].role}<br><br>${this.tableColumns[4].title}：${this.tableData[index].telephone}<br><br>${this.tableColumns[5].title}：${this.tableData[index].mail}`
      });
    },
    showMovie(index){
      this.$Modal.info({
        title: "Movie Info",
        content: `${this.tableColumns[0].title}：${this.tableData[index].movieName}<br><br>${this.tableColumns[1].title}：${this.tableData[index].movieOriginalTitle}<br><br>${this.tableColumns[2].title}：${this.tableData[index].movieTime}<br><br>${this.tableColumns[3].title}：${this.tableData[index].genres}<br><br>${this.tableColumns[4].title}：${this.tableData[index].movieDirectors}<br><br>${this.tableColumns[5].title}：${this.tableData[index].movieNumSuppose}`
      });
    },
    showComment(index){
      this.$Modal.info({
        title: "Movie Info",
        content: `${this.tableColumns[0].title}：${this.tableData[index].moviename}<br><br>${this.tableColumns[1].title}：${this.tableData[index].content}<br><br>${this.tableColumns[2].title}：${this.tableData[index].check}<br><br>${this.tableColumns[3].title}：${this.tableData[index].username}<br><br>${this.tableColumns[4].title}：${this.tableData[index].movieDirectors}`
      });
    },
    remove(index) {
      this.tableData.splice(index, 1);
    },
    changePage(value) {
      this.pageIndex = value;
      let start = (value - 1) * this.pageNum;
      let end = value * this.pageNum;
      this.tableData = this.totalItem.slice(start, end);
    }
  }
};
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>