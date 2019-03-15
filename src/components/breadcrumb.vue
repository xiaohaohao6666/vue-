<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="my-breadcrumb">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{second}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{third}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
    props: ['second','third']
}
</script>
<style>
.my-breadcrumb {
  height: 45px;
  line-height: 45px;
  background-color: #d3dce6;
  padding-left: 20px;
}
</style>
