<template>
  <div class="welcome">
    <div class="carousel-container">
      <el-carousel class="carousel" :height="hdgd" ref="barparent" :interval="5000" arrow="always">
        <el-carousel-item v-for="(item,index) in pic" :key="index">
          <div class="carousel-text" v-if="index === 0" style="position: absolute">
            <div class="display-box1">
              <p class="title1">砾石笔</p>
              <p class="describe1">趣味造型·活力满满·生动形象·修长笔杆·握感舒适</p>
              <el-button class="button1">前往订购 ></el-button>
            </div>
          </div>
          <div class="carousel-text" v-if="index === 1" style="position: absolute">
            <div class="display-box2">
              <p class="title2">动物弹力水球</p>
              <p class="describe2">让每一次弹跳都充满趣味和欢乐！</p>
              <el-button class="button2">前往订购 ></el-button>
            </div>
          </div>
          <div class="carousel-text" v-if="index === 2" style="position: absolute">
            <div class="display-box3">
              <p class="title3">病毒按摩球</p>
              <p class="describe3">趣味造型·活力满满·生动形象·修长笔杆·握感舒适</p>
              <el-button class="button3">前往订购 ></el-button>
            </div>
          </div>
          <div class="carousel-text" v-if="index === 3" style="position: absolute">
            <div class="display-box4">
              <p class="title4">油漆桶-史莱姆</p>
              <p class="describe4">罐装解压神器，让压力和也太史莱姆一起流走</p>
              <el-button class="button4">前往订购 ></el-button>
            </div>

          </div>
          <img class="carousel-img" style="object-fit: cover" :src="item">
        </el-carousel-item>
      </el-carousel>
    </div>


  </div>

</template>

<script>

export default {
  // 此时,页面上的元素,已经被渲染完毕了
  components:{

  },
  name: "Welcome",
  created() {
    this.countHeight()
  },
  data(){
    return{
      isdisplay: false,
      hdgd: '25vw',
      queryInfo:{
        query: '',
        isSetHisNull: 'false',
      },
      select: '1',

      pic:[
        'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/banner1.png',
        'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/banner2.png',
        'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/banner3.png',
        'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/banner4.png',
      ],
    }
  },
  methods: {
    countHeight(){
      let that = this;
      window.onresize = function windowResize() {
        // 通过捕获系统的onresize事件触发我们需要执行的事件
        var w = window.innerWidth
        var h = 0
        if (w > 1180 && w <=1800) {
          h = w * 0.28
        } else if(w > 1800){
          h = 504
        } else {
          h = 0.35 * w
        }
        that.hdgd = h + 'px'
        // console.log(that.hdgd+'px')
      }
    }
  },


}
</script>

<style lang="less" scoped>

.carousel-text {
  box-sizing: border-box;

  width: 100%;
  height: 100%;

  padding: 10vw 5vw;


}
.display-box1{
  .title1{
    margin-top: 0;
    margin-left: 5vw;
    margin-bottom: 12px;
    color: #795da3;

    font-weight: bold;
    font-size: 34px;
    line-height: 34px;
  }

  .describe1{
    color: #6099ee;
    margin-left: 5vw;
    margin-bottom: 24px;

    font-size: 16px;
    line-height: 16px;
  }

  .button1{
    background-color: #795da3;
    color: white;

    margin-left: 5vw;
  }
}

.display-box2{
  float: right;
  margin-right: 10vw;

  .title2{
    text-align: right;
    margin-top: 0;

    margin-bottom: 12px;
    color: #e1193f;

    font-weight: bold;
    font-size: 34px;
    line-height: 34px;
  }

  .describe2{
    color: #FF8900;
    text-align: right;

    margin-bottom: 24px;

    font-size: 16px;
    line-height: 16px;
  }

  .button2{
    float: right;
    background-color: #F4BF00;
    color: white;


  }
}


.display-box3{
  .title3{
    margin-top: 0;
    margin-left: 5vw;
    margin-bottom: 12px;
    color: #795da3;

    font-weight: bold;
    font-size: 34px;
    line-height: 34px;
  }

  .describe3{
    color: #6099ee;
    margin-left: 5vw;
    margin-bottom: 24px;

    font-size: 16px;
    line-height: 16px;
  }

  .button3{
    background-color: #795da3;
    color: white;

    margin-left: 5vw;
  }
}



.display-box4{
  float: right;
  margin-right: 10vw;

  .title4{
    text-align: right;
    margin-top: 0;

    margin-bottom: 12px;
    color: #e1193f;

    font-weight: bold;
    font-size: 34px;
    line-height: 34px;
  }

  .describe4{
    color: #FF8900;
    text-align: right;

    margin-bottom: 24px;

    font-size: 16px;
    line-height: 16px;
  }

  .button4{
    float: right;
    background-color: #0C159C;
    color: white;


  }
}


.welcome{
  padding: 0;
  margin-top: 3px;
  min-height: 1000px;
}

@media screen and (min-width: 1800px) {
  .carousel-text {
    padding: 180px 90px;
  }


  .carousel-container{
    max-width: 1600px;
    margin: 0 auto;
    padding-left: 5%;
    padding-right: 5%;


    .carousel{
      //padding-top: 5px;
      margin: 0 auto;
      /*background-color: #e0e5df;*/
      //background-color: #f2f2f2;

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


@media screen and (min-width: 1450px) and (max-width: 1800px){
  .carousel-container{
    padding: 0 5%;
  }

  .carousel{
    width: 90vw;
  }

}

@media screen and (max-width: 1450px) {


  .carousel{
    width: 100vw;
    //padding-top: 20px;
    /*margin-top: 4px;*/
    /*background-color: #e0e5df;*/
    background-color: #f2f2f2;
  }

}
@media screen and (max-width: 820px){



  .describe1{
    display: none;
  }

  .button1{
    margin-top: 0px;
  }

  .describe2{
    display: none;
  }

  .button2{
    margin-top: 0px;
  }

  .display-box2{
     margin-right: 0vw!important;
  }

  .describe3{
    display: none;
  }

  .button3{
    margin-top: 0px;
  }

  .describe4{
    display: none;
  }

  .button4{
    margin-top: 0px;
  }

  .display-box4{
    margin-right: 0vw!important;
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

  border-radius: 10px
;
}

.el-carousel__item:nth-child(2n) {
  background-color: transparent;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: transparent;
}

</style>
