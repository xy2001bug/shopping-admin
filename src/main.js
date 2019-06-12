import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Login from "./pages/Login.vue"
import Admin from "./pages/Admin.vue"
import GoodsList from "./pages/GoodsList.vue";
import CategoryList from "./pages/CategoryList.vue";
import GoodsAdd from "./pages/GoodsAdd.vue"
import GoodsEdit from "./pages/GoodsEdit.vue"
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
  {path:'/', redirect :"/admin/goods-list",meta:"首页"},
  {path:"/admin",component: Admin,meta:"后台管理",
    children:[
      {path:"goods-list", component:GoodsList,meta:"商品列表"},
      {path:"category-list", component:CategoryList,meta:"分类列表"},
      {path:"goods-add", component:GoodsAdd, meta:"添加商品"},
      {path:"goods-edit/:id",component:GoodsEdit, meta:"编辑商品"}
    ]},
  {path:'/login', component:Login,meta:"登录"}
];
//创建路由
const router = new VueRouter({routes})
//把axios绑定到原型方法
Vue.prototype.$axios = axios

//这是路由守卫，to是要去的地址，from是来源地址，next（）是要成功的地址
router.beforeEach((to,from,next)=>{
  //发送axios来验证是否登录
  axios({
    url: "http://localhost:8899/admin/account/islogin",
    method:'GET',
    // 处理session跨域
    withCredentials: true	
  }).then(res=>{
    const {code} = res.data
    //如果访问的是登录页面
    if(to.path == "/login"){
      console.log(to);
      if(code == "logined"){
        next("/admin/goods-list")
      }else{
        next()
      }

      //如果访问的不是登录页
    }else{
      if(code=="logined"){
        next()
      }else{
        next("/login")
      }
    }
  })
})


new Vue({
  render: h => h(App),
  //挂载路由
  router,
}).$mount('#app')
