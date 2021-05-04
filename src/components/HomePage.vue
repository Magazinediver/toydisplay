<template>
  <el-container>
    <div @click="collapseClose" class="main" ref="main" id="main">
      <!-- 头部 -->
      <div :class="{'is_fixed' : isFixed}">
        <v-header></v-header>

      </div>
      <div class="replace" :class="{'is_replace' : isFixed}"></div>

      <!-- 主体 -->
      <el-container style="height: fit-content;">
        <!-- 内容主体 -->
        <el-main class="content-box" style="margin: 0px;padding: 0px;">
          <router-view></router-view>
        </el-main>

      </el-container>

      <el-footer>
        <v-footer></v-footer>
      </el-footer>
    </div>


  </el-container>
</template>

<script>
  import vHeader from './header/Header'
  import vFooter from './footer/Footer'
  import bus from '../assets/javascript/bus.js';
export default {
  components:{
    vHeader,
    vFooter
  },
  data () {
    return {
      // 默认不折叠
      collapse: false,
      // 被激活导航地址

      isFixed: false,
    }
  },
  computed: {

  },
  created () {
    bus.$on('collapse-content', msg => {
      this.collapse = msg;
    });
  },
  mounted() {
    this.box = this.$refs.main
    var $this = this
    // 监听这个dom的scroll事件
    this.box.onscroll  = () => {
      // console.log('on scroll')
      $this.handleScroll()
    }


  },
  methods: {
    collapseClose() {
      this.$store.state.collapse = false;
      // console.log(this.$store.state.collapse)
    },

    handleScroll() {
      var scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
      let box = this.$refs.main
      this.isFixed = box.scrollTop > 0
      // console.log(box.scrollTop)
    },
  }
}
</script>


<style  lang="less" scoped>

::-webkit-scrollbar{
  display:none;
}



  .main{
    width: 100vw;
    height:100%;
    /*background-color: #bfe4eb;*/
    padding: 0;
    margin: 0;

    overflow: scroll;
  }

  .is_fixed{
    position: fixed;
    top: 0px;
    z-index: 999;
  }

  .replace{
    display: none;
    height: 54px;
  }

  .is_replace{
    display: block;
    width: 100vw;
    height: 54px;
  }


  .el-scrollbar__wrap
  {
    overflow-x:hidden;
    overflow-y:hidden;
  }


.el-container {
  height: 100%;
}

.el-header{
  height: 55px!important;
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

.el-footer{
  background-color: #111;
  z-index: 100;
  padding: 0;
}



</style>
