<template>
  <el-dialog title="新增学科" width="620px" :visible.sync="dialogFormVisible" center>
    <el-form :model="editForm" :rules="editrules" ref="editForm">
      <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
        <el-input v-model="editForm.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="editForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="editForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro" :label-width="formLabelWidth">
        <el-input v-model="editForm.intro" autocomplete="off" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="editForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="edit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { subjectEdit} from "@/api/subject";
export default {
  data() {
    return {
      editForm: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      editrules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }]
      },
      dialogFormVisible: false,
      formLabelWidth: "90px"
    };
  },
  methods: {
    edit() {
      subjectEdit(this.editForm).then(res => {
        window.console.log(res);
        if (res.code == 200) {
          this.dialogFormVisible = false;
          this.$message.success("编辑成功");
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