<template>
  <div class="recover-pwd-container">

    <section class="body-sign">
      <div class="reset_container">
        <div class="center-sign">
          <div class="logo_box">
            <img class="logo_box_img" src="~assets/images/logo.png" alt/>
            <div class="reset_tips">
              <span><i class="el-icon-refresh-left"></i></span>
              <h2>Recover Password</h2>
            </div>
          </div>
          <div class="reset_box">
            <!-- 头像区 -->


            <!-- 修改密码表单 -->
            <div>
              <el-form
                  ref="resetFormRef"
                  :model="resetForm"
                  :rules="resetFormRules"
                  label-width="0px"
                  class="reset_form"
              >
                <el-form-item prop="username">
                  <label style="color: #fb7299;margin-top: 5px;">Username / 用户昵称</label>
                  <el-input
                      v-model="resetForm.username"
                      prefix-icon="el-icon-user-solid">
                  </el-input>
                </el-form-item>

                <el-form-item prop="password">
                  <label style="color: #fb7299;margin-bottom: 0px;" class="pull-left">Password / 密码</label>
                  <el-input
                      v-model="resetForm.password"
                      type="password"
                      prefix-icon="el-icon-lock">
                  </el-input>
                </el-form-item>

                <el-form-item prop="cpassword">
                  <label style="color: #fb7299;margin-bottom: 0px;" class="pull-left">Confirm Password / 确认密码</label>
                  <el-input
                      v-model="resetForm.cpassword"
                      class="cpassword-input"
                      type="password"
                      name="pwd_confirm"
                      prefix-icon="el-icon-lock"
                      style="width: 320px;float: left"
                  ></el-input>
                  <span class="input-group-btn reset-span">
										<el-button class="btn btn-primary btn-lg btn-recover reset-btn" type="info" @click="checkpwd">重置</el-button>
									</span>
                </el-form-item>



              </el-form>

            </div>
          </div>
        </div>
      </div>

    </section>


  </div>
</template>

<script>
export default {
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
    checkpwd(){
      if(this.resetForm.password !== this.resetForm.cpassword){
        this.$message.error('两次输入的密码不相同')
      }else{
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

<style scoped lang="less">
.body-sign{
  background-color: #f2f2f2;
  height: 100%;

  .reset_container {
    background-color: #f2f2f2;
    height: 100%;

    .center-sign{
      position: absolute;
      left: 50%;
      top: 45%;
      -webkit-transform: translate(-50%, -50%);

      .logo_box {

        height: 50px;
        background-color: #f2f2f2;


        .logo_box_img {
          float: left;
          height: 50px;
          margin: 0;

        }
        .reset_tips{
          display: flex;
          border-radius: 5px 5px 0 0;
          padding: 0 10px 0 10px;

          color: #FFF;
          font-size: 12px;
          float: right;
          width: 200px;
          height: 50px;
          background-color: #fb7299;
          align-items: center;
          justify-content: center;


          i{

            float: left;
            font-size: 20px;
          }

          h2{
            margin: 0 0 0 4px;
            padding: 0;
            float: right;
            font-size: 20px;
            line-height: 50px;
          }

        }
      }

      .reset_box {
        width: 470px;
        background-color: #fff;
        border-radius: 5px 5px 15px;

        box-shadow: 0 -5px 0px rgba(251,114,153,1);

        .reset_form {
          padding: 30px 30px 40px 30px;
          width: 100%;
          box-sizing: border-box;


          .reset-span{
            width: 90px;
            box-sizing: border-box;
            float: left;

            .reset-btn{
              width: 90px;
              height: 40px;
            }


          }


        }
      }

    }



  }


}














</style>
