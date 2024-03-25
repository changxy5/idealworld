<template>
  <div class="main">
    <div class="title">
      世界树查询 Irminsul Searching
    </div>
    <div class="subtitle">世界树开放了查询接口。神明的智慧就在其中。</div>
    <search-input></search-input>

  <div class="content" >
    <n-space vertical>
      <div class="count">
        世界树返回了{{count}}条结果：
      </div>
      <n-pagination
        v-model:page="pageIndex"
        :page-count="pageCount"
        size="medium"
      />
      <transition-group name="list">
      <n-space vertical>      
        <no-result :show='!count'></no-result>
      <div v-for='(blog,index) in list'>
        <div class='oneline' @click='showDetail(blog.id)'>
        <n-card :title='blog.title'>
          <template #header-extra>
            查看全文 &gt
          </template>
          <div>
          <div v-html="blog.content"></div>
          </div>
          <template #footer>
            <div class="date">
            创建时间：{{blog.create_time}}
            </div>
          </template>
          <template #action>
            <n-tag type='success' round size='medium'>
              <!-- 分类 -->
              {{blog.category}}
            </n-tag>
          </template>
        </n-card>
        </div>
      </div>
      </n-space>
      </transition-group>
      <n-pagination
        v-model:page="pageIndex"
        :page-count="pageCount"
        size="medium"
      />
    </n-space>
  </div>
  
  </div>
</template>

<script>
import moment from 'moment'
import ScrollReveal from 'scrollreveal'
import {useStore,detailStore} from '../stores/search'
import {onMounted,inject,ref,watch,reactive} from 'vue'
import SearchInput from './SearchInput.vue'
import {useMessage} from 'naive-ui'
import NoResult from './NoResult.vue'
import {useRouter} from 'vue-router'

export default {
  components:{SearchInput,NoResult},
  setup(){
    const message = useMessage()
    // message.loading('世界树查询中...')
    const axios = inject('axios')
    const router = useRouter()
    const store = useStore()
    const store2 = detailStore()

    let list = ref([])
    let count = ref(0)

    // 分页
    // 每页展示的条数
    let pageSize = ref(4)
    // 当前页数，默认1
    let pageIndex = ref(1)
    // 总页数，默认0
    let pageCount = ref(0)
  
    // 页数发生变化时重新调用数据库查询
    // 怎么会是oldValue呢？？？？？
    watch(pageIndex,(oldValue, newValue)=>{
      console.log('pageSize now is', pageSize);
      searchDatabase(Number(oldValue),pageSize.value)
    })
    
    // 数据订阅
    const subscribe = store.$subscribe((mutation,state)=>{
      console.log(`我是ArticleList组件，我接收到了来自${mutation.storeId}的订阅变化：`,state.checked,state.searchAll);
      searchDatabase(1,4,state.searchAll)
    })


    // 数据库查询函数，默认pageSize=10，page=1
    function searchDatabase(page=1,pageSize=10,keyword=''){
      axios.get(`/article/search?page=${Number(page)}&pageSize=${Number(pageSize)}&keyword=${keyword}`)
      .then((res)=>{
        if(res.data.status!=200){
          message.error('世界树无响应…')
          console.log(res.data);
          return 
        }

        // 查询结果总数，由后端返回
        count.value = res.data.total

        // 总页数，通过计算得到
        pageCount.value = Math.ceil(count.value/pageSize)

        // 结果格式化
        let tmp = reactive(res.data.result);
        
        tmp.forEach((ele,index) => {
          // 时间戳改为正常时间，使用moment().format()方法
          let time1 = tmp[index].create_time
          let time = moment(time1).format('YYYY年M月D日')
          tmp[index].create_time = time
          // 过长的文本后面加上“...”
          if(ele.content.length>=80){
            tmp[index].content = ele.content+'...'
          }
          ele.content = ele.content.trim()

          // 查询分类id对应的分类名称
          axios.get(`/cat/get?id=${ele.category_id}`).then((res)=>{
            tmp[index].category = res.data.result[0].name
          })  
        });
      
        list.value = tmp;
        console.log(list.value);
        message.destroyAll()
        message.success('查询成功！')
      }).catch((err)=>{console.log(err);message.error('世界树无响应…')
      })
    }

    // 向pinia提交查询的id
    function showDetail(id){
      store2.$patch({id:id})
      console.log('我是articlelist，我向仓库提交了一个文章id！',id)
      // router.push('/docs/details')
    }


    return {list,count,pageCount,pageIndex,pageSize,showDetail}
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
    opacity:0;
    color:#93A6B1;
    animation: fadeIn 1.5s ease-in-out 0.5s forwards;
    .date{
      font-size: 12px;
      color:#93A6B1
    }
  }
}
// 元素进入退出时的动画，抄自vue官网
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}

.oneline{
  cursor: pointer;
  transition: all 0.3s;
  &:hover{
    box-shadow: 2px 2px 5px #acacac;
  }
}

</style>