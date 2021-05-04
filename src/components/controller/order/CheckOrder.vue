<template>
  <div class="checkorder">
    <div class="container-head">订单审核</div>
    <div class="check-container">
      <el-tabs v-model="message">
        <el-tab-pane :label="`未审订单(${uncheck.length})`" name="first">

          <el-table :data="uncheck">
            <el-table-column type="index" label="#" width="50"></el-table-column>
            <el-table-column prop="orderid" width="150" label="订单编号"></el-table-column>
            <el-table-column label="产品编号"  width="150">
              <template slot-scope="scope">
                <div class="order-check" v-for="(item,index) in scope.row.products" :key="index">
                  <span class="order-check-id">{{item.id}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="产品图"  width="150">
              <template slot-scope="scope">
                <div class="order-check" v-for="(item,index) in scope.row.products" :key="index">
                  <img class="order-check-img" :src="item.img" alt="">
                </div>
              </template>
            </el-table-column>
            <el-table-column label="产品名"  width="150">
              <template slot-scope="scope">
                <div class="order-check-div-name" v-for="(item,index) in scope.row.products" :key="index">
                  <span class="order-check-name">{{item.product}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="产品数量"  width="100">
              <template slot-scope="scope">
                <div class="order-check-div-num" v-for="(item,index) in scope.row.products" :key="index">
                  <span class="order-check-num">{{item.num}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="产品单价"  width="150">
              <template slot-scope="scope">
                <div class="order-check-div-price" v-for="(item,index) in scope.row.products" :key="index">
                  <span class="order-check-num">{{item.price}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="联系人"  width="150">
              <template slot-scope="scope">
                <div class="order-check-div-contact">
                  <p class="order-check-contact">{{scope.row.contact.name}}</p>
                  <p class="order-check-contact">{{scope.row.contact.phone}}</p>
                  <p class="order-check-contact">{{scope.row.contact.email}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="订单备注"></el-table-column>
            <el-table-column width="300">
              <template slot-scope="scope">
                <el-button size="small" @click="handleKnowMore(scope.$index,scope.row)">查看详情</el-button>
                <el-button type="primary" size="small" @click="handleAccept(scope.$index,scope.row)">通过</el-button>
                <el-button type="danger" size="small" @click="handleRefuse(scope.$index,scope.row)">驳回</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>


        <el-tab-pane :label="`已审订单(${history.length})`" name="second">

          <el-table :data="history">
            <el-table-column type="index" label="#" width="50"></el-table-column>
            <el-table-column prop="orderid" width="150" label="订单编号"></el-table-column>
            <el-table-column label="产品编号"  width="150">
              <template slot-scope="scope">
                <div class="order-check" v-for="(item,index) in scope.row.products" :key="index">
                  <span class="order-check-id">{{item.id}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="产品图"  width="150">
              <template slot-scope="scope">
                <div class="order-check" v-for="(item,index) in scope.row.products" :key="index">
                  <img class="order-check-img" :src="item.img" alt="">
                </div>
              </template>
            </el-table-column>
            <el-table-column label="产品名"  width="150">
              <template slot-scope="scope">
                <div class="order-check-div-name" v-for="(item,index) in scope.row.products" :key="index">
                  <span class="order-check-name">{{item.product}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="产品数量"  width="100">
              <template slot-scope="scope">
                <div class="order-check-div-num" v-for="(item,index) in scope.row.products" :key="index">
                  <span class="order-check-num">{{item.num}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="产品单价"  width="150">
              <template slot-scope="scope">
                <div class="order-check-div-price" v-for="(item,index) in scope.row.products" :key="index">
                  <span class="order-check-num">{{item.price}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="联系人"  width="150">
              <template slot-scope="scope">
                <div class="order-check-div-contact">
                  <p class="order-check-contact">{{scope.row.contact.name}}</p>
                  <p class="order-check-contact">{{scope.row.contact.phone}}</p>
                  <p class="order-check-contact">{{scope.row.contact.email}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="订单备注"></el-table-column>
            <el-table-column prop="status" label="订单状态"></el-table-column>
            <el-table-column width="300">
              <template slot-scope="scope">
                <el-button size="small" @click="handleKnowMore(scope.$index,scope.row)">查看详情</el-button>
                <el-button type="danger" size="small" @click="handleDel(scope.$index,scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>


    <el-dialog class="card" title="社团详情" :visible.sync="editVisible" width="40vw">
      <div class="club-container">
        <img class="poster" :src="this.form.poster" alt="">
        <div class="club-text">
          <div class="club-name">{{this.form.orderid}}</div>
          <div class="club-info">
            <div>社团据点： {{this.form.address}}</div>
            <div>负责人学号/工号：{{this.form.id}}</div>
            <div>负责人姓名：{{this.form.name}}</div>
            <div>社团分类： {{this.form.type}}</div>
            <div>社团公告： {{this.form.notice}}</div>
            <div>社团描述： {{this.form.describe}}</div>
          </div>
        </div>
      </div>


<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="editVisible = false">确认</el-button>-->
<!--      </span>-->
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'checkorder',
    created() {
      this.getorderlist()
      this.form.id = window.sessionStorage.getItem('id')
      this.form.name = window.sessionStorage.getItem('name')
    },
    data() {
      return {
        message: 'first',
        showHeader: false,
        editVisible: false,
        queryInfo:{
          deleteorderid: '',
          refuseorderid: '',
          acceptorderid: '',
        },
        form:{
          id:'',
          name:'',
          orderid:'',
          poster:'',
          type:'',
          describe:'',
          address:'',
          notice:''
        },
        uncheck: [
          {
            orderid:'NB-2021-1',
            remark:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            contact:{
              name: '黄xx',
              phone: 17306411234,
              email: '12345678@123123123.com',
            },
            products:[
              {
                id: 123451,
                product: "黄花梨",
                num: 2,
                price: 123,
                img: 'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/1.jpg',
              },
              {
                id: 1265721,
                product: "紫叶檀",
                num: 3,
                price: 321,
                img: 'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/10.jpg',
              },
              {
                id: 123431,
                product: "金丝楠",
                num: 4,
                price: 1000,
                img: 'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/100.jpg',
              }

            ]
          },
        ],
        history: [
          {
            orderid:'NB-2021-1',
            remark:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            contact:{
              name: '黄xx',
              phone: 17306411234,
              email: '12345678@123123123.com',
            },
            products:[
              {
                id: 123451,
                product: "黄花梨",
                num: 2,
                price: 123,
                img: 'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/1.jpg',
              },
              {
                id: 1265721,
                product: "紫叶檀",
                num: 3,
                price: 321,
                img: 'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/10.jpg',
              },
              {
                id: 123431,
                product: "金丝楠",
                num: 4,
                price: 1000,
                img: 'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/100.jpg',
              }

            ]
          },
        ],
      }
    },
    methods: {
      handleAccept(index,row) {
        this.queryInfo.deleteorderid = '';
        this.queryInfo.refuseorderid = '';
        this.queryInfo.acceptorderid = row.application_id;

        this.checkorder();
        console.log(this.queryInfo);
        // const item = this.uncheck.splice(index, 1);
        // this.history = item.concat(this.history);
        this.getorderlist()
      },
      handleRefuse(index,row) {
        this.queryInfo.refuseorderid = row.application_id;
        this.queryInfo.acceptorderid = '';
        this.queryInfo.deleteorderid = '';

        this.checkorder();
        console.log(this.queryInfo);
        // const item = this.uncheck.splice(index, 1);
        // this.history = item.concat(this.history);
        this.getorderlist()
      },
      handleDel(index,row) {
        this.queryInfo.refuseorderid = '';
        this.queryInfo.acceptorderid = '';
        this.queryInfo.deleteorderid = row.application_id;
        // const item = this.history.splice(index, 1);

        this.checkorder();
        console.log(this.queryInfo);
        // const item = this.history.splice(index, 1);
        // this.history = item.concat(this.history);
        this.getorderlist()
      },
      handleKnowMore(index, row) {
        console.log(index);
        console.log(row);

        this.form.id = this.$store.state.id
        this.form.name = this.$store.state.name
        this.form.orderid = row.orderid
        this.form.poster = row.poster
        this.form.type = row.type
        this.form.address = row.address
        this.form.notice = row.notice
        this.form.describe = row.describe

        this.editVisible = true;
      },
      async getorderlist() {
        const { data: res } = await this.$http.get('/clubmanage/checkorderpage', {
        })
        if (res.meta.status !== 200) {
          return this.$message.error('获取用户列表失败！')
        }
        this.history = res.data.history
        this.uncheck = res.data.uncheck
      },
      async checkorder() {
        const { data: res } = await this.$http.get('/clubmanage/checkorder', {
          params: this.queryInfo
        })
        console.log(res.meta.status)
        if (res.meta.status !== 200) {
          return this.$message.error('社团审核失败！')
        }
        setTimeout(()=>{
          this.getorderlist()
        },500)
        return this.$message.success('审核完成')
      },
    },
    computed: {
      uncheckNum(){
        return this.uncheck.length;
      }
    }
  }

</script>

<style>
  .message-title{
    cursor: pointer;
  }
  .handle-row{
    margin-top: 30px;
  }

  .container-head{
    color: white;
    padding-left: 20px;
    font-size: 20px;
    line-height: 40px;

    border-radius: 10px 10px 0 0;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    /*background-color: #00A1D7;*/
    background-image: linear-gradient(to right , #fb7299, #00a1d6);
  }

  .check-container {
    margin: 20px;
    margin-top: 0;
    padding: 30px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 0 0 10px 10px;
  }

  .el-bhistorycrumb{
    background-color: white;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 0;
  }

  .el-dialog{
    border-radius: 30px;
  }

  .el-dialog__title{
    padding-left: 10px;
  }

  .club-container{
    position: relative;
    display: flex;
    align-items: center;
  }

  .poster{
    flex: 1;
    border-radius: 30px;
    width: 60%;
  }

  .club-text{
    flex: 1;
    padding: 0px 30px;
    width: 40%;
  }

  .club-name{
    font-size: 3.5vh;
    color: #222;
    line-height: 40px;
  }

  .club-info{
    margin-top: 20px;
    font-size: 15px;
  }

  .order-check{
    height: 77px;

    border-bottom: 1px solid #eee;
  }

  .order-check-div-name{
    border-bottom: 1px solid #eee;
  }

  .order-check-div-num{
    border-bottom: 1px solid #eee;
  }

  .order-check-div-price{
    border-bottom: 1px solid #eee;
  }

  .order-check-img{
    width: 120px;
    height: 75px;
  }

  .order-check-id{
    height: 100%;
    line-height: 75px;
  }

  .order-check-name{
    height: 100%;
    line-height: 75px;
  }

  .order-check-num{
    line-height: 75px;
  }


</style>

