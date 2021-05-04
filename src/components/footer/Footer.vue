<template>
  <div class="footer">
    <div class="footer_container">
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
      <div class="nav-group">
        <div class="wx">
          <h4 class="wx-title">微信公众号</h4>
          <img class="wx-code" src="../../assets/images/wx.jpg" alt="">
        </div>
      </div>
    </div>
    <div class="info-bar" >
      <div class="info-bar-pannel">
        <a class="language" href="https://www.baidu.com">中文(中国)</a>
        <ul class="info-bar-ul">
          <li class="info-bar-item"><a href="https://www.baidu.com">联系</a></li>
          <li class="info-bar-item"><a href="https://www.baidu.com">隐私</a></li>
          <li class="info-bar-item"><a href="https://www.baidu.com">管理</a></li>
          <li class="info-bar-item"><a href="https://www.baidu.com">使用条款</a></li>
          <li class="info-bar-item"><a href="https://www.baidu.com">商标</a></li>
          <li class="info-bar-item"><a href="https://www.baidu.com">关于我们的广澳</a></li>
          <li class="info-bar-item"><a href="https://www.baidu.com">京ICP备09042378号-6</a></li>
          <li class="info-bar-item"><a href="https://www.baidu.com">京公网安备11010802023178</a></li>
          <li class="info-bar-item">&#169; Natty Boy 2021</li>
        </ul>
      </div>


    </div>
  </div>

</template>

<script>
  import bus from '../../assets/javascript/bus.js';
  export default {
    name: "Footer",
    data() {
      return {
        nav: [
          {name:'订购指南',items:[{item:"如何订购"},{item:"大订单询价"},{item:"销售条款"},{item:"付款方式"},]},
          {name:'参考资料',items:[{item:"质检报告"},{item:"玩具游玩安全说明书"},{item:"产品目录下载"}]},
          {name:'服务支持',items:[{item:"配送发货"},{item:"运费说明"},{item:"收货需知"},{item:"发票说明"},{item:"退换货政策"},]},
          {name:'产品中心',items:[{item:"水球"},{item:"史莱姆"},{item:"水晶土"},{item:"弹跳弹射玩具"},{item:"仿真玩具"},{item:"文具类玩具"},{item:"节日类玩具"}]},
          {name:'企业信息',items:[{item:"公司简介"},{item:"新闻中心"},{item:"加入我们"}]},
        ],
      }
    },
    created() {

    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    },
    methods:{

    },
    mounted() {

    }
  }
</script>

<style scoped lang="less">


.footer{


  width: 100vw;
  background-image: url('../../assets/images/footer.png');
  //background-repeat: no-repeat;
  //background-size: 100vw 400px;

  .footer_container{
    display: block;
    max-width: 1600px;
    padding: 0 5vw 10px 5vw;
    margin: 0 auto;
    zoom: 1;
    overflow: auto;


    .nav-group{
      display: block;
      min-height: 1px;
      float: left;
      vertical-align: text-top;
      //padding: 0 12px;
      width: 16%;

      .nav-heading{
        color: #616161;
        font-size: 15px;
        line-height: 20px;
        padding: 36px 0 4px;
        font-weight: 600;

      }

      .nav-list{
        font-size: 11px;
        line-height: 16px;
        margin-top: 0;
        padding-left: 0;
        list-style: none;

        .nav-item{
          padding: 8px 0;
          a{
            color: #616161;

            text-decoration: none;
          }


        }

      }

      .wx{
        margin: 35px auto;
        text-align: center;

        .wx-title{
          width: fit-content;
          color: #616161;
          font-size: 15px;
          margin: 10px auto;
        }

        .wx-code{
          width: 100px;
        }
      }


    }

    :first-child{
      padding-left: 0;
    }

    :nth-child(4){
      padding-left: 0;
    }

    :last-child{
      padding-right: 0;
    }
  }
  .info-bar{
    box-sizing: border-box;
    width: 100%;

    background-color: #ccc;
    padding: 20px 5vw 12px;
    border-bottom: 4px solid #666;
    zoom: 1;
    overflow: auto;

    .info-bar-pannel{
      box-sizing: border-box;
      width: 100%;
      height: 20px;

      max-width: calc(1600px + 10%);
      padding: 0 5vw;
      margin: 0 auto;


      .language{
        float: left;
        display: block;
        color: #616161;
        font-size: 15px;
        line-height: 20px;
        text-decoration: none;
      }

      .info-bar-ul{
        font-size: 11px;
        line-height: 16px;
        float: right;
        margin: 3px 0;
        color: #616161;
        padding-left: 0;
        list-style-type: none;
        list-style-position: outside;


        .info-bar-item{
          color: #616161;
          padding: 0 24px 4px 0;
          display: inline-block;

          a{
            color: #616161;
            text-decoration: none;
          }
        }
      }



    }

  }
}



@media screen and (min-width: 1084px) {

}

@media screen and (max-width: 1083px) {
  .footer{

    .footer_container{

      .nav-group{
        width: 33%;
        .nav-heading{

        }
        .nav-list{

          .nav-item{

          }
        }

      }

      :first-child{

      }
      :nth-child(4){

      }
      :last-child{

      }
    }
  }
}
</style>