<template>
  <div class="login">
    <el-form
      :model="formData"
      :rules="rules"
      status-icon
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
      label-position="top"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model.trim="formData.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="button" type="primary" @click="submitForm('formData')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        username: "",
        password: ""
      },
      // 表单的验证规则
      rules: {
        username: [
          { required: true, message: "请输用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "change" }
        ],
      }
    };
  }
};
</script>
<style>
body,
html {
  height: 100%;
  width: 100%;
}
body {
  background-color: #324152;
  padding: 0;
  margin: 0;
}
body > div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  width: 580px;
  height: 436px;
  background-color: #fff;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 10px;
}
.login .button {
  width: 100%;
}
</style>

