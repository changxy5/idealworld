// 配置文件，包括token密钥、有效期等

module.exports={
  secretKey:'marshallLee',
  expiresIn:'72h',
  unlessList:[
    '/',
    '/admin/login',
    '/article/search',
    '/article/details',
    '/cat/get'
  ]
}