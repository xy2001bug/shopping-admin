<template>
  <div>
    <el-container class="contaiver">
      <el-aside width="auto">
          <Menu :isShow="isShow"></Menu>
      </el-aside>
      <el-container>
        <el-header>
            <Header @click="headerShow"></Header>
        </el-header>
        
        <el-main>
            <Crumbs></Crumbs>
            <div>
              <router-view></router-view>
            </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//这是页眉
import Header from "../components/Header.vue";
//这是面包屑
import Crumbs from "../components/Crumbs.vue"
//这是导航
import Menu from "../components/Mune.vue"
export default {
    data(){
      return{
        isShow:false
      }
    },
    components :{
        Header,
        Crumbs,
        Menu
    },
    methods:{
      headerShow(){
        this.isShow = !this.isShow
      }
    }
};
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

div> .contaiver {
  position: absolute;
  bottom: 0;
  top: 0;
  width: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
