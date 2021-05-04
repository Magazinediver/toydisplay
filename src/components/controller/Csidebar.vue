<template>
  <div class="csidebar">
<!--  element ui侧边栏菜单区域  -->
    <el-menu
      :collapse="collapse"
      :default-active="onRoutes"
      active-text-color="#fff"

      class="csidebar-el-menu"
      router

      unique-opened
    >

      <template  v-for="item in mostitems">
        <!--如果有二级菜单-->
        <template v-if="item.subs">
          <!--有二级菜单情况下,一级菜单-->
          <el-submenu :index="item.index" :key="item.index">
            <!--一级菜单模块-->
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <!--二级菜单外部包裹-->
            <template v-for="subItem in item.subs">
              <!--二级菜单-->
              <el-menu-item
                :index="subItem.index"
                :key="subItem.index"
              >
                <!--二级菜单模块-->
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>

        <!--如果没有二级菜单-->
        <template v-else>
          <!--没有二级菜单情况下,一级菜单模块-->
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<!-- background-color: rgba(251, 114, 153, 0.1) !important; -->
<script>
  import bus from '../../assets/javascript/bus.js';

  export default {
    data() {
      return {
        identity:'管理员',
        collapse: false,

        mostitems: [
          {
            icon: 'el-icon-house',
            index: 'chome',
            title: '首页'
          },
          {
            icon: 'el-icon-tickets',
            index: 'clubmanager',
            title: '产品模块',
            subs: [
              {
                icon: 'el-icon-user',
                index: 'productmanager',
                title: '产品管理'
              },
              {
                icon: 'el-icon-setting',
                index: 'createproduct',
                title: '发布新产品'
              },
            ]
          },
          {
            icon: 'el-icon-user-solid',
            index: 'order',
            title: '订单模块',
            subs: [
              {
                icon: 'el-icon-user',
                index: 'ordermanager',
                title: '订单管理'
              },
              {
                icon: 'el-icon-setting',
                index: 'checkorder',
                title: '订单审核'
              },
            ]
          },
          {
            icon: 'el-icon-s-tools',
            index: 'usermanager',
            title: '用户管理',
            subs: [
              {
                icon: 'el-icon-setting',
                index: 'usermanager',
                title: '用户管理'
              },
              {
                icon: 'el-icon-user',
                index: 'signup-manager',
                title: '注册新用户'
              },
              {
                icon: 'el-icon-setting',
                index: 'crecoverpwd',
                title: '修改密码'
              },

            ]
          },
        ]
      };
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    },
    created() {
      // 通过 Event Bus 进行组件间通信，来折叠侧边栏

      // this.identity =window.sessionStorage.getItem('identity')

      bus.$on('collapse', msg => {
        this.collapse = msg;
        bus.$emit('collapse-content', msg);
      });
    },

  };
</script>

<style scoped>
  .csidebar {
    display: block;
    width: 250px;
    position: absolute;
    left: 0;
    top: 58px;
    bottom: 0;

    border: none;
  }

  .csidebar::-webkit-scrollbar {
    width: 0;
  }

  .csidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }

  .sidebar > ul {
    height: 100%;
  }

  li .el-menu-item{
    background-color: #eee !important;
  }

  li .el-menu-item:hover{
    background-color: rgba(251,114,153,0.4)!important;
  }





  .el-menu-item:hover {
    outline: none;
    color: #ed4173;
    background-color: #fecddb !important;
  }


  .el-menu-item:focus {
    color: #fff;
    outline: none;
    /*box-shadow: 0px 0px 10px 2px rgba(100,100,100,0.1) inset;*/
    background-image: linear-gradient(to bottom right, #fb7299, #8873d6);
  }




  /* 缩进后的slidebar bgcolor */
  .el-tooltip:focus:not(.focusing), .el-tooltip:focus:hover{
    outline: none;
    background-image: linear-gradient(to bottom right, #fb7299, #8873d6);
  }

  .el-menu-item.is-active {
    color: #fff;
    background-image: linear-gradient(to bottom right, #fb7299, #7e76e3);
  }

  .el-submenu:hover{
    outline: none;
    background-color: transparent !important;
  }


</style>
