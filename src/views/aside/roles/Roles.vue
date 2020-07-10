<template>
  <div>
    <bread-crumb :listName="['权限管理','角色列表']"></bread-crumb>
    <roles-card></roles-card>
  </div>
</template>

<script>
import BreadCrumb from "cp/common/BreadCrumb";
import RolesCard from './RolesCard'
export default {
    components:{
        BreadCrumb,
        RolesCard
    }
};
</script>

<style lang="less" scoped>
</style>