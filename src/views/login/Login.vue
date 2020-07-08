<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-logo">
        <img src="~as/images/logo.jpg" alt />
      </div>
      <login-form></login-form>
    </div>
  </div>
</template>

<script>
import LoginForm from "page/login/LoginForm";
export default {
  components: {
    LoginForm
  }
};
</script>

<style lang="less" scoped>
.login-container {
  position: relative;
  background-color: #2b4b6b;
  height: 100%;
  .login-box {
    width: 450px;
    height: 350px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login-logo {
      width: 170px;
      height: 170px;
      background-color: #fff;
      border-radius: 50%;
      border: 1px solid #ccc;
      padding: 10px;
      margin: -80px auto 0;
      box-shadow: 0 0 10px #fff;
      text-align: center;
      img {
        border-radius: 50%;
      }
    }
  }
}
</style>