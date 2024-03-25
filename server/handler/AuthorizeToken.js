// 中间件：验证token
const db = require('../db/DbUtils')

module.exports = async(req,res,next) =>{
  if(req.auth===undefined)return next()
  let {id,username} = req.auth
  console.log('token:',req.auth);
  let sqlstr = 'select * from admin where id = ?'
  let {err,result} = await db.asyncQuery(sqlstr,[id])
  
  
  if(err){
    return res.send({
      status:501,
      message:'数据库连接失败！'+err.message,
    })
  }
  if(result.length==0){
    return res.send({
      status:401,
      message:'无效的token'
    })
  }
  (res.send({
    status:200,
    message:'登陆成功'
  }))
  next()
}
