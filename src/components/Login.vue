<template>
  <div class="login-container">
    <section class="body-sign">
      <div class="center-sign">
        <a href="/" class="logo pull-left">
          <img src="~assets/images/logo.png" height="54" alt="Porto Admin" />
        </a>

        <div class="panel panel-sign">
          <div class="text-right">
            <h2 class="text-uppercase"><i class="fa-user"></i> LOGIN/登录</h2>
          </div>
          <div class="panel-body">
            <div>
              <el-form
                ref="loginFormRef"
                :model="loginForm"
                :rules="loginFormRules"
                label-width="0px"
                class="login_form"
              >
                <el-form-item prop="userid">
                  <label style="color: #fb7299;margin-top: 5px;">Userid / 用户昵称</label>
                  <el-input v-model="loginForm.userid" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <label style="color: #fb7299;margin-bottom: 0px;" class="pull-left">Password / 密码</label>
                  <a href="pages-recover-password.html" style="color: #fb7299;text-decoration:none;float:right">Lost Password?/忘记密码？</a>
                  <el-input
                    v-model="loginForm.password"
                    type="password"
                    prefix-icon="el-icon-lock"
                  ></el-input>
                </el-form-item>
                <div class="reme-btns">
                  <div class="rememberme">
                    <div class="checkbox-custom">
                      <input id="RememberMe" name="r`ememberme" type="checkbox"/>
                      <label for="RememberMe">Remember Me/记住密码</label>
                    </div>
                  </div>
                  <div style="width: 205px" class="btns">
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
          </div>
          <p class="text-center-copyright ">&copy; Copyright 2020. All rights reserved. Design by <a href="http://121.36.153.113/">HYH</a>.</p>
        </div>
      </div>

    </section>
  </div>
  </template>

<script>


export default {
  data () {
    return {
      loginForm: {
        // userid: 'admin',
        // password: '123456'
        userid: '',
        password: ''
      },
      // 表单验证
      loginFormRules: {
        userid: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    postOpenPlatform(){
      this.$router.replace('/signup')
      // this.$router.replace('/login')
    },
    // 表单重置按钮
    resetLoginForm () {
      // console.log(this)
      // resetFields：element-ui提供的表单方法
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      // 表单预验证
      // valid：bool类型,用于预验证输入内容是否合法
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return false
        // this.$http.post('login', this.loginForm): 返回值为promise
        // 返回值为promise，可加await简化操作 相应的也要加async
        const { data: res } = await this.$http.post('/xfftoy/login', this.loginForm)
        // console.log(res)
        if (res.code === 404)
          return this.$message.error('用户不存在')
        else if(res.code === 400)
          return this.$message.error('密码错误')
        this.$message.success('登录成功')
        // 1、将登陆成功之后的token, 保存到客户端的sessionStorage中; localStorage中是持久化的保存
        //   1.1 项目中出现了登录之外的其他API接口，必须在登陆之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        window.sessionStorage.setItem('token', res.data.token)

        window.sessionStorage.setItem('userid', this.loginForm.userid)
        window.sessionStorage.setItem('authority', res.data.authority)
        window.sessionStorage.setItem('name', res.data.name)
        // 2、通过编程式导航跳转到后台主页, 路由地址为：/home
        this.$router.push('/home')
        // this.$store.state.name = this.loginForm.userid
        this.$store.state.userid = this.loginForm.userid
        this.$store.state.authority = res.data.authority
        this.$store.state.name = res.data.name
      })
    }
  }
}
</script>

<style lang="less" scoped>
/* // lang="less" 支持less格式
// scoped vue的指令，只在当前组件生效 */
*{
  box-sizing: border-box;
}

.login-container{
  height: 100%;
}


.body-sign{
  color: #fb7299;
  font-family: "Open Sans", Arial, sans-serif;
  line-height: 2px;

  font-size: 13px;

  position: absolute;
  left: 50%;
  top: 45%;
  -webkit-transform: translate(-50%, -50%);


  .center-sign{
    width: 450px;

    .pull-left{
      outline: none!important;
      float: left;

      img{
        width: 200px;
        height: 50px;
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
        margin-top: 35px;
        margin-bottom: 0;

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
        margin-top: -1px;
        padding: 33px 33px 15px;

        .login_form{


          .reme-btns{
            overflow: hidden;
            margin-bottom: 30px;
            .rememberme{
              float: left;

              .checkbox-custom{
                line-height: 40px;
              }
            }

            .btns{
              float: right;

              .confirm-btn{
                margin-left: 55px;
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
