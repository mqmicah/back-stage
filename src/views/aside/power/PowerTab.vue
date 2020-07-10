<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column type="index" label="#"></el-table-column>
    <el-table-column prop="authName" label="权限名称"></el-table-column>
    <el-table-column prop="path" label="路径"></el-table-column>
    <el-table-column prop="level" label="权限等级">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.level==0">一级</el-tag>
        <el-tag type="warning" v-else-if="scope.row.level==1">二级</el-tag>
        <el-tag type="danger" v-else>三级</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    async getData() {
      const { data: res } = await this.$http.get(`rights/list`);
      if (res.meta.status !== 200) {
        this.$message.error("权限列表获取失败，请稍后再试");
      } else {
        this.tableData = res.data;
      }
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="less" scoped>
</style>