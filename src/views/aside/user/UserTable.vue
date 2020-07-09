<template>
  <div>
    <el-table :data="$attrs.listData" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change="userInfoChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUser(scope.row.id)"></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="clearUser(scope.row.id)"
          ></el-button>
          <el-tooltip
            class="item"
            effect="dark"
            content="分配角色"
            placement="top-start"
            :enterable="false"
          >
            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改用户信息" :visible.sync="dialogVisible" width="50%" @close="editInit" :close-on-click-modal='false'>
      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="pushUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var checkEamil = (rule, value, callback) => {
      const regEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      if (regEmail.test(value)) {
        return callback();
      } else {
        callback(new Error("请输入正确格式的邮箱地址"));
      }
    };

    var checkMobile = (rule, value, callback) => {
      const regMobile = /^1[0-9]{10}$/;
      if (regMobile.test(value)) {
        return callback();
      } else {
        callback(new Error("请输入正确格式的手机号"));
      }
    };
    return {
      dialogVisible: false,
      editForm: {},
      editFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 8,
            message: "请输入3~8个字符的用户名",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEamil, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async userInfoChange(userinfo) {
      const { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      );
      if (res.meta.status !== 200) {
        this.$message.error("状态更新失败");
        userinfo.mg_state = !userinfo.mg_state;
      } else {
        this.$message.success("状态更新成功");
      }
    },
    async editUser(id) {
      this.dialogVisible = true;
      const { data: res } = await this.$http.get(`users/${id}`);
      if (res.meta.status !== 200) {
        this.$message.error("用户信息获取失败");
        this.dialogVisible = false;
      } else {
        this.editForm = res.data;
      }
    },
    async userUpdata() {
      const { data: res } = await this.$http.put(`users/${this.editForm.id}`, {
        email: this.editForm.email,
        mobile: this.editForm.mobile
      });
    },
    editInit() {
      this.$refs.editForm.resetFields();
    },
    getUserList() {},
    pushUser() {
      this.$refs.editForm.validate(val => {
        if (!val) return;
        this.userUpdata();
        this.getUserList();
        this.dialogVisible = false;
      });
    },
    async clearUser(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (confirmResult == 'confirm') {
        const { data: res } = await this.$http.delete(`users/${id}`);
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg);
          return;
        } else {
          this.$message.success(res.meta.msg);
          this.getUserList();
        }
      }
      else {
        this.$message.info('已取消删除')
      }
    }
  },
  created() {
    this.$bus.$on("getListData", val => {
      this.getUserList = val;
    });
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
</style>