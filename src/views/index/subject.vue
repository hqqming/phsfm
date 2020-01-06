<template>
  <div>
    <el-card class="box-card subject">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="formInline.user" style="width:100px"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.user" style="width:100px"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="及格" value="shanghai"></el-option>
            <el-option label="不及格" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-plus" type="primary" @click="onSubmit">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card subjectlist">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="rid" label="学科编号" width="180"></el-table-column>
        <el-table-column prop="name" label="学科名称" width="180"></el-table-column>
        <el-table-column prop="short" label="简称" width="180"></el-table-column>
        <el-table-column prop="creater" label="创建者" width="180"></el-table-column>
        <el-table-column prop="creatdate" label="创建日期" width="180"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
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
          rid: "2016-05-02",
          name: "JAVA",
          short:"",
          creater:"高斯林",
          creatdate:"1995年5月",
          status:"稳定"
        },
        {
          rid: "2016-05-04",
          name: "Python",
          creater:"吉多·范罗苏姆",
          creatdate:"1991年",
          status:"增长较快",
          short:"",
        },
        {
          rid: "RD0001",
          name: "前端开发",
          creater:"布兰登·艾奇",
          creatdate:"1996年3月",
          status:"稳定",
          short:"前端",
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