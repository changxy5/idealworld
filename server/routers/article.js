// 博客增删改查接口
// 重点：查询接口
/** 模块引入
 * express
 * DbUtils:genid+db
 * jsonwebtoken：生成token字符串
 * moment: 日期
 * sqlsplicing: sql语句拼接
 */
const express = require('express')
const router = express.Router()
const db = require('../db/DbUtils')
var moment = require('moment')
var SqlSplicing = require('../handler/SqlSplicing')

// 新增接口
router.post('/add', async(req,res)=>{
  let {categoryId,title,content} = req.body
  const insert_sql = 'insert into blog (id,category_id,title,content,create_time,update_time) values (?,?,?,?,?,?)'
  let id = db.genid.NextId()
  let createTime = moment().format()
  console.log('createTime:',createTime);
  
  let {err,res:result} = await db.asyncQuery(insert_sql,[id,categoryId,title,content,createTime,createTime])
  
  if(err){
    console.log('数据库操作失败，错误信息：',err.message);
    
    res.send({
      status:501,
      msg:'新增文章失败！'
    })
  }else{
    res.send({
      status:200,
      msg:'新增文章成功！',
      id:id,
      result
    })
  }
})

// 删除接口，bug：没有被删除的也显示删除成功，交给前端处理？？
router.delete('/delete',async(req,res)=>{
  let {id} = req.query
  const delete_sql = 'delete from blog where id = ?'
  let {err,res:result} = await db.asyncQuery(delete_sql,[id])
  
  if(err){
    res.send({
      status:501,
      msg:'删除文章失败！'
    })
  }else{
    res.send({
      status:200,
      msg:'删除文章成功！',
      result
    })
  }
})

// 修改接口，全部修改
router.put('/update', async(req,res)=>{
  let {id,categoryId,title,content} = req.body
  let updateTime = moment().format()
  let sqlsplicing = new SqlSplicing({category_id:categoryId,title, content,update_time:updateTime})
  let sqlstr = sqlsplicing.splice({throwNull:true,method:'update',mainKey:'id'})
  const update_sql = `update blog set ${sqlstr} where id = ${id}`
  console.log(update_sql);
  let {err,res:result} = await db.asyncQuery(update_sql,[])
  
  if(err){
    console.log('修改失败，err：',err.message);
    
    res.send({
      status:501,
      msg:'修改文章失败！',
      err:err.message
    })
  }else{
    res.send({
      status:200,
      msg:'修改文章成功！',
      result
    })
  }
})

/** 查询接口，需要完成以下任务
 * 1、根据关键词检索标题/内容等并返回文章列表
 * 2、@param {BigInt} categoryId - 分类
 * 3、@param {int} pageSize - 分页大小
 * 4、@param {int} page - 页数
 * 5、@param {int} id - 文章id
 * 4、检索算法：布尔检索、向量空间模型、概率模型
 */
router.get('/search',async(req,res)=>{
  // 获取关键词、分类id、页数、一页显示多少条
  let {id,keyword, categoryId, page, pageSize} = req.query
  page = page == null ? 1:page // 默认第一页
  pageSize = pageSize == null ? 10:pageSize  // 默认十条结果
  keyword = keyword == null?'':keyword
  console.log({keyword, categoryId, page, pageSize});

  var wherearr = []
  if(categoryId!=null) wherearr.push(`category_id=${categoryId}`)
  if(id!=null) wherearr.push(`id=${id}`)
  wherearr.push('(content like ? or title like ?)')
  const wheresql = 'where '+wherearr.join(' and ')

  const search_sql = `select update_time,title, id, create_time, category_id, substr(content from 1 for 80) AS content from blog ${wheresql} order by update_time desc limit ?,?`
  const search_params=[`%${keyword}%`,`%${keyword}%`,(page-1)*pageSize,Number(pageSize)]
    // console.log(search_sql);
  
    // 查询总数
  const count_sql = `select COUNT(*) AS count from blog where (content like ? or title like ?)`
  const count_params =[`%${keyword}%`,`%${keyword}%`]


  // 执行sql语句
  let searchResult= await db.asyncQuery(search_sql,search_params)
  let totalResult = await db.asyncQuery(count_sql,count_params)
  
  
  if(searchResult.err || totalResult.err){
    res.send({
      status:501,
      msg:'查询文章列表失败！',
      err1:searchResult.err.message
      // err2:totalResult.err.message
    })
  }else{
    res.send({
      status:200,
      msg:'查询文章列表成功！',
      result:searchResult.res,
      total:totalResult.res[0].count
    })
  }
})

// 查询全文接口，只需要提供文章id即可
router.get('/details',async(req,res)=>{
  // 获取文章id即可
  let {id} = req.query


  const search_sql = `select update_time, title, id, create_time, category_id, content from blog where id = ? `
  const search_params=[id]

  // 执行sql语句
  let searchResult= await db.asyncQuery(search_sql,search_params)
  
  
  if(searchResult.err){
    res.send({
      status:501,
      msg:'查询文章失败！',
      err:searchResult.err.message
    })
  }else{
    res.send({
      status:200,
      msg:'查询文章成功！',
      result:searchResult.res
    })
  }
})

module.exports = router