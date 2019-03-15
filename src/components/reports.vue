<template>
  <div>
    <div id="main" ref="pic" style="width: 1000px;height:600px;"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import $ from 'jquery';

export default {
  async mounted() {
    let res = await this.$http.get('reports/type/1');
    $.extend(true,this.Option,res.data.data);

    // console.log(this.$refs);
    let myChart = echarts.init(this.$refs.pic);
    myChart.setOption(this.Option);
  },
  data() {
    return {
      Option: {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: []
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          
        ]
      }
    };
  }
};
</script>

<style>
#main {
  margin: 40px 0 0 40px;
}
</style>
