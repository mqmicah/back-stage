<template>
  <el-container>
    <el-header>
      <home-head title="后台管理"></home-head>
    </el-header>
    <el-container>
      <el-aside :width='isColl?"65px":"200px"'>
        <home-aside @rarClick="rarClick"></home-aside>
      </el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeHead from "./HomeHead";
import HomeAside from "./HomeAside";
export default {
  data() {
    return {
      isColl: ""
    };
  },
  components: {
    HomeHead,
    HomeAside
  },
  methods: {
    rarClick(res) {
      this.isColl=res
    }
  }
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #222;
}
.el-aside {
  background-color: #333;
}
.el-main {
  background-color: #eaedf1;
}
.el-container {
  height: 100%;
}
</style>