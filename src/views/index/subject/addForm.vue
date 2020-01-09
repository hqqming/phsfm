<template>
  <el-dialog title="新增学科" width="620px" :visible.sync="dialogFormVisible" center>
    <el-form :model="addForm" :rules="addrules" ref="addForm">
      <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
        <el-input v-model="addForm.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro" :label-width="formLabelWidth">
        <el-input v-model="addForm.intro" autocomplete="off" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="addForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="add">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { subjectAdd} from "@/api/subject";
export default {
  data() {
    return {
      addForm: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      addrules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }]
      },
      dialogFormVisible: false,
      formLabelWidth: "90px"
    };
  },
  methods: {
    add() {
      subjectAdd(this.addForm).then(res => {
        window.console.log(res);
        if (res.code == 200) {
          this.dialogFormVisible = false;
          this.$message.success("新增成功");
          this.$refs["addForm"].resetFields();
          this.$parent.getlist()
        } else {
          this.$message.warning(res.message);
        }
      });
    }
  }
};
</script>

<style>
</style>