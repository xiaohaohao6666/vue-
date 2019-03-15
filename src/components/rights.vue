<template>
  <div>
    <!-- 面包屑 -->
    <breadcrumb second="权限管理" third="权限列表"></breadcrumb>
    <!-- table -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="l" label="层级"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  async created() {
    let res = await this.$http.get(`rights/list`);
    // console.log(res);
    res.data.data.forEach(item=>{
        if(item.level == 0){
            item.l = '一级';
        } else if(item.level == 1){
            item.l = '二级';
        } else if(item.level == 2){
            item.l = '三级';
        }
    });
    // console.log(res);
    this.tableData = res.data.data;
  }
};
</script>

<style>
</style>
