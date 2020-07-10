<template>
  <div>
    <el-dialog title="添加角色" :visible.sync="dialogVisible" width="50%" @close='clearData'>
      <el-form ref="rolesform" :model="addInfo" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addInfo.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addInfo.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false;">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      addInfo: {},
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async determine() {
      const { data: res } = await this.$http.post("roles", this.addInfo);
      if (res.meta.status !== 201) {
        this.$message.error(res.meta.msg);
        return;
      }
      this.$message.success(res.meta.msg);
      this.$emit('toData')
      this.dialogVisible = false;
    },
    clearData() {
      this.$refs.rolesform.resetFields();
    }
  },
  created() {
    this.$bus.$on("addRoles", val => (this.dialogVisible = val));
  }
};
</script>

<style lang="less" scoped>
</style>