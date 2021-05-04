<template>
  <div class="pmanage-container">

    <!-- 卡片视图 -->
    <el-card style="padding: 20px">
      <!-- 搜索 添加 -->
      <el-row :gutter="20">

        <el-col :span="14">
          <el-input placeholder="请输入你想查询的活动" v-model="queryInfo.query" clearable @clear="getproductlist" @keyup.enter.native="getproductlist">
            <el-button class="upsearch" slot="append" icon="el-icon-search" @click="getproductlist"></el-button>
          </el-input>
        </el-col>

<!--        <el-col :span="9" :offset="1">-->
<!--          <el-radio-group @change="getRadioQuery" v-model="queryInfo.type">-->
<!--            <el-radio-button label="默认"></el-radio-button>-->
<!--            <el-radio-button label="时间近"></el-radio-button>-->
<!--            <el-radio-button label="时间远"></el-radio-button>-->
<!--          </el-radio-group>-->
<!--        </el-col>-->

        <el-col :span="2" :offset="1">
          <el-dropdown class="dropdown1" :hide-on-click="false" @command="handleCommandMaterial">
            <span class="el-dropdown-link">
              {{drop1[queryInfo.material]}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0">全部类型</el-dropdown-item>
              <el-dropdown-item command="1">TPU</el-dropdown-item>
              <el-dropdown-item command="2">TPR</el-dropdown-item>
              <el-dropdown-item command="3">TPE</el-dropdown-item>
              <el-dropdown-item command="4">PVA</el-dropdown-item>
              <el-dropdown-item command="5">PP</el-dropdown-item>
              <el-dropdown-item command="6">ABS塑料</el-dropdown-item>
              <el-dropdown-item command="7">瓜尔胶</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>

        <el-col :span="2" :offset="0">
          <el-dropdown class="dropdown2" @command="handleCommandSort">
            <span class="el-dropdown-link">
              {{drop2[queryInfo.sort]}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0">全部分类</el-dropdown-item>
              <el-dropdown-item command="1">解压玩具</el-dropdown-item>
              <el-dropdown-item command="2">弹射玩具</el-dropdown-item>
              <el-dropdown-item command="3">水晶土</el-dropdown-item>
              <el-dropdown-item command="4">史莱姆</el-dropdown-item>
              <el-dropdown-item command="5">发光玩具</el-dropdown-item>
              <el-dropdown-item command="6">ABS塑料</el-dropdown-item>
              <el-dropdown-item command="7">球类玩具</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>


      <!-- 用户列表区域 -->
      <el-table
        :data="productlist" stripe>
        <!-- stripe: 斑马条纹
        border：边框-->
        <el-table-column type="index" label="#"></el-table-column>
        <!--        <el-table-column prop="mid" width="100" label="学号"></el-table-column>-->
        <el-table-column prop="pname" width="120" label="产品名"></el-table-column>
        <el-table-column label="产品图/查看大图"  width="200" align="center">
          <template slot-scope="scope">
            <el-image
              style="border-radius: 10px;width: 100%;height: 100%;margin-bottom: -5px"
              class="table-td-thumb"
              :src="scope.row.fileList[0].iurl"
              :preview-src-list="[scope.row.fileList[0].iurl]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="type" width="100" label="产品类型"></el-table-column>
        <el-table-column prop="material" width="100" label="产品材质"></el-table-column>
        <el-table-column prop="ptime" label="上线时间"></el-table-column>
        <el-table-column prop="tech"  label="技术参数"></el-table-column>
        <el-table-column prop="productid" label="订货型号"></el-table-column>
        <el-table-column prop="pdescribe" label="产品概述"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.pstatus==='上线'?'success':(scope.row.pstatus==='下架'?'danger':'')"
            >{{scope.row.pstatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.pstatus==='上线'"
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              v-if="scope.row.pstatus==='上线'"
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >下架</el-button>
            <el-button
              v-if="scope.row.status==='下架'"
              type="text"
              icon="el-icon-upload"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >重新上架</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[ 4, 5, 6, 8]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>


    <el-dialog title="编辑产品" :visible.sync="editVisible" width="40vw">
      <el-form class="editActForm" ref="editActForm" :rules="rules" :model="form" label-width="90px">
        <el-form-item label="用户名">
          <el-col :span="16">
            <el-input :disabled="true" v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="工号">
          <el-col :span="16">
            <el-input :disabled="true" v-model="form.id"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="产品名" prop="productname">
          <el-col :span="16">
            <el-input v-model="form.productname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="产品类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择活动区域">
            <el-option v-for="(item,index) in type" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上线时间">
          <el-col :span="7">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" style="margin: 0 auto;text-align: center">-</el-col>
          <el-col :span="7">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
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
        <el-form-item label="活动海报">
          <el-upload
              class="upload-demo"
              drag
              :on-change="handleChange"
              :auto-upload="false">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="技术参数" prop="parameter">
          <el-col :span="16">
            <el-input v-model="form.parameter"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="订货型号" prop="code">
          <el-col :span="16">
            <el-input v-model="form.code"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="产品概述" prop="introduce" >
          <el-col :span="20">
            <el-input type="textarea" :rows="4" v-model="form.introduce"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editActForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    created() {
      this.getproductlist()
      // this.form.id = this.$store.state.id
      // this.form.name = this.$store.state.name
      this.form.id = window.sessionStorage.getItem('id')
      this.form.name = window.sessionStorage.getItem('name')
    },
    data () {
      return {
        addid: '',
        deleteid: '',
        editVisible: false,
        form:{
          
          id:'',
          name:'',
          activityid:'',
          productname:'',
          parameter:'',
          poster:'',
          type:'',
          introduce:'',
          material:'',
          code:'',
          date1:'',
          date2:''
        },
        type:['挤压玩具','节日玩具','弹跳玩具','文具','史莱姆','水晶土','雪花土'],
        // 获取该社团所有活动信息
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
        productlist: [
          // {
          //   id:'1',
          //   name:'xxxx',
          //   activityid:'xxxxx',
          //   productname:'xxxx',
          //   parameter:'xxxx',
          //   poster:'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/banner1.png',
          //   type:'xxx',
          //   introduce:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          //   material:'xxxxx',
          //   code:'xxx',
          //   date1:'xx',
          //   date2:'xx',
          //   status:'在售',
          // },
          // {
          //   id:'1',
          //   name:'xxxx',
          //   activityid:'xxxxx',
          //   productname:'xxxx',
          //   parameter:'xxxx',
          //   poster:'https://toydisplay-1301629946.cos.ap-shanghai.myqcloud.com/banner2.png',
          //   type:'xxx',
          //   introduce:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          //   material:'xxxxx',
          //   code:'xxx',
          //   date1:'xx',
          //   date2:'xx',
          //   status:'已下架',
          // },
        ],
        drop1 : ["全部材料","TPU","TPR","TPE","PVA","PP","ABS塑料","瓜尔胶"],
        drop2 : ["全部分类","解压玩具","弹射玩具","水晶土","史莱姆","发光玩具","ABS塑料","球类玩具"],
        total: 1,

        rules: {
          productname: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          material: [
            { required: true, message: '请选择活动场地', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            {required: true, message: '请选择活动种类', trigger: 'change'}
          ],
          parameter: [
            { required: true, message: '请填写活动联络人', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请填写活动介绍', trigger: 'blur' }
          ],
          introduce: [
            { required: true, message: '请填写活动须知', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.editVisible = false;
            this.editactivity()
            alert('提交申请!');
          } else {
            alert('表单填写有误!!');
            return false;
          }
        });
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
      aclick() {
        this.$router.push('/home');
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

      async deleteactivity () {
        const { data: res } = await this.$http.get('/clubmanage/deleteactivity', {
          params: this.deleteid
        })
        console.log(res.meta.status)
        if (res.meta.status !== 200) {
          return this.$message.error('删除社员失败！')
        }
        return this.$message.success('删除成功')
      },

      async editactivity() {
        const { data: res } = await this.$http.post('/clubmanage/editactivity',
          this.form
        )
        console.log(res.meta.status)
        if (res.meta.status !== 200) {
          return this.$message.error('编辑活动失败！')
        }
        return this.$message.success('活动编辑成功')
      },

      getRadioQuery() {
        console.log(this.queryInfo.type)
        this.getproductlist()
      },

      handleDelete(index, row) {
        // 二次确认删除
        this.$confirm('确定要删除吗？', '提示', {
          type: 'warning'
        })
          .then(() => {
            // console.log(index)
            // console.log(row)
            this.deleteid = row.id
            this.deleteactivity()
            this.getproductlist()
          })
          .catch(() => {});
      },

      handleEdit(index, row) {
        this.form.productname = row.productname
        this.form.type = row.type
        this.form.material = row.material
        this.form.code = row.code
        this.form.introduce = row.introduce
        this.form.parameter = row.parameter
        this.form.poster = row.poster
        this.form.activityid = row.activityid

        this.editVisible = true;
      },
      handleCommandSort(command) {
        if (command === "0") {
          this.queryInfo.sort = "0"
          this.getproductlist()
        }
        if (command === "1") {
          this.queryInfo.sort = "1"
          this.getproductlist()
        }
        if (command === "2") {
          this.queryInfo.sort = "2"
          this.getproductlist()
        }
        if (command === "3") {
          this.queryInfo.sort = "3"
          this.getproductlist()
        }
        if (command === "4") {
          this.queryInfo.sort = "4"
          this.getproductlist()
        }
        if (command === "5") {
          this.queryInfo.sort = "5"
          this.getproductlist()
        }
        if (command === "6") {
          this.queryInfo.sort = "6"
          this.getproductlist()
        }
        if (command === "7") {
          this.queryInfo.sort = "7"
          this.getproductlist()
        }
      },
      handleCommandMaterial(command) {
        if (command === "0") {
          this.queryInfo.material = "0"
          this.getproductlist()
        }
        if (command === "1") {
          this.queryInfo.material = "1"
          this.getproductlist()
        }
        if (command === "2") {
          this.queryInfo.material = "2"
          this.getproductlist()
        }
        if (command === "3") {
          this.queryInfo.material = "3"
          this.getproductlist()
        }
        if (command === "4") {
          this.queryInfo.material = "4"
          this.getproductlist()
        }
        if (command === "5") {
          this.queryInfo.material = "5"
          this.getproductlist()
        }
        if (command === "6") {
          this.queryInfo.material = "6"
          this.getproductlist()
        }
        if (command === "7") {
          this.queryInfo.material = "7"
          this.getproductlist()
        }
      },

      // 监听 pagesize改变的事件
      handleSizeChange (newSize) {
        // console.log(newSize)
        this.queryInfo.pagesize = newSize
        this.getproductlist()
      },
      // 监听 页码值 改变事件
      handleCurrentChange (newSize) {
        // console.log(newSize)
        this.queryInfo.pagenum = newSize
        this.getproductlist()
      },
      // 监听 switch开关 状态改变
      async userStateChanged (userInfo) {
        // console.log(userInfo)
        const { data: res } = await this.$http.put(
          `users/${userInfo.id}/state/${userInfo.mg_state}`
        )
        if (res.meta.status !== 200) {
          userInfo.mg_state = !userInfo.mg_state
          return this.$message.error('更新用户状态失败')
        }
        this.$message.success('更新用户状态成功！')
      },
      // 监听 添加用户对话框的关闭事件
      addDialogClosed () {
        this.$refs.addUserFormRef.resetFields()
      },

    }
  }
</script>

<style lang="less" scoped>

.pmanage-container{
  position: relative;
  width: 100%;

  height: 100%;
  overflow-y: auto;

}

  .up-name-a{
    color: #222;
    text-decoration: none;
  }

  .up-name-a:hover{
    color: #00a1d6;
  }

  .el-input-group__append{
    background-color: #fb7299!important;
    color: white !important;
  }

  .upsearch{
    height:40px;
    background-color: #fb7299 !important;
    color: #fff !important;
  }

  .upsearch:hover{
    background-color: #d94c95 !important;
    color: white !important;
  }

  .cell{
    padding-bottom: 0px;
  }

  .dropdown1{
    height: 30px;
    padding-top: 10px;
  }

  .el-dropdown-link{
    color: #777;
  }

  .dropdown2{
    height: 30px;
    padding-top: 10px;
  }



</style>
