<template>
  <div>
    <div ref="clubtype" :style="{width: '100%', height: '38vh'}"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  const option = {
    title: {
      text: '产品种类分布',
      subtext: '小飞飞玩具',
      // left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',  //垂直显示
      y: 'center',    //延Y轴居中
      x: 'right', //居右显示
      data: ['兴趣','游戏','艺术','组织','志愿','动漫','学术','运动']
    },
    series: [
      {
        name: '半径模式',
        type: 'pie',
        radius: [40, 110],
        center: ['50%', '50%'],
        roseType: 'radius',
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true
          }
        },
        data: [
          {value: 10, name: '兴趣'},
          {value: 5, name: '游戏'},
          {value: 15, name: '艺术'},
          {value: 25, name: '组织'},
          {value: 20, name: '志愿'},
          {value: 35, name: '动漫'},
          {value: 30, name: '学术'},
          {value: 40, name: '运动'}
        ]
      },
    ]
  }

  export default {
    name: "ClubType",

    mounted() {
      this.getData();
      setTimeout(() =>{
        this.mycharts = echarts.init(this.$refs.clubtype,"essos")
        // 初始化echarts

        this.mycharts.setOption(option)
      },400)
    },
    data(){
      return{
        list:[],
        address:[],
      }
    },
    methods:{
      async getData(){
        const { data: res } = await this.$http.get('/clubmanage/clubpie', {
        })
        if (res.meta.status !== 200) {
          return this.$message.error('获取搜索结果失败！')
        }

        option.series[0].data = res.data
        setTimeout(()=>{
          this.mycharts.setOption(option)
          // echarts初始化的前提是dom渲染完成
        },600)
      },
      sort(){
        var arrayObj=Array.from(this.list);
        arrayObj.sort(function(a,b){return parseInt(b.value)-parseInt(a.value)})
        this.list = arrayObj.slice(0,10);
      },
      take(){
        this.address = this.list.map(function (item) { return item.name; });
      }
    }
  }
</script>

<style scoped>

</style>
