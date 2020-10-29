<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <el-menu
          v-if="menuList.length"
          :default-active="defaultMenu"
          class="el-menu-vertical-demo"
          background-color="#9999CC"
          text-color="#fff"
          active-text-color="#4429b3"
          :router="true"
          @select="menuselect"
        >
          <el-menu-item :index="item.path" v-for="item in menuList" :key="item.path">
            <span slot="title">{{item.menuName}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="56px">
          <span>{{activeMenu}}</span>
          <img class="avator" src="@/assets/img/avator.jpg" alt />
        </el-header>
        <el-main>
          <keep-alive>
            <router-view />
          </keep-alive>
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
      menuList: [],
      defaultMenu: "",
      activeMenu: "",
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    menuselect(index) {
      let curmenu = this.menuList.find((v) => v.path == index);
      this.activeMenu = curmenu.menuName;
    },
    getMenuList() {
      this.$http.get(this.$api.menulist).then((res) => {
        this.menuList = res.data;

        let txtIndex = this.menuList.findIndex(
          (v) => v.path === this.$route.fullPath
        );

        this.defaultMenu = this.$route.fullPath;
        this.activeMenu = this.menuList[txtIndex].menuName;
      });
    },
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
      font-size: 18px;
      font-weight: bold;
      position: relative;
      .avator {
        position: absolute;
        top: 5px;
        right: 16px;
        width: 46px;
        border-radius: 23px;
      }
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
      padding: 0;
    }
  }
}
</style>
