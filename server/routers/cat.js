// 文章分类增删改查接口
// 逻辑：每一个分类名都有一个唯一的id，一篇文章的分类记录着这些id，在加载文章时查找这些id对应的分类名即可
/** 模块引入
 * express
 * DbUtils:genid+db
 * jsonwebtoken：生成token字符串
 */
const express = require('express')
const router = express.Router()
const db = require('../db/DbUtils')


// 新增接口
router.post('/add', async(req,res)=>{
  let {name} = req.body
  const insert_sql = 'insert into category (id,name) values (?,?)'
  
  let {err,res:result} = await db.asyncQuery(insert_sql,[db.genid.NextId(),name])
  
  if(err){
    res.send({
      status:501,
      msg:'新增分类失败！'
    })
  }else{
    res.send({
      status:200,
      msg:'新增分类成功！',
      result
    })
  }
})

// 删除接口，方法delete，用query接收即可
router.delete('/delete',async(req,res)=>{
  let {id} = req.query
  const delete_sql = 'delete from category where id = ?'
  let {err,res:result} = await db.asyncQuery(delete_sql,[id])
  
  if(err){
    res.send({
      status:501,
      msg:'删除分类失败！'
    })
  }else{
    res.send({
      status:200,
      msg:'删除分类成功！',
      result
    })
  }
})

// 修改接口，方法put
router.put('/update', async(req,res)=>{
  let {id,name} = req.body
  const update_sql = 'update category set name = ? where id = ?'
  let {err,res:result} = await db.asyncQuery(update_sql,[name,id])
  
  if(err){
    res.send({
      status:501,
      msg:'修改分类失败！'
    })
  }else{
    res.send({
      status:200,
      msg:'修改分类成功！',
      result
    })
  }
})

// 查询接口，分为全部查询or按分类id查询
router.get('/get',async(req,res)=>{  
  let search_sql = `select * from category`
  if(req.query.id) search_sql+=` where id = ${Number(req.query.id)}` 
  console.log(search_sql);
  
  let {err,res:result} = await db.asyncQuery(search_sql,[])
  
  if(err){
    res.send({
      status:501,
      msg:'查询分类失败！',
      err:err.message
    })
  }else{
    res.send({
      status:200,
      msg:'查询分类成功！',
      result
    })
  }
})

module.exports = router