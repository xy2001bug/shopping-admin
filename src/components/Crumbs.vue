<template>
  <div class="crumbs_cut"> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item,index) in info" :key="index">
        {{item}}
    </el-breadcrumb-item>
    
  </el-breadcrumb>
  </div>
</template>

<script>
import { watch } from 'fs';
export default {
  data(){
    return{
      info:[]
    }
  },
  watch:{
    $route(){
      this.getRoute()
    }
  },
  methods:{
    getRoute(){
      //获取路由中的mathed，里面的mate可以用来实现面包屑功能
      // console.log(this.$route.matched);
      const arr = this.$route.matched
      //定义一个数组来接受mete
      let temp = []
      arr.forEach(e => {
        temp.push(e.meta)
      });
      // console.log(temp);
      //把这个数据放到data中。用来渲染页面
      this.info = temp
    }
  },
  mounted(){
    this.getRoute()
  }
};
</script>

<style>
.crumbs_cut{
    height: 30px;
    border-bottom: 1px #ddd solid;
   
}
</style>
