import Vue from 'vue'
import App from './App.vue'
// 是否打印生产 信息 默认为true
Vue.config.productionTip = false

// 导入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入路由
import router from './lib/router'

// 导入http
import http from './lib/http'
Vue.use(http)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
