<template>
<div class="login_from">
    <el-form ref="form" :model="form" label-width="80px" class="from" >
    <el-form-item label="账号" prop="username" ref="usern">
      <el-input v-model="form.username" ref="usern"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" >
      <el-input type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</div>
  
</template>

<script>
export default {
  data() {
    return {
        //那到from表单中输入的数据（同步）
      form: {
        username: "",
        password: ""
      },
      //表单验证：数据从表单同步过来之后，js中要对同步来的数据先进行验证，（不能为空）
      //required 这个是必填的属性。trigger 触发的方式，blur是失去焦点
      rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
    };
  },

  methods: {
    onSubmit() {
    //   console.log("submit!");
    //1.先获取提交过来的数据
    const data = {
          uname: this.form.username,
          upwd: this.form.password
        }
    //2.validate()方法，对整个表单进行校验，参数数回调函数，里面有两个参数，1是否成功过（true或false）2是未通过的字段
    //所以可以用来判断表单是否通过验证
    this.$refs.form.validate((valid)=>{//第一个参数是是否成功，是一个布尔值
        if (valid) {
                console.log(123);
            // 调用axios
            this.$axios({
              // 请求的地址
              url: "http://localhost:8899/admin/account/login",
              // 请求方式
              method: "POST",
              // 数据
              data,
              // 处理session跨域
              withCredentials: true
            }).then(res => {
                console.log(1231);
              // 解构并且赋值
              const {message, status} = res.data;

              // 登录成功
              if(status === 0){
                this.$router.push("/");
              }
              
              // 登录失败
              if(status === 1){
                this.$message.error(message);
              }
            })
          }
    })
    }
  }
};
</script>

<style scoped>
.login_from{
    width: 100%;
    bottom: 0;
    top: 0;
    background-color: #ddd;
    position: absolute;
}
.from{
    width: 500px;
    top: 50%;
    left: 50%;
    position: absolute;
    margin-top: -90px;
    margin-left: -250px;
}
</style>
