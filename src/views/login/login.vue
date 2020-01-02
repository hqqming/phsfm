<template>
  <div class="login-contain">
    <div class="login">
      <div class="title">
        <img src="../../assets/images/矢量智能对象 拷贝 9.png" alt />
        <div class="mian">黑马面面</div>
        <span></span>
        <div class="userlogin">用户登录</div>
      </div>
      <main>
        <el-form ref="form" :model="form" label-width="43px">
          <el-form-item>
            <el-input v-model="form.name" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.password" show-password prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item class="code">
            <el-input v-model="form.code" prefix-icon="el-icon-key"  placeholder="请输入验证码"></el-input>
          </el-form-item>
          <el-form-item>
          <el-checkbox v-model="form.checked">我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link type="primary">隐私条款</el-link></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">登录</el-button>
            <el-button type="primary">注册</el-button>
          </el-form-item>
        </el-form>
      </main>
    </div>
    <img src="../../assets/images/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
        code: "",
        checked:false,
      },
    };
  },
  methods: {}
};
</script>

<style lang='less' scope>
.login-contain {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  background: linear-gradient(
    -225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .login {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding-top: 44px;
    box-sizing: border-box;
    .title {
      display: flex;
      align-items: center;
      img {
        margin-left: 48px;
        margin-right: 16px;
      }
      span {
        margin-left: 14px;
        margin-right: 12px;
        height: 28px;
        width: 1px;
        background: #c7c7c7;
      }
      .mian {
        font-size: 24px;
        font-weight: 400;
      }
      .userlogin {
        font-size: 22px;
        font-weight: 400;
      }
    }
    main {
      margin-top: 31px;
      .el-form-item  {
        margin-bottom: 26px;
      }
      .el-button {
        width: 394px;
        margin: 0;
        margin-bottom: 26px;
      }
      .el-input--prefix .el-input__inner{
        width: 394px;
        height: 45px;
      }
      .code .el-input__inner{
        width: 284px;
      }
    }
  }
}
</style>