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
      <el-switch v-model="form.delivery"></el-switch>
    </el-form-item>

    <el-form-item label="置顶类型">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="置顶" name="type"></el-checkbox>
        <el-checkbox label="热门" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="内容标题">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="副标题">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <!-- 图片上传 -->
    <el-form-item label="封面图片">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="商品货号">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="库存数量">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="市场价格">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="销售价格">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <!-- 图片相册 -->
    <el-form-item label="图片相册">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </el-form-item>

    <el-form-item label="内容摘要">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>

    <!-- 富文本框 -->
    <el-form-item label="内容描述">
        <quillEditor></quillEditor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
//引入富文本框的相关文件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  data() {
    return {
      form: {
        //需要注意的一点是，v-model绑定的是一个具体的值，不是对象
        category_id: "",

        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      //所属类别的数据
      categories: [],

      //这是图片的路径
      imageUrl: "",
      //这是图片相册的参数
      dialogImageUrl: '',
        dialogVisible: false
    };
  },
  //注册富文本框组件
   components: {
    quillEditor
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    //这是封面图片的方法
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
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
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
