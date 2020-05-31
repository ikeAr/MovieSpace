<template>
  <div class="layout">
    <div>
      <movie-index-header></movie-index-header>
    </div>
    <Layout>
      <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
          <MenuItem name="1-1">
            <Icon type="ios-videocam" />
            <span>电影管理</span>
          </MenuItem>
          <MenuItem name="1-2">
            <Icon type="ios-people" />
            <span>用户管理</span>
          </MenuItem>
          <MenuItem name="1-3">
            <Icon type="ios-pricetags" />
            <span>评论管理</span>
          </MenuItem>
          <MenuItem name="1-4">
            <Icon type="ios-settings"></Icon>
            <span>新闻管理</span>
          </MenuItem>
        </Menu>
        <div slot="trigger"></div>
      </Sider>
      <Layout>
        <Header class="layout-header-bar">管理系统</Header>
        <Content :style="{margin: '20px', background: '#fff', minHeight: '771.4px'}">
          <Table :data="tableData1" :columns="tableColumns1" stripe></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="100" :current="1" @on-change="changePage"></Page>
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
      isCollapsed: false,
      alertShow: false,
      alertMessage: "",
      tableData1: this.mockTableData1(),
      tableColumns1: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Status",
          key: "status",
          render: (h, params) => {
            const row = params.row;
            const color =
              row.status === 1
                ? "primary"
                : row.status === 2
                ? "success"
                : "error";
            const text =
              row.status === 1
                ? "Working"
                : row.status === 2
                ? "Success"
                : "Fail";

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
          title: "Portrayal",
          key: "portrayal",
          render: (h, params) => {
            return h(
              "Poptip",
              {
                props: {
                  trigger: "hover",
                  title: params.row.portrayal.length + "portrayals",
                  placement: "bottom"
                }
              },
              [
                h("Tag", params.row.portrayal.length),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [
                    h(
                      "ul",
                      this.tableData1[params.index].portrayal.map(item => {
                        return h(
                          "li",
                          {
                            style: {
                              textAlign: "center",
                              padding: "4px"
                            }
                          },
                          item
                        );
                      })
                    )
                  ]
                )
              ]
            );
          }
        },
        {
          title: "People",
          key: "people",
          render: (h, params) => {
            return h(
              "Poptip",
              {
                props: {
                  trigger: "hover",
                  title: params.row.people.length + "customers",
                  placement: "bottom"
                }
              },
              [
                h("Tag", params.row.people.length),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [
                    h(
                      "ul",
                      this.tableData1[params.index].people.map(item => {
                        return h(
                          "li",
                          {
                            style: {
                              textAlign: "center",
                              padding: "4px"
                            }
                          },
                          item.n + "：" + item.c + "People"
                        );
                      })
                    )
                  ]
                )
              ]
            );
          }
        },
        {
          title: "Sampling Time",
          key: "time",
          render: (h, params) => {
            return h("div", "Almost" + params.row.time + "days");
          }
        },
        {
          title: "Updated Time",
          key: "update",
          render: (h, params) => {
            return h(
              "div",
              this.formatDate(this.tableData1[params.index].update)
            );
          }
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
                      this.show(params.index);
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
      ]
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
                this.alertMessage = data.body.message;
                this.alertShow = true;
              } else {
                this.alertMessage = data.body.message;
                this.alertShow = true;
              }
            });
        });
    },
    mockTableData1() {
      let data = [];
      for (let i = 0; i < 10; i++) {
        data.push({
          name: "Business" + Math.floor(Math.random() * 100 + 1),
          status: Math.floor(Math.random() * 3 + 1),
          portrayal: ["City", "People", "Cost", "Life", "Entertainment"],
          people: [
            {
              n: "People" + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            },
            {
              n: "People" + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            },
            {
              n: "People" + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            }
          ],
          time: Math.floor(Math.random() * 7 + 1),
          update: new Date()
        });
      }
      return data;
    },
    formatDate(date) {
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    changePage() {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.tableData1 = this.mockTableData1();
    },
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.tableData1[index].name}<br>Age：${this.tableData1[index].age}<br>Address：${this.tableData1[index].address}`
      });
    },
    remove(index) {
      this.tableData1.splice(index, 1);
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