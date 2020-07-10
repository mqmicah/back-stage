<template>
  <div>
    <bread-crumb :listName="['权限管理','权限列表']"></bread-crumb>
    <power-card></power-card>
  </div>
</template>

<script>
import BreadCrumb from "cp/common/BreadCrumb";
import PowerCard from "./PowerCard";
export default {
  components: {
    BreadCrumb,
    PowerCard
  }
};
</script>

<style lang="less" scoped>
</style>