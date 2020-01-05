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
            <el-button type="primary" @click="submitForm()" class="login-btn">登录</el-button>
            <el-button type="primary" @click="dialogForm = true" class="login-btn">注册</el-button>
          </el-form-item>
        </el-form>
        <el-dialog title="用户注册" center :visible.sync="dialogForm" top="1%" width="624px">
          <el-form :model="regform" :rules="rerules" ref="regform">
            <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
              <el-upload
                class="avatar-uploader"
                :action="uploadurl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                name="image"
              >
                <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="昵称" :label-width="formLabelWidth" prop="username">
              <el-input v-model="regform.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
              <el-input v-model="regform.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
              <el-input v-model="regform.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
              <el-input v-model="regform.password" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="图形码" :label-width="formLabelWidth" prop="code">
              <el-row>
                <el-col :span="16">
                  <div class="grid-content bg-purple">
                    <el-input v-model="regform.code" autocomplete="off"></el-input>
                  </div>
                </el-col>
                <el-col :span="7" :offset="1">
                  <div class="grid-content bg-purple-light">
                    <img :src="sendscode" alt @click="sendcode" />
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
              <el-row>
                <el-col :span="16">
                  <div class="grid-content bg-purple">
                    <el-input v-model="regform.rcode" autocomplete="off"></el-input>
                  </div>
                </el-col>
                <el-col :span="7" :offset="1">
                  <div class="grid-content bg-purple-light">
                    <el-button
                      @click.prevent="getPhoneCode"
                      class="send"
                      :disabled="delayTime!==0"
                    >获取用户验证码{{delayTime==0?'':"("+delayTime+")"}}</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogForm = false">取 消</el-button>
            <el-button type="primary" @click="submitregForm()">确 定</el-button>
          </div>
        </el-dialog>
      </main>
    </div>
    <img src="../../assets/images/login_banner_ele.png" alt />
  </div>
</template>

<script>
import axios from "axios";
import { login } from "../../api/login";
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
    let validatemail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("邮箱格式错误"));
        }
      }
    };
    return {
      imgUrl: "",
      delayTime: 0,
      dialogForm: false,
      formLabelWidth: "60px",
      codeurl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      sendscode: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
      uploadurl: process.env.VUE_APP_BASEURL + "/uploads",
      form: {
        phone: "",
        password: "",
        code: "",
        checked: false
      },
      regform: {
        avatar: "",
        phone: "",
        password: "",
        code: "",
        username: "",
        email: "",
        rcode: ""
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
      },
      rerules: {
        avatar: [{ required: true, message: "头像是必须的" }],
        username: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ],
        email: [{ required: true, validator: validatemail, trigger: "blur" }],
        phone: [
          { required: true, validator: validatePhone, trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        code: [
          { message: "请输入图形码", trigger: "blur" },
          { min: 4, max: 4, message: "长度为4个字符", trigger: "blur" }
        ],
        rcode: [
          { message: "请输入验证码", trigger: "blur" },
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
    sendcode() {
      this.sendscode =
        process.env.VUE_APP_BASEURL + "/captcha?type=sendsms&t=" + Date.now();
    },
    submitForm() {
      // 等同于 this.$refs.ruleForm
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.checked == false) {
            this.$message.warning("请阅读并勾选用户协议");
            return;
          }
          login({
            phone: this.form.phone,
            password: this.form.password,
            code: this.form.code
          }).then(
            res => {
              //成功回调
              // window.console.log(res);
              if (res.data.code == 200) {
                this.$message.success("登录成功");
                this.$router.push('/index')
                
              } else if (res.data.code == 202) {
                this.$message.warning(res.data.message);
              }
            },
            err => {
              //失败回调
              window.console.log(err);
            }
          );
        } else {
          this.$message.error("格式不对哦，检查一下呗！");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["from"].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.imgUrl = URL.createObjectURL(file.raw);
      window.console.log(res);
      this.regform.avatar = res.data.file_path;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submitregForm() {
      this.$refs["regform"].validate(valid => {
        if (valid) {
          this.register();
        } else {
          this.$message.error("格式不对哦，检查一下呗！");
          return false;
        }
      });
    },
    getPhoneCode() {
      if (this.regform.code.length != 4) {
        return this.$message.warning("验证码错误,请检查");
      }
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!reg.test(this.regform.phone)) {
        this.$message.error("请输入正确的手机号");
        return;
      }
      this.sendsms();
    },
    sendsms() {
      axios({
        url: process.env.VUE_APP_BASEURL + "/sendsms",
        method: "post",
        withCredentials: true,
        data: {
          phone: this.regform.phone,
          code: this.regform.code
        }
      }).then(
        res => {
          //成功回调
          window.console.log(res);
          if (res.data.code == 200) {
            this.$message.info("短信验证码是:" + res.data.data.captcha);
            if (this.delayTime == 0) {
              this.delayTime = 60;
              let timeid = setInterval(() => {
                this.delayTime--;
                if (this.delayTime == 0) {
                  clearInterval(timeid);
                }
              }, 1000);
            }
          } else {
            this.$message.info(res.data.message);
            return;
          }
          // this.regform.rcode=res.data.data.captcha
        },
        err => {
          //失败回调
          window.console.log(err);
        }
      );
    }
  },
  register() {
    axios({
      url: process.env.VUE_APP_BASEURL + "/register",
      method: "post",
      withCredentials: true,
      data: {
        username: this.regform.username,
        phone: this.regform.phone,
        email: this.regform.email,
        avatar: this.regform.avatar,
        password: this.regform.password,
        rcode: this.regform.rcode
      }
    }).then(
      res => {
        //成功回调
        window.console.log(res);
        if (res.data.code == 200) {
          this.$message.success("注册成功,请登录!");
          this.dialogForm=false;
        } else {
          this.$message.warning(res.data.message);
        }
      },
      err => {
        //失败回调
        window.console.log(err);
      }
    );
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
      .login-btn {
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
    .el-dialog__header {
      height: 53px;
      background-color: #2891ff;
      box-sizing: border-box;
      span {
        color: #fefefe;
      }
    }
  }
  .el-dialog--center .el-dialog__body {
    text-align: center;
  }
  .el-checkbox__label {
    color: #999;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fefefe;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    margin-bottom: 20px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .bg-purple-light .send {
    width: 100%;
  }
}
</style>