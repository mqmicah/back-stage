<template>
  <div>
    <el-card>
         <el-button type="primary" @click="addRoles">添加角色</el-button>
         <roles-tab></roles-tab>
    </el-card>
  </div>
</template>

<script>
import RolesTab from './RolesTab'
export default {
    data() {
      return {
        dialogVisible:true
      }
    },
    components:{
        RolesTab
    },
    methods:{
      addRoles() {
        this.$bus.$emit('addRoles',this.dialogVisible);
      }
    }
};
</script>

<style lang="less" scoped>
</style>