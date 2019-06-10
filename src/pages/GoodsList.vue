<template>
  <div>
    <!-- //这是添加/删除/搜索 -->
    <el-row type="flex" justify="space-between">
      <div>
        <el-button type="success" @click="headleToGoodsAdd">添加</el-button>
        <el-button type="danger" @click="headleDelMore">删除</el-button>
      </div>
      <div class="search">
        <el-input placeholder="请输入内容"  class="input-with-select"
        v-model="searchVules">
          <el-button slot="append" icon="el-icon-search" @click="headleSearch"></el-button>
        </el-input>
      </div>
    </el-row>

    <!-- 这是用表格来显示数据部分 -->
    <!-- data来自于return中的tableData
         selection-change 当选项发生变化就是触发这个事件
    -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- 这个是前面的小方块 -->
      <el-table-column type="selection" width="55"></el-table-column>
      <!-- 这个是标题 
            lable:指的是每一列的标题，
            scope.row中存着每一项数据的对象
            prop：可以自动读取每一项数据的prop的属性的值（显示数据的简写方式）
      -->
      <el-table-column label="标题" width="500">
        <template slot-scope="scope">
          <el-row type="flex" align="middle">
            <img :src="scope.row.imgurl">
            <div>{{ scope.row.title }}</div>
          </el-row>
        </template>
      </el-table-column>
      <!-- 这个是类型列 -->
      <el-table-column prop="categoryname" label="类型" width="120"></el-table-column>
      <!-- 价格列 -->
      <el-table-column prop="sell_price" label="价格" show-overflow-tooltip></el-table-column>

      <!-- //这是操作列
      -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- /这个是分页
        size-change :每一页的条数
        current-change:currentPage 改变时会触发 返回的是当前页
        current-page:当前页数
    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 5,
      total:0,
      //这是搜索条件
      searchVules:'',
      //用来存放小方块选中时的对象
      multipleSelection: ""
    };
  },

  methods: {
    //跳转到添加页面
    headleToGoodsAdd(){
      this.$router.push("/admin/goods-add")
    },
    //这个是选中小方块就触发的方法
    handleSelectionChange(val) {
    //   console.log(val);
      this.multipleSelection = val;
    },
    //这是模糊搜索
    headleSearch(){
        this.getList()
    },

    //这是删除多个
    headleDelMore() {
      //获取到选中的id  map方法返回的是一个数组
      const arr = this.multipleSelection.map(e => {
        return e.id;
      });
      //把获取的id转为字符串,通过urli地址栏传递给后台
      const ids = arr.join(",");
    //   console.log(ids);
      //要进行删除操作,通过axios把id传递回去,应该提供接口来处理
      this.delData(ids)
    },

    //这编辑按钮的事件
    handleEdit(index, row) {
      console.log(index, row);
    },

    //这个是删除按钮的事件
    handleDelete(row) {
      //获取点击的id
      const id = row.id;
      //把id传递回去删除
      this.delData(id)

    },

    //这两个是处理分页的事件
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    //切换当前页的显示
    handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    //需要注意一个问题:这个pageIndex是页面交互得到的,要实现数据的渲染,必须要把这个值传递给后台(通过ajax传递),后台才能根据传递过去的值在数据中进行查询,得出结果后渲染在页面
    this.pageIndex = val;
    this.getList()  
    },

    //封装刷新页面的方法
    getList() {
      this.$axios({
        url: `http://localhost:8899/admin/goods/getlist?pageIndex=
        ${this.pageIndex}&pageSize=${this.pageSize}&searchvalue=${this.searchVules}`,
        method: "GET"
      }).then(res => {
          console.log(res);
        this.total = res.data.totalcount
        this.tableData = res.data.message;
      });
    },
    //封装删除的方法
    delData(str){
        this.$axios({
        url: `http://localhost:8899/admin/goods/del/${str}`,
        method: "GET"
      }).then(res => {
        const { status, message } = res.data;
        if (status === 0) {
          this.$message.success(message);
          //如果删除成功应该刷新页面
         this.getList()
        }
        if (status === 1) {
          this.$message.error(message);
        }
      });
    }
  },
  
  mounted() {
      this.getList()
  }
};
</script>

<style>
 .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .input-search{
      width:200px;
  }
  
  .goods-img{
      width:60px;
      height:60px;
      /*表示元素压缩的倍数，如果是0，表示不会被挤压*/
      flex-shrink: 0;
      margin-right:5px;
  }
  /* //设置图片的大小 */
  .el-table img{
    width: 60px;
  }
</style>
