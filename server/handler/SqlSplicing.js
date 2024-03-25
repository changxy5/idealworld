// 根据接收的参数拼接sql字符串

/** 拼接语法
 * @param  {object} params - 前端传进来的需要查询的参数列表，为一个对象
 */

class SqlSplicing {

  constructor(params){
    if(params === undefined){
      throw new Error('sqlsplicing constructor lost params')
    }
    this.params = params
  }

  /**
   * 
   * @param {mainKey:string, throwNull:boolean, method:string} options - 配置项 
   */
  splice(options){
    let arr = []
    let keys = Object.keys(this.params)
    let values = Object.values(this.params)
    let sqlstr = '' 
    
    for(let i=0;i<keys.length;i++){
      // 如果定义了主键，跳过主键
      if(options.mainKey!==undefined && keys[i]===options.mainKey)continue
      // 如果throwNull=true, 跳过null值
      if(options.throwNull!==undefined && options.throwNull==true && (values[i]==''||values[i]===undefined))continue
      arr.push(`${keys[i]} = '${values[i]}'`)
    }

    // 根据方法选择分隔符
    let sep = ' and '
    switch(options.method){
      case undefined, null:break;
      case 'select'||'delete': sep = ' and ';break;
      case 'update'||'insert': sep = ', ';break;
    }
    console.log('options.method',options.method);
    
    sqlstr = arr.join(sep)
    return sqlstr
  }
  
}

/**这里是测试用
 const sqlsplicing = new SqlSplicing({name:'marshall',age:'',gender:'male',id:'124234'})
sqlstr = sqlsplicing.splice({throwNull:true,method:'update',mainKey:'id'})
console.log('sqlstr:',sqlstr);
 */



module.exports = SqlSplicing