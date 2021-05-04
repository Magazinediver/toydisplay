<template>
  <div class="user-container">
    <div class="container">
      <el-row :gutter="15">
        <el-col :span="4">
          <el-card class="navigater" >
            <u-siderbar></u-siderbar>
          </el-card>
        </el-col>

        <el-col :span="20">
          <div class="user-card">
            <el-row :gutter="15">
              <el-col :span="16">
                <el-card class="info-top-left"  shadow="hover" >
                  <img class="user-avator" src="~assets/images/avator_1.jpeg" alt />
                  <div class="user-info">
                    <p class="user-info-name">{{name}}</p>
                    <p class="user-info-identity">{{identity}}</p>
                  </div>
                </el-card>
              </el-col>

              <el-col :span="8">
                <el-card class="info-top-right"  shadow="hover" >
                  <div class="user-address">
                    <i class="user-address-icon iconfont icondizhi"></i>
                    <p class="user-address-text">收货地址</p>

                  </div>
                  <div class="logout" @click="logout">
                    <i class="logout-icon iconfont icontuichu"></i>
                    <p class="logout-text">退出登录</p>
                  </div>

                </el-card>
              </el-col>

            </el-row>

            <el-row :gutter="20">
              <el-col :span="16">
                <el-card class="orders-panel" shadow="hover">
                  <div class="panel-des">
                    <span class="my-order">我的订单</span>
                    <a class="more-order" @click="gotoMyOrder">全部订单
                      <i class="more-order-icon iconfont iconarrow-right-bold"></i>
                    </a>
                  </div>

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
                </el-card>

                <el-card class="collect-panel" shadow="hover">
                  <div class="panel-des">
                    <span class="my-order">我的收藏</span>
                    <a class="more-order">全部收藏
                      <i class="more-order-icon iconfont iconarrow-right-bold"></i>
                    </a>
                  </div>

                  <div class="order-panel" v-for="(item,index) in collect" :key="index">
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
                  </div>
                </el-card>
              </el-col>

              <el-col :span="8">
                <el-card class="message-panel" shadow="hover">
                  <div slot="header" class="clearfix">
                    <span style="font-size: 20px;font-weight: bold;line-height: 20px">公告</span>
                  </div>
                  <el-table :show-header="false" :data="noticeList" style="width:100%;height:300px;margin-top: 0px!important;">
                    <el-table-column>
                      <template slot-scope="scope">
                        <div
                            class="todo-item"
                            :class="{'todo-item-del': scope.row.status}"
                        >{{scope.row}}</div>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-card>

                <el-card class="history-panel" shadow="hover">
                  <div slot="header" class="clearfix">
                    <span style="font-size: 20px;font-weight: bold;line-height: 20px">历史足迹</span>
                  </div>
                  <el-table :show-header="false" :data="historyList" style="width:100%;height:300px;margin-top: 0px;overflow: auto!important;">
                    <el-table-column>
                      <template slot-scope="scope">
                        <div
                            class="todo-item"
                            :class="{'todo-item-del': scope.row.status}"
                        >{{scope.row}}</div>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-card>
              </el-col>
            </el-row>


          </div>
        </el-col>
      </el-row>
    </div>



  </div>

</template>

<script>

import uSiderbar from "./UserSidebar"

export default {

  components:{
    uSiderbar
  },

  created() {
    // this.get_person_info()
    this.getNotice()
  },
  data () {
    return {

      name: '黄驿涵',
      identity: '普通会员',

      queryInfo: {
        query: '',
      },

      noticeList: [],
      historyList: [
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

    gotoMyOrder(){
      this.$router.push('/myorder');
    },

    async getNotice() {
      const { data: res } = await this.$http.get('/xfftoy/findAllNotice', {

      })
      if (res.code !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      res.data.forEach((item,index)=>{
        this.noticeList.push(item.ncontent)
      })

    },

    // async get_person_info() {
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

  .user-container{
    padding: 20px;
    width: 100vw;
    background-color: #f6f6f6;

    .container{
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

      .user-card {
        margin: 0 auto;

        .info-top-left{
          width: 100%;
          height: 150px;


          padding: 20px !important;


          .user-avator{
            float: left;

            width: 100px;
            height: 100px;
            margin-left: 10px;
            margin-top: 5px;
            border-radius: 50%;
          }

          .user-info{
            float: left;
            margin-left: 20px;


            .user-info-name{
              font-size: 36px;
              line-height: 36px;
              margin: 22px 0 0 0;
            }

            .user-info-identity {
              position: absolute;

              font-size: 14px;
              font-weight: bold;
              line-height: 20px;
              margin-top: 10px;
              padding: 1px 4px;
              color: #fff;
              background-color: #73C9E5;
              border-radius: 6px;
            }


          }


        }

        .info-top-right{
          width: 100%;
          height: 150px;

          margin-left: -18px;
          border-left: #fb7299 dashed 1px!important;


          .user-address{
            height: 150px;
            width: 50%;
            text-align: center;
            flex: 1;
            padding: 40px 0;
            margin: 0;
            color: #444;
            float: left;

            .user-address-icon{
              text-align: center;
              font-size: 40px;
              line-height: 40px;
            }

            .user-address-text{
              text-align: center;
              font-size: 15px;
              color: #444;
            }

          }

          .user-address:hover{
            background-color: rgba(251, 114, 153, 0.1);
            i{
              color: #ff6699;
            }
            p{
              color: #fb7299;
            }

          }

          .user-address:active{
            background-color: rgba(251, 114, 153, 0.2);
            i{
              color: #ff4477;
            }
            p{
              color: #fb7299;
            }

          }

          .logout{
            height: 150px;
            width: 50%;
            text-align: center;
            flex: 1;
            padding: 40px 0;
            margin: 0;
            color: #444;
            float: right;

            .logout-icon{
              text-align: center;
              font-size: 40px;
              line-height: 40px;
            }

            .logout-text{
              text-align: center;
              font-size: 15px;
              color: #444;
            }
          }

          .logout:hover{
            background-color: rgba(251, 114, 153, 0.1);
            i{
              color: #ff6699;
            }
            p{
              color: #fb7299;
            }

          }

          .logout:active{
            background-color: rgba(251, 114, 153, 0.2);
            i{
              color: #ff4477;
            }
            p{
              color: #fb7299;
            }

          }

        }
      }

      .orders-panel{
        margin-top: 15px;
        padding-top: 10px;
        padding-bottom: 20px;
        //height: 1600px;

        .panel-des{
          height: 25px;

          .my-order{
            float: left;

            font-size: 20px;
            font-weight: bold;

            margin-left: 18px;
            margin-top: 5px;
          }

          .more-order{
            float: right;

            font-size: 14px;
            line-height: 14px;

            margin-right: 18px;
            margin-top: 10px;

            color: #aaa;

            i{
              font-size: 14px;
              line-height: 14px;
            }
          }

          .more-order:hover{
            cursor: pointer;
            color: #777;
          }

          .more-order:active{
            color: #262626;
          }

        }



        //box-shadow: none!important;

        .order-panel{
          background-color: #f6f6f6;
          margin: 15px 15px 15px 15px;

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

      .collect-panel{
        padding-top: 10px;
        margin-top: 15px;
        .panel-des{
          height: 25px;

          .my-order{
            float: left;

            font-size: 20px;
            font-weight: bold;

            margin-left: 18px;
            margin-top: 5px;
          }

          .more-order{
            float: right;

            font-size: 14px;
            line-height: 14px;

            margin-right: 18px;
            margin-top: 10px;

            color: #aaa;

            i{
              font-size: 14px;
              line-height: 14px;
            }
          }

          .more-order:hover{
            cursor: pointer;
            color: #777;
          }

          .more-order:active{
            color: #262626;
          }

        }

        .order-panel{
          background-color: #f6f6f6;
          margin: 15px 15px 15px 15px;

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

            //border-bottom: #ccc solid 1px;
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
            }
          }


        }
      }


      .message-panel{
        margin-top: 16px;
        margin-right: 18px;

        padding-bottom: 20px;
        //height: 1600px;

        //box-shadow: none!important;
      }

      .history-panel{
        margin-top: 16px;
        margin-right: 18px;

        padding-bottom: 20px;
        //height: 1600px;

        //box-shadow: none!important;
      }

    }




  }

  li:hover .el-submenu__title {
    outline: none;
    color: #fb7299;
    background-color: rgba(251,114,153,0.1) !important;
  }

  .el-menu-user .el-submenu__title:hover i{
    color: #fb7299;
  }

  .el-menu-user .el-submenu__title:hover span{
    color: #fb7299;
  }

</style>
