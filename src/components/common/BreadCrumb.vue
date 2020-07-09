<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :key='index' v-for="(val,index) in listName">{{val}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    props:{
        listName:{
            type:Array,
            default() {
                return []
            }
        }
    }
};
</script>

<style lang="less" scoped>
</style>