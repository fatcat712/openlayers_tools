<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="/basemap"
          class="el-menu-vertical-demo"
          background-color="#9999CC"
          text-color="#fff"
          active-text-color="#99CCCC"
          :router="true"
        >
          <el-menu-item index="/basemap">
            <span slot="title">基础地图</span>
          </el-menu-item>
          <el-menu-item index="/multilayer">
            <span slot="title">多图层切换</span>
          </el-menu-item>
          <el-menu-item index="/">
            <span slot="title">覆盖物</span>
          </el-menu-item>
          <el-menu-item index="/">
            <span slot="title">距离计算</span>
          </el-menu-item>
          <el-menu-item index="/">
            <span slot="title">面积计算</span>
          </el-menu-item>
          <el-menu-item index="/">
            <span slot="title">绘制</span>
          </el-menu-item>
          <el-menu-item index="/">
            <span slot="title">态势图</span>
          </el-menu-item>
          <el-menu-item index="/">
            <span slot="title">卷帘</span>
          </el-menu-item>
          <el-menu-item index="/">
            <span slot="title">图层探查</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="56px">{{activeMenu}}</el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      activeMenu: "基础地图",
    };
  },
};
</script>
<style scoped lang="less">
.home {
  height: 100%;
  .el-container {
    height: 100%;
    .el-header {
      background-color: #ccccff;
      color: #330033;
      text-align: center;
      line-height: 56px;
    }

    .el-aside {
      background-color: #d3dce6;
      color: #333;
      text-align: center;
      line-height: 260px;
      .el-menu-vertical-demo {
        width: 100%;
        height: 100%;
        border-right: 0;
        box-sizing: border-box;
      }
    }

    .el-main {
      background-color: #e9eef3;
      color: #333;
      text-align: center;
      line-height: 160px;
      padding: 0;
    }
  }
}
</style>
