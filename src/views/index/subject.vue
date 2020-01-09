<template>
  <div>
    <el-card class="box-card subject">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref='inline'>
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="formInline.rid" style="width:100px"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="formInline.username" style="width:100px"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="$refs.inline.resetFields()">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-plus"
            type="primary"
            @click="$refs.addForm.dialogFormVisible=true"
          >新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card subjectlist">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="rid" label="学科编号" width="180"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称" width="180"></el-table-column>
        <el-table-column prop="username" label="创建者" width="180"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else class="stop">禁用</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template v-slot="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="status(scope.row)">
              <span v-if="scope.row.status==0">启用</span>
              <span v-else>禁用</span>
            </el-button>
            <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="Page"
        :page-sizes="[4, 8, 16, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <addForm ref="addForm"></addForm>
    <editForm ref="editForm"></editForm>
  </div>
</template>

<script>
import addForm from "./subject/addForm";
import editForm from "./subject/editForm";
import { subjectList,subjectStatus,subjectRemove } from "@/api/subject";
export default {
  data() {
    return {
      Page: 1,
      formInline: {
        username: "",
        status: "",
        rid:"",
        name:"",
      },
      size:5,
      total: 0,
      tableData: []
    };
  },
  components: {
    addForm,
    editForm
  },
  methods: {
    edit(row) {
      this.$refs.editForm.dialogFormVisible=true
      this.$refs.editForm.editForm=JSON.parse(JSON.stringify(row))
      window.console.log(row);
    },
    search(){
      this.Page=1,
      this.getlist()
    },
    remove(row){
      this.$confirm('你确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        subjectRemove({id:row.id}).then(res=>{
          // window.console.log(res)
          if(res.code==200){
            this.$message.success('删除成功')
          }
          this.getlist()
        },err=>{
          window.console.log(err)
        })
      }).catch(() => {});
    },
    status(row) {
      subjectStatus(
        {id:row.id}
      ).then(res=>{
        // window.console.log(res)
        if(res.code==200){
          this.getlist()
        }else{
          this.$message.warning(res.massage)
        }
      })
    },
    handleSizeChange(val) {
      this.Page=1
      this.size=val
      this.getlist()
    },
    handleCurrentChange(val) {
      this.Page=val
      this.getlist()
    },
    getlist() {
      subjectList({
        page:this.Page,
        limit:this.size,
        ...this.formInline
      }).then(res => {
        window.console.log(res);
        if (res.code == 200) {
          this.tableData = res.data.items;
          this.total = res.data.pagination.total;
        }
      });
    }
  },
  created() {
    this.getlist();
  }
};
</script>

<style lang="less" scoped>
.subject {
  margin-bottom: 20px;
  height: 103px;
}
.subjectlist {
  text-align: center;
}
.stop {
  color: red;
}
</style>