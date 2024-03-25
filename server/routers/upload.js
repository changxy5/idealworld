/** 处理图片上传
 * 关键组件：wangEditor
 * express.router
 * path
 * fs
 * DbUtiles:db,genid
 * moment
 */
const express = require('express')
const db = require('../db/DbUtils')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: 'public/upload/temp/' })

// 文章上传，根据wangeditor官网要求的服务端配置填写
router.post('/rich_editor_upload',upload.single('file'),async(req,res)=>{
  // 如果没有收到文件
  if(!req.file){
    res.send({
      "errno": 1, // 只要不等于 0 就行
      "message": "文件接收失败"
    })
    return;
  }
  let file = req.file;
  let suff = path.extname(file.originalname)
  let orgDir = path.join(process.cwd(),'/public/upload/temp/',file.filename)
  let destDir = path.join(process.cwd(),'/public/upload',file.filename+suff)
  fs.renameSync(orgDir,destDir)
  res.send({
    "errno": 0, // 注意：值是数字，不能是字符串
    "data": {
        "url": destDir, // 图片 src ，必须
        //"alt": "yyy", // 图片描述文字，非必须
        //"href": "zzz" // 图片的链接，非必须
        file:req.file
    }
  })
})

module.exports = router