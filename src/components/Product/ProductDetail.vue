<template>
  <div class="product-container">


    <div class="side-bar">
      <v-sidebar></v-sidebar>
    </div>
    <div class="product-body">
      <div class="product-head">
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">产品中心</a></el-breadcrumb-item>
            <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
          </el-breadcrumb>
        </div>


        <div class="head-text">
          <!--          <span style="margin-right: 5px">NATTY BOY</span>-->
          <!--          <span> I </span>-->
          <!--          <span style="margin-left: 5px">小飞飞玩具</span>-->
          <img class="head-logo" src="../../assets/images/logosearch.png" alt="">
        </div>
      </div>

      <div class="product-body-main">
        <div class="main-container">
          <div class="product-imgs">
            <div class="imgs-container">
              <div class="arrows">
                <div class="arrow-left" @click="subpic()"><i class="el-icon-arrow-left"></i></div>
                <div class="arrow-right" @click="addpic()"><i class="el-icon-arrow-right"></i></div>
                <img class="img-replace" :src="product.pic[mainpic]" alt="">
              </div>

              <img class="product-main-img" :src="product.pic[mainpic]" alt="">


              <el-image
                  class="product-main-img-el"
                  :src="product.pic[mainpic]"
                  :preview-src-list="product.pic"
              ></el-image>

              <div class="product-sub-imgs">
                <img class="product-sub-img1 sub-img" :class="mainpic === 0? 'sub-img-active':''" :src=product.pic[0] alt="" @click="activePic(0)">
                <img class="product-sub-img2 sub-img" :class="mainpic === 1? 'sub-img-active':''" :src=product.pic[1] alt="" @click="activePic(1)">
                <img class="product-sub-img3 sub-img" :class="mainpic === 2? 'sub-img-active':''" :src=product.pic[2] alt="" @click="activePic(2)">
                <img class="product-sub-img4 sub-img" :class="mainpic === 3? 'sub-img-active':''" :src=product.pic[3] alt="" @click="activePic(3)">
              </div>
            </div>


          </div>
          <div class="product-buy">
            <p class="product-title">{{product.title}}</p>



            <div class="product-price">
              <span class="product-price-title">价格:</span>
              <!--            <span class="prodyct-price-icon">￥</span>-->
              <span class="product-price-text">￥{{product.price}}</span>
            </div>


            <div class="color-choice">
              <span class="color-choice-text">颜色选择:</span>
              <el-radio-group class="color-choice-radio" v-model="product.colorchosen">
                <el-radio-button  v-for="(item,index) in product.color" :key="index" :label="product.color[index]"></el-radio-button>
              </el-radio-group>
            </div>

            <div class="type-choice">
              <span class="type-choice-text">种类选择:</span>
              <el-radio-group class="type-choice-radio" v-model="product.typechosen">
                <el-radio-button  v-for="(item,index) in product.types" :key="index" :label="product.types[index]"></el-radio-button>
              </el-radio-group>
            </div>

            <div class="sales-collect-div">
              <ul class="sales-collect-ul">
                <li class="sales-li">
                  <span class="sales-text">累计销量: </span>
                  <span class="sales-count">{{product.sales}}</span>
                </li>
                <li class="collect-li">
                  <span class="collect-text">累计收藏: </span>
                  <span class="collect-count">{{product.collect}}</span>
                </li>
              </ul>
            </div>

            <div class="button-containers">
              <div class="button-container">
                <div class="order-button" @click="addCart(this.productid)">
                  立即订购
                </div>
                <div class="collect-button" @click="addCollect(this.productid)">
                  收藏一下
                </div>
              </div>

            </div>

            <p class="more-detail">#更多详情请提交订单后联系客服</p>
          </div>
        </div>

      </div>

      <div class="product-body-detail">
        <el-row :gutter="20">
          <el-col :span="20":offset="2">
            <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
              <el-tab-pane label="产品概述" name="first">
                <div class="detail-pane">
                  <p class="detail-text">{{product.detail}}</p>
                </div>
              </el-tab-pane>
              <el-tab-pane label="技术参数" name="second">
                <div class="tech-pane">
                  <el-table :data="product.tech">
                    <el-table-column type="index" label="#" width="50"></el-table-column>
                    <el-table-column prop="parameter" width="250" label="参数/parameter"></el-table-column>
                    <el-table-column prop="value"  label="参数值/value"></el-table-column>

                  </el-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="尺寸" name="third">
                <div class="size-pane">
                  <p class="size-text">{{product.size}}</p>
                </div>
              </el-tab-pane>
              <el-tab-pane label="订货型号" name="fourth">
                <div class="order-id-pane">
                  <p class="order-id-text">{{product.productid}}</p>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>

      </div>

    </div>
  </div>
</template>

<script>
  import vSidebar from "../sidebar/Sidebar";
  import Tabcomponent from "./ProductItem"

  export default {
    name: "Products",
    components:{
      vSidebar,
      Tabcomponent,
    },
    created() {
      this.mainpic = 0
      this.productid =  window.sessionStorage.getItem('productdetail')
      // console.log(this.productid)
      this.getproduct();
    },
    data(){
      return{
        productid: '',
        restaurants: [],
        state: '',
        timeout:  null,

        activepic: 1,

        mainpic:'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/1.jpg',


        product: {
          name:'水晶土',
          title:'超好玩的解压喵噗喵噗水晶土',
          price: 0.4,
          pic: [

          ],
          types:[],
          color:[],
          colorchosen:'粉色',
          typechosen:'8寸',
          sales: 100,
          collect: 120,
          num: 1,

          detail:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈，这个产品很不错',
          tech:[
            {
              parameter: '产品名',
              value:'发光粒子杯'
            },
            {
              parameter: '材料',
              value:'tpu'
            },
            {
              parameter: '包装',
              value:'卡头袋装'
            },
            {
              parameter: 'pcs',
              value:'12个/包'
            },
            {
              parameter: '所有颜色',
              value:['黄色','黄色']
            },
            {
              parameter: '标签',
              value:['节日','弹射玩具'],
            },

          ],
          size: '9x9cm',
          productid: 'xfftoy-20210908'

        },


        productlist:[],
        activeName:'first',
        query:'',


      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    },
    methods:{
      loadAll() {
        return [
       ]
      },

      activePic(i){
        this.mainpic = i
      },

      addpic(){
        if (this.mainpic === 3){
          this.mainpic = this.mainpic - 3
        } else {
          this.mainpic +=1
        }

      },

      subpic(i){
        if (this.mainpic === 0){
          this.mainpic = this.mainpic + 3
        } else {
          this.mainpic -=1
        }
      },

      handleClick(tab, event) {
        this.queryInfo.tab = tab.name;
        // console.log(tab.name);
        // console.log(this.tab);
        // console.log(tab, event);
        this.getproduct();
      },

      async getproduct() {
        const {data: res} = await this.$http.get('/xfftoy/getProductItem', {
          params: {
            productid: this.productid
          }
        })
        console.l
        if (res.code !== 200) {
          return this.$message.error('获取搜索结果失败！')
        }
        res.data.fileList.forEach((item, index) => {
          this.product.pic.push(item.iurl)
          // console.log(item.iurl)
        })
        // console.log(this.pic)
        this.product.types = res.data.dynamicTypes
        this.product.color = res.data.dynamicColors

        this.product.sales = res.data.sales
        this.product.collect = res.data.collected
        this.product.price = res.data.price
        this.product.title = res.data.pname
        this.product.size = res.data.psize
        this.product.detail = res.data.pdescribe
        this.product.tech[0].value = res.data.pname
        this.product.tech[1].value = res.data.material
        this.product.tech[2].value = res.data.ppackage
        this.product.tech[3].value = res.data.pcs
        this.product.tech[4].value = res.data.dynamicColors
        this.product.tech[5].value = res.data.dynamicTags





        return this.$message.success('搜索完成！')
      },




    },
  }
</script>



<style lang="less">


</style>

<style lang="less" scoped>


  div,img{
    box-sizing: border-box;
  }


  div:hover,a:hover,img:hover{
    outline: none !important;
  }


  .product-container{
    min-height: 800px;
    padding: 30px 0 80px 0;
    width: 100vw;
    background-color: #f8f8f8;
    border-top: 1px solid #eee;



    .product-body{
      background-color: #fff;
      padding: 20px 0 60px 0;
      width: 100%;
      max-width: 1600px;
      margin: 0 auto;
      //border: 1px solid #ccc;
      box-shadow: 0 0 5px 3px #eee;


      .product-head{
        height: 36px;
        border-bottom: 1px solid #eee;
        padding: 0 40px;

        .breadcrumb{
          float: left;
          .el-breadcrumb{
            margin: 0;
          }
        }

        .head-text{
          position: relative;
          width: 250px;
          height: 56px;
          float: right;
          color: #262626;

          font-size: 13px;
          //font-weight: bold;
          .head-logo{
            width: 250px;
            position: absolute;

            top: -16px;
            margin-right: -25px;
          }
        }

      }

      .product-body-main{
        width: 100%;
        .main-container{
          width: 90%;
          margin: 0 auto;
          position: relative;
          display: flex;
          height: auto;
          padding-right: 50px;
          padding-left: 50px;


          .product-imgs{
            position: relative;
            height: fit-content;
            width: 55%;

            .imgs-container{
              position: relative;
              width: 90%;


              .arrows{
                position: absolute;

                top: 50px;

                width: 100%;
                height: fit-content;

                .img-replace{
                  visibility: hidden;
                  width: 100%;
                  border-radius: 0px;

                  border: 1px solid #eee;
                  z-index: 10;

                  //max-width: 1400px;
                }

                .arrow-left{
                  position: absolute;
                  top: 50%;
                  left: 20px;
                  transform: translateY(-50%);

                  width: 40px;
                  height: 40px;
                  border-radius: 20px;

                  z-index: 21;

                  text-align: center;

                  background-color: #999;

                  i{
                    color: #fff;

                    line-height: 40px;
                    font-size: 20px;
                  }
                }

                .arrow-right{
                  position: absolute;

                  top: 50%;
                  right: 20px;
                  transform: translateY(-50%);

                  width: 40px;
                  height: 40px;
                  border-radius: 20px;

                  z-index: 21;
                  text-align: center;

                  background-color: #999;

                  i{
                    color: #fff;

                    line-height: 40px;
                    font-size: 20px;
                  }


                  .arrow-left:hover{
                    background-color: #aaaaaa;
                  }
                }

                .arrow-right:hover{
                  background-color: #aaaaaa;
                }

                .arrow-left:active{
                  background-color: #777;
                }

                .arrow-right:active{
                  background-color: #777;
                }

              }

              .product-main-img{
                margin-top: 50px;
                margin-left: 0;
                visibility: hidden;
                width: 100%;
                border-radius: 0px;

                border: 1px solid #eee;
                z-index: 10;

                //max-width: 1400px;
              }

              .product-main-img-el{
                position: absolute;
                top: 50px;
                left: 0px;

                width: 100%;
                border-radius: 0px;

                border: 1px solid #eee;
                z-index: 20;

                //max-width: 1400px;
              }



              .product-sub-imgs{

                width: 100%;

                .product-sub-img1{
                  border: 1px solid #eee;
                  width: 24%;
                }
                .product-sub-img2{
                  border: 1px solid #eee;
                  width: 24%;
                  margin-left: 1.3%;
                }
                .product-sub-img3{
                  border: 1px solid #eee;
                  width: 24%;
                  margin-left: 1.3%;
                }
                .product-sub-img4{
                  border: 1px solid #eee;
                  width: 24%;
                  margin-left: 1.4%;
                }

                .sub-img:hover{
                  border: 1px solid rgba(0, 161, 214, 0.4);
                }
                .sub-img-active{
                  border: 1px solid rgba(0, 161, 214, 0.4);
                }



              }
            }




          }

          .product-buy{
            margin-top: 120px;
            width: 45%;

            overflow: hidden;

            .product-title{
              font-size: 36px;
              font-weight: bold;
              line-height: 36px;

              margin: 0 0 10px 0;

              color: #626262;
            }

            .product-price{
              height: 40px;
              margin-top: 20px;

              background-image: url('../../assets/images/footer.png');

              .product-price-title{
                float: left;
                color: #888;

                font-size: 16px;
                line-height: 40px;
                margin-left: 10px;
                margin-bottom: 5px;
              }

              .product-price-text{
                float: left;
                font-size: 25px;
                margin-left: 15px;
                line-height: 40px;

                color: #fb7299;
                font-weight: bold;
              }
            }

            .sales-collect-div{

              .sales-collect-ul{
                width: 100%;
                position: relative;
                list-style: none;
                padding: 8px 0;
                margin: 15px 0 0 0;
                height: 20px;

                border-top: 1px dashed #ccc                                                                                                                                                                                                                                                                                                                                                                                                            ;
                border-bottom: 1px dashed #ccc                                                                                                                                                                                                                                                                                                                                                                                                            ;

                .sales-li{
                  float: left;
                  height: 20px;
                  margin-left: 1px;

                  border-left: 1px dashed #ccc                                                                                                                                                                                                                                                                                                                                                                                                            ;

                  .sales-text{
                    padding-left: 10px;
                    color: #888;
                  }

                  .sales-count{

                  }

                }

                .collect-li{
                  float: left;
                  width: calc(50% - 12px);

                  position: absolute;
                  left: calc(50% + 9px);

                  border-left: 1px dashed #ccc                                                                                                                                                                                                                                                                                                                                                                                                            ;
                  border-right: 1px dashed #ccc                                                                                                                                                                                                                                                                                                                                                                                                            ;


                  .collect-text{
                    padding-left: 10px;
                    color: #888;
                  }

                  .collect-count{

                  }

                }


              }



            }


            .color-choice{
              margin-top: 10px;

              .color-choice-text{
                margin-left: 10px;

                font-size: 16px;
                line-height: 40px;

                color: #888;
              }

              .color-choice-radio{
                margin-left: 15px;
              }

            }

            .type-choice{
              margin-top: 10px;

              .type-choice-text{
                margin-left: 10px;

                font-size: 16px;
                line-height: 40px;

                color: #888;
              }

              .type-choice-radio{
                margin-left: 15px;
              }

            }

            .button-containers {
              height: 60px;
              margin-bottom: 10px;
              margin-top: 25px;
              display: flex;

              .button-container{
                height: 60px;
                display: flex;

                right: 0;

                .order-button {
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;



                  display: flex;
                  height: 48px;
                  width: 120px;
                  border-radius: 10px;
                  background-color: #fb7299;
                  color: #fff;
                  align-items: center;
                  justify-content: center;
                  line-height: 48px;
                  font-size: 20px;
                  font-weight: bold;
                  letter-spacing: 1px
                }


                .order-button:hover {
                  background-color: #ef5f88;
                }

                .order-button:active {
                  background-color: #fa5282;
                }

                .collect-button {
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;

                  margin-left: 10px;

                  display: flex;
                  height: 48px;
                  width: 120px;
                  border-radius: 10px;
                  background-color: #fff;
                  color: #00A1D7;
                  border: #00A1D7 solid 3px;
                  align-items: center;
                  justify-content: center;
                  line-height: 48px;
                  font-size: 20px;
                  font-weight: bold;
                  letter-spacing: 1px
                }


                .collect-button:hover {
                  background-color: #f2f2f2;
                }

                .collect-button:active {
                  background-color: #00A1D7;
                  color: #fff;
                }
              }

            }

            .more-detail{
              color: #aaa;
            }

          }


        }
        }





    }

    .product-body-detail{
      margin-top: 50px;

      .detail-pane{
        padding: 20px;

        .detail-text{
          font-size: 12px;
          line-height: 12px;

          color: #626262;
        }
      }

      .tech-pane{
        margin-top: -20px;

      }

      .size-pane{
        padding: 20px;
        .size-text{
          font-size: 12px;
          line-height: 12px;

          color: #626262;
        }
      }

      .order-id-pane{
        padding: 20px;
        .order-id-text{
          font-size: 12px;
          line-height: 12px;

          color: #626262;
        }
      }

    }



  }


  @media screen and (max-width: 1600px) {

    .product-container{
      padding: 0;
    }


  }


  .history-list{
    padding: 10px 0;

    list-style: none;
    text-align: center;

    .history-item{
      position: relative;
      height: 40px;
      padding: 0 10px;

      .search-history{
        color: #626262;
        font-size: 16px;


        line-height: 40px;
      }
      .delete-history{
        display: none;
        position: absolute;
        color: #a9dbf3;

        top: 12px;
        right: 10px;
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: bold;
      }
    }




    .delete-history:hover{
      color: #00A1D7;
    }
  }

  .history-item:hover{
    background-color: #e6f6fb;
    .search-history{
      color: #00A1D7;
    }

    .delete-history{
      display: block;
    }
  }

  @media screen and (max-width:1400px){
    .product-buy{
      margin-top: 50px!important;
    }

    .product-imgs{
      margin-top: calc(220px - 20%)!important;
    }
  }


  @media screen and (max-width: 720px){
    .product-body-main{
      display: block!important;

      .main-container{
        display: block!important;
        padding-right: 0!important;
        padding-left: 0!important;
        .product-imgs{
          margin-top: 0px!important;
          width: 100% !important;

          .imgs-container{
            width: 80% !important;
            margin: 0 auto!important;
          }
        }

        .product-buy{
          box-sizing: border-box;
          position: relative;
          margin: 20px 50px 20px 50px!important;
          width: calc(100% - 100px) !important;

          .button-containers{
            display: block!important;
            height: fit-content!important;
            .button-container{
              display: block!important;
              margin: 0 auto!important;
              height: fit-content!important;
              .order-button{
                width: 100% !important;
              }
              .collect-button{
                margin-left: 0!important;
                margin-top: 10px;
                width: 100% !important;
              }


            }
          }


        }

      }



    }
  }

  @media screen and (max-width: 620px){
    .head-text{
      display: none;
    }
  }
</style>
