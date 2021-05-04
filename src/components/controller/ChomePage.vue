<template>
  <div class="welcome">

    <!--  间隔大小  -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover" class="authority-card" style="height:29vh;">
          <div class="user-cinfo">
            <img src="~assets/images/avator_1.jpeg" class="user-avator" alt />
            <div class="user-info-cont">

              <div class="user-info-cname">{{this.name}}</div>
              <div class="user-info-cid">{{this.id}}</div>
              <div class="user-info-cauthority">{{this.authority}}</div>
            </div>
          </div>
<!--          <div class="create-button" @click="handleEdit">-->
          <div class="create-button" @click="handleNew">
            发布新产品
          </div>
        </el-card>

        <el-card shadow="hover" class="notice" style="height:55vh; margin-top: 20px">
          <div slot="header" class="clearfix">
            <span style="font-size: 20px;line-height: 20px;font-weight: bold;color: #444">公告</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              <i class="iconfont iconjia1"  @click="handleEdit1"></i>
            </el-button>
          </div>
          <el-table :show-header="false" :data="noticeList" style="width:100%;" class="noticeTable">
            <el-table-column>
              <template slot-scope="scope">
                <div class="noticeItem">
                  <div class="noticeContent" @click="handleEditNotice(scope.row.nid,scope.row.ncontent)">
                    {{scope.row.ncontent}}
                  </div>
                  <span class="deleteNotice" @click="deleteNotice(scope.row.nid)">删除</span>
                </div>

              </template>
            </el-table-column>
          </el-table>
        </el-card>

      </el-col>
      <el-col :span="18">
        <el-card shadow="hover" class="card-swiper" style="padding: 20px 20px">
          <div class="carousel-container">
            <el-carousel class="carousel" type="card" height="42vh" ref="barparent" :interval="5000" arrow="always">
              <el-carousel-item v-for="(item,index) in pic" :key="index">
                <img class="carousel-img" style="border-radius: 20px;"  :src="item">
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-card>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-card shadow="hover" class="dash-pic">
              <OrderType></OrderType>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card shadow="hover" class="dash-pic">
              <ProductType></ProductType>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>


    <el-dialog title="新建公告" :visible.sync="editVisible2" width="40vw" style="margin-top: 0vh">
      <el-form ref="createNoticeForm" :rules="rules" :model="form" label-width="90px">
        <el-form-item label="工号">
          <el-col :span="16">
            <el-input :disabled="true" v-model="form.id"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="用户名">
          <el-col :span="16">
            <el-input :disabled="true" v-model="form.name"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="公告" prop="ncontent">
          <el-col :span="16">
            <el-input type="textarea" :rows="4" v-model="form.ncontent"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible2 = false">取 消</el-button>
        <el-button type="primary" s @click="addNotice('createNoticeForm')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑公告" :visible.sync="editVisible1" width="40vw" style="margin-top: 0vh">
      <el-form ref="editNoticeForm" :rules="rules" :model="editform" label-width="90px">
        <el-form-item label="工号">
          <el-col :span="16">
            <el-input :disabled="true" v-model="editform.id"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="用户名">
          <el-col :span="16">
            <el-input :disabled="true" v-model="editform.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="公告id">
          <el-col :span="16">
            <el-input :disabled="true" v-model="editform.nid"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="公告" prop="ncontent">
          <el-col :span="16">
            <el-input type="textarea" :rows="4" v-model="editform.ncontent"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible1 = false">取 消</el-button>
        <el-button type="primary" s @click="editNotice('editNoticeForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
// 1.导入echarts

import OrderType from "./pie/OrderType";
import ProductType from "./pie/ProductType";

export default {
  components: {ProductType, OrderType},
  // 此时,页面上的元素,已经被渲染完毕了
  created() {
    this.form.id = window.sessionStorage.getItem('userid')
    this.form.name = window.sessionStorage.getItem('name')
    this.editform.id = window.sessionStorage.getItem('userid')
    this.editform.name = window.sessionStorage.getItem('name')
    this.id = window.sessionStorage.getItem('userid')
    this.name = window.sessionStorage.getItem('name')
    this.authority = window.sessionStorage.getItem('authority')
    this.getData()
    this.getNotice()
  },
  data(){
    return{
      editVisible2: false,
      editVisible1: false,
      id:'',
      name:'',
      authority:'',
      appList: [
        {
          name:'acm实验室',
          status:'未审核'
        },
        {
          name:'acm实验室',
          status:'已驳回'
        },
        {
          name:'acm实验室',
          status:'未审核'
        },
        {
          name:'acm实验室',
          status:'已驳回'
        }
      ],

      noticeList: [
      ],
      pic:[
        'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/banner1.png',
        'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/banner2.png',
        'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/banner3.png',
        'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/banner4.png',
      ],
      address:[
        '理四201',
        '理四301',
        '理四401',
        '理四410',
        '理四404',
        '理四230',
        '理四321',
        '理四218',
        '理四420',
      ],
      form:{
        id:'',
        name:'',
        ncontent:'',
      },
      editform:{
        id:'',
        name:'',
        ncontent:'',
        nid:''
      },
      rules: {
         ncontent: [
          { required: true, message: '请填写公告内容', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    handleNew() {
      this.$router.push('/createproduct')
    },

    handleEdit1() {
      this.editVisible2 = true;
    },

    handleEditNotice(nid,ncontent) {
      this.editVisible1 = true;
      this.editform.nid = nid;
      this.editform.ncontent = ncontent
    },

    handleChange(file) {
      var This = this;
      //this.imageUrl = URL.createObjectURL(file.raw);
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(e){
        this.result // 这个就是base64编码了
        This.form.poster = this.result;
      }
    },

    // 保存编辑
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editVisible1 = false;
          this.createClub()
          alert('社团创建申请提交成功!');
        } else {
          alert('表单填写有误!!');
          return false;
        }
      });
    },

    async getNotice() {
      const { data: res } = await this.$http.get('/xfftoy/findAllNotice', {

      })
      if (res.code !== 200) {
        return this.$message.error('获取公告列表失败！')
      }
      // res.data.forEach((item,index)=>{
      //   this.noticeList.push(item.ncontent)
      // })
      this.noticeList = res.data
    },

    async addNotice() {
      const { data: res } = await this.$http.post('/xfftoy/addnotice',
          this.form
      )
      if (res.code !== 200) {
        return this.$message.error('创建公告失败！')
      }
      this.$message.success(`公告创建成功`);
      this.editVisible2 = false
      this.getNotice()
    },

    async editNotice() {
      const { data: res } = await this.$http.post('/xfftoy/editNotice',
          this.editform
      )
      if (res.code !== 200) {
        return this.$message.error('编辑公告失败！')
      }
      this.$message.success(`公告编辑成功`);
      this.editVisible1 = false
      this.form.ncontent = ''
      this.getNotice()
    },

    async deleteNotice(id) {
      const { data: res } = await this.$http.post('/xfftoy/deleteNotice',
          {
            nid:id
          }
      )
      if (res.code !== 200) {
        return this.$message.error('删除公告失败！')
      }
      this.$message.success(`公告删除成功`);
      this.getNotice()
    },

    async getData(){
      const { data: res } = await this.$http.get('/clubmanage/homepage', {
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取搜索结果失败！')
      }
      //取得轮播图图片
      this.pic = res.data.pic
      //取得公告栏信息
      this.noticeList = res.data.noticeList
      //取得社团创建表单得地址选项
      this.address = res.data.address
      this.appList = res.data.appList
      // this.$store.state.id = res.data.uid
      // this.$store.state.name = res.data.name
      // this.$store.state.authority = res.data.authority
    },


    async createClub(){
      const { data: res } = await this.$http.post('/clubmanage/createclub',
        this.form
      )
      if(res.meta.status === 200)
      {
        this.$message.success(`社团创建申请提交成功`);
      }
      else if (res.meta.status === 400)
      {
        return this.$message.error('一个用户仅能申请一个社团！')
      }
      else if (res.meta.status === 401)
      {
        return this.$message.error('社团重名！')
      }
      else
      {
        return this.$message.error('社团创建失败！')
      }
      this.getData()
    },
  }
}
</script>



<style lang="less">
  /*@import "../assets/stylesheets/theme.css";*/

  .welcome{
    /*width: 100%;*/

    margin: 0;
    padding: 20px;
  }

  .authority-card{
    padding-top: 2.3vh;
    padding-left: 20px;
    padding-right: 20px;

  }

  .user-cinfo {
    display: flex;
    align-items: center;
    padding-bottom: 2.3vh;
    border-bottom: 2px solid #ccc;
  }

  .user-avator {
    width: 13.5vh;
    height: 13.5vh;
    border-radius: 50%;
  }

  .user-info-cont {
    padding-left: 2vw;
    flex: 1;
    font-size: 14px;
    color: #999;
  }

  .user-info-cname {
    font-size: 3.5vh;
    line-height: 3.5vh;
    color: #222;
  }

  .user-info-cid{
    font-size: 15px;
    line-height: 15px;
    margin-top: 4px;
  }

  .user-info-cauthority{
    font-size: 15px;
    line-height: 15px;
    margin-top: 4px;
  }

  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }


  .card-swiper{
    height: 46vh;
    padding: 0;
    padding-top: 20px;
  }

  .noticeTable{
    margin-top: 0px;
    .noticeItem{
      padding-left: 20px;
      padding-right: 10px;
      height: 100%;
      .noticeContent{
        float: left;
      }
      .deleteNotice{
        float: right;
        display: none;
        font-size: 12px;
        color: #fb7299;
      }


    }
    .el-table__row:hover{
      .deleteNotice{
        display: block!important;
        cursor: pointer;
      }
    }
  }



  .eltc:hover{
    .deleteNotice{
      display: block;
    }
  }

  .dash-pic{
    width: 100%;
    height: 38vh;
    margin-top: 20px;
    padding: 20px;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .create-button{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    margin-top: 2.3vh;
    margin-bottom: 2.3vh;

    display: flex;
    height: 6vh;
    width: 100%;
    border-radius: 3vh;
    background-color: #fb7299;
    color: #fff;
    align-items: center;
    justify-content: center;
    line-height: 6vh;
    font-size: 20px;
    font-weight: bold;
    letter-spacing:1px
  }

  .create-button:hover{
    background-color: #ef5f88;
  }

  .create-button:active{
    border: 1px solid #fff;
    font-size: 19px;
  }

  .iconjia1:hover{
    color: #59c4e6;
  }

  .iconjia1:active{
    color: #516b91;
  }

  .el-upload__input {
    display: none!important;
  }

  .el-upload__tip{
    line-height: 12px;
    margin-top: 0px;
  }

  .notice{
    overflow-y: auto;
  }


  .el-menu-item:hover {
    outline: none;
    background-color: #fecddb !important;
  }


  .csidebar .el-submenu__title:hover {
    outline: none;
    color: #ed4173;
    background-color: #fecddb !important;
  }

  .csidebar .el-submenu__title:hover i{
    color: #ed4173;
  }

  li .el-submenu__title:focus{
    outline: none;
    /*color: #fff;*/
    background-color: #fecddb !important;
  }


</style>

<style lang="less" scoped>
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



.carousel-container{
  max-width: 1600px;
  margin: 0 auto;
  background-color: transparent;
  //padding-left: 5%;
  //padding-right: 5%;


  .carousel{

    margin: 0 auto;

    /*background-color: #e0e5df;*/
    background-color: transparent;

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

.carousel-img{
  /*object-fit:contain;*/
  object-fit:fill;
  display: block;
  text-align: center;
  margin: 0 auto;
  width:100%;
  height:100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: transparent;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: transparent;
}
</style>