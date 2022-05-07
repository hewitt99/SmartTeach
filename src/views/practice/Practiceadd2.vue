<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>实训管理</el-breadcrumb-item>
      <el-breadcrumb-item>实训修改</el-breadcrumb-item>
      <el-breadcrumb-item>实训流程添加</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 表单 -->
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
        :rules="rules"
        ref="formLabelAlign"
      >
        <!-- 通过题组id,将流程分到同一个实训里面,主键questId自增 -->
        <el-form-item label="题组id" prop="courseId" v-if="false">
          <el-input v-model="formLabelAlign.courseId"></el-input>
        </el-form-item>
        <el-form-item label="阶段名称" prop="questName">
          <el-input v-model="formLabelAlign.questName"></el-input>
        </el-form-item>
        <el-form-item label="参与学生" prop="student">
          <el-input v-model="formLabelAlign.student"></el-input>
        </el-form-item>
        <el-form-item label="阶段要求" prop="content">
          <el-input v-model="formLabelAlign.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('formLabelAlign')"
            >立即添加
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      insertPosition: 999,
      targetId: 999,
      practiceData: {},
      formLabelAlign: {
        courseId: "",
        questName: "",
        student: "",
        content: "",
      },
      rules: {
        questName: [
          { required: true, message: "请输入阶段名称", trigger: "blur" },
        ],
        student: [
          { required: true, message: "请输入参与学生", trigger: "blur" },
        ],
        content: [
          { required: true, message: "请输入阶段要求", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let _this = this;
          axios
            .post("http://localhost:8282/quest/add", this.formLabelAlign)
            .then(function (response) {
              console.log(response);
              if (response.data) {
                _this.$alert(
                  _this.formLabelAlign.questName + "添加成功！",
                  "添加数据",
                  {
                    confirmButtonText: "确定",
                    callback: (action) => {
                      // 在跳转前,需要把questId存入practice表
                      axios
                        .get("http://localhost:8282/quest/list")
                        .then((res) => {
                          let k = {};
                          for (k of res.data) {
                            if (k.coutseId == _this.$route.query.courseId) {
                              // _this.targetData.push[k];
                              console.log("正在遍历quest表");
                            }
                          }
                          console.log("最后的k的questId:", k.questId);
                          _this.practiceData[_this.insertPosition] = k.questId;
                          axios
                            .put(
                              "http://localhost:8282/practice/update",
                              _this.practiceData
                            )
                            .then((res) => {
                              // 跳转到/流程展示
                              _this.$router.push(
                                "/practiceupdate?pracId=" +
                                  _this.$route.query.pracId
                              );
                            });
                        });
                    },
                  }
                );
              }
            });
        }
      });
    },
    getData() {
      // console.log(this.$route.query.courseId);
      this.formLabelAlign.courseId = this.$route.query.courseId;
      axios
        .get("http://localhost:8282/practice/ViewT/" + this.$route.query.pracId)
        .then((res) => {
          // 把即将要修改的表的数据保存下来,然后保存要修改的位置,在发送请求的时候修改更新
          this.practiceData = res.data.practice;
          // 通过循环选择出了第一个空key,把空key赋予insertposition保存
          for (const k in res.data.practice) {
            // console.log(res.data.practice[k]);
            if (res.data.practice[k] === null) {
              this.insertPosition = k;
              break;
            }
          }
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
/* 面包屑文字改成白色 */
.el-breadcrumb /deep/ .el-breadcrumb__inner {
  color: #fff !important;
}
</style>