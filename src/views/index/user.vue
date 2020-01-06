<template>
  <div>
    <el-card class="box-card subject">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称编号">
          <el-input v-model="formInline.user" style="width:100px"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="学生" value="shanghai"></el-option>
            <el-option label="老师" value="beijing"></el-option>
            <el-option label="管理员" value="beijing"></el-option>
            <el-option label="超级管理员" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-plus" type="primary" @click="onSubmit">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card subjectlist">
      <el-table :data="tableData" border  style="width: 100%">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="username" label="用户名" ></el-table-column>
        <el-table-column prop="telephone" label="电话" ></el-table-column>
        <el-table-column prop="email" label="邮箱" ></el-table-column>
        <el-table-column prop="role" label="角色" ></el-table-column>
        <el-table-column prop="remark" label="备注" ></el-table-column>
        <el-table-column prop="status" label="状态" ></el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">禁用</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          username: "小明",
          role:"管理员",
          email:"",
          telephone:"",
          remark:"",
          status:"",
        },
        {
          username: "龙皇异次元",
          role:"学生",
          email:"",
          telephone:"",
          remark:"",
          status:"",
        },
      ]
    };
  },
  methods: {
    onSubmit() {
      window.console.log("submit!");
    },
    handleClick(row) {
      window.console.log(row);
    },
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less" scoped>
.subject {
  margin-bottom: 20px;
  height: 103px;
}
.subjectlist {
    text-align: center
}
</style>