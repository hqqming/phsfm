<template>
  <el-container>
    <el-header class="my-header">
      <div class="left">
        <i class="el-icon-s-fold" @click="isCollapse=!isCollapse"></i>
        <img src="../../assets/images/index-logo.png" alt class="logo" />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img :src="this.userinfo.avatar" alt class="avatar" />
        <span class="userinfo">{{userinfo.username}},你好</span>
        <el-button type="primary" size="small" @click="out">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto" class="my-aside">
        <el-menu
          :default-active='$route.path'
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :router='true'
        >
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据预览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
            
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { info, logout } from "../../api/index";
import { removeToken } from "../../utils/token";
export default {
  data() {
    return {
      userinfo: "",
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      window.console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      window.console.log(key, keyPath);
    },
    out() {
      this.$confirm("确定要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          logout().then((res)=>{
            // window.console.log(res)
            if(res.data.code==200)
            removeToken()
            this.$router.push('/login')
          })
        })
        .catch(

        );
    }
  },
  created() {
    info().then(
      res => {
        this.userinfo = res.data.data;
        this.userinfo.avatar =
          process.env.VUE_APP_BASEURL + "/" + this.userinfo.avatar;
        // window.console.log(res);
      },
      err => {
        window.console.log(err);
      }
    );
  }
};
</script>

<style lang='less'>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 300px;
}
.el-container {
  height: 100vh;
}
.my-aside {
  background: pink;
  box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  background-color: #fff;
}
.my-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-icon-s-fold {
    font-size: 24px;
  }
  .logo {
    margin-right: 11px;
    margin-left: 22px;
    vertical-align: bottom;
  }
  .title {
    font-size: 22px;
    color: #49a1ff;
  }
  .userinfo {
    margin-right: 38px;
    margin-left: 9px;
    font-size: 16px;
  }
  .avatar {
    width: 43px;
    height: 43px;
    border-radius: 50%;
  }
}
.el-main {
  background: #e8e9ec;
}
</style>