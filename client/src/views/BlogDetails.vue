<template>
  <div class="main" >
    <n-layout has-sider position="absolute" :native-scrollbar="false">
      <n-layout-content >
        <n-card size='huge'>

          <div class="title">
          {{blog.data.title}}
          </div> 
          <div class="author">作者：{{username}}
            <br/>
            评分：<n-rate readonly :default-value="4" size="small"/>
            </div>
          <div class="edit">
            <n-space>
              <n-button strong secondary round @click='handleEdit'><n-icon><Edit></Edit></n-icon>编辑</n-button>
              <n-button 
              @click = 'handleDelete()'
                strong secondary round
              ><n-icon ><TrashBinOutline></TrashBinOutline></n-icon>删除</n-button>
            </n-space>
          </div>
          <n-divider></n-divider>
          <!-- 使用markdownpreview组件完成md格式文件的展示 -->

          <div class="content" ref="contentRef">
            <v-md-preview 
              :text="blog.data.content" 
            ></v-md-preview>
          </div>
          
          <!-- <div class="content" v-html="blog.data.content">
    
          </div> -->
        
          <template :v-if="blog.data.update_time" #footer>
            <div class="date">
            创建时间：{{blog.data.create_time}}
            <br/>
            修改时间：{{blog.data.update_time}}
            </div>
          </template>
          <!-- <template #header>
            <div class="goback" @click='handleGoBack'>
            &lt;&lt;&nbsp;返回
            </div>
          </template> -->
        
        </n-card>
        <my-footer></my-footer>
      </n-layout-content>
      <!-- 文章锚点目录 -->
      <!-- <div class="toc">
      <n-layout-sider content-style="padding: 24px;" width='200px'>
        <n-anchor 
          :show-rail="false"
        >
          <n-anchor-link title="准备老白菜u盘" href="#准备老白菜u盘">
          </n-anchor-link>
          <n-anchor-link title="下载微软官方windows镜像" href="#下载微软官方windows镜像" />
        </n-anchor>
        
      </n-layout-sider>
      </div> -->
    </n-layout>
  </div>
</template>

<script>
import {useRoute,useRouter} from 'vue-router'
import {inject,reactive,ref} from 'vue'
import moment from 'moment'
import tocbot from 'tocbot'
import {TrashBinOutline} from '@vicons/ionicons5'
import {Edit} from '@vicons/tabler'
import MyFooter from '../components/MyFooter.vue'


export default {
  components:{
    TrashBinOutline,
    Edit,
    MyFooter
  },
  setup(){
    const contentRef = ref(null)
    const axios = inject('axios')
    const route = useRoute()
    const router = useRouter()
    const message = inject('message')
    const dialog = inject('dialog')
    let blog = reactive({data:{}})
    let username = localStorage.getItem('username')
    console.log(blog);
    const tocList=ref([
      {
        label: '自助系统重装过程总结',
        key: '1',
        children: [
          {
            label: '准备老白菜U盘',
            key: '1-1'
          },
          {
            label: '下载微软官方windows镜像',
            key: '1-2'
          },
          {
            label: '旧电脑文件备份',
            key: '1-3'
          }
        ]
      }
    ])
  
    getBlog(route.query.id)

    function handleGoBack(){
      router.back()
    }

    function handleDelete(){
      dialog.warning({
        title: '删除文章',
        content: '确定要删除这篇文章吗？',
        positiveText: "确定",
        negativeText: "我再想想",
        onPositiveClick: () => {
          axios.delete(`article/delete?id=${route.query.id}`,{
            headers:{
              // 携带token访问
               Authorization:localStorage.getItem('token')
            }
          }).then((res)=>{
            if(res.data.status === 401){
              message.error('你还没有登录哦')
              return router.push('/login')
            }
            message.success('删除成功')
            console.log(res);
            router.push('/docs/search')
          }).catch((err)=>{
            message.error('删除失败')
            console.log(err);
          })
        },
        onNegativeClick: () => {
          message.info('取消删除')
        }
      })
    }
    
    // 修改文章~
    function handleEdit(){
      router.push(`/docs/edit?id=${route.query.id}`)
    }

    // 获取文章全文~
    function getBlog(id){
      axios.get(`article/details?id=${id}`).then((res)=>{
        blog.data =  res.data.result[0]
        // console.log('数据库查询成功！文章结果：',blog.data.content);
        // transferToNodeList(blog.data.content)

        blog.data.create_time = moment(blog.data.create_time).format('YYYY年M月D日')
        blog.data.update_time = moment(blog.data.update_time).format('YYYY年M月D日')
      }).catch((err)=>{message.error('世界树连接出错！');console.log(err);
      
      })
    }

    function transferToNodeList(html){
      let obj = {}
      let div = document.createElement('div')
      div.innerHTML = html
      let titleList = div.querySelectorAll('h1,h2,h3')
      console.log(titleList);
      obj.label = titleList[0].innerText
      console.log('obj:',obj);
      
      
    }


    return{blog,username,handleGoBack,tocList,contentRef,handleDelete,handleEdit}
  }
}
</script>

<style lang="scss" scoped>
  .main{
    padding:0 20px;
    // display: flex;

    .title{
      text-align: center;
      margin:20px 0;
      font-size: 30px;
      font-weight:600
    }
    .author{
      font-size: 16px;
    }
    .content{
      font-size: 14px;
      // display: flex;
    }
  }
  .date{
    color:#93A6B1;
    text-align: end;
  }
  
  .edit{
    display: flex;
    justify-content: end;
  }

  .goback{
    transition:all 0.3s;
    font-size: 16px;
    cursor: pointer;
    &:hover{
      color:#93A6B1
    }
  }


  @media screen and (max-width: 800px) {
    .toc{
      display:none
    }
    
  }
</style>