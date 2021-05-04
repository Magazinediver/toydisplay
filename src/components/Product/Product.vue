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
        <el-row :gutter="20">
          <el-col :span="20" :offset="1">
            <el-autocomplete
                popper-class="my-autocomplete"

                :fetch-suggestions="querySearchAsync"
                placeholder="请输入想搜索的内容"
                v-model="state"
                class="product-search"
                @select="handleSelect"
                @keyup.enter.native="searchbtnclick">


              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="addr">{{ item.pdescribe }}</span>
              </template>

              <el-button slot="append" @click="searchbtnclick()" icon="el-icon-search" class="search-button product-search-button">
                搜索
              </el-button>
            </el-autocomplete>

          </el-col>

          <el-col :span="2">
            <el-popover
                placement="bottom"
                width="30px"
                trigger="click">
              <ul class="history-list" >
                <li class="history-item" v-for="(item,index) in history" :key="index">
                  <a class="search-history" @click="gosearch($event)">{{item}}</a>
                  <i class="delete-history el-icon-close" @click="deletehistory($event)"></i>
                </li>
              </ul>
              <el-button class="history-button " slot="reference">历史记录<i class="el-icon-arrow-down el-icon" style="margin-left: 5px"></i></el-button>
            </el-popover>
          </el-col>
        </el-row>


        <el-row :gutter="20" style="margin-top: 20px;margin-left: 20px">
          <el-col :span="22" :offset="1">
            <ul class="box">
              <li v-for="(item,index) of material" :class="{checked:index===queryInfo.material}" @click="changeList(index)">{{item}}</li>
            </ul>
          </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 15px;margin-left: 20px">
          <el-col :span="22" :offset="1">
            <ul class="box2">
              <li v-for="(item,index) of psort" :class="{checked:index===queryInfo.sort}" @click="changeList2(index)">{{item}}</li>
            </ul>
          </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 15px">
          <el-col :span="22" :offset="1">
            <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="top" stretch>
              <el-tab-pane label="搜索/推荐" name="first">
                <Tabcomponent :cquery="this.query" :cproductlist="productlist"></Tabcomponent>
              </el-tab-pane>
              <el-tab-pane label="最新发布" name="second">
                <Tabcomponent :cquery="this.query" :cproductlist="productlist"></Tabcomponent>
              </el-tab-pane>
              <el-tab-pane label="最多播放" name="third">
                <Tabcomponent :cquery="this.query" :cproductlist="productlist"></Tabcomponent>
              </el-tab-pane>
              <el-tab-pane label="最多弹幕" name="fourth">
                <Tabcomponent :cquery="this.query" :cproductlist="productlist"></Tabcomponent>
              </el-tab-pane>
              <el-tab-pane label="最多硬币" name="fifth">
                <Tabcomponent :cquery="this.query" :cproductlist="productlist"></Tabcomponent>
              </el-tab-pane>
              <el-tab-pane label="最多收藏" name="sixth">
                <Tabcomponent :cquery="this.query" :cproductlist="productlist"></Tabcomponent>
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
    setTimeout(()=>{
      this.countHeight()
    },50)

    this.getallproduct()

  },
  data(){
    return{

      products: [],
      state: '',
      timeout:  null,
      index:[],

      hdgd: '28vw',

      dpmaterial:'全部材料',
      dp_type:'全部种类',

      history:["2123","2123","212qweqwqweqweqwewq3","2123","2123","2123"],

      material : ["全部材料","TPU","TPR","TPE","PVA","PP","ABS塑料","瓜尔胶"],
      psort : ["全部分类","解压玩具","弹射玩具","水晶土","史莱姆","发光玩具","ABS塑料","球类玩具"],

      productlist:[

      ],
      activeName:'first',
      query:'',

      queryInfo: {
        sort : '0',
        material: '0',
        tab:'',
        query: '',
        // 当前页数
        pagenum: 1,
        // 每页显示多少数据
        pagesize: 4,
      },

    }
  },
  mounted() {
    this.products = this.loadAll();

  },
  methods:{
    loadAll() {


      return this.index
    },
    querySearchAsync(queryString, cb) {
      var products = this.products;
      var results = queryString ? products.filter(this.createStateFilter(queryString)) : products;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 300 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    },


    changeList(index){
      this.queryInfo.material = index;//this指向app
      // this.getvideo();
    },

    changeList2(index){
      this.queryInfo.sort = index;//this指向app
      // this.getvideo();
    },

    handleCommand1(command) {
      this.dpmaterial = command
      console.log(this.dpmaterial)
    },

    handleCommand2(command) {
      this.dp_type = command
    },

    searchbtnclick(){
      this.$store.state.query = this.queryInfo.query
    },

    handleClick(tab, event) {
      this.queryInfo.tab = tab.name;
      // console.log(tab.name);
      // console.log(this.tab);
      // console.log(tab, event);
      // this.getproduct();
    },

    gosearch(e){
      this.$router.push('/product');
      this.$store.state.query = e.currentTarget.innerHTML
    },
    deletehistory(e){
      this.$store.state.query = e.currentTarget.innerHTML
    },

    async getproductlist() {
      const { data: res } = await this.$http.get('/xfftoy/findProduct', {
        params: this.queryInfo
      })
      if (res.code !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.material = res.data.material
      this.productlist = res.data.list
      this.total = res.data.total
    },

    async getallproduct(){
      const { data: res } = await this.$http.get('/xfftoy/findAllProduct', {
      })
      if (res.code !== 200) {
        return this.$message.error('获取产品失败！')
      }
      this.up = res.data.up
      this.productlist = res.data
      let i = 0
      res.data.forEach((item,index)=>{

        if(i>=10){
          return true
        }
        i++
        this.index.push({
          value:item.pname,
          pdescribe:item.pdescribe
        })

      })

      this.total = res.total
      this.query = this.queryInfo.query

      console.log(this.productlist)
      console.log(this.index)

      if(this.up !== null){
        this.parentdisplay = 'dis'
      }else{
        this.parentdisplay = 'nodis'
      }
      return this.$message.success('搜索完成！')
    },

    // async getproduct(){
    //   const { data: res } = await this.$http.get('/bilibili/video/upandvideo', {
    //     params: this.queryInfo
    //   })
    //   if (res.meta.status !== 200) {
    //     return this.$message.error('获取搜索结果失败！')
    //   }
    //   this.up = res.data.up
    //   this.videolist = res.data.videos
    //   this.total = res.total
    //   this.query = this.queryInfo.query
    //
    //   if(this.up !== null){
    //     this.parentdisplay = 'dis'
    //   }else{
    //     this.parentdisplay = 'nodis'
    //   }
    //   return this.$message.success('搜索完成！')
    // },


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



<style lang="less">

.my-autocomplete{
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}

.el-popover{
  min-width: 120px!important;
  padding: 0;
}

.product-body-main{
  .el-autocomplete{
    width: 100%;
  }


}


.product-search{

  .el-input__inner{
    border-radius: 20px 0 0 20px;
  }

  .el-input-group__append{
    border-radius: 20px!important;
  }
}

</style>

<style lang="less" scoped>


div{
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
    padding: 20px 0;
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
      background-color: #fff;
      padding: 20px 40px;
      //height: 700px;


      .el-input-group__append{
        background-color: #fb7299!important;
        color: white !important;

      }


      .product-search-button{


        height:40px;
        background-color: #fb7299 !important;
        color: #fff !important;
        border-radius: 0 20px 20px 0;
      }

      .product-search-button:hover{
        background-color: #fd457a!important;
        color: white !important;
      }

      .history-button{
        height: 42px;
        border-radius: 20px;
        border: none;
        line-height: 18px;
      }


      .box{
        padding:0;
        margin: 0 0 0 -10px;
        list-style:none;
        color: #626262;
      }

      .box  li{
        width: fit-content;
        height:23px;
        display:inline-block;
        border-radius:4px;
        text-align:center;
        line-height:23px;
        cursor:pointer;
        transition:all 0.3s linear;
        margin-left:10px;
        padding-left: 5px;
        padding-right: 5px;
      }
      .box li:hover{
        color: #00a1d6;
      }
      .box li.checked{
        background-color: #00a1d6;
        color: #fff;
      }

      .box2{
        padding:0;
        margin: 0 0 0 -10px;
        list-style:none;
        color: #626262;
      }

      .box2  li{
        width: fit-content;
        height:23px;
        display:inline-block;
        border-radius:4px;
        text-align:center;
        line-height:23px;
        cursor:pointer;
        transition:all 0.3s linear;
        margin-left:10px;
        padding-left: 5px;
        padding-right: 5px;
      }
      .box2 li:hover{
        color: #00a1d6;
      }
      .box2 li.checked{
        background-color: #00a1d6;
        color: #fff;
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
</style>
