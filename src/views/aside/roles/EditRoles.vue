<template>
  <div>
    <el-dialog title="编辑角色" :visible.sync="dialogVisible" width="50%">
      <el-form ref="rolesform" :model="editInfo" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editInfo.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editInfo.roleDesc"></el-input>
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
      editInfo: {
        id:'',
        roleName:'',
        roleDesc:''
      },
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
      this.dialogVisible = false;      
      const {data:res} = await this.$http.put(`roles/${this.editInfo.id}`,{
          roleName:this.editInfo.roleName
      })
      if(res.meta.status!==200) {
          this.$message.error(res.meta.msg)
      }
      else {
          this.$message.success(res.meta.msg)
          this.$emit('editData');
      }
    }
  },
  created() {
    this.$bus.$on("eidtRoles", (val, rows) => {
      this.dialogVisible = val;
      this.editInfo.id=rows.id
      this.editInfo.roleName=rows.roleName
      this.editInfo.roleDesc=rows.roleDesc
    });
  }
};
</script>

<style lang="less" scoped>
</style>