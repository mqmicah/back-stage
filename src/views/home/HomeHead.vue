<template>
  <div class="head-style">
    <div class="head-left" @click='goBack'>
      <img src="~as/images/logo.jpg" />
      <h2>{{title}}</h2>
    </div>
    <el-button type="danger" class="head-right" @click="outUser">退出登录</el-button>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      tyle: String,
      default: ""
    }
  },
  methods: {
    outUser() {
      window.sessionStorage.clear();
      this.$router.push("/login");
      this.$message.warning("您已退出登录");
    },
    goBack() {
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="less" scoped>
.head-style {
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .head-left {
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>