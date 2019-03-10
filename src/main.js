import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

// 导入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入路由
import router from './lib/router'

new Vue({
  router,
  render: h => h(App),
  
}).$mount('#app')
