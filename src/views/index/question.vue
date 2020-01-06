<template>
  <div>
    <el-card class="box-card subject">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" >
       <el-form-item label="角色" >
          <el-select v-model="formInline.region" placeholder="请选择状态" >
            <el-option label="学生" value="shanghai"></el-option>
            <el-option label="老师" value="beijing"></el-option>
            <el-option label="管理员" value="beijing"></el-option>
            <el-option label="超级管理员" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formInline.region" placeholder="请选择状态" >
            <el-option label="学生" value="shanghai"></el-option>
            <el-option label="老师" value="beijing"></el-option>
            <el-option label="管理员" value="beijing"></el-option>
            <el-option label="超级管理员" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="学生" value="shanghai"></el-option>
            <el-option label="老师" value="beijing"></el-option>
            <el-option label="管理员" value="beijing"></el-option>
            <el-option label="超级管理员" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="学生" value="shanghai"></el-option>
            <el-option label="老师" value="beijing"></el-option>
            <el-option label="管理员" value="beijing"></el-option>
            <el-option label="超级管理员" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="角色">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="学生" value="shanghai"></el-option>
            <el-option label="老师" value="beijing"></el-option>
            <el-option label="管理员" value="beijing"></el-option>
            <el-option label="超级管理员" value="beijing"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="作者">
          <el-input v-model="formInline.user" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="学生" value="shanghai"></el-option>
            <el-option label="老师" value="beijing"></el-option>
            <el-option label="管理员" value="beijing"></el-option>
            <el-option label="超级管理员" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="学生" value="shanghai"></el-option>
            <el-option label="老师" value="beijing"></el-option>
            <el-option label="管理员" value="beijing"></el-option>
            <el-option label="超级管理员" value="beijing"></el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item label="标题" >
          <el-input v-model="formInline.user" style="width:370px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-plus" type="primary" @click="onSubmit">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card subjectlist">
      <el-table :data="tableData" border  style="width: 100%">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="title" label="题目" ></el-table-column>
        <el-table-column prop="subject" label="学科.阶段" ></el-table-column>
        <el-table-column prop="types" label="题型" ></el-table-column>
        <el-table-column prop="enterprise" label="企业" ></el-table-column>
        <el-table-column prop="creater" label="创建者" ></el-table-column>
        <el-table-column prop="status" label="状态" ></el-table-column>
        <el-table-column prop="PV" label="访问量" ></el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">启用</el-button>
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
          enterprise:"千峰",
          subject:"",
          status:"已完成",
          title:"ABC",
          creater:"",
          PV:"124",
          types:"",
        },
        {
          PV:"325",
          title:"canvas",
          creater:"老马",
          enterprise:"黑马",
          subject:"前端",
          status:"已完成",
          types:"代码题",
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
}
.subjectlist {
    text-align: center
}
</style>