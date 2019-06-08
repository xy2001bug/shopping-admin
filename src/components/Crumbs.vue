<template>
  <div class="crumbs_cut"> 
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
  </el-breadcrumb>
  </div>
</template>

<script>
export default {

};
</script>

<style>
.crumbs_cut{
    height: 30px;
    border-bottom: 1px #ddd solid;
}
</style>
