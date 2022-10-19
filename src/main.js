import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入全局样式
import '@/styles/index.less'

// 引入Mock模拟数据
import './api/mock.js'

//引入axios
import axios from 'axios'

Vue.prototype.$http = axios;//把axios挂载到vue上

Vue.config.productionTip = false

//使用element ui
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
