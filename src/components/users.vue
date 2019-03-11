<template>
  <div>
    <!-- 头部 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="my-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <!-- 输入框 -->
          <el-input
            placeholder="请输入内容"
            v-model="sendData.query"
            @keyup.native.enter="search"
            class="input-with-select"
          >
            <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light">
          <!-- 按钮 -->
          <el-button @click="dialogFormVisible = true" type="success" plain>添加用户</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 列表 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-switch @change="statusChange(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini">编辑</el-button> -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            plain
          ></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain @click="delOne(scope.row)"></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
    <!-- 添加 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" class="my-dialong">
      <el-form :model="addForm" :rules="rules" ref="ruleForm" status-icon class="my-form">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="addForm.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      if (value != "") {
        setTimeout(() => {
          //
          let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
          if (reg.test(value)) {
            callback();
          } else {
            // 不匹配
            callback(new Error("请正确输入邮箱"));
          }
        }, 1000);
      } else {
        callback();
      }
    };
    var checkMobile = (rule, value, callback) => {
      if (value != "") {
        setTimeout(() => {
          let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
          if (reg.test(value)) {
            callback();
          } else {
            callback(new Error("请正确输入手机号"));
          }
        }, 1000);
      } else {
        callback();
      }
    };

    return {
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 13, message: "长度在 3 到 13 个字符", trigger: "blur" }
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
        mobile: [{ validator: checkMobile, trigger: "blur" }]
      },
      sendData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      tableData: [],
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      formLabelWidth: "120px",
      dialogFormVisible: false
    };
  },

  //
  methods: {
    handleEdit(index, row) {
      console.log(index);
      console.log(row);
    },
    async search() {
      let res = await this.$http.get("users", {
        params: this.sendData,
        headers: { Authorization: window.sessionStorage.getItem("token") }
      });
      console.log(res);
      this.tableData = res.data.data.users;
    },
    //
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 成功
          let res = await this.$http.post("users", this.addForm);
          console.log(res);
          //判断是否创建成功
          if (res.data.meta.status == "201") {
            this.search();
            this.dialogFormVisible = false;
            this.$refs[formName].resetFields();
          }
        } else {
          // 失败
          this.$message.warning("请输入正确的数据!");
          return false;
        }
      });
    },
    // 
    async statusChange(item){
        // console.log(item);
        await this.$http.put(`users/${item.id}/state/${item.mg_state}`);
    },
    // 
    delOne(item) {
        this.$confirm('此操作将永久删除该成员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await this.$http.delete(`users/${item.id}`)
          if(res.data.meta.status == 200){
              this.search();
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }

  },

  //
  created() {
    this.search();
  }
};
</script>
<style>
.my-breadcrumb {
  height: 45px;
  line-height: 45px;
  background-color: #d3dce6;
  padding-left: 20px;
}
.my-dialong > div {
  width: 650px;
}
.el-form.my-form {
  height: 300px;
  padding-left: 0;
  padding-right: 0;
}
/* .el-dialog__body {
  padding: 0;
} */
</style>