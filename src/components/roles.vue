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
          <el-row v-for="tag in props.row.children">
            <el-col :span="6">
              <el-tag @close="delx(props.row,tag)" :key="tag.id" closable>{{tag.authName}}</el-tag>
              <span class="el-icon-arrow-right"></span>
            </el-col>
            <el-col :span="18">
              <el-row v-for="tag2 in tag.children">
                <el-col :span="6">
                  <el-tag
                    :key="tag2.id"
                    @close="delx(props.row,tag2)"
                    type="success"
                    closable
                  >{{tag2.authName}}</el-tag>
                  <span class="el-icon-arrow-right"></span>
                </el-col>
                <el-col :span="18">
                  <el-tag
                    :key="tag3.id"
                    @close="delx(props.row,tag3)"
                    type="warning"
                    v-for="tag3 in tag2.children"
                    closable
                    class="my-warning"
                  >{{tag3.authName}}</el-tag>
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
    <!-- tree -->
    <el-dialog title="权限分配" :visible.sync="treeVisible" class="my-dialong">
      <el-tree
        ref="tree"
        :data="treeData"
        :props="props"
        node-key="id"
        :default-checked-keys="checkedKeys"
        default-expand-all
        show-checkbox
        :check-strictly="strictly"
      ></el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="treeVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.getTree();
  },
  data() {
    return {
      tableData5: [],
      // tree
      treeVisible: false,
      props: {
        label: "authName",
        children: "children"
      },
      treeData: [],
      checkedKeys: [],
      editItem: {},
      strictly: false
    };
  },
  methods: {
    async getTree(){
      let res = await this.$http.get("roles");
    // console.log(res);
    this.tableData5 = res.data.data;
    },

    async delx(item, tag) {
      let res = await this.$http.delete(`roles/${item.id}/rights/${tag.id}`);
      // console.log(res);
      item.children = res.data.data;
    },

    // tree
    async roleOne(item) {
      let res = await this.$http.get("rights/tree");
      // console.log(res);
      this.treeData = res.data.data;
      this.treeVisible = true;
      this.strictly = true;

      console.log(item);
      let checkArr = [];
      item.children.forEach(v => {
        checkArr.push(v.id);
        v.children.forEach(v2 => {
          checkArr.push(v2.id);
          v2.children.forEach(v3 => {
            checkArr.push(v3.id);
          });
        });
      });
      console.log(checkArr);
      this.checkedKeys = checkArr;
      this.editItem = item;
    },

    async submit() {
      // this.strictly = false;
      console.log(this.$refs.tree.getCheckedNodes());
      let checkedNodes = this.$refs.tree.getCheckedNodes();

      let checkArr = [];
      checkedNodes.forEach(v=>{
        checkArr.push(v.id);
      });
      console.log(checkArr.join(','));

      let res = await this.$http.post(`roles/${this.editItem.id}/rights`,{
        rids: checkArr.join(',')
      })
      console.log(res);
      if(res.data.meta.status === 200){
        this.getTree();
        this.treeVisible = false,
        window.location.reload();
      }

    },
    // 
    handleEdit(v) {},
    delOne(v) {}
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 5px;
}
.my-warning.el-tag.el-tag--warning {
  margin-left: 5px;
  margin-bottom: 10px;
}
</style>
