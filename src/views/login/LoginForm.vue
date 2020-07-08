<template>
  <div>
    <el-form
      ref="loginForm"
      :model="form"
      :rules="formLoginRule"
      label-width="80px"
      class="form-container"
    >
      <el-form-item class="form-user" prop="username">
        <i class="el-icon-user-solid"></i>
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="password" class="form-pass">
        <i class="el-icon-lock"></i>
        <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="form-sub">
        <el-button type="primary" @click="loginIn">登录</el-button>
        <el-button type="info" @click="reseForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "admin",
        password: "123456"
      },
      formLoginRule: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    loginIn() {
      this.$refs.loginForm.validate(async vali => {
        if (!vali) return;
        const { data: res } = await this.$http.post("login", this.form);
        if (res.meta.status != 200) {
          return this.$message.error("用户名或密码不正确");
        } else {
          this.$router.push("/home");
          this.$message.success("登录成功");
          window.sessionStorage.setItem("token", res.data.token);
        }
      });
    },
    reseForm() {
      this.$refs.loginForm.resetFields();
    }
  },
  created() {
    document.onkeydown = e => {
      if (e.keyCode == 13) {
        this.loginIn();
      }
    };
  }
};
</script>

<style lang="less" scoped>
.form-container {
  padding: 0 20px;
  .form-user {
    margin-top: 50px;
  }
  .form-user,
  .form-pass {
    position: relative;
    i {
      font-size: 20px;
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      z-index: 9;
    }
  }
  .form-sub {
    display: flex;
    justify-content: flex-end;
  }
  /deep/ .el-form-item__content {
    margin-left: 0 !important;
  }
  /deep/ input {
    padding-left: 38px;
  }
}
</style>