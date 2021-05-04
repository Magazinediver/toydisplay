<template>
  <div class="myorder-container">
    <div class="container">
      <el-row :gutter="15">

        <el-col :span="4">
          <el-card class="navigater" >
            <u-siderbar></u-siderbar>
          </el-card>
        </el-col>

        <el-col :span="20">
          <div class="product-body">
            <div class="product-head">
              <i class="iconfont "></i>
              <div class="breadcrumb">
                <el-breadcrumb separator="/">
                  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item><a href="/myspace">个人中心</a></el-breadcrumb-item>
                  <el-breadcrumb-item><a href="/myorder">我的订单</a></el-breadcrumb-item>
                  <el-breadcrumb-item>订单号</el-breadcrumb-item>
                </el-breadcrumb>
              </div>

              <div class="head-text">
                <img class="head-logo" src="../../assets/images/logo.png" alt="">
              </div>
            </div>

            <div class="product-body-main">
              <el-row :gutter="20">
                <el-col :span="24" :offset="0">
                  <div class="order-head-left">订单详情</div>
                  <div class="order-head-right">订单编号：<span>{{order.orderid}}</span></div>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="product-cards">
                <el-col :span="24" :offset="0">

                  <div class="product-card" v-for="(item,index) in order.products" :key="index">
                    <img class="product-card-img" :src="item.iurl" alt="">
                    <div class="product-card-container">
                      <el-col :span="9" :offset="0">
                        <p class="product-card-name">{{item.pname}}</p>
                        <p class="product-card-describe">{{item.pname}}</p>
                      </el-col>
                      <el-col :span="5" :offset="0">
                        <p class="product-card-price">单价：￥{{item.price}}</p>
                      </el-col>
                      <el-col :span="5" :offset="0">
                        <p class="product-card-num">数量:{{item.num}}</p>
                      </el-col>
                      <el-col :span="5" :offset="0">
                        <p class="product-card-prices">￥{{item.price*item.num}}</p>
                      </el-col>
                    </div>

                  </div>

                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>



  </div>

</template>

<script>
import uSiderbar from "@/components/user/UserSidebar";

export default {
  components:{
    uSiderbar
  },
  created() {
    // this.get_person_info()
  },
  data () {
    return {

      name: '黄驿涵',
      identity: '普通会员',
      radio1:'',

      queryInfo: {
        query: '',
      },



      order:{
        allprice: 0,
        orderid:"xff-2021-01",
        products:[
          {
            iurl:'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/102.jpg',
            price:1,
            pname:'奔波霸',
            num:'1',
          },
          {
            iurl:'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/103.jpg',
            price:2,
            pname:'霸波奔',
            num:'2',
          },
          {
            iurl:'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/104.jpg',
            price:3,
            pname:'波霸奔',
            num:'3',
          },
          {
            iurl:'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/105.jpg',
            price:4,
            pname:'波奔霸',
            num:'4',
          },
          {
            iurl:'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/106.jpg',
            price:5,
            pname:'奔霸波',
            num:'5',
          },
          {
            iurl:'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/107.jpg',
            price:6,
            pname:'霸奔波',
            num:'6',
          },
        ]
      },

      collect: [
        {
          id: 'NATTY-20210228-001',
          date: '2021/2/18 13:13:02',
          img: 'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/1.jpg',
          name: '水晶土',
          price: 58.50,
          num: 2,
          type: '彩色',
          describe: '水晶土/葱粉/渐变 50ml/罐',
          allprice: '132.00',
        },
        {
          id: 'NATTY-20210228-002',
          date: '2021/2/18 13:13:02',
          img: 'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/2.jpg',
          name: '橡皮蛇',
          price: 60.50,
          num: 2,
          type: '黄绿色',
          describe: '水晶蛇/葱粉/渐变 2根/吸卡',
          allprice: '140.00',
        },

      ],


    }
  },
  methods: {

    logout () {
      // 清空token
      window.sessionStorage.clear()
      this.$router.push('/login')
    },

    gotoOrderDetail(){
      this.$router.push('/orderdetail')
    }

    // get_person_info() {
    //   const { data: res } = await this.$http.get('/bilibili/up/allupmsg', {
    //     params: this.queryInfo
    //   })
    //   if (res.meta.status !== 200) {
    //     return this.$message.error('获取用户列表失败！')
    //   }
    //   this.uplist = res.data
    //   this.total = res.total
    //
    // },

  }
}
</script>

<style lang="less" scoped>

  .todo-item{
    padding-left: 10px;
  }

  div{
    box-sizing: border-box;
  }
  .myorder-container {
    padding: 20px;
    width: 100vw;
    background-color: #f6f6f6;

    .container {
      padding-bottom: 40px;
      width: 90vw;
      max-width: 1400px;
      margin: 0 auto;

      .navigater {
        padding: 0 !important;
        border: 0px !important;
        border-radius: 0px;
        box-shadow: none !important;
      }

      .product-body {
        background-color: #fff;
        padding: 20px 0;

        margin: 0 auto;
        //border: 1px solid #ccc;
        box-shadow: 0 0 5px 3px #eee;


        .product-head {
          height: 35px;
          border-bottom: 1px solid #eee;
          padding: 0 40px;

          .breadcrumb {
            float: left;

            .el-breadcrumb {
              margin: 0;
            }
          }

          .head-text {
            position: relative;
            width: 250px;
            height: 56px;
            float: right;
            color: #262626;

            font-size: 13px;
            //font-weight: bold;
            .head-logo {
              width: 190px;
              position: absolute;

              top: -15px;
              right: 0;
            }
          }

        }

        .product-body-main {


          padding: 30px 40px;
          min-height: 400px;
          //height: 700px;

          .order-head-left{
            float: left;
            color: #626262;
            font-weight: bold;
            font-size: 25px;
            line-height: 25px;
          }

          .order-head-right{
            float: right;
            color: #626262;
            font-size: 18px;
            line-height: 25px;
          }

          .product-cards{
            margin-top: 20px;
            border-top: 1px #f2f2f2 solid;
            .product-card{
              box-sizing: border-box;
              position: relative;
              padding: 10px 10px;
              height: 150px;
              border-bottom: 1px solid #f2f2f2;

              .product-card-img{
                float: left;
                width: 200px;
                height: 130px;
              }

              .product-card-container{
                float: left;
                width: calc(100% - 200px);
                .product-card-name{
                  margin: 13px 0 8px 0;
                  font-size: 15px;
                  line-height: 15px;
                  color: #262626;
                }

                .product-card-describe{
                  margin: 0 0 8px 0;
                  font-size: 12px;
                  line-height: 12px;
                  color: #999;
                }

                .product-card-price{
                  color: #262626;
                }

                .product-card-num{
                  color: #262626;
                }

                .product-card-prices{
                  color: #262626;
                }
              }


            }

            .product-card:hover{
              background-color: #f2f2f2;
            }
          }




        }


      }


    }
  }
</style>
