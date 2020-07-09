<template>
  <div>
    <bread-crumb :listName="listName"></bread-crumb>
    <user-card
      :listData="userList"
      :fatotal="total"
      :getData="getData"
      @handleSize="handleSize"
      @handleCurrent="handleCurrent"
      @getListData="getListData"
    ></user-card>
  </div>
</template>

<script>
import BreadCrumb from "cp/common/BreadCrumb";
import UserCard from "./UserCard";
export default {
  data() {
    return {
      listName: ["用户管理", "用户列表"],
      getData: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      userList: [],
      total: 0,
      addForm: {}
    };
  },
  components: {
    BreadCrumb,
    UserCard
  },
  methods: {
    async getListData() {
      const { data: res } = await this.$http.get("users", {
        params: this.getData
      });
      if (res.meta.status != 200) {
        this.$message.error("请求管理员列表失败，请重试");
      } else {
        this.userList = res.data.users;
        this.total = res.data.total;
      }
    },
    handleSize(res) {
      this.getData.pagesize = res;
      this.getListData();
    },
    handleCurrent(res) {
      this.getData.pagenum = res;
      this.getListData();
    }
  },
  created() {
    this.getListData();
  },
  mounted() {
    this.$bus.$emit('getListData',this.getListData);
  }
};
</script>

<style lang="less" scoped>
</style>