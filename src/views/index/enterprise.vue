<template>
  <div>
    <el-card class="box-card subject">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input v-model="formInline.user" style="width:100px"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.user" style="width:100px"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="倒闭" value="shanghai"></el-option>
            <el-option label="正常运营" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-plus" type="primary" @click="onSubmit">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card subjectlist">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="rid" label="企业编号" width="180"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="180"></el-table-column>
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
          name: "黑马程序员",
          creater:"",
          creatdate:"",
          status:"",
          short:"",
        },
        {
          rid: "2016-05-04",
          name: "阿里巴巴",
          creater:"",
          creatdate:"",
          status:"",
          short:"",
        },
        {
          rid: "2016-05-01",
          name: "百度",
          creater:"",
          creatdate:"",
          status:"",
          short:"",
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