<template>
  <div>
    <el-container>
      <div class="video-container" style="margin: 0 auto;width: 100%;padding-top: 10px;padding-bottom: 30px;" >
        <div class="father">
            <li v-for="(item,index) in cproductlist" :key="index" class="product-item matrix">
              <a :href="item.link" title="视频封面,点击前往" target="_blank" class="img-anchor" @click="gotoProductDetail(item.productid)">
                <div class="img">
                  <div class="lazy-img" v-if="item.fileList[0].iurl">
                    <el-image alt="" :src="item.fileList[0].iurl" lazy></el-image>>
                  </div>
                  <span class="so-imgTag_rb">{{item.material}}</span>
                </div>
              </a>
              <div class="product-info">
                <div class="headline clearfix">
                  <a :title="item.pname" target="_blank" class="product-title" @click="gotoProductDetail(item.productid)">
                    <span>
                      {{slice1(item.pname,cquery)}}
                    </span>
                    <span style="color:#fb7299">
                      {{slice2(item.pname,cquery)}}
                    </span>
                    <span>
                      {{slice3(item.pname,cquery)}}
                    </span>
                  </a>
                </div>
                <div class="info-body">



                  <p title="描述" class="describe"><i class="icon-date"></i>{{item.pdescribe}}</p>

                  <span title="标签" class="tags">
                    <i class="icon-tags"></i>
                    <span class="tag" v-for="(itemt,cindex) in item.dynamicTags" :key="cindex">#{{itemt}}</span>

                  </span>
                  <span title="销量" class="sales"><i class="icon-subtitle"></i>销量: {{item.sales}}</span>
                </div>
              </div>
            </li>
        </div>

      </div>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "Tabcomponent",
    data(){
      return{


      }
    },
    created() {
      console.log(this.cproductlist)
    },
    methods:{
      gotoProductDetail(productid){
        // this.$store.state.productdetail = productid
        window.sessionStorage.setItem('productdetail', productid)
        // console.log(productid)
        return this.$router.push('/productdetail');
        // this.$router.replace('/productdetail');
      },


      play(play){
        if(play<10000)
          return play
        else if (play>10000){
          return (play/10000).toFixed(1) + '万'
        }
        // else if (play>10000000){
        //   return (play/10000000).toFixed(1) + '千万'
        // }
      },
      slice1(item,title){
        return item.slice(0,item.toLowerCase().indexOf(title.toLowerCase()))
      },
      slice2(item,title){
        return item.slice(item.toLowerCase().indexOf(title.toLowerCase()),item.toLowerCase().indexOf(title.toLowerCase())+title.length)
      },
      slice3(item,title){
        return item.substr(item.toLowerCase().indexOf(title.toLowerCase())+title.length)
      }
    },
    props: ['cproductlist','cquery']
  }
</script>

<style lang="less" scoped>
  .father {
    padding-left: 20px;
    margin: 0 auto;
  }

  .product-item{
    float: left;
    margin-right: 12px;
    margin-left: 12px;
    margin-top: 20px;
    z-index: 0;
    list-style: none;
    display: inline;
  }

  .product-item:hover{
    border: 1px solid rgba(0,161,214,0.6);
  }

  .matrix {
    position: relative;

    width: 300px;
    padding-bottom: 12px;
    border: 1px solid #e5e9ef;
    border-radius: 12px;
  }

  a {
    text-decoration: none;
    outline: 0;
    cursor: pointer;
  }



  .img {
    height: 180px;
    border-radius: 11px 11px 0 0;
    position: relative;
    overflow: hidden;
  }

  .lazy-img {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABHCAMAAAB4UkqjAAAAh1BMVEUAAADd3d3d3d…UCIZXAAAALHRSTlMAoJDx4OYL/DcGF+6+JNi4ycSIT2k6LPeWfRzTVPXPszEQrV0hpo12cEZAZFpRNIQAAAJVSURBVFjD7dbZcpswGIbhHwwSi81q8Ib33fnu//oatRIpmliDhQ/aaZ+TKInnjVgkhb4RJMhP9Fzo8PiD+vEA+JPnqS0+1dRHBJhibAzh2HNeekxP9Z8XBSMZM6SmRBYx65QeM6XsY3rKPqanLGMWqeDmOh0b/Io9+YHi3gKtdExgLznSlyjFMGnUphIMlcgY22C4DSPBxTu4IrXDe+yI6IDWbPSqGVoHoohDyip6XZVB4hFN1TgPyUaYQ5rSWQ0nZGcC6UyJukKypa4yIXX3HLLlqCdHX++HLRfS/9bbWvvHLSLNR3N6tRXdFwdxejekiYF4fDnWYa/WqSm2PqRCSy0hrbP5RxAaW8141N17tVbZ+S1fFYbWFF2+1lqg62BoBdAsqWOLroWhxTh+M8vmWuuaxp1WaWjRSn43yl35sHTLUjxiaWlqnYE4LZoJme3v13MibqepFZRL6otV5V+/Hv+xVvi+FsvZG1qh/LQ7uFXnF/HlwcEfYlDktW2r5EARUiXWc1xRWAC8tGwxsdJ9dcRnYrddMdtrjDZyAy3kXrSJ7O89u8zEZAIKxBRnFzbonWD3ZkfCrrmzP+6979nicjAnW3NZ4OS1R6GtVBa8drTek539up3NAgMvcv51WNZQitCiFBZQaqIMSrx1XrWNoWTy/w1r+hk+xjuMSVjGGC6WZ3S1xlDriqTKxzB+Ra3I4bDHne62drqmied57QR9z0D94dHnOEmvJ/pWAMm4ovL2TTcJ5cRyMlHrbkdG5c/5r82fYqt+K/iR89m2JrP9PEZyI80PsPxVT0P3FAEAAAAASUVORK5CYII=) 50% no-repeat;
    width: 100%;
    height: 100%;
    display: inline-block;

  }
  .lazy-img img {
    display: block;
    width: 100%;
    height: 100%;

    //margin-top: 1px;
    //margin-left: 1px;

  }


  .product-item .so-imgTag_rb {
    position: absolute;
    right: 0;
    bottom: 0;
    line-height: 20px;
    font-size: 16px;
    padding: 0 5px 2px 5px;
    color: #fff;
    background-color: #333;
    background-color: rgba(0, 0, 0, .5);
    border-top-left-radius: 6px;
  }

  .product-info {
    padding: 8px 20px 0 20px;
    border-top: 1px solid #e5e9ef;

  }

  .headline {
    margin-top: 5px;
    margin-bottom: 5px;
    overflow: hidden;

  }

  .info-body{
    position: relative;

    .describe{
      color: #aaa;
      padding: 0;
      margin: 0 0 15px 0;
    }

    .tags{
      width: 100%;
      .tag{

        margin-right: 15px;
        color: #00A1D7;
      }
    }

    .sales{
      position: absolute;
      right: 0;
      bottom: 0;

      color: #626262;

    }


  }




  .watch-num {
    overflow: inherit;
    white-space: nowrap;
  }




  .product-title {
    font-size: 17px;
    line-height: 20px;
    color: #222;
    margin-left: 0px;
  }

  .icon-playtime {
    background-position: -485px -543px;
  }

  .icon-subtitle {
    background-position: -442px -124px;
  }

  .so-icon i.icon-date {
    background-position: -442px -165px;
  }

  .so-icon i.icon-uper {
    background-position: -442px -83px;
  }

  .up-name {
    display: inline-block;
    max-width: 132px;
    height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #99A2AA;
  }
</style>
