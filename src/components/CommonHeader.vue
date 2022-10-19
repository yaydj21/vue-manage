<template>
  <header>
    <!-- 头部左边区域 -->
    <div class="l-content">
      <el-button
        plain
        icon="el-icon-menu"
        size="mini"
        @click="handleMenu"
      ></el-button>
      <!-- 面包屑 -->
      <!-- <h3 style="color: #fff">首页</h3> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 头部右边区域 -->
    <div class="r-content">
      <el-dropdown trigger="click" szie="mini">
        <span>
          <img class="user" :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: require("../assets/logo.jpg"),
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
  },
  computed:{
    ...mapState({
      tags:state => state.tab.tabsList,
    })
    // ...mapState(["test"])
    
  }
};
</script>


<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
/deep/ .el-breadcrumb__item .el-breadcrumb__inner{
    color: #606266;
}
/deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner{
  color:#fff;
}
</style>