<template>
  <div class="head">
    <div class="head_container">
      <div class="menu-bar">
        <!-- logo -->
        <div class="logo">
          <img class="left_logo" src="../../assets/images/nattyboy.png" alt @click="gotoHome"/>
          <img class="right_logo" src="../../assets/images/logo.png" alt @click="gotoHome" />
        </div>

        <!-- 中置菜单 -->
        <el-menu
            :default-active="onRoutes"
            class="el-menu-header"
            mode="horizontal"
            router
            text-color="#262626"
            active-text-color="#00A1D6"
        >
          <el-menu-item index="home">首页</el-menu-item>

          <el-menu-item index="News">
            <!--        <a href="https://www.ele.me" target="_blank">订单管理</a>-->
            新闻中心
          </el-menu-item>
          <el-menu-item index="aboutUs">
            <!--        <a href="https://www.ele.me" target="_blank">订单管理</a>-->
            关于我们
          </el-menu-item>
          <el-menu-item index="contactUs">
            <!--        <a href="https://www.ele.me" target="_blank">订单管理</a>-->
            联系我们
          </el-menu-item>
        </el-menu>

      </div>

      <!-- 导航栏右侧组件 -->
      <div class="header-right">
        <!-- 搜索框 -->
        <div class="search-box">
          <!-- 历史记录及搜索推荐 -->
<!--          <div class="search-pannel" v-if="(isdisplay_history || isdisplay_rec) && isActive && isFocus">-->
<!--            &lt;!&ndash; 历史记录部分 &ndash;&gt;-->
<!--            <div class="pannel history-list" v-if="isEmpty && isdisplay_history" :key="history">-->
<!--              <div class="lists">-->
<!--                <ul class="list" v-for="(item,index) in list.history" :key="index">-->
<!--                  <li class="item">-->
<!--                    <a class="search-history" @click="gosearch($event)">{{item}}</a>-->
<!--                    <i class="delete-history iconfont iconcha" @click="deletehistory($event)"></i>-->
<!--                  </li>-->
<!--                </ul>-->
<!--                <div class="title">-->
<!--                  <span @click="deletehistory" class="delete-all-history">清空历史记录</span>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            &lt;!&ndash; 系统推荐部分 &ndash;&gt;-->
<!--            <div class="pannel recommend-list" v-else-if="isdisplay_rec" :key="history">-->
<!--              <ul class="list" v-for="(item,index) in list.recommand" :key="index">-->
<!--                <li class="item">-->
<!--                  <a class="search-history" @click="gosearch($event)">{{item}}</a>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </div>-->

<!--          </div>-->
          <!-- 搜索框 -->
          <el-input v-if="isActive" placeholder="请输入想搜索的内容" style="width: 250px;" v-model="queryInfo.query" class="wider" @keyup.enter.native="searchbtnclick"  @focus="focussearch"  @blur="inputClose">
<!--          <el-input v-if="!isActive" placeholder="请输入想搜索的内容" style="width: 250px;" v-model="queryInfo.query" class="wider" @keyup.enter.native="searchbtnclick" @blur="inputClose">-->
            <el-button slot="append" @click="searchbtnclick()" icon="el-icon-search" class="home-search-button allsearch-button">
              搜索
            </el-button>
          </el-input>
           <!-- 搜索图标 -->
          <i v-else class="el-icon-search search-button" @click="inputOpen"></i>
        </div>
        <!-- 产品中心按钮 -->
        <div class="dis-center" @click.stop="collapseOpen" :class="{displayopen : this.$store.state.collapse}">
          <p class="el-submenu-title">产品中心</p>
          <i style="color: #262626" v-if="!this.$store.state.collapse" class="iconfont iconarrow-down-bold"></i>
          <i style="color: #262626" v-else class="iconfont iconarrow-up-bold"></i>
        </div>
        <!-- 产品中心菜单 -->
        <transition name="product-animate">
          <div v-if="this.$store.state.collapse" class="productlist" :class="{searchopen : isActive}">
            <div class="nav-group" v-for="(item,index) in nav" :key="index">
              <div class="nav-heading">
                {{item.name}}
              </div>
              <ul class="nav-list">
                <li class="nav-item" v-for="(nav_item,index) in item.items" :key="index" >
                  <a href="https://www.baidu.com">{{nav_item.item}}</a>
                </li>
              </ul>
            </div>
            <div class="product-bar">
              <div class="goto-product" @click="gotoProduct">
                <p>查看产品中心</p>
                <i class="iconfont iconarrow-right-bold"></i>
              </div>
            </div>
          </div>
        </transition>


        <div class="header-user-con">
          <!-- 全屏显示 -->

          <div class="btn-cart" @click="handleShowCart">
            <el-badge :value="carts.products.length" class="item">
              <i class="iconfont iconshouye header-cart-icon"></i>
            </el-badge>
          </div>

          <div class="btn-fullscreen" @click="handleFullScreen">
            <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
              <i class="el-icon-rank"></i>
            </el-tooltip>
          </div>
          <!-- 用户名下拉菜单 -->
          <el-dropdown class="user-name" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{userid}}
          <i class="el-icon-caret-bottom"></i>
        </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="this.userid !== '未登录'" command="myspace">个人中心</el-dropdown-item>
              <el-dropdown-item v-if="this.authority === 'admin'" command="chome">控制台</el-dropdown-item>
              <el-dropdown-item v-if="this.userid !== '未登录'" command="logout">退出登录</el-dropdown-item>
              <el-dropdown-item v-if="this.userid === '未登录'" command="login">登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- 用户头像 -->
          <div class="user-avator">
            <img src="../../assets/images/avator_1.jpeg" />
          </div>
        </div>
      </div>
      <!--    <div class="header-line"></div>-->


    </div>
    <el-drawer
        title="我是标题"
        :visible.sync="cartcollapse"
        :direction="direction"
        :with-header="false">

      <div class="drawer-header">
        <div class="drawer-header-left">
          <div class="badage-container">
            <el-badge :value="carts.products.length" class="item">
              <i class="iconfont iconshouye drawer-cart-icon"></i>
            </el-badge>
          </div>
          <span class="drawer-cart-text">购物车</span>
        </div>

        <div class="drawer-header-right">
          <div class="drawer-close-container" @click="handleCloseCart">
            <i class="iconfont iconarrow-right-bold drawer-close"></i>
          </div>
          <div class="delete-all-container" @click="handleDeletAll">
            <i class="iconfont iconlajitongshanchu drawer-trash"></i>
            <span class="delete-all">一键清空</span>
          </div>
        </div>
      </div>

      <div class="drawer-body">
        <div class="cart-card" v-for="(item,index) in carts.products" :key="index">
          <img class="cart-card-img" :src="item.iurl" alt="">
          <p class="cart-card-name">{{item.pname}}</p>
          <p class="cart-card-price">￥{{item.price}}</p>
          <el-input-number class="cart-card-num" size="mini" @change="handleChange" v-model="item.num" :min="1" :max="10" label="描述文字"></el-input-number>
          <i class="iconfont iconcha1 close-cart-card" @click="handleDeleteProduct(item.productid)"></i>
        </div>
      </div>

      <div class="drawer-footer">
        <div class="drawer-allprice">
          <span class="all">合计:</span>
          <span class="price">￥{{carts.allprice}}</span>
        </div>
        <div class="create-order-button">
          生成订单
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import bus from '../../assets/javascript/bus.js';
  export default {
    name: "Header",
    data(){
      return{
        userid: '',
        name:'',
        authority:'',
        isActive: false,//搜索框是否弹出
        isFocus: false,//搜索框是否被选中
        isEmpty: true, //搜索框是否为空，空true，显示历史搜索，非空false，显示搜索推荐
        isdisplay_history: false,//历史记录为空则不显示，不为空则显示
        isdisplay_rec: true,//推荐为空则不显示，不为空则显示

        fullscreen: false,

        direction: 'rtl',
        cartcollapse: false,

        nav: [
          {name:'订购指南',items:[{item:"如何订购"},{item:"大订单询价"},{item:"销售条款"},{item:"付款方式"},]},
          {name:'参考资料',items:[{item:"质检报告"},{item:"玩具游玩安全说明书"},{item:"产品目录下载"}]},
          {name:'服务支持',items:[{item:"配送发货"},{item:"运费说明"},{item:"收货需知"},{item:"发票说明"},{item:"退换货政策"},]},
          {name:'产品中心',items:[{item:"水球"},{item:"史莱姆"},{item:"水晶土"},{item:"弹跳弹射玩具"},{item:"仿真玩具"},{item:"文具类玩具"},{item:"节日类玩具"}]},
          {name:'企业信息',items:[{item:"公司简介"},{item:"新闻中心"},{item:"加入我们"}]}
        ],

        deleteform:{
          productid:''
        },

        carts:{
          allprice: 0,
          products:[
            // {
            //   iurl:'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/102.jpg',
            //   price:1,
            //   pname:'奔波霸',
            //   num:'1',
            // },
            // {
            //   iurl:'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/103.jpg',
            //   price:2,
            //   pname:'霸波奔',
            //   num:'2',
            // },
            // {
            //   iurl:'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/104.jpg',
            //   pprice:3,
            //   name:'波霸奔',
            //   num:'3',
            // },
            // {
            //   iurl:'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/105.jpg',
            //   pprice:4,
            //   name:'波奔霸',
            //   num:'4',
            // },
            // {
            //   iurl:'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/106.jpg',
            //   pprice:5,
            //   name:'奔霸波',
            //   num:'5',
            // },
            // {
            //   iurl:'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/107.jpg',
            //   pprice:6,
            //   name:'霸奔波',
            //   num:'6',
            // },
          ]
        },

        list : {
          recommand:['仙王的日常生活','周深','淡黄的长裙','世卫组织'],
          history: ['青春有你2','星游记','特朗普','老番茄','世卫组织'],
        },

        queryInfo:{
          query: '',
          isSetHisNull: 'false',
        },
      }
    },
    created() {
      // if(this.$store.state.name !== null)
      // {
      //   this.userid = this.$store.state.name
      // }
      this.userid = window.sessionStorage.getItem('userid')
      this.name = window.sessionStorage.getItem('name')
      this.authority = window.sessionStorage.getItem('authority')

      if(this.userid === '' || this.userid === null){
        this.userid = '未登录'
      }else{
        this.getUserCart();
      }

      console.log(this.userid)

    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    },
    methods:{
      gotoHome(){

        this.$router.push('/home');
      },


      searchbtnclick(){
        this.$router.push('/product');
        this.$store.state.query = this.queryInfo.query
      },
      // 菜单的折叠与展开
      // collapseChange() {
      //   this.collapse = !this.collapse;
      //   // bus.$emit('collapse', this.collapse);
      // },

      collapseOpen() {
        this.$store.state.collapse = !this.$store.state.collapse;
        // console.log(this.$store.state.collapse)
      },

      // collapseClose() {
      //   this.$store.state.collapse = false;
      //   // bus.$emit('collapse', this.collapse);
      // },

      inputOpen() {
        this.isActive = true;
        // this.isFocus = true;
        // bus.$emit('collapse', this.collapse);
      },
      inputClose() {
        this.isActive = false;
        this.isFocus = false;
        // bus.$emit('collapse', this.collapse);
      },

      gotoProduct() {
        this.$router.push('/products');
      },

      gosearch(e){
        this.$router.push('/product');
        this.$store.state.query = e.currentTarget.innerHTML
      },
      deletehistory(e){
        this.$store.state.query = e.currentTarget.innerHTML
      },
      focussearch(){
        this.isFocus = true
      },

      handleCommand(command) {
        if (command === 'logout') {
          window.sessionStorage.clear()
          this.$store.state.userid = '',
          this.$store.state.authority = '',
          this.$store.state.name =''
          this.$router.push('/login');
        }

        if (command === 'login') {
          window.sessionStorage.clear()
          this.$store.state.userid = '',
          this.$store.state.authority = '',
          this.$store.state.name =''
          this.$router.push('/login');
        }
        if (command === 'myspace') {
          this.$router.push('/myspace');
        }
        if (command === 'chome') {
          this.$router.push('/chome');
        }
      },

      handleCloseCart(){
        this.cartcollapse = false;
        // console.log(this.cartcollapse)
      },

      handleShowCart(){
        if(this.userid === '' || this.userid === null){
          return this.$message.error('购物车要登录后才能查看哦！')
        }else{
          this.cartcollapse = true;
          this.getUserCart();
        }

        // console.log(this.cartcollapse)
      },

      handleDeletAll(){
        this.$confirm('确认清空购物车？')
            .then(_ => {
              this.carts.products = []
              // done();
            })
            .catch(_ => {});

      },

      async handleDeleteProduct(pid) {
        this.deleteform.productid = pid
        const {data: res} = await this.$http.post('/xfftoy/deleteProductInCart',
            this.deleteform
        )
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getUserCart()

        return this.$message.success('已删除您选中的物品！')
      },

      handleChange(){
        this.allprice()
      },

      // handleClose(done) {
      //   this.$confirm('确认关闭？')
      //       .then(_ => {
      //         done();
      //       })
      //       .catch(_ => {});
      // },

      handleFullScreen() {
        let element = document.documentElement;
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      },

      allprice(){
        let sum = 0
        let a = this.carts.products

        a.forEach((item) => {
          //遍历prodAllPrice这个字段，并累加
          sum += item.price*item.num;
        });
        this.carts.allprice = sum
        // console.log(this.carts.allprice)
      },

      async clearHistory(){

      },

      async getUserCart() {
        this.userid = window.sessionStorage.getItem('userid')

        const {data: res} = await this.$http.get('/xfftoy/getUserCart',
        )
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.carts = res.data

        // return this.$message.success('已获取您的购物车记录！')
      },

      async searchProduct(){
        const { data: res } = await this.$http.get('/bilibili/video/videomsg', {
          params: this.queryInfo
        })
        if (res.meta.status !== 200) {
          return this.$message.error('获取视频列表失败！')
        }
        this.videolist = res.data
        this.total = res.total
        this.query = this.queryInfo.query
        return this.$message.success('获取视频成功！')
      },

      login () {
        // 清空token
        window.sessionStorage.clear()
        this.$store.state.userid = '',
            this.$store.state.authority = '',
            this.$store.state.name =''
        this.$router.push('/login')
      },

      logout () {
        // 清空token
        window.sessionStorage.clear()
        this.$store.state.userid = '',
        this.$store.state.authority = '',
        this.$store.state.name =''
        this.$router.push('/login')
      },
    },
    mounted() {
      this.allprice();
    }
  }
</script>

<style lang="less">

.search-box{
  .el-input__inner{
    height: 40px;
  }
  .el-input-group__append{
    border: none;
    background-color: transparent!important;

    //.home-search-button{
    //  margin-bottom: 0px;
    //  height: 36px!important;
    //  border-radius: 0 5px 5px 0;
    //
    //}


  }


}

</style>



<style scoped lang="less">

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: rgba(240, 240, 240, 1);
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
  border-radius: 10px;
  background-color: #ccc;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {

  border-radius: 10px;
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
  background-color: rgba(251, 114, 153,0.8);
}

  .head{
    width: 100vw;
    background-color: #fff;

    //border-bottom: 1px solid #ddd;
    .head_container {
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      width: 90vw;
      max-width: 1600px;
      padding: 0 5vw;
      margin: 0 auto;
      align-items: center;
      color: #fb7299;
      font-size: 13px;
      height: 54px;

      .menu-bar {
        display: flex;
        align-items: center;

        .logo {
          display: flex;
          align-items: center;
          height: 40px;

          .left_logo {
            padding-top: 3px;
            margin-top: 2px;
            height: 50px;
          }

          .right_logo {
            height: 40px;
            margin-top: 2px;
            margin-left: 5px;
          }
        }

        //左侧导航菜单栏
        .el-menu--horizontal {
          margin-left: 10px;
          border-bottom: 1px solid transparent!important;
          //菜单栏单项
          .el-menu-item {
            padding: 0 10px;
            background: transparent !important;
            height: 54px !important;
            line-height: 52px;
            font-size: 13px;
            z-index: 10;
            border-top: 2px solid transparent !important;
          }

          .el-menu-item:focus {
            background: transparent !important;
          }

          .el-menu-item.is-active {
            //border-top: 1px solid transparent !important;
            //border-top-color: #fb7299 !important;

            border-bottom: 2px solid transparent!important;
            border-top: 2px solid rgba(0, 161, 214, 1) !important;
            background-color: rgba(0, 161, 214, 0.1) !important;
          }

          .el-menu-item:hover {
            //background-image: linear-gradient(to bottom, rgba(251,114,153,0.1), rgba(255,255,255,1)) !important;
            background-color: rgba(251, 114, 153, 0.1) !important;
            color: #fb7299 !important;
            border-top: 2px solid transparent !important;
            border-top-color: #fb7299 !important;
          }


          }
        }

        .header-right {
          display: flex;
          margin-top: 2px;


          .search-box{
            display: flex;
            align-items: center;
            margin-top: 2px;
            margin-right: 5px;



            .wider{
              animation: move 0.5s forwards;
              @keyframes move{
                0%{width:250px;}
                100%{width: calc(50vw - 350px);}
              }
              width: 30vw;
              max-width: 720px;


            }
            .el-input{
              border-radius: 0px!important;
            }

            .el-input-group__append{


              background-color: #fb7299!important;
              color: white !important;
            }
            .allsearch-button{
              border-radius: 0 5px 5px 0;
              height: 40px;
              background-color: #fb7299 !important;
              color: white !important;
            }

            .allsearch-button:hover{
              //border: rgba(251, 114, 153, 0.5) 1px solid!important;
              //color: #ff7299!important;
              //background-color: rgba(251, 114, 153, 0.1) !important;
              background-color: rgba(251, 114, 153, 1)!important;
              color: white !important;
            }

            .search-button{
              font-size: 16px;
              color: #262626;
            }

            .search-button:hover{
              color: #fb7299;
            }



          //.search-pannel{
          //  //margin-top: 38px;
          //
          //  .pannel{
          //    width: calc(50vw - 447px);
          //    //height: 300px;
          //
          //
          //    //border-bottom: solid #DCDFE6 1px;
          //    //border-left: solid #DCDFE6 1px;
          //    //border-right: solid #DCDFE6 1px;
          //    border-bottom: solid #00A1D7 1px;
          //    border-left: solid #00A1D7 1px;
          //    border-right: solid #00A1D7 1px;
          //
          //    border-radius: 0 0 5px 5px;
          //
          //    margin-top: 14px;
          //    background-color: #fff;
          //    position: absolute;
          //
          //
          //    z-index: 20;
          //  }
          //
          //  .history-list{
          //
          //    .lists{
          //
          //      .list{
          //        padding: 6px 0 6px 15px;
          //        margin: 0;
          //
          //        list-style: none;
          //
          //        .search-history{
          //          color: #626262;
          //        }
          //        .delete-history{
          //          float: right;
          //          color: #ddd;
          //
          //          margin-right: 15px;
          //          font-size: 6px;
          //        }
          //
          //        .delete-history:hover{
          //          color: #aaa;
          //        }
          //      }
          //
          //      .list:hover{
          //        background-color: #f2f2f2;
          //      }
          //
          //      .title{
          //
          //        span{
          //          float: right;
          //          line-height: 30px;
          //          padding: 2px 15px 2px 5px;
          //          color: #777;
          //        }
          //      }
          //    }
          //
          //
          //
          //  }
          //
          //  .recommend-list{
          //    .list{
          //      padding: 6px 0 6px 15px;
          //      margin: 0;
          //
          //      list-style: none;
          //      .item{
          //        .search-history{
          //          color: #626262;
          //        }
          //      }
          //    }
          //    .list:hover{
          //      background-color: #f2f2f2;
          //    }
          //  }
          //}

          }

          .dis-center {
            display: flex;
            flex-direction: row;
            width: fit-content;
            height: 54px;
            align-items: center;
            padding: 0 10px;
            border-top: 2px solid transparent !important;

            .el-submenu-title {
              height: 54px;
              line-height: 53px;
              font-size: 13px;
              z-index: 10;
              color: #262626;
            }

            .el-submenu-title:hover {
              color: #fb7299;
            }


            i {
              color: #fb7299;
              font-size: 16px;
              z-index: 10;
              padding-left: 10px;
              line-height: 54px;
              border-top: 1px solid transparent !important;
            }

          }

          .dis-center:hover {
            color: #fb7299 !important;
            border-top: 2px solid transparent !important;
            border-top-color: #fb7299 !important;
            background-color: rgba(251, 114, 153, 0.1);
          }

          .dis-center:hover i{
            color: #fb7299 !important;
          }
          .dis-center:hover p{
            color: #fb7299 !important;
          }

          .productlist{
            position: absolute;

            width: 1230px;
            display: block;
            background-color: #f2f2f2;
            //background-color: #fff;
            //居中显示
            //margin-left: calc(-1 * ((1230px + (100% - 1230px)/2) - 330px));

            //侧贴显示
            margin-left: calc(-1 * (5% + 1230px - 320px));

            margin-top: 56px;
            //padding-bottom: 20px;

            border-style: solid;
            border-width: 1px 1px 2px;
            border-color: rgba(0,0,0,0.05) rgba(0,0,0,0.05) #000000;
            z-index: 50;

            //animation: fadeIn 30s cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
            //-webkit-animation: fadeIn 30s cubic-bezier(0.68, -0.55, 0.265, 1.55);

            .nav-group{
              display: block;
              min-height: 1px;
              float: left;
              vertical-align: text-top;
              padding: 0%;
              //border-right: #ccc 1px solid;
              //width: 10%;

              .nav-heading{
                color: #262626;
                width: 180px;
                font-size: 15px;
                line-height: 20px;
                padding: 18px 30px 18px 24px;
                font-weight: 600;
              }


              .nav-list{
                font-size: 11px;
                line-height: 16px;
                margin-top: 0;
                padding-left: 0;
                list-style: none;

                .nav-item{
                  padding: 12px 0 12px 24px;

                  a{
                    color: #262626;
                    text-decoration: none;
                  }
                }
                .nav-item:hover{
                  //text-decoration: underline;
                  background-color: #e6e6e6;
                }
              }
            }
            .product-bar{
              background-color: #e6e6e6;
              //background-color: rgba(0, 161, 214, 0.1);
              display: inline-block;
              height: 40px;
              float: left;
              width: 100%;

              .goto-product{
                width: fit-content;
                margin: 0 auto;
                text-align: center;
                display: flex;

                p{
                  color: #262626;
                  line-height: 40px;
                  padding: 0;
                  margin: 0;
                }

                i{
                  margin-left: 5px;
                  color: #777;
                  line-height: 40px;
                }

              }


            }
          }

          .searchopen{
            margin-left: calc(-1 * (5% + 1230px - 320px) + (50vw - 350px));

          }

          .displayopen{
            background-color: rgba(0, 161, 214, 0.1) !important;
            border-top: 2px solid transparent !important;
            border-top-color: #00a1d6 !important;
          }

          .displayopen:hover{
            p{
              color: #00a1d6!important;
            }
            i{
              color: #00a1d6!important;
            }
            background-color: rgba(0, 161, 214, 0.1) !important;
            border-top: 2px solid transparent !important;
            border-top-color: #00a1d6 !important;
          }

          .btn-cart {
            display: flex;
            align-items: center;
            margin: 2px 5px 0 5px;
            color: #262626;
          }

          .btn-cart:hover {
            color: #fb7299;
          }


          .btn-fullscreen {
            display: flex;
            align-items: center;
            margin: 2px 5px 0 5px;
            color: #262626;
          }

          .btn-fullscreen:hover {
            color: #fb7299;
          }

          .user-avator {
            display: flex;
            height: 54px;
            justify-content: center;
            align-items: center;

            img {
              display: block;
              width: 35px;
              height: 35px;
              margin-top: -2px;
              padding: 0 10px;
              border-radius: 50%;
            }
          }

          .user-name {
            margin-top: -2px;

            .el-dropdown-link {
              color: #262626;
              font-size: 13px;
              cursor: pointer;
            }
          }

          .user-name:hover{
            span{
              color: #fb7299;
            }

          }

        }

        .header-line {
          position: absolute;
          top: 54px;
          left: 0;
          width: 100%;
          height: 2px;
          background-image: linear-gradient(to right, #00a1d6, #fb7299);
        }
      }

  }



  .product-animate-enter,.product-animate-leave-to{
    opacity: 0;
  }
  .product-animate-enter-to,.product-animate-leave{
    opacity: 1;
  }
  .product-animate-enter-active,.product-animate-leave-active{
    transition: all 0.5s;
  }


  .el-menu--popup-bottom-start{
    .el-menu-item:hover {
      //background-image: linear-gradient(to bottom, rgba(251,114,153,0.1), rgba(255,255,255,1)) !important;
      color: #fb7299 !important;
      background-color: rgba(251, 114, 153, 0.1) !important;
      //border-top: 1px solid transparent !important;
      //border-top-color: #fb7299 !important;
    }
  }


  .el-dropdown-menu__item {
    text-align: center;
  }

  .header-user-con {
    display: flex;
    margin-top: 2px;
    height: 54px;
    align-items: center;
  }

  //.btn-fullscreen {
  //  position: relative;
  //  width: 30px;
  //  height: 30px;
  //  line-height: 54px;
  //  text-align: center;
  //  border-radius: 15px;
  //  cursor: pointer;
  //}

  .el-icon-rank{
    transform: rotate(45deg);
    font-size: 24px;
  }

  .header-cart-icon{
    font-size: 22px;
  }

  @media screen and (max-width: 1300px) {
    .productlist{
      width: 800px !important;
      margin-left: calc(-1 * (5% + 800px - 320px)) !important;

    }
  }

  @media screen  and (max-width: 1179px) {
    .head_container{
      .el-menu-header{
        display: none;
      }
    }

    .search-box{
      display: none !important;
    }

    .btn-cart{
      display: none !important;
    }

    .btn-fullscreen{
      display: none !important;
    }


  }

  @media screen and (max-width: 820px) {
    .productlist{
      width: 600px !important;
      margin-left: calc(-1 * (5% + 600px - 320px)) !important;

    }

  }

  @media screen and (max-width: 620px) {
    .dis-center{
      display: none!important;
    }

    .productlist{
      display: none!important;
    }

  }

  .drawer-header{
    position: absolute;
    width: 100%;
    height: 58px;

    box-sizing: border-box;
    background-color: #eee;
    z-index: 10;

    .drawer-header-left{
      box-sizing: border-box;

      .drawer-cart-text{
        position: absolute;


        box-sizing: border-box;

        padding-left: 80px;

        line-height: 58px;
        font-size: 28px;
        color: #626262;
      }

      .badage-container{
        position: absolute;
        top: 10px;
        left: 15px;

        .drawer-cart-icon{
          color: #00A1D7;

          font-size: 56px;
          //font-weight: bold;
          line-height: 50px;
        }
      }



    }

    .drawer-header-right{
      float: right;

      height: 58px;

      .delete-all-container{
        float: right;
        padding: 0 15px 0 5px;
        .drawer-trash{
          color: #626262;
          font-size: 16px;
          margin-right: 5px;
          line-height: 58px;
        }
        .delete-all{
          color: #626262;
          font-size: 16px;
          line-height: 58px;
        }
      }

      .delete-all-container:hover .delete-all {
        color: #fb7299;
      }

      .delete-all-container:hover .drawer-trash {
        color: #fb7299;
      }

      .delete-all-container:active{
        background-color: rgba(0,0,0,0.05);
      }


      .drawer-close-container{
        float: right;
        padding: 0 10px 0 12px;
        background-color: #fb7299;

        .drawer-close{

          color: #fff;
          font-size: 20px;
          line-height: 58px;
        }
      }

      .drawer-close-container:hover{
        background-color: #fa5282;
      }


    }


  }

  .drawer-body{
    position: absolute;
    overflow-y: auto;

    width: 100%;
    top: 58px;
    height: calc(100% - 136px);
    background-color: #fafafa ;
    padding: 20px;

    z-index: 11;

    .cart-card{
      position: relative;
      z-index: 12;
      max-width: 90%;
      height: fit-content;
      margin: 0 auto 10px;
      padding: 10px;

      border: 1px solid #eee;
      border-radius: 20px;
      background-color: #fff;
      line-height: 0;

      .cart-card-img{

        width: 50%;
        border-radius: 12px;
        border: 1px solid #eee;

      }

      .cart-card-name{
        position: absolute;

        top: 10px;
        left: 54%;
        margin: 10px 0;
        padding: 0;

        font-size: 20px;
        color: #626262;

      }

      .cart-card-price{
        position: absolute;

        font-size: 16px;
        line-height: 16px;
        padding: 0;
        margin: 7px 0;

        bottom: 10px;
        left: 54%;
        z-index: 14;
      }

      .cart-card-num{
        position: absolute;
        width: 90px;

        bottom: 10px;
        right: 20px;
        z-index: 13;
      }


      .close-cart-card{
        display: none;
      }

    }

    .cart-card:hover{
      border: 1px solid rgba(251, 114, 153, 0.6);

      .close-cart-card{
        display: block;
        position: absolute;
        color: #fa89a9;

        top: 20px;
        right: 15px;
      }

      .close-cart-card:hover{
        color: #fb7299;
      }

      .close-cart-card:active{
        color: #fa5282;
      }
    }


  }

  .drawer-footer{
    position: absolute;

    bottom: 0;

    height: 78px;
    width: 100%;

    background-color: #eee;

    z-index: 12;


    .drawer-allprice{
      float: left;
      margin-left: 15px;



      .all{
        color: #262626;
        font-size: 20px;

        line-height: 78px;
      }

      .price{
        font-size: 22px;
        line-height: 78px;
      }

    }

    .create-order-button{
      -webkit-user-select:none;
      -moz-user-select:none;
      -ms-user-select:none;
      user-select:none;
      margin-top: 10px;
      margin-bottom: 10px;

      float: right;
      margin-right: 15px;

      display: flex;
      height: 58px;
      width: 160px;
      border-radius: 29px;
      background-color: #fb7299;
      color: #fff;
      align-items: center;
      justify-content: center;
      line-height: 58px;
      font-size: 20px;
      font-weight: bold;
      letter-spacing:1px
    }


    .create-order-button:hover{
      background-color: #ef5f88;
    }

    .create-order-button:active{
      background-color: #fa5282;

      //height: 56px;
      width: 156px;
      right: 16px;
      //border: 1px solid #eee;
      //font-size: 19.5px;
    }
  }
</style>
