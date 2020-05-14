import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import MovieDetail from '../pages/movieDetail.vue'
import NewDetail from '../pages/newDetail.vue'
import MovieList from '../pages/moviesList.vue'
import LoginPage from '../pages/loginPage.vue'
import UserInfo from '../pages/userInfo.vue'
import RegisterPage from '../pages/registerPage.vue'
import FindPasswordPage from '../pages/findPasswordPage.vue'
import SendEmail from '../pages/sendEmail.vue'
import MovieManage from '../pages/movieManage.vue'
import UserManage from '../pages/userManage.vue'
import NewsManage from '../pages/newsManage.vue'
// import Home from '../pages/index'
Vue.use(Router)
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
const routes = [{
    path: '/',
    component: resolve => require(['../pages/index'], resolve),
    meta: {
      title: 'home',
      role:['User']
    }
  },
  {
    path: '/movieDetail',
    component: MovieDetail,
    meta: {
      title: 'movieDetail',
      role:['User']
    }
  },
  {
    path: '/newDetail',
    component: NewDetail,
    meta: {
      title: 'newDetail',
      role:['User']
    }
  },
  {
    path: '/movieList',
    component: MovieList,
    meta: {
      title: 'movieList',
      role:['User']
    }
  },
  {
    path: '/loginPage',
    component: LoginPage,
    meta: {
      title: 'Login',
      role:['User','Admin']
    }
  },
  {
    path: '/userInfo',
    component: UserInfo
  },
  {
    path: '/register',
    component: RegisterPage,
    meta: {
      title: 'register',
      role:['User']
    }
  },
  {
    path: '/findPassword',
    component: FindPasswordPage,
    meta: {
      title: 'findPassword',
      role:['User']
    }
  },
  {
    path: '/sendEmail',
    component: SendEmail,
    meta: {
      title: 'sendEmail',
      role:['User']
    }
  },
  {
    path: '/userManage',
    component: UserManage,
    meta: {
      title: 'userManage',
      role:['Admin']
    }
  },
  {
    path:'/newsManage',
    component:NewsManage,
    meta: {
      title: 'newsManage',
      role:['Admin']
    }
  },
  {
    path:'/movieManage',
    component:MovieManage,
    meta: {
      title: 'movieManage',
      role:['Admin']
    }
  },
]
const router = new Router({
  mode: "history",
  routes
})
outer.beforeEach((to, from, next) => {
  if (sessionStorage.getItem(token)) {
   if (to.path === '/login') {
    next({ path: '/' })
   } else {
    if (sessionStorage.getItem(_id)) {
      this.$http.post("http://localhost:3000/showUser",{user_id:sessionStorage.getItem(_id)}).then(($findUser)=>{
        if($findUser.isUserAdmin){

        }
      })
     store.dispatch('GetInfo').then(res => { // 获取user_info
      const roles = res.data.role
      store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
       router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
       next({ ...to }) // 放行路由
      })
     }).catch(() => {
      store.dispatch('FedLogOut').then(() => {
       next({ path: '/login' })
      })
     })
    } else {
     next() // 放行该路由
    }
   }
  } else {
   if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单里的路径，继续让其访问
    next()
   } else { // 其他不在白名单里的路径全部让其重定向到登录页面！
    next('/login')
    alert('not in white list, now go to the login page')
   }
  }
 })
export default router
