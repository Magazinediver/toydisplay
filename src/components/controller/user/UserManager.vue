<template>
  <div>

    <!-- 卡片视图 -->
    <el-card style="padding: 20px">
      <!-- 搜索 添加 -->
      <el-row :gutter="20">

        <el-col :span="14">
          <el-input placeholder="请输入你想查询的成员" v-model="queryInfo.query" clearable @clear="getmemberlist" @keyup.enter.native="getmemberlist">
            <el-button class="upsearch" slot="append" icon="el-icon-search" @click="getmemberlist"></el-button>
          </el-input>
        </el-col>

        <el-col :span="9" :offset="1">
          <el-radio-group @change="getRadioQuery" v-model="queryInfo.authority">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="顾客"></el-radio-button>
            <el-radio-button label="管理员"></el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>


      <!-- 用户列表区域 -->
      <el-table
        :data="memberlist" stripe>
        <!-- stripe: 斑马条纹
        border：边框-->
        <el-table-column type="index" label="#"></el-table-column>
<!--        <el-table-column prop="mid" width="100" label="学号"></el-table-column>-->
        <el-table-column prop="uid" label="id/工号"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column label="头像/查看大图"  width="200" align="center">
          <template slot-scope="scope">
            <el-image
              style="border-radius: 50%;width: 60px;height: 60px"
              class="table-td-thumb"
              :src="scope.row.head"
              :preview-src-list="[scope.row.face]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="号码"></el-table-column>
        <el-table-column prop="reg_time" label="注册时间"></el-table-column>
<!--        <el-table-column prop="Status" label="状态"></el-table-column>-->
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.ustatus==='正常'?'success':(scope.row.ustatus==='被禁'?'info':'')"
            >{{scope.row.ustatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
                type="text"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
                v-if="scope.row.ustatus==='正常'"
                type="text"
                icon="el-icon-delete"
                style="color: #ff7299"
                @click="handleDelete(scope.$index, scope.row)"
            >禁用</el-button>
            <el-button
                v-if="scope.row.ustatus==='被禁'"
                type="text"
                icon="el-icon-upload"
                style="color: #3dbf41"
                @click="handleReuse(scope.$index, scope.row)"
            >启用</el-button>
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
      <el-form
          ref="changeInfoFormRef"
          :model="changeInfoForm"
          :rules="changeInfoFormRules"
          label-width="0px"
          class="reset_form"
      >
        <el-form-item prop="userid">
          <label style="color: #262626;margin-top: 5px;">Userid / 用户id</label>
          <el-input
              :disabled="true"
              v-model="changeInfoForm.uid"
              prefix-icon="el-icon-user-solid">
          </el-input>
        </el-form-item>

        <el-form-item prop="username">
          <label style="color: #262626;margin-top: 5px;">Username / 用户姓名</label>
          <el-input
              v-model="changeInfoForm.name"
              prefix-icon="el-icon-user-solid">
          </el-input>
        </el-form-item>

        <el-form-item prop="phone">
          <label style="color: #262626;margin-bottom: 0px;" class="pull-left">Phone / 手机号码</label>
          <el-input
              v-model="changeInfoForm.phone"
              prefix-icon="el-icon-lock">
          </el-input>
        </el-form-item>

        <el-form-item prop="email">
          <label style="color: #262626;margin-bottom: 0px;" class="pull-left">Email / 电子邮件</label>
          <el-input
              v-model="changeInfoForm.email"
              name="pwd_confirm"
              prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogClosed">取 消</el-button>
        <el-button type="primary" @click="editUser('editActForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.getmemberlist()
  },
  data () {
    return {
      editVisible: false,
      info:{
        uid: ''
      },
      info2:{
        uid: ''
      },
      // 获取用户列表查询参数对象
      queryInfo: {
        authority : '全部',
        query: '',
        // 当前页数
        pagenum: 1,
        // 每页显示多少数据
        pagesize: 4,
      },
      memberlist: [

      ],
      total: 1,


      // 所有角色数据列表
      rolesLsit: [],
      // 已选中的角色Id值
      selectRoleId: '',
      changeInfoForm: {
        uid:'',
        name: '',
        phone: '',
        email: '',
      },
      // 表单验证
      changeInfoFormRules: {
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
    aclick() {
      this.$router.push('/home');
    },
    async getmemberlist () {
      const { data: res } = await this.$http.get('/xfftoy/findUser', {
        params: this.queryInfo
      })
      if (res.code !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.memberlist = res.data.list

      this.memberlist.forEach((item,index)=>{
        if(item.ustatus === 0){
          item.ustatus = "正常"
          console.log(item.ustatus)
        }else{
          item.ustatus = "被禁"
        }
      })

      this.total = res.data.total
    },

    async deletemember () {
      const { data: res } = await this.$http.get('/xfftoy/deleteUser', {
        params: this.info2
      })
      console.log(res.code)
      if (res.code !== 200) {
        return this.$message.error('删除社员失败！')
      }
      return this.$message.success('删除成功')
    },

    async reuseuser () {
      const { data: res } = await this.$http.get('/xfftoy/reuseUser', {
        params: this.info
      })
      if (res.code !== 200) {
        return this.$message.error('添加社员失败！')
      }
      return this.$message.success('新社员加入成功')
    },

    async editUser () {
      const { data: res } = await this.$http.post('/xfftoy/manageuserinfo',this.changeInfoForm)
      if (res.code !== 200) {
        return this.$message.error('添加社员失败！')
      }
      setTimeout(()=>{
        this.getmemberlist()
      },2000)
      this.editVisible = false
      return this.$message.success('新社员加入成功')
    },


    getRadioQuery() {
      // console.log(this.queryInfo.authority)
      this.getmemberlist()
    },

    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm('确定要金庸吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          // console.log(index)
          // console.log(row)
          this.info2.uid = row.uid
          this.deletemember()
        })
        .catch(() => {});
      setTimeout(()=>{
        this.getmemberlist()
      },2000)
    },

    handleReuse(index, row) {
      // 二次确认删除
      this.$confirm('确定要启用该用户吗？', '提示', {
        type:'warning'
      })
        .then(() => {
          // console.log(index)
          // console.log(row)
          this.info.uid = row.uid
          // console.log(this.info.uid)
          this.reuseuser()
          this.getmemberlist()
        })
        .catch(() => {});
      setTimeout(()=>{
        this.getmemberlist()
      },2000)
    },
    handleEdit(index, row){
      this.editVisible = true
      this.changeInfoForm.uid = row.uid
      this.changeInfoForm.name = row.name
      this.changeInfoForm.email = row.email
      this.changeInfoForm.phone = row.phone
    },

    // 监听 pagesize改变的事件
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getmemberlist()
    },
    // 监听 页码值 改变事件
    handleCurrentChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagenum = newSize
      this.getmemberlist()
    },

    // 监听 添加用户对话框的关闭事件
    addDialogClosed () {
      this.editVisible = false
      this.$refs.changeInfoFormRef.resetFields()
    },

  }
}
</script>

<style lang="less" scoped>
  .up-name-a{
    color: #222;
    text-decoration: none;
  }

  .up-name-a:hover{
    color: #00a1d6;
  }

  .el-input-group__append{
    background-color: #ffc609!important;
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
</style>
