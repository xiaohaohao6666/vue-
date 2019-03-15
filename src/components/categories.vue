<template>
  <div>
    <!-- 面包屑 -->
    <breadcrumb second="商品管理" third="商品分类"></breadcrumb>
    <!-- 按钮 -->
    <el-button type="success" plain>成功按钮</el-button>
    <!-- table -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
    <!-- 分页 -->
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
