import Vue from 'vue'
import VueRouter from 'vue-router'



// 路由懒加载
const Login = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../components/Login.vue')
const HomePage = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../components/HomePage.vue')
const Welcome = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../components/Welcome.vue')

const Users = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/user/User.vue')
const Product = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/Product/Product.vue')
const Products = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/Product/Products.vue')
const ProductDetail = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/Product/ProductDetail.vue')

const Signup = () => import(/* webpackChunkName: "Order_Report" */ '../components/user/Signup.vue')
const Recoverpwd = () => import('../components/user/Recoverpwd.vue')



const Chome = () => import('../components/controller/Chome.vue')
const Chomepage = () => import('../components/controller/ChomePage')
const OrderManager = () => import('../components/controller/order/OrderManager.vue')
const CheckOrder = () => import('../components/controller/order/CheckOrder.vue')
const ProductManager = () => import('../components/controller/product/ProductManager.vue')
const UserManager = () => import('../components/controller/user/UserManager.vue')
const CreateProduct = () => import('../components/controller/product/CreateProduct.vue')
const Csignup = () => import('../components/controller/user/Csignup.vue')
const Crecoverpwd = () => import('../components/controller/user/Recoverpwd.vue')

const MyOrder = () => import('../components/user/MyOrder.vue')
const MyCollect = () => import('../components/user/MyCollect.vue')
const OrderDetail = () => import('../components/user/OrderDetail.vue')
// const MyCollect = () => import('../components/user/MyCollect.vue')
const ChangeUserInfo = () => import('../components/user/ChangeUserInfo.vue')


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home'},
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/chome',
    component: Chome,
    children: [
      { path: '/chome', component: Chomepage ,meta: { title: '系统首页' }},
      { path: '/ordermanager', component: OrderManager , meta: { title: '订单管理' }},
      { path: '/checkorder', component: CheckOrder , meta: { title: '订单审核' }},
      { path: '/productmanager', component: ProductManager , meta: { title: '产品管理' }},
      { path: '/createproduct', component: CreateProduct , meta: { title: '发布新产品' }},
      { path: '/usermanager', component: UserManager , meta: { title: '用户管理' }},
      { path: '/signup-manager', component: Csignup , meta: { title: '用户注册' }},
      { path: '/crecoverpwd', component: Crecoverpwd , meta: { title: '修改密码' }},
    ]
  },
  { path: '/home',
    component: HomePage,
    // redirect: '/Welcome',
    children: [
      { path: '/home', component: Welcome },
      { path: '/myspace', component: Users },
      { path: '/recoverpwd', component: Recoverpwd },
      { path: '/products', component: Products },
      { path: '/product', component: Product },
      { path: '/productdetail', component: ProductDetail },
      { path: '/myorder', component: MyOrder },
      { path: '/mycollect', component: MyCollect },
      { path: '/orderdetail', component: OrderDetail },
      { path: '/changeuserinfo', component: ChangeUserInfo},
    ] }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作 next('/login')强制跳转login
router.beforeEach((to, from, next) => {
  // 访问登录页，放行
  if (to.path === '/login') return next()
  if (to.path === '/signup') return next()
  if (to.path === '/home') return next()
  if (to.path === '/products') return next()
  if (to.path === '/product') return next()
  if (to.path === '/productdetail') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token, 强制跳转到登录页
  if (!tokenStr) {
    return next('/login')
  }else{
    return next()
  }

})

router.afterEach((to, from) => {
  setTimeout(()=>{
    document.querySelector("#main").scrollTop = 0
  },50)
})


export default router
