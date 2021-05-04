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
              <div class="breadcrumb">
                <el-breadcrumb separator="/">
                  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item><a href="/">个人中心</a></el-breadcrumb-item>
                  <el-breadcrumb-item>我的订单</el-breadcrumb-item>
                </el-breadcrumb>
              </div>


              <div class="head-text">
                <!--          <span style="margin-right: 5px">NATTY BOY</span>-->
                <!--          <span> I </span>-->
                <!--          <span style="margin-left: 5px">小飞飞玩具</span>-->
                <img class="head-logo" src="../../assets/images/logo.png" alt="">
              </div>
            </div>

            <div class="product-body-main">
              <el-row :gutter="20">
                <el-col :span="14" :offset="0">
                  <el-input
                      placeholder="请输入想搜索的内容"
                      v-model="state"
                      class="order-search"
                      @keyup.enter.native="searchbtnclick">
                    <el-button slot="append" @click="searchbtnclick()" icon="el-icon-search" class="search-button product-search-button">
                      搜索
                    </el-button>
                  </el-input>

                </el-col>


                <el-col :span="10">
                  <el-radio-group v-model="radio1">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="近1个月"></el-radio-button>
                    <el-radio-button label="近3个月"></el-radio-button>
                    <el-radio-button label="近1年"></el-radio-button>
                  </el-radio-group>
                </el-col>

              </el-row>

              <el-row :gutter="20" class="container">
                <el-col :span="24" :offset="0">



                  <el-tabs :tab-position="'right'" style="">
                    <el-tab-pane label="未确认">

                        <div class="order-panel" v-for="(item,index) in order" :key="index" @click="gotoOrderDetail">
                          <div class="pannel-heading">
                            <span class="order-id">{{item.id}}</span>
                            <span class="order-time">{{item.date}}</span>
                          </div>
                          <div class="pannel-body">
                            <div class="pbody">
                              <el-row :gutter="5">
                                <el-col :span="4">
                                  <div class="pimg">
                                    <img class="img" :src="item.img" alt="">
                                  </div>
                                </el-col>
                                <el-col :span="12">
                                  <div class="ptext">
                                    <p class="item-name">{{item.name}}</p>
                                    <p class="item-type">{{item.type}}</p>
                                    <p class="item-describe">{{item.describe}}</p>
                                  </div>
                                </el-col>
                                <el-col :span="6">
                                  <div class="pprice">
                                    <p class="price">￥{{item.price}}</p>
                                  </div>
                                </el-col>
                                <el-col :span="2">
                                  <div class="pnum">
                                    <p class="num">{{item.num}}</p>
                                  </div>
                                </el-col>
                              </el-row>
                            </div>
                          </div>
                          <div class="pannel-footer">
                            <div class="footer-left">
                              <span class="allprice">总计: </span>
                              <span class="price">{{item.allprice}}</span>
                            </div>
                            <div class="footer-right">
                              <button class="order-detail">订单详情</button>
                            </div>
                          </div>
                        </div>

                    </el-tab-pane>
                    <el-tab-pane label="已确认">

                        <div class="order-panel" v-for="(item,index) in order" :key="index">
                          <div class="pannel-heading">
                            <span class="order-id">{{item.id}}</span>
                            <span class="order-time">{{item.date}}</span>
                          </div>
                          <div class="pannel-body">
                            <div class="pbody">
                              <el-row :gutter="5">
                                <el-col :span="4">
                                  <div class="pimg">
                                    <img class="img" :src="item.img" alt="">
                                  </div>
                                </el-col>
                                <el-col :span="12">
                                  <div class="ptext">
                                    <p class="item-name">{{item.name}}</p>
                                    <p class="item-type">{{item.type}}</p>
                                    <p class="item-describe">{{item.describe}}</p>
                                  </div>
                                </el-col>
                                <el-col :span="6">
                                  <div class="pprice">
                                    <p class="price">￥{{item.price}}</p>
                                  </div>
                                </el-col>
                                <el-col :span="2">
                                  <div class="pnum">
                                    <p class="num">{{item.num}}</p>
                                  </div>
                                </el-col>
                              </el-row>
                            </div>
                          </div>
                          <div class="pannel-footer">
                            <div class="footer-left">
                              <span class="allprice">总计: </span>
                              <span class="price">{{item.allprice}}</span>
                            </div>
                            <div class="footer-right">
                              <button class="order-detail">订单详情</button>
                            </div>
                          </div>
                        </div>

                    </el-tab-pane>
                  </el-tabs>

                </el-col>
              </el-row>
              <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="queryInfo.pagenum"
                  :page-sizes="[ 4, 5, 6, 8]"
                  :page-size="queryInfo.pagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
              ></el-pagination>
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

      todoList: [

        '社长请于6月13日在理四306集合开会',
        '社团招新活动将在6月20号举办',
        '社长请于6月13日在理四306集合开会',
        '社团招新活动将在6月20号举办',
        '社长请于6月13日在理四306集合开会',
      ],
      historyList: [

        '社长请于6月13日在理四306集合开会',
        '社团招新活动将在6月20号举办',
        '社长请于6月13日在理四306集合开会',
        '社团招新活动将在6月20号举办',
        '社长请于6月13日在理四306集合开会',
      ],

      order: [
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


          padding: 20px 40px;
          min-height: 400px;
          //height: 700px;

          .order-search{
            margin-top: 1px;
          }

          .container{
            margin-top: 20px;
            width: 100%;




              .order-panel{
                background-color: #f6f6f6;
                margin: 0px 15px 15px 0px;

                border-radius: 5px;
                border: #ddd solid 1px;

                .pannel-heading{
                  height: 40px;
                  border-bottom: #ccc solid 1px;


                  .order-id{
                    float: left;

                    color: #111111;
                    margin-left: 15px;
                    font-size: 12px;
                    line-height: 40px;
                  }

                  .order-time{
                    float: right;

                    color: #111111;
                    margin-right: 15px;
                    font-size: 12px;
                    line-height: 40px;
                  }

                }

                .pannel-body{
                  height: 100px;
                  background-color: #fff;

                  border-bottom: #ccc solid 1px;
                  .pbody{

                    .pimg{
                      .img{
                        width: 150px;
                        height: 90px;

                        margin: 5px 0 5px 5px;
                      }
                    }

                    .ptext{
                      margin-left: 40px;
                      .item-name{
                        font-size: 14px;
                        line-height: 14px;
                        margin: 18px 0 0 0;
                      }
                      .item-type{
                        position: absolute;

                        color: #fff;
                        font-weight: bold;
                        font-size: 12px;
                        line-height: 12px;
                        margin: 7px 0 0 0;
                        padding: 4px 5px;

                        border-radius: 4px;
                        background-color: #73C9E5;
                      }
                      .item-describe{
                        font-size: 12px;
                        line-height: 12px;

                        color: #999;

                        margin-top: 34px;
                      }

                    }

                    .pprice{
                      .price{
                        color: #ff0000;
                      }
                    }

                    .pnum{
                      .num{
                      }
                    }

                  }
                }

                .pannel-footer{
                  height: 54px;
                  padding: 10px;

                  .footer-left{
                    position: absolute;
                    margin-top: 6px;
                    margin-left: 5px;

                    .allprice{
                      color: #111111;
                      font-size: 14px;
                      line-height: 14px;
                    }
                    .price{
                      color: #ff0000;
                      font-size: 14px;
                      line-height: 14px;
                    }
                  }

                  .footer-right{
                    float: right;
                    .order-detail{
                      width: 90px;
                      height: 36px;
                      margin-top: -1px;

                      border-radius: 4px;
                      border: 1px solid #ccc;
                      background-color: #fff;
                    }

                    .order-detail:hover{
                      background-color: #eee;
                    }

                    .order-detail:active{
                      background-color: #ccc;

                    }

                    .order-detail:focus{
                      border: 1px solid #aaa!important;
                      outline: none;
                    }
                  }

                  .footer-right:focus{
                    outline: none;
                  }

                }
              }



            }




        }


      }


    }
  }
</style>
