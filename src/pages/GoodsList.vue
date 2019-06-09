<template>
  <div>
    <!-- //这是添加/删除/搜索 -->
    <el-row type="flex" justify="space-between">
      <div>
        <el-button type="success">添加</el-button>
        <el-button type="danger">删除</el-button>
      </div>
      <div class="search">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
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
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- /这个是分页
    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        // {
        //   id: 103,
        //   title: "骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫",
        //   is_top: 1,
        //   is_hot: 1,
        //   is_slide: 1,
        //   categoryname: "男装",
        //   img_url: "/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
        //   imgurl:
        //     "http://127.0.0.1:8899/upload/imgs/0SvKcU-TU4nI3cU3fBNVsgsp.jpg",
        //   goods_no: "NZ0000000002",
        //   stock_quantity: 200,
        //   market_price: 1000,
        //   sell_price: 800
        // },
         
      ],
        pageIndex :1,
         pageSize :5,
       
    };
  },

  methods: {
      //这个是选中小方块就触发的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //这编辑按钮的事件
    handleEdit(index, row) {
      console.log(index, row);
    },
    //这个是删除按钮的事件
    handleDelete(index, row) {
      console.log(index, row);
    },
    //这两个是处理分页的事件
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },

  
  mounted() {
    this.$axios({
        url:`http://localhost:8899/admin/goods/getlist?pageIndex=1&pageSize=5&searchvalue=`,
        method: "GET"
    }).then(res=>{
        console.log(res);
        this.tableData = res.data.message
    })
  }
};
</script>

<style>
.el-input {
  width: 80px;
}
.input-with-select {
  background-color: #fff;
}
 .goods-img{
      width:60px;
      height:60px;
      /*表示元素压缩的倍数，如果是0，表示不会被挤压*/
      flex-shrink: 0;
      margin-right:5px;
  }
</style>
