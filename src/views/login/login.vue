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
        <el-form ref="form" :model="form" label-width="43px" :rules="rules">
          <el-form-item prop="phone">
            <el-input v-model="form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              show-password
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item class="code" prop="code">
            <el-row>
              <el-col :span="16">
                <div class="grid-content bg-purple">
                  <el-input v-model="form.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  <img :src="codeurl" alt @click="coder" />
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item class="check">
            <el-checkbox v-model="form.checked">
              我已阅读并同意
              <el-link type="primary" href="https://www.baidu.com" target="_blank">用户协议</el-link>和
              <el-link type="primary">隐私条款</el-link>
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">登录</el-button>
            <el-button type="primary">注册</el-button>
          </el-form-item>
        </el-form>
      </main>
    </div>
    <img src="../../assets/images/login_banner_ele.png" alt />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    let validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的11位手机号"));
        }
      }
    };
    return {
      codeurl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      form: {
        phone: "",
        password: "",
        code: "",
        checked: false
      },
      rules: {
        phone: [{ validator: validatePhone, trigger: "change" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度为4个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    coder() {
      this.codeurl =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&t=" + Date.now();
    },
    submitForm() {
      // 等同于 this.$refs.ruleForm
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.login()
        } else {
          this.$message.error("格式不对哦，检查一下呗！");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs['from'].resetFields();
    },
    login() {
      if (this.form.checked == false) {
        this.$message.warning("请阅读并勾选用户协议");
        return;
      }
      axios({
        url: process.env.VUE_APP_BASEURL + "/login",
        method: "post",
        withCredentials: true, //跨域携带cookie
        data: {
          phone: this.form.phone,
          password: this.form.password,
          code: this.form.code
        }
      }).then(
        res => {
          //成功回调
          window.console.log(res);
          if (res.data.code == 200) {
            this.$message.success("登录成功");
          } else if (res.data.code == 202) {
            this.$message.warning(res.data.message);
          }
        },
        err => {
          //失败回调
          window.console.log(err);
        }
      );
    }
  }
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
    padding-right: 42px;
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
      .el-form-item {
        margin-bottom: 25px;
      }
      .el-button {
        width: 394px;
        margin: 0;
        margin-bottom: 26px;
      }
      .el-input--prefix .el-input__inner {
        width: 394px;
        height: 45px;
      }
      .check .el-form-item__content {
        height: 24px;
      }
      .code .el-input--prefix .el-input__inner {
        width: 100%;
        height: 40px;
      }
      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
  }
  .el-checkbox__label {
    color: #999;
  }
}
</style>