// 管理员登录接口
/** 模块引入
 * express
 * DbUtils:genid+db
 * jsonwebtoken：生成token字符串
 */
const express = require('express')
const router = express.Router()
const db = require('../db/DbUtils')
var jwt = require('jsonwebtoken')
// 导入token秘钥和有效期
const {secretKey,expiresIn} = require('../config.js')

//此处写login连接mysql处理逻辑，这些是练习示例:

/** 回调的写法
router.get('/login',(req,res)=>{
  db.execQuery('select * from admin',(dbres)=>{
    res.send({
    id:db.genid.NextId(),
    result:dbres
    })
  })
})
*/

/** Promise的写法
router.post('/login', (req,res)=>{
  / promise的写法
  db.asyncQuery('select * from admin').then((dbres)=>{
    res.send({
      id:db.genid.NextId(),
      result:dbres
    })
  })
})
*/

/** ES8 asyn/await的写法，异步写法变同步，更简洁
router.post('/login',async (req,res)=>{
  let result = await db.asyncQuery('select * from admin')
  let result2 = await db.asyncQuery(`select * from admin where id = ${result[0].id}`)
  res.send({
    id:db.genid.NextId(),
    result, // 相当于result:result
    result2
  })
})
*/

// 这个是正式实现：
router.post('/login',async(req,res)=>{
  let {username,password} = req.body
  
  // 校验账号密码是否正确,debugger
  let {err,res:result} = await db.asyncQuery('select * from admin where username = ? AND password = ?',[username,password])
  
  if(err){res.send({
    status:501,
    msg:'登陆失败！'
  })}else if(result.length==0){res.send({
    status:500,
    msg:'用户名或密码错误！'
  })}else{
    // 校验成功，生成token字符串
    // 【注意】不要将敏感信息如密码用于生成token
    
    let login_token = jwt.sign({id:result[0].id,username},secretKey,{algorithm:'HS256',expiresIn:expiresIn})
    
    // 将生成的token上传到数据库
    await db.asyncQuery('update admin set token = ? where id = ?',[login_token, result[0].id])
    // 将登录数据+token返回给前端
    let admin_info = result[0]
    admin_info.token = 'Bearer '+login_token

    // 返回token字符串
    res.send({
      status:200,
      msg:'登陆成功！',
      token:admin_info.token
     })
  }
})


/** 暴露
 */
module.exports = router