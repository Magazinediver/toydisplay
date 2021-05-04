<template>
  <div class="creat-act-page">

    <div class="container">
      <div class="logo">
        <img src="../../../assets/images/logo.png" alt="">
      </div>
      <div class="form-title">发布新产品</div>
      <el-divider content-position="left">NATTY BOY | 小飞飞玩具</el-divider>
      <el-form class="createProductForm" ref="createProductForm" :rules="rules" :model="form" label-width="90px">
        <el-form-item label="用户名">
          <el-col :span="16">
            <el-input :disabled="true" v-model="form.userid"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="姓名">
          <el-col :span="16">
            <el-input :disabled="true" v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="产品编号" prop="productid">
          <el-col :span="16">
            <el-input v-model="form.productid"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="产品名" prop="pname">
          <el-col :span="16">
            <el-input v-model="form.pname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="产品类型" prop="type">
          <el-select v-model="form.ptype" placeholder="请选择产品类型">
            <el-option v-for="(item,index) in type" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="上线时间">-->
<!--          <el-col :span="7">-->
<!--            <el-form-item prop="date1">-->
<!--              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col class="line" :span="2" style="margin: 0 auto;text-align: center">-</el-col>-->
<!--          <el-col :span="7">-->
<!--            <el-form-item prop="date2">-->
<!--              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-form-item>-->
        <el-form-item label="产品材质" prop="material">
          <el-radio-group v-model="form.material" size="small">
            <el-radio-button label="TPU"></el-radio-button>
            <el-radio-button label="TPR"></el-radio-button>
            <el-radio-button label="TPE"></el-radio-button>
            <el-radio-button label="PVA"></el-radio-button>
            <el-radio-button label="PP"></el-radio-button>
            <el-radio-button label="ABS塑料"></el-radio-button>
            <el-radio-button label="瓜尔胶"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="产品图片">
          <el-upload
            class="upload-demo"
            drag
            :on-change="handleupdate"
            action
            :limit="4"
            :on-remove="handleRemove"

            :auto-upload="false">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="标签">
          <el-tag
              :key="tag"
              v-for="(tag,index) in form.dynamicTags"
              :type="tagscolor[index]"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>

        <el-form-item label="产品颜色">
          <el-tag
              :key="tag"
              v-for="(tag,index) in form.dynamicColors"
              :type="tagscolor2[index]"
              closable
              :disable-transitions="false"
              @close="handleCloseColor(tag)">
            {{tag}}
          </el-tag>
          <el-input
              class="input-new-tag"
              v-if="inputVisibleColor"
              v-model="inputValueColor"
              ref="saveTagInputColor"
              size="small"
              @keyup.enter.native="handleInputConfirmColor"
              @blur="handleInputConfirmColor"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInputColor">+ New Tag</el-button>
        </el-form-item>

        <el-form-item label="产品分类">
          <el-tag
              :key="tag"
              v-for="(tag,index) in form.dynamicTypes"
              :type="tagscolor3[index]"
              closable
              :disable-transitions="false"
              @close="handleCloseType(tag)">
            {{tag}}
          </el-tag>
          <el-input
              class="input-new-tag"
              v-if="inputVisibleType"
              v-model="inputValueType"
              ref="saveTagInputType"
              size="small"
              @keyup.enter.native="handleInputConfirmType"
              @blur="handleInputConfirmType"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInputType">+ New Tag</el-button>
        </el-form-item>

        <el-form-item label="技术参数" prop="tech">
          <el-col :span="16">
            <el-input v-model="form.tech"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="产品规格" prop="pcs">
          <el-col :span="16">
            <el-input v-model="form.pcs"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="产品尺寸" prop="psize">
          <el-col :span="16">
            <el-input v-model="form.psize"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="产品价格" prop="price">
          <el-col :span="16">
            <el-input v-model="form.price"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="产品包装" prop="ppackage">
          <el-col :span="16">
            <el-input v-model="form.ppackage"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="产品概述" prop="pdescribe" >
          <el-col :span="20">
            <el-input type="textarea" :rows="4" v-model="form.pdescribe"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button type="primary" @click="submitForm('createProductForm')">确 定</el-button>
        <el-button @click="resetForm('createProductForm')">重置</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
  export default {

    name: "CreateActivity",
    created() {
      // this.getData()
      // this.form.userid = this.$store.state.userid
      // this.form.name = this.$store.state.name
      this.form.userid = window.sessionStorage.getItem('userid')
      this.form.name = window.sessionStorage.getItem('name')
    },
    data(){
      return{
        fileindex:0,
        inputVisible: false,
        inputValue: '',
        inputVisibleColor: false,
        inputValueColor: '',
        inputVisibleType: false,
        inputValueType: '',
        tagscolor: ['','success','info','warning','danger'],
        tagscolor2: ['','success','info','warning','danger'],
        tagscolor3: ['','success','info','warning','danger'],
        form:{
          userid:'',
          name:'',
          productid:'',
          pname:'',
          tech:'',
          material:'',
          attention:'',
          ptype:'',
          color:'',
          pdescribe:'',
          dynamicTags: [],
          dynamicColors: [],
          dynamicTypes: [],
          price:'',
          psize:'',
          ppackage:'',
          pcs:'',
          fileList:[],
        },
        type:['挤压玩具','节日玩具','弹跳玩具','文具','史莱姆','水晶土','雪花土'],
        rules: {
          pname: [
            { required: true, message: '请输入产品名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          productid: [
            { required: true, message: '请输入产品名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          ptype: [
            { required: true, message: '请选择产品类型', trigger: 'change' }
          ],
          // date1: [
          //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          // ],
          // date2: [
          //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          // ],
          material: [
            {required: true, message: '请选择活动种类', trigger: 'change'}
          ],
          tech: [
            { required: true, message: '请填写技术参数', trigger: 'blur' }
          ],
          pdescribe: [
            { required: true, message: '请填写订货型号', trigger: 'blur' }
          ],
          attention: [
            { required: true, message: '请填写产品概述', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      handleClose(tag) {
        this.form.dynamicTags.splice(this.form.dynamicTags.indexOf(tag), 1);
      },

      handleCloseColor(tag) {
        this.form.dynamicColors.splice(this.form.dynamicColors.indexOf(tag), 1);
      },

      handleCloseType(tag) {
        this.form.dynamicTypes.splice(this.form.dynamicTypes.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.form.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },

      showInputColor() {
        this.inputVisibleColor = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInputColor.$refs.input.focus();
        });
      },

      handleInputConfirmColor() {
        let inputValueColor = this.inputValueColor;
        if (inputValueColor) {
          this.form.dynamicColors.push(inputValueColor);
        }
        this.inputVisibleColor = false;
        this.inputValueColor = '';
      },

      showInputType() {
        this.inputVisibleType = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInputType.$refs.input.focus();
        });
      },

      handleInputConfirmType() {
        let inputValueType = this.inputValueType;
        if (inputValueType) {
          this.form.dynamicTypes.push(inputValueType);
        }
        this.inputVisibleType = false;
        this.inputValueType = '';
      },



      handleupdate(File)
      {
        if (this.fileindex === 4) {
          return this.$message.error('一个产品至多上传4张图片')
        }
        let key = '/img/' + new Date().getTime() + File.name

        this.form.fileList.push(
          {
            index:this.fileindex,
            name:File.name,
            key:key,
            file:File,
            iurl:''
          }
        )
        this.fileindex++

        // console.log(this.form.fileList)
        // console.log(this.fileindex)
      },

      async handleRemove (File) {
        // 创建COS实例  获取签名
        //这里写你们后端提供的请求接口即可
        if (this.fileindex === 0) {
          return this.$message.error('一个产品至少上传1张图片')
        }
        this.form.fileList.forEach((item,index)=>{
          if(item.name === File.name){
            this.form.fileList.splice(index,1)
          }
        })

        this.fileindex --

        // console.log(this.form.fileList)
        // console.log(this.fileindex)
      },


      async uploadImg (File,index) {
        // 创建COS实例  获取签名
        //这里写你们后端提供的请求接口即可

        const { data: res } = await this.$http.get('/xfftoy/upload')


        if (res.code !== 200) {
              return this.$message.error('获取搜索结果失败！')
            }

        // if (this.form.imgURL.length > 3) {
        //   return this.$message.error('产品图不可大于四张！')
        // }
        const cos = new COS({
          // 必选参数
          getAuthorization: (options, callback) => {
            const obj = {
              TmpSecretId: res.data.tmpSecretId,
              TmpSecretKey: res.data.tmpSecretKey,
              XCosSecurityToken: res.data.sessionToken,
              StartTime: res.data.startTime, // 时间戳，单位秒，如：1580000000
              ExpiredTime: res.data.expiredTime // 时间戳，单位秒，如：1580000900
            }
            // console.log(obj)
            callback(obj)
          }
        })
        // 上传图片  其中Bucket 和 Region找你们负责人拿
        //key 在前面加上路径写法可以生成文件夹
        cos.putObject({
          Bucket: 'toydisplay-1301629946', /* 必须 */
          Region: 'ap-shanghai', /* 存储桶所在地域，必须字段 */
          Key: File.key, /* 必须 */
          StorageClass: 'STANDARD',
          Body: File.file.raw, // 上传文件对象
          onProgress: progressData => {
            console.log(JSON.stringify(progressData))
          }
        }, (err, data) => {
          // 将上传后的封面进行路径拼接保存到本地
          console.log(err || data)
          const url = 'https://' + data.Location
          console.log("url: "+url)
          this.form.fileList[index].iurl = url

          console.log(this.form.fileList[index])
        })
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.fileindex === 0) {
              return this.$message.error('一个产品至少上传1张图片')
            }
            this.editVisible = false;
            this.form.fileList.forEach((item,index)=>{
              this.uploadImg(item,item.index)
            })

            let that = this
            setTimeout(()=>{
              that.createProduct()
            },10000)

            alert('是否确认提交申请!');
          } else {
            alert('表单填写有误!!');
            return false;
          }
        });
      },
      // async getData(){
      //   const { data: res } = await this.$http.get('/clubmanage/createactivitypage', {
      //   })
      //   if (res.meta.status !== 200) {
      //     return this.$message.error('获取数据失败！')
      //   }
      //   this.type = res.data.type
      //   this.$message.success('获取活动申请表数据成功！')
      // },
      async createProduct() {
        const { data: res } = await this.$http.post('/xfftoy/createProduct',
            this.form
        )
        if (res.code !== 200) {
          return this.$message.error('创建产品失败！')
        }
        this.$message.success(`产品提交成功`);

      },
      resetForm(formName) {
        // console.log(1111)
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }


  .creat-act-page{
    padding-top: 20px;
    padding-bottom: 100px;
    position: relative;
    width: 100%;

    height: 100%;
    overflow-y: auto;
    background-color: #F2F2F2;
  }

  .container{
    position: relative;
    border-radius: 10px;
    border: 1px solid #ddd;
    width: 60%;
    margin-left: 20%;
    margin-bottom: 100px;
    padding-bottom: 60px;


    background-color: white;
  }

  .form-title{
    margin-top: 20px;
    margin-bottom: 10px;
    color: #fb7299;
    font-size: 30px;
    line-height: 80px;
    margin-left: 40px;
    /*margin: 0 auto;*/
    /*text-align: center;*/
  }

  .logo{
    position: absolute;
    top: 40px;
    right: 40px;
  }

  .logo img{
    width: 200px;

  }

  .createProductForm{
    padding-left: 40px;
  }

  .el-divider--horizontal{

    background-color: #777;
    margin-bottom: 60px;
    margin-top: 0;
  }


  .el-upload__input {
    display: none!important;
  }


  .footer{
    margin-top: 60px;
    margin-left: 130px;
  }

</style>
