<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="所属类型">
      <el-select v-model="form.category_id" placeholder="请选择活动区域">
        <el-option
          v-for="(item,index) in categories"
          :key="index"
          :label="item.title"
          :value="item.category_id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="是否发布">
      <el-switch v-model="form.status"></el-switch>
    </el-form-item>

    <el-form-item label="置顶类型">
      <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
      <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
    </el-form-item>

    <el-form-item label="内容标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <el-form-item label="副标题">
      <el-input v-model="form.sub_title"></el-input>
    </el-form-item>

    <!-- 图片上传 --> <!-- 
        action：这个是图片的存放地址 
        show-file-list：是否支持多选
        handleAvatarSuccess：上传成功执行
        beforeAvatarUpload：上传之前执行-->
    <el-form-item label="封面图片">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8899/admin/article/uploadimg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="商品货号">
      <el-input v-model="form.goods_no"></el-input>
    </el-form-item>

    <el-form-item label="库存数量">
      <el-input v-model="form.stock_quantity"></el-input>
    </el-form-item>

    <el-form-item label="市场价格">
      <el-input v-model="form.market_price"></el-input>
    </el-form-item>

    <el-form-item label="销售价格">
      <el-input v-model="form.sell_price"></el-input>
    </el-form-item>
    <!-- 图片相册 -->
  <el-form-item label="图片相册">
        <!-- list-type: 声明当前图片相册的方式显示 -->
        <!-- on-preview：预览的事件处理函数 -->
        <!-- on-remove：删除图片时候触发的事件 -->
        <el-upload
            action="http://localhost:8899/admin/article/uploadimg"
            list-type="picture-card"
            :on-success="handleCartSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>

        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </el-form-item>

    <el-form-item label="内容摘要">
      <el-input type="textarea" v-model="form.zhaiyao"></el-input>
    </el-form-item>

    <!-- 富文本框 -->
    <el-form-item label="内容描述">
      <quillEditor v-model="form.content"></quillEditor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
//引入富文本框的相关文件
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      form: {
        //需要注意的一点是，v-model绑定的是一个具体的值，不是对象
        category_id: "",
        status: false,
        is_hot: false,
        is_top: false,
        title: "",
        sub_title: "",
        goods_no: "",
        stock_quantity: "",
        market_price: "",
        sell_price: "",
        zhaiyao: "",
        content: "",
        imgList: [], //这是封面图片
        fileList: [], //这是多张图片

        is_slide: false //是否轮播"
      },
      //所属类别的数据
      categories: [],

      //这是图片的路径
      imageUrl: "",
      //这是图片相册的参数
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  //注册富文本框组件
  components: {
    quillEditor
  },
  methods: {
    
    //这是封面图片的方法
    handleAvatarSuccess(res, file) {
        //这个是图片的存放地址
      this.imageUrl = URL.createObjectURL(file.raw);
    //   console.log(this.imageUrl);
    //res中存放的是图片上传成功后的信息，有图片的名字，路径等信息，把它存在imgList中
    // console.log(res);
    this.form.imgList = [res]

    },
    //上传之前判断图片的大小，太大不给上传
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //这是图片相册的方法
    //删除预览中的文件
    handleRemove(file, fileList) {
      const files = fileList.map( v=>{
        return v.response
      })
      this.form.fileList = files
    },
    //选中预览中的图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
     handleCartSuccess(res, file, fileList){
            // 把fileList的数组中的每一项中response属性提取出来
            const files = fileList.map(v => {
                return v.response;
            });

            //console.log(files)
            this.form.fileList = files;
        },
    //按键的提交
    onSubmit() {
      this.$axios({
          url:"http://localhost:8899/admin/goods/add/goods",
          method:"POST",
        data:this.form,
        //处理session跨域的问题
        withCredentials: true
      }).then(res=>{
        const {status,message} = res.data
        if(status === 0){
            this.$message.success(message)
            this.$router.push('/')
        }
        if(status ===1){
            this.$message.error(message)
        }
      })
    },
  },
  mounted() {
    //发送请求，获取数据
    this.$axios({
      url: "http://localhost:8899/admin/category/getlist/goods",
      method: "GET"
    }).then(res => {
      //   console.log(res);
      this.categories = res.data.message;
    });
  }
};
</script>

<style>
/* 这是图片的style */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
