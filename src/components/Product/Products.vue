<template>
  <div class="products-container">


    <div class="side-bar">
      <v-sidebar></v-sidebar>
    </div>

    <div class="carousel-container">
      <el-carousel class="carousel" type="card" :height="hdgd" ref="barparent" :interval="5000" arrow="always">
        <el-carousel-item v-for="(item,index) in pic" :key="index">
          <img class="carousel-img" style="border-radius: 20px;"  :src="item">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  import vSidebar from "../sidebar/Sidebar"


  export default {
    name: "Products",
    components:{
      vSidebar,
    },

    mounted() {
      this.countHeight()
    },
    data(){
      return{
        hdgd: '25vw',


        pic:[
          'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/banner1.png',
          'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/banner2.png',
          'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/banner3.png',
          'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/banner4.png',
        ],
      }
    },
    methods:{

        countHeight(){
          let that = this;
          window.onresize = function windowResize() {
            // 通过捕获系统的onresize事件触发我们需要执行的事件
            var w = window.innerWidth
            var h = 0
            if (w > 1800) {
              h = 520
            } else if(w > 1000 && w <=1800){
              h = 350 + 0.2 * (w - 1000)
            } else {
              h = 0.35 * w
            }
            that.hdgd = h + 'px'
            console.log(that.hdgd+'px')
          }

        }


    },
  }
</script>

<style lang="less" scoped>

  div{
    box-sizing: border-box;
  }

  .is-active.el-carousel__item{
    margin-left: -20%;
    width: 90%!important;
  }

  .el-carousel__item:focus {
    outline: none !important;
  }

  .el-carousel__item:hover {
    outline: none !important;
    border: none;
  }

  .el-carousel__container:focus{
    outline: none !important;
  }

  div:hover,a:hover,img:hover{
    outline: none !important;
  }


  .products-container{
    min-height: 800px;

    width: 100vw;
    background-color: #fff;

    @media screen and (min-width: 1801px) {
      .carousel-container{
        max-width: 1600px;
        margin: 0 auto;
        //padding-left: 5%;
        //padding-right: 5%;


        .carousel{
          padding-top: 20px;
          margin: 0 auto;

          /*background-color: #e0e5df;*/
          background-color: #fff;

          .el-carousel__container{
            height: 600px !important;
          }

        }

        .el-carousel--horizontal{
          .el-carousel__container{
            height: 600px !important;
          }
        }

      }


    }

    @media screen and (max-width: 1800px) {
      .carousel{
        width: 90vw;
        margin-left: 5vw;
        padding-top: 20px;
        /*margin-top: 4px;*/
        /*background-color: #e0e5df;*/
        //background-color: #fff;
      }

    }


    .carousel-img{
      /*object-fit:contain;*/
      object-fit:fill;
      display: block;
      text-align: center;
      margin: 0 auto;
      width:100%;
      height:100%;
    }




  }


</style>
