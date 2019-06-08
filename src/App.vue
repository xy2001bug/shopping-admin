<template>
<div>
  index
   <el-button type="primary">主要按钮</el-button>
   <router-view></router-view>
</div>
</template>

<script>
//测试axios
//1.引入
import axios from "axios";


export default {
  mounted(){
    // this.$axios({
    //   url: "https://api.github.com/users",
    //   method: "GET",
    // }).then(res => {
    //   console.log(res)
    // })
    
}
}
</script>

<style>

</style>
