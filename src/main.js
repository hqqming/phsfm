import Vue from 'vue'
import App from './App.vue'
// 导入 vue-router
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./style/base.css"

Vue.use(ElementUI);
Vue.config.productionTip = false
// window.console.log(process.env.VUE_APP_BASEURL)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
