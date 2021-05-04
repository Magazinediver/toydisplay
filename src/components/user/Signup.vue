<template>
  <div class="signup-container">
    <div class="body-sign">
      <div class="center-sign">
        <a href="/" class="logo pull-left">
          <img src="~assets/images/logo.png" height="54" alt="Porto Admin" />
        </a>

        <div class="panel panel-sign">
          <div class="panel-title-sign mt-xl text-right">
            <h2 class="title text-uppercase text-bold m-none"><i class="fa fa-user mr-xs"></i> Sign Up</h2>
          </div>
          <div class="panel-body">
            <el-form
                :model="addUserForm"
                ref="addUserFormRef"
                :rules="addUserFormRules"
                class="signup-form"
            >
              <el-form-item  class="form-group mb-lg" prop="id">
                <label>ID / 学号or工号</label>
                <el-input v-model.number="addUserForm.id"></el-input>
              </el-form-item>

              <el-form-item class="form-group mb-lg" prop="email">
                <label>E-mail Address / 电子邮件</label>
                <el-input v-model="addUserForm.email"></el-input>
              </el-form-item>

              <el-form-item class="form-group mb-lg" prop="phone">
                <label>Phone / 手机号码</label>
                <el-input v-model="addUserForm.phone"></el-input>
              </el-form-item>

              <div class="form-group mb-none">
                <div style="margin-left: 0" class="row">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item  class="col-sm-6 mb-lg" prop="password">
                        <label>Password / 密码</label>
                        <el-input type="password" v-model="addUserForm.password"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item class="col-sm-6 mb-lg" prop="name">
                        <label>Name / 真实姓名</label>
                        <el-input v-model="addUserForm.name"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>

              <div  style="margin-left: 0" class="row">
                <div class="check-box">
                  <div class="checkbox-custom checkbox-default">
                    <input id="AgreeTerms" name="agreeterms" type="checkbox"/>
                    <label for="AgreeTerms">我同意 <a href="#">用户使用协议</a></label>
                  </div>
                </div>
                <div style="margin-left: 68px" class="btns">
                  <el-button class="confirm-btn" type="primary" @click="login">登录</el-button>
                  <el-button class="reset-btn" style="margin-left: 10px;" @click="resetLoginForm">重置</el-button>
                </div>
              </div>

              <el-divider><span class="divider">OR</span></el-divider>

              <p class="text-center">Don't have an account yet?
                <a href="javascript:void(0);" @click="postOpenPlatform()"> Sign up!</a>
              </p>
            </el-form>
          </div>

          <p class="text-center-copyright">&copy; Copyright 2020. All rights reserved. Design by <a href="http://121.36.153.113/">HYH</a>.</p>


        </div>

        </div>
    </div>
  </div>


</template>

<script>
export default {
  name: "signup",
  data(){
    // 邮箱规则
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback()
      }
      callback(new Error('请输入合法邮箱'))
    }
    // 学号规则
    // var checkId = (rule, value, callback) => {
    //   const regId = /^1[34578]\d{9}$/
    //   if (regId.test(value)) {
    //     return callback()
    //   }
    //   // 返回一个错误提示
    //   callback(new Error('请输入合法的手机号码'))
    // }
    return {
      addUserForm: {
        name: '',
        password: '',
        email: '',
        phone:'',
        id: '',
      },
      userlist: [],
      // 用户添加表单验证规则
      addUserFormRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '用户名的长度在2～10个字', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          {
            min: 6,
            max: 18,
            message: '用户密码的长度在6～18个字',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        id: [
          { required: true, message: '请输入学号/工号'},
          { type: 'number',  message: '请输入纯数字'},
          // { min: 5, max: 8, message: '长度在 5 到 8 个字符'},

          // { validator: checkId, trigger: 'blur' }
        ]
      },
    }
  },
  methods:{
    postOpenPlatform(){
      this.$router.replace('/login')
    },
    addUser () {
      this.$refs.addUserFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid){
          this.$message.error('填写的内容非法！')
          return false
        }
        const {data: res} = await this.$http.post('/clubmanage/regist/', this.addUserForm)
        if (res.meta.status !== 200) {
          this.$message.error('用户已存在')
          return false
        }
        this.$message.success('注册成功')
        this.$router.replace('/login')
      })
    },

  }
}
</script>

<style>


</style>

<style scoped lang="less">

*{
  box-sizing: border-box;
}

.signup-container{
  width: 100%;
  height: 100%;
  padding: 20px 0;
  overflow-y: auto;
}

.body-sign{
  color: #fb7299;
  font-family: "Open Sans", Arial, sans-serif;
  line-height: 2px;

  font-size: 13px;

  display: table;
  height: 100%;
  margin: 0 auto;
  max-width: 500px;
  padding: 0 15px;
  width: 100%;


  .center-sign{
    display: table-cell;
    padding: 10vh 0 5vh 0;

    .pull-left{
      outline: none!important;
      float: left;

      img{
        margin-top: 20px;
        width: 200px;
        height: 50px;
        vertical-align: center;
      }
    }

    .panel-sign{
      background: transparent;
      box-shadow: none;
      border: none;
      margin-bottom: 20px;
      border-radius: 4px;

      .text-right{
        text-align: right;
        margin-top: 25px;

        .text-uppercase{
          background-image: linear-gradient(to right,rgba(157, 182, 222, 1),rgba(93, 180, 233, 1));
          border-radius: 5px 5px 0 0;
          color: #FFF;
          display: inline-block;
          font-size: 1.2rem;
          line-height: 2rem;
          padding: 13px 17px;
          vertical-align: bottom;
          margin: 0;

          .fa-user{
            margin-right: 5px !important;
            display: inline-block;
            font-family: FontAwesome;
            font-style: normal;
            font-weight: normal;
            line-height: 1;
            -webkit-font-smoothing: antialiased;
          }
        }

      }

      .panel-body{
        background: #FFF;
        border-top: 5px solid transparent;
        border-image:linear-gradient(to right,rgba(251, 114, 153, 0.8),rgba(93, 180, 233, 1))1 10;
        border-radius: 5px 0 5px 5px;
        -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        padding: 33px 33px 15px;

        .signup-form{

          .row{
            overflow: hidden;
            .check-box{
              float: left;
              line-height: 40px;

              a{
                text-decoration: none;
                color: #aaa;
              }
            }
            .btns{
              float: right;

              .confirm-btn{
                margin-left: 45px;
                border: rgba(251, 114, 153, 0.5) 1px solid;
                color: #ff7299;
                background-color: rgba(251, 114, 153, 0.1) !important;
              }

              .reset-btn{
                border: rgba(0, 161, 214, 0.5) 1px solid;
                color: #00a1d6;
                background-color: rgba(0, 161, 214, 0.1) !important;
              }
            }
          }

        }

        .divider{
          color: #aaa;
          margin: 10px 0;
        }

        .text-center{
          margin: 0 auto;
          padding: 10px 0;
          text-align: center;

          font-size: 13px;
          line-height: 13px;
          color: rgba(251, 114, 153, 0.6);

          a{
            color: rgba(251, 114, 153, 1);
            text-decoration: none;

          }
        }

      }

      .text-center-copyright{
        text-align: center;
        font-size: 13px;
        line-height: 13px;
        color: #aaa;

        a{
          color: rgba(251, 114, 153, 1);
          text-decoration: none;

        }
      }

    }

  }

}


</style>
