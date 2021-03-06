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
import NoAuth from '../pages/common/401.vue'
import Admin from '../pages/adminPage.vue'
// import Home from '../pages/index'
Vue.use(Router)
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
const routes = [{
    path: '/',
    component: resolve => require(['../pages/index'], resolve),
    meta: {
      title: 'home',
      roles: ['User']
    }
  },
  {
    path: '/movieDetail',
    component: MovieDetail,
    meta: {
      title: 'movieDetail',
      roles: ['User']
    }
  },
  {
    path: '/newDetail',
    component: NewDetail,
    meta: {
      title: 'newDetail',
      roles: ['User']
    }
  },
  {
    path: '/movieList',
    name: 'movieList',
    component: MovieList,
    meta: {
      title: 'movieList',
      roles: ['User']
    }
  },
  {
    path: '/loginPage',
    name: 'loginPage',
    component: LoginPage,
    meta: {
      title: 'Login',
      roles: ['User', 'Admin']
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
      roles: ['User']
    }
  },
  {
    path: '/findPassword',
    component: FindPasswordPage,
    meta: {
      title: 'findPassword',
      roles: ['User']
    }
  },
  {
    path: '/sendEmail',
    component: SendEmail,
    meta: {
      title: 'sendEmail',
      roles: ['User']
    }
  },
  {
    path: '/userManage',
    component: UserManage,
    meta: {
      title: 'userManage',
      roles: ['Admin']
    }
  },
  {
    path: '/newsManage',
    component: NewsManage,
    meta: {
      title: 'newsManage',
      roles: ['Admin']
    }
  },
  {
    path: '/movieManage',
    component: MovieManage,
    meta: {
      title: 'movieManage',
      roles: ['Admin']
    }
  },
  {
    path: '/401',
    component: NoAuth,
    meta: {
      title: '401',
      roles: ['Admin', 'User']
    }
  }, {
    path: '/admin',
    name: "admin",
    component: Admin,
    meta: {
      title: 'adminPage',
      roles: ['Admin', 'User']
    }
  }
]
const router = new Router({
  mode: "history",
  routes
})
router.beforeEach((to, from, next) => {
  // console.log(to.path==="/loginPage")
  const outerPaths = ["/", "/loginPage", "/register", "/findPassword"];
  if (sessionStorage.getItem("token") || outerPaths.includes(to.path)) {
    next();
  } else {
    next({
      replace: true,
      name: "loginPage"
    })
  }
})
export default router;
