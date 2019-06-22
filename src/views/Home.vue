<template>
  <el-container class="home">
    <el-header>
      <div class="logo-box">
        <img src="../assets/logo.png" width="50px" height="50px" alt>
        <span>电商后台管理系统</span>
      </div>
      <div>
        <el-button size="small" @click="logout">退出登陆</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="width">
        <!-- 左侧导航栏 -->

          <el-button type="info" @click="isShow" style="width:100%; letter-spacing:3px;">|||</el-button>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="false"
          :collapse="isCollapse"
          :router="true"
        >
          <el-submenu :index="item.path" v-for="(item, index) in menuList" :key="index">
            <template slot="title">
              <i class="el-icon-s-cooperation"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item-group v-for="(item1, index1) in item.children" :key="index1">
              <el-menu-item :index="item1.path">
                <i class="el-icon-s-unfold"></i>
                <span>{{item1.authName}}</span>
                </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      width: '',
      menuList: [],
      isCollapse: true
    }
  },
  async created () {
    const menus = await this.axios.get('/menus')
    // console.log(menus.data.data);
    if (menus.status === 200) {
      this.menuList = menus.data.data
      // console.log(this.menuList);
    }
  },
  methods: {
    // 导航栏显示与隐藏
    isShow () {
      this.isCollapse = !this.isCollapse
    },
    logout () {
      sessionStorage.removeItem('token')
      if (!sessionStorage.getItem('token')) {
        this.$message({
          showClose: true,
          message: '已退出登陆,两秒后跳转',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.push('/login')
        }, 2000)
      }

      // 退出登陆
    }

  }
}
</script>

<style >
/* 后台主页面头部 */
.home .el-header {
  width: 100%;
  background-color: rgb(38, 38, 38);
  color: #eee;
  display: flex;
  /* 弹性布局 向两侧对齐 */
  justify-content: space-between;
  /* 用户无法选中 */
  user-select: none;
  font-size: 20px;
  /* 垂直居中 */
  align-items: center;
}
.home .el-header img {
  vertical-align: middle;
}
/* 后台主页面左侧导航栏 */
.el-container {
  height: 100%;
}
.home .el-aside {
  border-right: none;
  background-color: #333743;
  height: 100%;
}
.home .el-menu{
  border-right:none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /* min-height: 400px; */
}
</style>
