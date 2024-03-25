/** 第三方模块导入
 * express
 * cors
 * multer：处理文件上传
**/
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const db = require('./db/DbUtils')
const expressjwt = require('express-jwt').expressjwt
/** 路由模块引入
 * login:登录接口
 * cat:分类接口
 * article: 文章接口
 * upload:上传处理接口
 */
const loginRouter = require('./routers/login')
const catRouter = require('./routers/cat')
const articleRouter = require('./routers/article')
const uploadRouter = require('./routers/upload')
const { secretKey,unlessList } = require('./config')

// app
const app = express()

/**注册全局第三方中间件  
 * express.json
 * cors 
 * express.urlencoded
 * express-jwt
**/
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:false}))

/** 注册跨域和认证中间件
 * 处理跨域
 * token接收在login中
 * token验证
**/
app.use((req,res,next)=>{
  // 允许所有域名访问
  res.header('Access-Control-Allow-Origin','*')
  // 允许所有header类型
  res.header('Acess-Control-Allow-Headers','*')
  // 仅允许GET和POST请求
  res.header('Acess-Control-Allow-Methods','GET,POST,PUT,DELETE')
  // 让options尝试请求快速结束，禁用OPTIONS请忽略
  if(req.method ==='OPTIONS')res.sendStatus(200)
  // 一定要记得放行啊 啊啊啊啊！！
  else next()
})
app.use(expressjwt({secret:secretKey,algorithms:['HS256']}).unless({path:unlessList}))
// app.use(authorizeToken)

/** 注册路由中间件
 */
app.use('/admin',loginRouter)
app.use('/cat',catRouter)
app.use('/article', articleRouter)
app.use('/upload',uploadRouter)


// 中间件-处理用户上传
const upload = multer({dest:'/public/upload/temp'})
app.use(upload.any())

// 创建服务器，监听接口
const domain = 'localhost'
const port = 8080
app.listen(port,()=>{
  console.log(`server running at ${domain}:${port}`);
})

app.get('/',(req,res)=>{
  res.send('welcome to my server!');
})

/** 错误中间件，要在最后（app.Method之后）使用
 * token过期
 */
app.use((err,req,res,next)=>{
  if(err.name==='UnauthorizedError')return res.send({
    status:401,
    message:'无效的token'
  })
})