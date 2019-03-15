<template>
  <div>
    <!-- 面包屑 -->
    <breadcrumb second="订单管理" third="订单列表"></breadcrumb>
    <!--  -->
    <el-table :data="ordersData" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="250"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="180"></el-table-column>
      <el-table-column label="是否付款" width="100">
        <template slot-scope="scope">
          <el-button v-if="scope.row.order_pay==='0'" type="danger" plain size="mini">未付款</el-button>
          <el-button v-else type="success" plain size="mini">已付款</el-button>
        </template>
      </el-table-column>
      <el-table-column label="下单时间">
        <template slot-scope="scope">{{scope.row.update_time | formatTime}}</template>
      </el-table-column>
      <el-table-column prop label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain @click="Edit(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="sendData.pagenum"
      :page-sizes="[10, 15, 20, 25]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加省市级 -->
    <!-- 添加 -->
    <el-dialog title="添加用户" :visible.sync="addVisible" class="my-dialong">
      <el-form status-icon class="my-form">
        <el-form-item label="省市区/县">
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions2"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址2">
          <v-distpicker></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import options from "../lib/city_data2017_element.js";
import VDistpicker from 'v-distpicker'

export default {
  components: { VDistpicker },

  created() {
    this.render();
  },

  data() {
    return {
      sendData: {
        pagenum: 1,
        pagesize: 10
      },
      ordersData: [],
      total: 0,
      isCheck: false,
      //
      addVisible: false,
      //
      selectedOptions2: [],
      options
    };
  },
  methods: {
    async render() {
      let res = await this.$http.get("orders", {
        params: this.sendData
      });
      this.ordersData = res.data.data.goods;
      this.total = res.data.data.total;
    },

    Edit() {
      this.addVisible = true;
    },
    sizeChange(size) {
      // console.log(size);
      this.sendData.pagesize = size;
      this.render();
    },
    currentChange(current) {
      // console.log(current);
      this.sendData.pagenum = current;
      this.render();
    }
  },
  filters: {
    formatTime(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style>
</style>
