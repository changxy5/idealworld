<template>
<div class="main">
  <div class="title">
    发布智慧 Wisdom Publishing
  </div>
  <div class="subtitle">个体的万千智慧，组成世界树的万千枝杈。</div>

  <div class="content">
    <n-space vertical size='large'>
    <n-form>
      <n-form-item label='文章标题'>
          <n-input v-model:value="title" placeholder="输入文章标题" />
      </n-form-item>
    </n-form>
    <v-md-editor v-model="text" height="400px"></v-md-editor>
    <div class="handin">
      <n-form>
        <n-form-item label="选择文章分类">
        <n-select
          v-model:value="cid"
          placeholder="选择文章分类"
          :options="catDist"
        />
        </n-form-item>
        <n-button type="primary" @click='upload'>确认发布</n-button>
      </n-form>
    </div>
    </n-space>
  </div>
</div>
</template>

<script>
import {ref,inject} from 'vue'
import {onBeforeRouteLeave,useRouter} from 'vue-router'

export default {
  setup(){
    const title = ref('')
    const text = ref('')
    const catDist = ref([])
    const cid = ref()
    const freejump = ref(false)
    const router = useRouter()
    const message = inject('message')
    const dialog = inject('dialog')
    const axios = inject('axios')
    getCat()

    function upload(){
      if(!title.value.length){
        return message.error('给你的文章取个标题吧！')
      }
      if(text.value.length<10){
        return message.error('文章内容太少了，再写点吧！')
      }
      if(!cid.value){
        return message.error('请选择文章分类！')
      }
      message.loading('世界树正在保存你的智慧...')
      axios.post('article/add',{
          title:title.value,
          content:text.value,
          categoryId:Number(cid.value)
        },{
            headers:{
              Authorization:localStorage.getItem('token')
            }
        }
        ).then(
        function (res){
          console.log(res);
          message.destroyAll()
          message.success('文章发布成功！')
          freejump.value = true
          router.push(`/docs/details?id=${res.data.id}`)
        }
      ).catch(err=>{
        message.error('世界树连接失败!')
      })
    }

    // 获取分类
    function getCat(){
      axios.get(`cat/get`).then(res=>{
        let tmp = res.data.result
        let catopt = []
        tmp.forEach(ele => {
          catopt.push({label:ele.name,value:ele.id})
        });
        console.log('catopt:',catopt);
        catDist.value = catopt
      })
    }

    // 在用户存在未保存的内容发布之前，弹出警告
    onBeforeRouteLeave((to,from,next)=>{
      if(!(title.value.length || text.value.length)){
        return next()
      }
      // 文章发布成功过后，可以自由跳转
      if(freejump.value) return next()
      // 否则警告
      dialog.warning({
          title: "警告",
          content: "世界将不会储存你未发布的智慧",
          positiveText: "确定离开",
          negativeText: "我再想想",
          onPositiveClick: () => {
            message.warning('世界遗失了你的智慧')
            return next()
          }
        });
    })

    return {cid,title,text,upload,catDist}

  }
}
</script>

<style lang="scss" scoped>
.main{
  margin:40px 30px 0 30px;
  .title{
    font-size:30px;
    border-left:2px solid #403E4E;
    padding-left:10px;
    opacity:0;
    font-weight:600;
    animation: fadeIn 1.5s ease-in-out 0s forwards;
  }
  .subtitle{
    // padding-top:10px;
    padding-left:15px;
    font-size:16px;
    opacity:0;
    animation: fadeIn 1.5s ease-in-out 0s forwards;
  }
    .content{
    margin-top:50px;
    color:#93A6B1;
  }
}
</style>