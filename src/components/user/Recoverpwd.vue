<template>
  <div class="myorder-container">
    <div class="container">
      <el-row :gutter="15">

        <el-col :span="4">
          <el-card class="navigater" >
            <u-siderbar></u-siderbar>
          </el-card>
        </el-col>

        <el-col :span="20">
          <div class="product-body">
            <div class="product-head">
              <div class="breadcrumb">
                <el-breadcrumb separator="/">
                  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item><a href="/">个人中心</a></el-breadcrumb-item>
                  <el-breadcrumb-item>更改密码</el-breadcrumb-item>
                </el-breadcrumb>
              </div>


              <div class="head-text">
                <!--          <span style="margin-right: 5px">NATTY BOY</span>-->
                <!--          <span> I </span>-->
                <!--          <span style="margin-left: 5px">小飞飞玩具</span>-->
                <img class="head-logo" src="../../assets/images/logo.png" alt="">
              </div>
            </div>

            <div class="product-body-main">
              <p class="body-title">更改密码</p>
              <el-row :gutter="20">
                <el-col :span="10" :offset="0">
              <el-form
                  ref="resetFormRef"
                  :model="resetForm"
                  :rules="resetFormRules"
                  label-width="0px"
                  class="reset_form"
              >
                <el-form-item prop="username">
                  <label style="color: #262626;margin-top: 5px;">Username / 用户昵称</label>
                  <el-input
                      v-model="resetForm.username"
                      prefix-icon="el-icon-user-solid">
                  </el-input>
                </el-form-item>

                <el-form-item prop="password">
                  <label style="color: #262626;margin-bottom: 0px;" class="pull-left">Password / 密码</label>
                  <el-input
                      v-model="resetForm.password"
                      type="password"
                      prefix-icon="el-icon-lock">
                  </el-input>
                </el-form-item>

                <el-form-item prop="cpassword">
                  <label style="color: #262626;margin-bottom: 0px;" class="pull-left">Confirm Password / 确认密码</label>
                  <el-input
                      v-model="resetForm.cpassword"
                      type="password"
                      name="pwd_confirm"
                      prefix-icon="el-icon-lock"
                  ></el-input>
                </el-form-item>
                <div class="btn">
                  <el-button class="confirm-btn" type="primary" @click="reset">确认更改</el-button>
                </div>


              </el-form>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>



  </div>

</template>

<script>
import uSiderbar from "@/components/user/UserSidebar";

export default {
  components:{
    uSiderbar
  },
  name: "recoverpasswd",
  data() {
    return {
      resetForm: {
        username: '',
        password: '',
        cpassword: '',
      },
      // 表单验证
      resetFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入旧密码', trigger: 'blur'},
          {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
        ],
        cpassword: [
          {required: true, message: '请再次确认密码', trigger: 'blur'},
          {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    checkpwd() {
      if (this.resetForm.password !== this.resetForm.cpassword) {
        this.$message.error('两次输入的密码不相同')
      } else {
        this.reset()
      }
    },

    reset() {
      // 表单预验证
      // valid：bool类型,用于预验证输入内容是否合法
      this.$refs.resetFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return false
        // this.$http.post('reset', this.resetForm): 返回值为promise
        // 返回值为promise，可加await简化操作 相应的也要加async
        const {data: res} = await this.$http.post('/bilibili/reset', this.resetForm)
        // console.log(res)
        if (res.meta.status !== 200) return this.$message.error('重置失败')

        // 2、通过编程式导航跳转到后台主页, 路由地址为：/home
        this.$router.push('/login')
      })
    }
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
.myorder-container {
  padding: 20px;
  width: 100vw;
  background-color: #f6f6f6;

  .container {
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

    .product-body {
      background-color: #fff;
      padding: 20px 0;

      margin: 0 auto;
      //border: 1px solid #ccc;
      box-shadow: 0 0 5px 3px #eee;


      .product-head {
        height: 35px;
        border-bottom: 1px solid #eee;
        padding: 0 40px;

        .breadcrumb {
          float: left;

          .el-breadcrumb {
            margin: 0;
          }
        }

        .head-text {
          position: relative;
          width: 250px;
          height: 56px;
          float: right;
          color: #262626;

          font-size: 13px;
          //font-weight: bold;
          .head-logo {
            width: 190px;
            position: absolute;

            top: -15px;
            right: 0;
          }
        }

      }

      .product-body-main {
        padding: 20px 40px;
        min-height: 600px;

        .body-title{
          font-size: 32px;
          font-weight: bold;

          color: #444;
        }

        .btn{
          margin-top: 40px;
          .confirm-btn{
            width: 100px;
            height: 45px;
            background-color: rgba(0, 161, 214, 0.1);
            border: rgba(0, 161, 214, 0.6) 1px solid;
            color: rgba(0, 161, 214, 1);
          }
        }
      }


    }


  }
}
</style>
