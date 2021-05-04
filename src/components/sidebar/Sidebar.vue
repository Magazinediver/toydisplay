<template>
  <div class="sidebar-container">
    <div class="collapse-button"
         @mouseover="collapseOpen">
<!--      <button class="cbutton">产品目录</button>-->
      产品目录
      <i class="iconfont iconmulu" style="font-size: 10px;"></i>

    </div>
    <div class="sidebar"
       @mouseleave="collapseClose">

<!--         >-->
      <!--  element ui侧边栏菜单区域  -->
      <!--    <div class="collapse" style="padding-left: 20px;padding-top: 4px" @mouseover="collapseOpen" @mouseout="collapseClose">-->
      <!--      <i style="margin-top: 3px" v-if="!collapse" class="el-icon-s-fold"></i>-->
      <!--      <i style="margin-top: 3px"  v-else class="el-icon-s-unfold"></i>-->
      <!--    </div>-->

      <el-menu
        :collapse="collapse"
        :default-active="onRoutes"
        active-text-color="#111"
        background-color="#fff"
        class="sidebar-el-menu"
        text-color="#777"
        unique-opened

      >

        <template v-for="item in items">
          <!--如果有二级菜单-->
          <template v-if="item.subs">
            <!--有二级菜单情况下,一级菜单-->
            <el-submenu :index="item.index" :key="item.index">
              <!--一级菜单模块-->
              <template slot="title">
                <span slot="title" class="title-font">{{ item.title }}</span>
              </template>
              <!--二级菜单外部包裹-->
              <template v-for="subItem in item.subs">
                <!--二级菜单-->
                <el-menu-item
                    :index="subItem.index"
                    :key="subItem.index"
                >
                  <!--二级菜单模块-->
                  <span slot="title"  class="title-font">{{ subItem.title }}</span>
                </el-menu-item>
              </template>
            </el-submenu>
          </template>

          <!--如果没有二级菜单-->
          <template v-else>
            <!--没有二级菜单情况下,一级菜单模块-->
            <el-menu-item :index="item.index" :key="item.index">

              <span slot="title"  class="title-font">{{ item.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>

</template>

<script>
  import bus from '../../assets/javascript/bus.js';

  export default {
    data() {
      return {
        collapse: true,
        items: [
          {
            icon: 'el-icon-user-solid',
            index: 'usersearch',
            title: '热门推荐'
          },
          {
            icon: 'el-icon-data-analysis',
            index: 'rank',
            title: '强推单品',
            subs: [
              {
                icon: 'el-icon-user',
                index: 'slime',
                title: '史莱姆'
              },
              {
                icon: 'el-icon-setting',
                index: 'crystal-soil',
                title: '水晶土'
              },
              {
                icon: 'el-icon-user',
                index: 'squeeze-ball',
                title: '挤压球'
              },
            ]
          },
          {
            icon: 'el-icon-film',
            index: 'hot-sell-series',
            title: '爆款系列',
            subs: [
              {
                icon: 'el-icon-user',
                index: 'universe-series',
                title: '宇宙系列'
              },
              {
                icon: 'el-icon-setting',
                index: 'colorful-series',
                title: '炫彩系列'
              },
              {
                icon: 'el-icon-user',
                index: 'scenery-series',
                title: '风景系列'
              },
              {
                icon: 'el-icon-setting',
                index: 'festival-series',
                title: '节日专属'
              },
              {
                icon: 'el-icon-setting',
                index: 'cartoon-series',
                title: '卡通风格'
              },
              {
                icon: 'ocean-series',
                index: '海洋系列',
                title: '海洋生物'
              },


            ]
          },
          {
            icon: 'el-icon-house',
            index: 'type',
            title: '材质',
            subs: [
              {
                icon: 'el-icon-user',
                index: 'tpe',
                title: 'TPE',
              },
              {
                icon: 'el-icon-setting',
                index: 'tpr',
                title: 'TPR'
              },
              {
                icon: 'el-icon-user',
                index: 'pva',
                title: 'PVA'
              },

              {
                icon: 'el-icon-setting',
                index: 'tpu',
                title: 'TPU'
              },
              {
                icon: 'el-icon-setting',
                index: 'chemical',
                title: '化工'
              },
              {
                icon: 'el-icon-setting',
                index: 'guar-gum',
                title: '瓜尔胶'
              },

            ]
          },
          {
            icon: 'el-icon-tickets',
            index: 'package',
            title: '包装',
            subs: [
              {
                icon: 'el-icon-user',
                index: 'suction-card',
                title: '吸卡'
              },
              {
                icon: 'el-icon-setting',
                index: 'color-box',
                title: '彩盒'
              },
              {
                icon: 'el-icon-user',
                index: 'metal-can',
                title: '金属罐'
              },
              {
                icon: 'el-icon-user',
                index: 'plastic-can',
                title: '塑料罐'
              },
              {
                icon: 'el-icon-setting',
                index: 'hanging-card',
                title: '挂卡'
              },
              {
                icon: 'el-icon-setting',
                index: 'tied-card',
                title: '绑卡'
              },
              {
                icon: 'el-icon-setting',
                index: 'card-head-package',
                title: '卡头网/袋装'
              },
            ]
          },
          {
            icon: 'el-icon-s-tools',
            index: 'properties',
            title: '特性',
            subs: [
              {
                icon: 'el-icon-user',
                index: 'luminous',
                title: '发光'
              },
              {
                icon: 'el-icon-setting',
                index: 'scallion-powder',
                title: '葱粉'
              },
              {
                icon: 'el-icon-user',
                index: 'squeeze',
                title: '挤压'
              },
              {
                icon: 'el-icon-setting',
                index: 'eject',
                title: '弹跳/弹射'
              },
              {
                icon: 'el-icon-setting',
                index: 'relief',
                title: '解压'
              },

            ]
          },
        ]
      };
    },
    computed: {
      onRoutes() {
        // return this.$route.path.replace('/', '');
      }
    },
    methods: {
      // 菜单的折叠与展开
      collapseOpen() {
        this.collapse = false;
        // console.log("false")
        bus.$emit('collapse-content', this.collapse);
      },

      collapseClose() {
        this.collapse = true;
        // console.log("true")
        bus.$emit('collapse-content', this.collapse);
      },
    }
  };
</script>

<style lang="less" scoped>

  .sidebar-container{
    //width: 100vw;
    //height: 100vh;
    //background-color: #111;

    .collapse-button{
      display: block;
      position: absolute;
      top: 45vh;
      left: -5px;

      padding: 15px 10px;

      color: #fff;
      background-color: #00a1d6;

      border-radius: 0 15px 15px 0;

      font-size: 17px;
      letter-spacing: 2px;
      writing-mode: tb;

      z-index: 100;
    }


    .sidebar {
      position: absolute;
      box-shadow: 0 0 20px #ccc;

      top: 50%;
      left: -85px;
      transform: translate(0,-55%);

      z-index: 100;
    }

    .sidebar-el-menu{


      border-right: 1px solid #a5e7f0;
      //border-bottom:  1px solid #93b7e3;
      //border-top:  1px solid #93b7e3;
      height: 500px;

      //overflow: scroll;
      overflow-y: auto;
      //margin-right: 20px;

      z-index: 101;
    }


    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background-color: rgba(240, 240, 240, 1);
    }

    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
      border-radius: 10px;
      background-color: rgba(0,161,214,1);
    }

    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb {

      border-radius: 10px;
      box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
      background-color: rgba(255,255,255,0.9);
    }

    .collapse{
      display: block;
      position: fixed;
      top: 45%;
      transform: translate(0,-50%);
      width: 100px;
      height: 100px;
      background-color: #73C9E5;
      z-index: 10;
    }

    .sidebar::-webkit-scrollbar {
      width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
      width: 300px;
    }

    .sidebar > ul {
      //height: 100%;
    }
  }

  .title-font{
    padding-left: 84px;
  }

  li .el-menu-item{
    background-color: #f2f2f2 !important;
  }

  li .el-menu-item:hover{
    background-color: rgba(0,161,214,0.8)!important;
  }

  li .el-menu-item:hover .title-font{
    color: #fff;
  }


  .el-menu-item:hover .title-font{
    color: rgba(0,161,214,1);
  }

  .el-menu-item:hover{
    outline: none;
    background-color: rgba(0,161,214,0.1) !important;
  }



  //.el-menu-item:focus {
  //  color: #fff;
  //  outline: none;
  //  /*box-shadow: 0px 0px 10px 2px rgba(100,100,100,0.1) inset;*/
  //  background-image: linear-gradient(to bottom right, #fb7299, #8873d6);
  //}
  //
  //
  //
  //
  ///* 缩进后的slidebar bgcolor */
  //.el-tooltip:focus:not(.focusing), .el-tooltip:focus:hover{
  //  outline: none;
  //  background-image: linear-gradient(to bottom right, #fb7299, #8873d6);
  //}
  //
  //.el-menu-item.is-active {
  //  color: #fff;
  //  background-image: linear-gradient(to bottom right, #fb7299, #7e76e3);
  //}

  //.el-submenu:hover{
  //  outline: none;
  //  background-color: transparent !important;
  //}
  //
  //.el-submenu__title:hover {
  //  outline: none;
  //  /*color: #fff;*/
  //  background-color: rgba(0,161,214,0.1) !important;
  //}
  //
  //.el-submenu__title:focus{
  //  outline: none;
  //  /*color: #fff;*/
  //  background-color: rgba(0,161,214,0.1) !important;
  //}





</style>
