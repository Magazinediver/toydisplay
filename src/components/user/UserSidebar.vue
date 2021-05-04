<template>
  <div class="user-sidebar-container">
    <el-menu
        class="el-menu-user"
        router
        :default-active="onRoutes"
        active-text-color="#111"
        background-color="#fff"
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
            <template>
              <!--二级菜单-->
              <el-menu-item @click="logout">
                <!--二级菜单模块-->
                注销当前用户
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

<script>
  import bus from '../../assets/javascript/bus.js';

  export default {
    data() {
      return {
        collapse: true,
        items: [
          {
            icon: 'el-icon-house',
            index: 'home',
            title: '首页'
          },
          {
            icon: 'el-icon-tickets',
            index: 'myspace',
            title: '个人中心'
          },
          {
            icon: 'el-icon-user-solid',
            index: 'myorder',
            title: '我的订单'
          },
          {
            icon: 'el-icon-film',
            index: 'mycollect',
            title: '我的收藏'
          },
          {
            icon: 'el-icon-s-tools',
            index: 'usermanager',
            title: '用户管理',
            subs: [
              {
                index: 'changeuserinfo',
                title: '修改用户信息'
              },
              {
                index: 'recoverpwd',
                title: '更改密码'
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
    methods: {
      logout () {
        // 清空token
        window.sessionStorage.clear()
        this.$store.state.userid = '',
            this.$store.state.authority = '',
            this.$store.state.name =''
        this.$router.push('/login')
      },
    }
  };
</script>

<style lang="less" scoped>

  .user-sidebar-container {
    //width: 100vw;
    //height: 100vh;
    //background-color: #111;
    .el-menu-user {
      margin: 0;

      .el-menu-item {
        padding: 0 10px;
        background: transparent !important;
        height: 54px !important;
        line-height: 52px;
        font-size: 13px;
        z-index: 10;
        //border-top: 2px solid transparent !important;
      }

      .el-menu-item.is-active {
        outline: none;
        /*box-shadow: 0px 0px 10px 2px rgba(100,100,100,0.1) inset;*/
        //background-color: rgba(251, 114, 153, 0.2) !important;
        background-color:  rgba(0, 161, 214, 0.1) !important;
        //color: #fb7299 !important;
        color: #00a1d6 !important;


        i {
          //color: #fb7299;
          color: #00a1d6 !important;
        }
      }
      .el-menu-item:focus {
        outline: none;
        /*box-shadow: 0px 0px 10px 2px rgba(100,100,100,0.1) inset;*/
        //background-color: rgba(251, 114, 153, 0.2) !important;
        background-color:  rgba(0, 161, 214, 0.1) !important;

        //color: #fb7299 !important;
        color: #00a1d6 !important;

        i {
          //color: #fb7299;
          color: #00a1d6 !important;
        }
      }

      .el-menu-item:hover {
        //background-image: linear-gradient(to bottom, rgba(251,114,153,0.1), rgba(255,255,255,1)) !important;
        background-color: rgba(251, 114, 153, 0.1) !important;
        background-image: none !important;
        color: #fb7299 !important;
        //border-top: 2px solid transparent !important;
        //border-top-color: #fb7299 !important;

        i {
          color: #fb7299!important;
        }
      }
    }
  }





</style>
