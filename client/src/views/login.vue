<!--登陆界面，星球风-->
<template>
  <div class="box">
    <transition enter-active-class="animate__animated animate__fadeIn" appear>
      <div class="content">
        <div class="login-wrapper">
          <h1>世界正在校验权限</h1>
            <!-- 表单验证 -->
            <n-form 
            class="login-form" 
            ref='formRef'
            :model="model"
            :rules='rules'
            >
              <div class="username form-item">
                <span>世界赋予您的名号</span>
                <input 
                type="text" 
                class="input-item"
                v-model="model.username"
                @keydown.enter.prevent
                />
              </div>
              <div class="password form-item">
                <span>您与世界约定的密钥</span>
                <input 
                  type="password" 
                  class="input-item"
                  v-model='model.password'
                  @keydown.enter.prevent
                />
              </div>
              <n-checkbox v-model:checked="rember" style="margin-right: 12px">
                  记住我
              </n-checkbox>
              <button 
               class="login-btn"
               @click="handelValidateButtonClick"
              >访问世界</button>
            </n-form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {reactive,inject,ref} from 'vue'
// router
import { useRouter, useRoute } from 'vue-router'

export default {
  setup(){
    const axios = inject('axios')
    const router = useRouter()
    const route = useRoute()
    const message = inject('message')
    const loadingBar = inject('loadingBar')
    const formRef = ref(null)
    const modelRef = reactive({
      username:localStorage.getItem('username')||null,
      password:localStorage.getItem('password')||null
    })
    const rules = {
      username:[{
        required:true,
        message:'请输入用户名',
        trigger:'blur',
        validator(rule,value){
          if(!value){return new Error('需要用户名')}
          else if(value.length<6){return new Error('用户名应大于等于6位！')}
          return true
        }
      }],
      password:[{
        required:true,
        message:'请输入密码',
        alidator(rule,value){
          if(!value){return new Error('需要密码')}
          else if(value.length<6){return new Error('密码应大于等于6位！')}
          return true
        }
      }]
    } 
    function handelValidateButtonClick(){
      message.loading('世界校验中...')
      if(modelRef.password==null||modelRef.username==null){
        return message.warning('请告诉我您的信息')
      }
      axios.post('/admin/login',{
        username:modelRef.username,
        password:modelRef.password
      }).then((res)=>{
        if(res.data.status == 500){
          return message.error('名号或密钥错误')
        }else if (res.data.status == 200){
          // 在localStorage存储token和username
          localStorage.setItem('token',res.data.token)
          localStorage.setItem('username',modelRef.username)
          localStorage.setItem('password',modelRef.password)
          message.destroyAll()
          message.success('校验成功')
          // 页面跳转
          router.push('/')
          console.log('token:',res.data.token);
        }else {
          message.destroyAll()
          return message.error('世界树连接失败')
        }
      }).catch((err)=>{
        message.destroyAll()
        message.error('世界树连接失败')
        console.log('err:',err.message);
      })
    }
    return{
      formRef,
      model:modelRef,
      rules,
      handelValidateButtonClick
    }
  }
}
</script>

<style lang='scss' scoped>
@import '/src/assets/css/login.scss';
.animate__animated.animate__fadeIn {
  --animate-duration: 3s;
}
.n-checkbox{
  color:#fff;
  float:right;
}
</style>