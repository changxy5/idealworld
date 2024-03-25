<template>

  <p>这里实现了一个函数防抖，采用customRef实现。<br/>在输入框内快速输入一段英文文字，并观察下方的结果：</p>
  <input type="text" v-model="keywords" placeholder="请输入关键词"/>
  <button @click='showDialog=!showDialog'>搜索</button>
  <!-- 提示框，使用了样式传送 -->
  <Teleport to='body'>
  <div v-if='showDialog'>
    <div class="blur">
      <div class="dialog">
        <p>以下是“{{keywords}}”的检索结果：</p>
        <Icon size="30">
        <CloseCircleSharp 
          @click='showDialog=!showDialog'
        />
        </Icon>
        </div>
    </div>
  </div>
  </Teleport>
  <p>您要搜索：{{keywords}}</p>
  <div class="editor">
    这是editor
    <v-md-editor v-model="text" height="400px"></v-md-editor>
  </div>
  
</template>

<script>
import {ref,customRef} from 'vue'
import CloseCircleSharp from '@vicons/ionicons5/CloseCircleSharp'
import {Icon} from '@vicons/utils'

export default {
  name:'searchDemo',
  components:{CloseCircleSharp,Icon},
  setup(props) {
    var keywords = Myref('默认内容')
    var showDialog = ref(false)
    // 实现搜索框防抖功能
    function Myref(value){
      let timer = null
      return customRef((track,trigger)=>{
        return {
          get(){
            track()
            return value
          },
          set(newValue){
            clearTimeout(timer)
            timer = setTimeout(()=>{
              value = newValue
              trigger()
            },200)
          }
        }
      })
    }
    //实现输入后弹窗
    return{keywords,showDialog}
  }
}
</script>

<style scoped>

.blur{
  position:absolute;
  top:0;left:0;right:0;bottom:0;
  background: rgba(0,0,0,0.5);
}
.dialog{
  width: 300px;
  height: 200px;
  border-radius: 20%;
  background-color: #fff;
  text-align: center;
  margin:auto auto;
}
.dialog p{
  position: relative;
  top:50%;
  transform: translate(0,-50%);
}

</style>