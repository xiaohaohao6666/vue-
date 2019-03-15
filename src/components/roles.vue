<template>
  <div>
    <!-- 面包屑 -->
    <breadcrumb second="权限管理" third="角色列表"></breadcrumb>
    <!-- 按钮 -->
    <el-button type="info" plain>添加角色</el-button>
    <!-- table -->
    <el-table :data="tableData5" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <!-- <span class="el-icon-arrow-right"></span> -->
          <el-row v-for="tag in props.row.children">
            <el-col :span="6">
              <el-tag @close="delx(props.row,tag)" :key="tag.id" closable>{{tag.authName}}</el-tag>
              <span class="el-icon-arrow-right"></span>
            </el-col>
            <el-col :span="18">
              <el-row  v-for="tag2 in tag.children">
                <el-col :span="6">
                  <el-tag :key="tag2.id" @close="delx(props.row,tag2)" type="success" closable>{{tag2.authName}}</el-tag>
                  <span class="el-icon-arrow-right"></span>
                </el-col>
                <el-col :span="18">
                  <el-tag :key="tag3.id" @close="delx(props.row,tag3)" type="warning" v-for="tag3 in tag2.children" closable class="my-warning">{{tag3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作" prop="desc">
        <template slot-scope="scope">
          <!-- <el-button size="mini">编辑</el-button> -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
            @click="handleEdit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
            @click="delOne(scope.row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            size="mini"
            plain
            @click="roleOne(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  async created() {
    let res = await this.$http.get("roles");
    console.log(res);
    this.tableData5 = res.data.data;
  },
  data() {
    return {
      tableData5: []
    };
  },
  methods: {
    async delx(item,tag){
      // console.log(item);
      // console.log(tag);
      let res = await this.$http.delete(`roles/${item.id}/rights/${tag.id}`);
      // console.log(res);
      item.children = res.data.data;
    }
  },
};
</script>

<style scoped>
.el-row{
  margin-bottom: 5px;
}
.my-warning.el-tag.el-tag--warning{
  margin-left: 5px;
  margin-bottom: 10px;
}
</style>
