<template>
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>教师效果评价</el-breadcrumb-item>
      <el-breadcrumb-item>教师效果查看</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="9">
          <!-- 搜索和添加区域 -->
          <el-input placeholder="请输入教师名称" v-model="queryinfo" clearable>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="query"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-carousel indicator-position="outside" height="430px">
        <el-carousel-item>
          <div id="mychart1"></div>
        </el-carousel-item>
        <el-carousel-item>
          <div id="mychart2"></div>
        </el-carousel-item>
        <el-carousel-item>
          <div id="mychart3"></div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {},
  data() {
    return {
      queryinfo: "",
    };
  },
  methods: {
    query() {
      let that = this;
      if (!that.queryinfo) {
        alert("请输入教师名称");
      }
      axios
        .all([
          axios.get("http://localhost:8282/totalTime/findT/" + that.queryinfo),
          axios.get("http://localhost:8282/teacherLogs/find/" + that.queryinfo),
          axios.get(
            "http://localhost:8282/teacherComments/find/" + that.queryinfo
          ),
        ])
        .then(
          axios.spread((res1, res2, res3) => {
            // 获取dom元素
            let mychart1 = that.$echarts.init(
              document.getElementById("mychart1")
            );
            let mychart2 = that.$echarts.init(
              document.getElementById("mychart2")
            );
            let mychart3 = that.$echarts.init(
              document.getElementById("mychart3")
            );

            // console.log(res1);
            // 设置echarts数据集
            const res1Data = [];
            const res2Datax = [];
            const res2Datay = [];
            const res3Datax = [];
            const res3Datay = [];
            // 处理res1Data数据集
            for (const k of res1.data) {
              // console.log(k.operationType);
              // console.log(k.total);
              let obj = { value: 1, name: "name" };
              obj.name = k.operationType;
              obj.value = k.total;
              // console.log(obj);
              res1Data.push(obj);
            }
            mychart1.setOption({
              tooltip: {
                trigger: "item",
              },
              legend: {
                top: "5%",
                left: "center",
              },
              series: [
                {
                  name: "详细情况",
                  type: "pie",
                  radius: ["40%", "70%"],
                  avoidLabelOverlap: false,
                  itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2,
                  },
                  label: {
                    show: false,
                    position: "center",
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: "40",
                      fontWeight: "bold",
                    },
                  },
                  labelLine: {
                    show: false,
                  },
                  data: res1Data,
                },
              ],
            });

            // 处理res2Data数据集
            for (const k of res2.data) {
              let x = k.time;
              let y = k.total;
              res2Datax.push(x);
              res2Datay.push(y);
            }
            // console.log(res2.data);
            // console.log(res2Datax);
            // console.log(res2Datay);
            mychart2.setOption({
              xAxis: {
                type: "category",
                data: res2Datax,
              },
              yAxis: {
                type: "value",
              },
              series: [
                {
                  data: res2Datay,
                  type: "line",
                  smooth: true,
                },
              ],
            });

            // 处理res3Data数据集
            for (const k of res3.data) {
              const x = k.commentDate;
              const y = k.grade;
              res3Datax.push(x);
              res3Datay.push(y);
            }
            // console.log(res3.data);
            mychart3.setOption({
              xAxis: {
                type: "category",
                data: res3Datax,
              },
              yAxis: {
                type: "value",
              },
              series: [
                {
                  data: res3Datay,
                  type: "bar",
                  showBackground: true,
                  backgroundStyle: {
                    color: "rgba(180, 180, 180, 0.2)",
                  },
                },
              ],
            });
          })
        );
    },
  },
};
</script>

<style scoped>
/* 面包屑文字改成白色 */
.el-breadcrumb /deep/ .el-breadcrumb__inner {
  color: #fff !important;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__item h3 {
  text-align: center;
  line-height: 430px;
}
.el-carousel__item div {
  text-align: center;
  line-height: 430px;
  height: 100%;
  width: 100%;
}
</style>