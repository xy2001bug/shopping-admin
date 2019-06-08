import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Login from "./pages/Login.vue"
//引入路由包1
import VueRouter from 'vue-router'

Vue.config.productionTip = false
//1引入elememt-ui组件
import ElementUI from "element-ui"
//2.引入样式
import "element-ui/lib/theme-chalk/index.css"
//3.注册组件
Vue.use(ElementUI);
//注册路由
Vue.use(VueRouter);
//配置路由
const routes = [
  {path:'/', component:Login}
];
//创建路由
const router = new VueRouter({routes})
//把axios绑定到原型方法
Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
  //挂载路由
  router,
}).$mount('#app')
