<template>
<div class="main">
  <div class="title">
    修改智慧 Wisdom Editing
  </div>
  <div class="subtitle">世界永远在转动，智慧永远在更迭。</div>

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
        <n-button type="primary" @click='update'>确认修改</n-button>
      </n-form>
    </div>
    </n-space>
  </div>
</div>
</template>

<script>
import { ref,inject} from 'vue'
import {onBeforeRouteLeave,useRouter,useRoute} from 'vue-router'

export default {
  setup(){
    const title = ref('')
    const text = ref('')
    const cid = ref(1)
    const catDist = ref([])
    const freejump = ref(false)
    const route = useRoute()
    const router = useRouter()
    const message = inject('message')
    const dialog = inject('dialog')
    const axios = inject('axios')

    getBlogInfo(route.query.id)

    // 获取文章信息及分类信息
    function getBlogInfo(id){
      axios.get(`article/details?id=${id}`).then(res=>{
        console.log('res',res);
        title.value = res.data.result[0].title
        text.value = res.data.result[0].content
        cid.value = res.data.result[0].category_id
        // 将分类信息存入catDist
        axios.get(`cat/get`).then(res=>{
          let tmp = res.data.result
          let catopt = []
          tmp.forEach(ele => {
            catopt.push({label:ele.name,value:ele.id})
          });
          console.log('catopt:',catopt);
          catDist.value = catopt
        })
        cid.value = res.data.result[0].category_id
      }).catch(err=>{
        message.error('世界树连接失败!')
      })
    }

    // 发布文章
    function update(){
      if(!title.value.length){
        return message.error('给你的文章取个标题吧！')
      }
      if(text.value.length<10){
        return message.error('文章内容太少了，再写点吧！')
      }
      message.loading('世界树正在更新你的智慧...')
      
      axios.put('article/update',{
          id:route.query.id,
          title:title.value,
          content:text.value.replace(/'/g,"\\'").replace(/`/g,'\\`'),
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
          if(res.data.status===401){
            message.error('你无权修改该文章！')
            // router.push('/login')
            return
          }
          if(res.data.status===501){
            message.error('发生未知错误！')
            // router.push('/login')
            return
          }
          message.success('文章修改成功！')
          freejump.value = true
          router.push(`/docs/details?id=${route.query.id}`)
        }
      ).catch(err=>{
        message.error('世界树连接失败!')
      })
    }

    // 编辑页面不允许路由自由跳转，防止未发布的文章丢失
    onBeforeRouteLeave((to,from,next)=>{
      if(!title.value.length&&!text.value.length){
        return next()
      }
      // 文章发布成功过后，可以自由跳转
      if(freejump.value) return next()
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

    return {cid,catDist,title,text,update}

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