<template>
<div>
  <!-- <div class="openEffect">
    世界树查询
  </div> -->
<ideal-header theme='light'></ideal-header>
<!-- 侧边导航-->
<div class="sidebar">
<n-space vertical>
    <n-layout has-sider position='absolute' style='top:60px' >
      <n-layout-sider 
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="200"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-menu
          v-model:value="activeKey"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          default-value="search"
        />
      </n-layout-sider>
      <n-layout :native-scrollbar="false">
        <span>
          <!-- RouterView二级路由 -->
          <div class="main">
          <router-view>
          </router-view>
          </div>
          <!-- <person-card></person-card> -->
          <!-- articleList -->
          <!-- <article-list></article-list> -->
          <my-footer></my-footer>
        </span>
      </n-layout>
    </n-layout>
  </n-space>

</div>
<!-- 导航头 -->
<!-- <ideal-header theme='light'></ideal-header> -->
</div>
</template>

<script>
import IdealHeader from '../components/IdealHeader.vue'
import PersonCard from '../components/PersonCard.vue'
import MyFooter from '../components/MyFooter.vue'
import ArticleList from '../components/ArticleList.vue'
import { h, ref } from "vue";
import {RouterLink,RouterView} from 'vue-router'
import { NIcon } from "naive-ui";
import {
  SearchOutline as SearchIcon,
  DocumentsOutline,
} from "@vicons/ionicons5";
import {Upload} from '@vicons/tabler'
import BlogDetails from './BlogDetails.vue'
import {detailStore} from '../stores/search'
import {useRouter} from 'vue-router'

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
    {
    label:()=>h(RouterLink,{
      to:{
        name:"list"
      }
    },"文章列表"),
    key: "list",
    icon: renderIcon(DocumentsOutline)
  },
  {
    label:()=>h(RouterLink,{
      to:{
        name:"search"
      }
    },"查询文章"),
    key: "search",
    icon: renderIcon(SearchIcon)
  },
  {
    label: ()=>h(RouterLink,{
      to:{
        name:"add"
      }
    },"发布文章"),
    key: "add",
    icon: renderIcon(Upload),
    disabled:false
  },


]



export default {
  name:'Docs',
  components:{IdealHeader,MyFooter,ArticleList,BlogDetails,PersonCard},
  setup(){
    const router = useRouter()
    const store = detailStore()
    store.$subscribe((mutation,state)=>{
      console.log('我是Docs，我接收到了一个仓库的变化。现在我要用它来加载/details路由啦。',state.id);
      router.push({
        name:'details',
        query:{
          id:state.id
        }
      })
    })
    console.log('用户token为：',localStorage.getItem('token'));
    return {
      // 左侧菜单默认开启
      collapsed: ref(false),
      menuOptions,
      activeKey:ref(null)
    };
  }
}
</script>

<style lang='scss' scoped>
.sidebar{
  margin-top:60px;
  font-family: harmonyOS;
}
.openEffect{
  font-family: harmonyOS;
  position:fixed;
  width:100%;
  height: 100%;
  z-index:999;
  backdrop-filter: blur(5px);
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  color:white;
  opacity:0;
  animation:fadeInOut 3s ease-in-out forwards;
}

@keyframes fadeInOut {
  0%{opacity:0.1}
  100%{opacity:0;visibility: hidden;}
  20%{opacity:1}
  70%{opacity:1}
  
}
</style>