<template>
  <el-container class="container-main"  ref="main" id="main">
    <!-- 头部 -->
    <el-header>
      <v-header></v-header>
    </el-header>

    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->

      <v-sidebar></v-sidebar>
      <!-- 内容主体 -->

        <div class="content-box">
          <v-tags></v-tags>
          <div class="content">
            <transition name="move" mode="out-in">
              <keep-alive :include="tagsList">
                <router-view></router-view>
              </keep-alive>
            </transition>
            <el-backtop target=".content"></el-backtop>
          </div>
        </div>



    </el-container>

  </el-container>
</template>

<script>
import vSidebar from './Csidebar';
import vHeader from './Cheader'
import vTags from "./Ctags";

export default {
  components:{
    vSidebar,
    vHeader,
    vTags
  },
  data () {
    return {
      // 默认不折叠
      collapse: false,
      // 被激活导航地址
      tagsList: [],
    }
  },
  computed: {

  },
  created () {

  },
  methods: {
  }
}
</script>



<style lang="less" scoped>
  .container-main{
    overflow: hidden;
  }



  .content{
    padding: 0;
    margin: 0;
    height: calc(100% - 30px);
    overflow: hidden!important;
  }

.el-container {
  height: 100%;
  background-color: #fff;
  border: none;
  overflow: hidden;
}

.el-header{
  height: 54px!important;
  padding: 0;
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border: none;
  }
}
.el-main {
  background-color: #fff;
}
.iconfont{
  margin-right: 10px;
}
.toggle-button {
  height: 50px;
  margin-left: 20px;
  font-size: 18px;
  line-height: 50px;
  color: #787878;
  text-align: center;
  letter-spacing: 0.2em;
  // 鼠标放上去变成小手
  cursor: pointer;
}



.content-box{
  position: absolute;


  box-sizing: border-box;
  left: 249px;
  right: 0;
  top: 58px;
  bottom: 0;
  padding:  0!important;
  -webkit-transition: left .3s ease-in-out;
  transition: left .3s ease-in-out;
  background: #f8f8f8;
}



</style>
