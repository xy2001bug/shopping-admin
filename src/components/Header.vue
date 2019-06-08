<template>
    <div>
        <el-row type="flex" justify="space-between"> 
            <div class="arrow" @click="headlClick">
                <i class="el-icon-back"></i>
            </div>
            <div>
                admin 炒鸡管理员 <span>退出</span>
            </div>
        
        </el-row> 
    </div>
</template>

<script>
export default {
methods:{
    headlClick(){
        this.$emit("click")
    }
}


}
</script>

<style>
    .arrow{
        cursor: pointer;
    }
</style>
