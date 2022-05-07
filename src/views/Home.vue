<template>
  <div class="home-set">
    <el-container class="home-container">
      <!--      头部区域      -->
      <el-header>
        <div class="header-logo">
          <img src="../assets/logo.png" alt="" align="absmiddle" width="40" />
          <span>智能教师中心</span>
        </div>
      </el-header>
      <el-container>
        <!--        侧边栏区域     -->
        <el-aside :width="isCollapse ? '64px' : '210px'">
          <!--          点击按钮切换菜单栏缩进-->
          <div class="toggle-button" @click="isCollapse = !isCollapse">|||</div>
          <!--          侧边菜单区域-->
          <el-menu
            background-color="#fff"
            text-color="#949494"
            active-text-color="#7989e8"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
          >
            <!-- 导航1 -->
            <!-- index动态绑定，解决点一个一级菜单，所有二级菜单都打开 -->
            <!-- index只接受string,把item.id拼接空字符，隐式转换 -->
            <el-submenu
              :index="item.id + ''"
              v-for="item in nav1"
              :key="item.id"
            >
              <!--              一级菜单模板区域-->
              <template slot="title">
                <!--                图标-->
                <i class="el-icon-location"></i>
                <!--                文本-->
                <span>{{ item.name1 }}</span>
              </template>
              <!--              二级菜单-->
              <el-menu-item :index="k.path" v-for="k in item.kids" :key="k.id">
                <!--                图标-->
                <i class="el-icon-menu"></i>
                <!--                文本-->
                <span>{{ k.kname }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!--        主体区域      -->
        <el-main>
          <keep-alive><router-view></router-view></keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
export default {
  name: "home",
  data() {
    return {
      nav1: this.$store.state.nav,
      isCollapse: false,
    };
  },
  methods: {},
};
</script>

<style scoped>
.home-container {
  position: absolute;
  height: 100%;
  width: 100%;
}

.el-header {
  background: #fff;
  font-size: 24px;
  padding-left: 5px;
  line-height: 60px;
  color: #666ee8;
  width: 210px;
}

.el-aside {
  background: #fff;
  height: 100%;
  line-height: 100px;
}
.el-menu {
  border-right: none;
}

.el-main {
  /* background: rgb(255, 255, 255); */
  height: 100%;
  line-height: 65px;
  padding: 0;
}
.toggle-button {
  background-color: #fff;
  font-size: 10px;
  line-height: 24px;
  color: #666ee8;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  border-bottom: rgb(143, 142, 142) solid 1px;
}
.home-set {
  background-color: #717af1;
  height: 50%;
}
</style>