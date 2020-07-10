<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="expand"></el-table-column>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
      <el-table-column prop="address" label="操作" width="290">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUser(scope.row)">编辑</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="clearUser(scope.row.id)"
          >删除</el-button>
          <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-roles @toData="getData"></add-roles>
    <edit-roles @editData="getData"></edit-roles>
  </div>
</template>

<script>
import AddRoles from "./AddRoles";
import EditRoles from "./EditRoles";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: true
    };
  },
  methods: {
    async getData() {
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status != 200) {
        this.$message.error("角色列表获取失败，请稍后再试");
      } else {
        this.tableData = res.data;
      }
    },
    async editUser(rows) {
      this.$bus.$emit("eidtRoles", this.dialogVisible, rows);
    },
    async clearUser(id) {
      const confirmAgin = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => {
        console.log(err);
      });
      if (confirmAgin !== "confirm") {
        this.$message.info("已取消删除");
      } else {
        const { data: res } = await this.$http.delete(`roles/${id}`);
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg);
        } else {
          this.$message.success(res.meta.msg);
          this.getData();
        }
      }
    }
  },
  components: {
    AddRoles,
    EditRoles
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="less" scoped>
</style>