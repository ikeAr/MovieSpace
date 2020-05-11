// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import md5 from 'js-md5';

Vue.config.productionTip = false
Vue.use(iView);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
Vue.prototype.weChatUrl="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js";
Vue.prototype.$md5 = md5;