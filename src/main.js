import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

// 引入全局css
import './assets/global.css'
Vue.use(ElementUI)
Vue.use(VueAxios, axios)

// 设置接口的基地址
Vue.axios.defaults.baseURL = 'http://127.0.0.1:11333/api/private/v1'

// 添加一个请求拦截器
Vue.axios.interceptors.request.use(function (config) {
  config.headers = { Authorization: sessionStorage.getItem('token') }
  return config
})

Vue.config.productionTip = false
// aaaaaaa
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
