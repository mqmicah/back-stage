<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="50%" @close="clearForm">
    <el-form :model="addForm" :rules="rules" ref="addForm" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="pushUser">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props:{
    title:''
  },
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
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 8,
            message: "请输入3~8个字符的用户名",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "请输入6~16位的密码",
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
      },
      dialogVisible: false
    };
  },
  methods: {
    clearForm() {
      this.$refs.addForm.resetFields();
    },
    async getaddForm() {
      const { data: res } = await this.$http.post("users", this.addForm);
      if (res.meta.status !== 201) {
        this.$message.error("用户添加失败");
      } else {
        this.getUserList();
        this.dialogVisible = false;
        this.$message.success("用户添加成功");
      }
      console.log(res);
    },
    getUserList() {},
    pushUser() {
      this.$refs.addForm.validate(val => {
        if (!val) {
          return;
        } else {
          this.getaddForm();
        }
      });
    }
  },
  mounted() {
    this.$bus.$on("change", val => (this.dialogVisible = val));
    this.$bus.$on("getListData", val => {
      this.getUserList = val;
    });
  }
};
</script>

<style lang="less" scoped>
</style>