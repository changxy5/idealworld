// 数据库链接组件
/** 模块引入
 * mysql
 * 雪花id（Genid）
 * sequelize
**/
var mysql = require('mysql')
var path = require('path')
const {Sequelize,DataTypes} = require('sequelize')


// 暴露雪花id
const Genid = require(path.join(__dirname,'../utils/SnowFlake'))

// 初始化mysql数据库配置
var connection = mysql.createConnection({
  host:'localhost', // 以后改成别的端口
  port:3306,
  user:'root',
  password:'123456',
  database:'idealworld'
});

// 初始化sequelize数据库配置
async function asyncSequelize(){
  // 连接数据库
  const sequelize = new Sequelize(
    'idealworld',
    'root',
    '123456',
    {
      host:'localhost',
      port:3306,
      dialect:'mysql'
    }
  )
  // 测试数据库连接
  try{
    sequelize.authenticate()
    console.log('connected to idealworld');
  }catch(err){
    console.log('unable to connect');
  }
  // 定义数据模型，把mysql的配置抄过来
  const Blog = sequelize.define('Blog',{
    id:{
      type:DataTypes.BIGINT,
      allowNull:false
    },
    category_id:{
      type:DataTypes.BIGINT
    },
    title:{
      type:DataTypes.STRING
    },
    content:{
      type:DataTypes.TEXT
    },
    create_time:{
      type:DataTypes.CHAR
    },
    update_time:{
      type:DataTypes.CHAR
    }
  })
}


// 初始化雪花id并暴露
// workerid:用于多台服务器共同生成，不会重复
module.exports.genid = new Genid({WorkerId:1})
/**一个简单的genid示例：
for (let index = 0; index < 5000; index++) {
    console.log(genid.NextId());
}
*/


// 使用回调的异步数据库执行方法
module.exports.execQuery = (sql,callback)=>{
  // 执行成功时执行回调
  connection.query(sql,(err,res)=>{
    if(err)return console.log(err.message);
    callback(res)
  })
}

// 使用Promise封装的异步数据库执行方法
module.exports.asyncQuery = (sql,params)=>{
  return new Promise((resolve, reject)=>{
    connection.query(sql,params,(err,res)=>{
      resolve({err,res})
    })
  })
} 

