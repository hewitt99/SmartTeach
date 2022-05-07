<template>
  <!-- 课程查看 -->
  <div>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>课程管理</el-breadcrumb-item>
        <el-breadcrumb-item>课程查看</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 卡片视图区域 -->
      <el-card>
        <!-- 添加栅格 -->
        <el-row :gutter="20">
          <el-col :span="9">
            <!-- 搜索和添加区域 -->
            <el-input placeholder="请输入内容" v-model="queryinfo" clearable>
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="query"
              ></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" plain @click="courseadd()"
              >添加课程</el-button
            >
          </el-col>
        </el-row>

        <!-- 课程展示表 -->
        <!-- 添加height属性,固定table高度同时让表头固定 -->
        <!-- 添加v-loading属性,并且在回调函数axios中直到到data获取后结束等待动画 -->
        <!-- stripe是否添加斑马纹,默认true -->
        <el-table
          :data="
            tableData.slice((currPage - 1) * pageSize, currPage * pageSize)
          "
          border
          style="width: 100%"
          height="430"
          stripe
        >
          <!-- 隐藏不需要显示的id,但是可以提取到给发送给后端操作 -->
          <el-table-column prop="cnum" label="课程id" v-if="false">
          </el-table-column>
          <el-table-column prop="courseName" label="课程名"> </el-table-column>
          <el-table-column prop="teacherName" label="科任老师">
          </el-table-column>
          <el-table-column
            prop="courseDate"
            label="开课时间"
            width="180"
          ></el-table-column>
          <el-table-column prop="courseAdd" label="开课地点"> </el-table-column>
          <el-table-column prop="courseInf" label="课程简介"> </el-table-column>
          <el-table-column prop="coursePop" label="当前报名人数">
          </el-table-column>
          <el-table-column prop="courseMax" label="课程人数上限">
          </el-table-column>
          <el-table-column prop="bool" label="课程状态">
            <template slot-scope="scope">
              {{ scope.row.bool ? "可选" : "不可选" }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                placement="top"
              >
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="courseupdata(scope.row)"
                ></el-button>
              </el-tooltip>

              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="top"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="courseDelete(scope.row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currPage"
          :page-sizes="[3, 5, 10, 20, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      loading: false,
      total: 400, // 总数
      pageSize: 5, // 每页个数
      currPage: 1, // 当前页
      queryinfo: "",
    };
  },
  created() {
    // loading改在这里的话,就只会触发一次？
    this.getCoursedata();
    // that.loading = !that.loading;
  },
  methods: {
    getCoursedata() {
      // 解决axios作用域
      let that = this;
      axios.get("http://localhost:8282/course/list").then((res) => {
        // 打印获取数据
        that.tableData = res.data;
        console.log("axios获取数据： ", res.data);
        that.total = that.tableData.length;
      });
    },
    // 课程删除
    courseDelete(res) {
      console.log(res.cnum);
      axios
        .delete("http://localhost:8282/course/delete/" + res.cnum)
        .then((result) => {
          console.log(result);
          this.$router.push("/courseshow");
        });
    },
    handleSizeChange(val) {
      // 改变每页个数
      this.pageSize = val;
      //重置当前页为第一页
      this.currPage = 1;
    },
    handleCurrentChange(val) {
      //点击改变当前页
      this.currPage = val;
    },
    // 查询
    query() {
      // console.log(typeof this.tableData);
      // console.log(this.tableData[0]);
      const newtable = [];
      if (this.queryinfo == " ") {
        this.getCoursedata();
      }
      for (const k of this.tableData) {
        if (this.queryinfo == k.courseName || this.queryinfo == k.teacherName) {
          newtable.push(k);
          console.log(k);
        }
      }
      if (newtable.length) {
        this.tableData = newtable;
      } else {
        this.getCoursedata();
      }
    },
    // 修改按钮
    courseupdata(row) {
      // console.log("课程id：" + row.cnum);
      this.$router.push("/courseupdate?cnum=" + row.cnum);
    },
    // 添加按钮
    courseadd() {
      console.log("进入添加页面");
      this.$router.push("/courseadd");
    },
  },
};
</script>

<style scoped>
/* 面包屑文字改成白色 */
.el-breadcrumb /deep/ .el-breadcrumb__inner {
  color: #fff !important;
}
</style>