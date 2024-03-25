<template>
  <!-- 页面上方的菜单栏 -->
  <div class="navBar" :style='menuTheme.BarStyle'>
    <div class="ui-logo" :style='menuTheme.UIStyle' @click="router.push('/')">
      <img :src='logoURL'> 
      <span class="title">IDLWorld</span>
    </div>
    <!-- <div class="search">
      <my-search></my-search>
    </div> -->
    <div class="menu">
      
      <n-config-provider :theme="menuTheme.theme">
      <n-menu 
        v-model:value="activeKey" 
        mode="horizontal" 
        :options="menuOptions" 
      />
      </n-config-provider>
    </div>
    <div class="minimenu" id='minimenu'>
      <div class="icon" @click="showMini = !showMini">
      <Icon size='30' :color='menucolor'>
        <MenuOutline></MenuOutline>
      </Icon>
      </div>
      <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut">
       <div class="verticalmenu"  v-if='showMini' >
        <n-config-provider :theme='lightTheme'>
          <n-menu 
            v-model:value="activeKey"  :options="menuOptions" 
            :indent="12"
          />
        </n-config-provider>
       </div>
    </transition>
    </div>
    <!-- 头像 -->
    <div class="avatar hvr-grow" @click="router.push('/login')">
      <n-avatar
        round
        size="small"
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
    </div>
  </div>
</template>

<script>
import {h,ref,reactive,onMounted,computed} from 'vue'
import {useRouter} from 'vue-router'
import {NConfigProvider,NIcon,darkTheme,lightTheme} from 'naive-ui'
import { RouterLink } from "vue-router";
import MySearch from './MySearch.vue'

import {
  BookOutline as BookIcon,
  AnalyticsOutline as VisualIcon,
  GameControllerOutline as GameIcon,
  MenuOutline,
  DocumentsOutline,
  SearchOutline
} from "@vicons/ionicons5";
import {Icon} from '@vicons/utils'

import {Upload} from '@vicons/tabler'

import 'vfonts/FiraCode.css'
// 渲染函数
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

// 菜单栏配置项
const menuOptions = [
  {
    label: () => h(
      RouterLink,
      {
        to: "/docs/list",
        rel: ""
      },
      "文档"
    ),
    key: "hear-the-wind-sing",
    icon: renderIcon(BookIcon),
    children: [
      {
        label: "文章列表",
        key: "list",
        icon: renderIcon(DocumentsOutline)
      },
      {
        label: "查询文章",
        key: "search",
        icon: renderIcon(SearchOutline)
      },
      {
        label: "发布文章",
        key: "publish",
        icon: renderIcon(Upload)
      }
    ]
  },
  {
    label: "可视化项目",
    key: "pinball-1973",
    icon: renderIcon(VisualIcon),
    disabled: true
  },
  {
    label: "h5小游戏",
    key: "a-wild-sheep-chase",
    icon: renderIcon(GameIcon),
    disabled: true
  },
  {
    label: "参考文档",
    key: "dance-dance-dance",
    icon: renderIcon(BookIcon),
    disabled:false
  }
];

export default {
  name:'IdealHeader',
  props:{theme:'theme'},
  components:{Icon,MySearch,MenuOutline,NConfigProvider},
  setup(props){
    var menuTheme = reactive({})
    const router = useRouter()
    var logoURL = ref(null)
    var showMini = ref(false)
    var menucolor = ref('white')

        // 调整为深色主题
    if(props.theme&&props.theme=='dark'){
      // 菜单主题调整为暗色主题
      menuTheme.theme = darkTheme
      menuTheme.UIStyle = {color:'white'}
      menuTheme.BarStyle = {backgroundColor:'rgba(0,0,0,0)'}
      logoURL.value='/idlw-light.svg'
      menucolor.value='white'
      console.log('目前为深色主题',menuTheme.theme);
    }else{ // 默认浅色主题
      menuTheme.theme = lightTheme
      menuTheme.UIStyle={color:"black"}
      menuTheme.BarStyle = {backgroundColor:'white',boxShadow:'0 0 5px #dedede'}
      logoURL.value='/idlw.svg'
      console.log('目前为浅色主题',menuTheme.theme);
      menucolor.value='black'
    }

    

    // 失去焦点则关闭弹窗功能+监听滚轮
    onMounted(()=>{
      const miniMenu = document.getElementById('minimenu')
      document.addEventListener('click',(e)=>{
        // console.log('监听中');
        if(miniMenu&&!miniMenu.contains(e.target)){
          showMini.value = false
          document.removeEventListener('click',()=>{})
        }
      })
      // 如果当前路由为首页则使用滚轮监听
      if(router.currentRoute.value.path=='/'){
      document.addEventListener('scroll',()=>{
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(scrollTop>=460){
          menuTheme.theme = lightTheme
          menuTheme.UIStyle = {color:'black'}
          menuTheme.BarStyle = {backgroundColor:'white',boxShadow:'0 0 5px #dedede'}
          logoURL.value='/idlw.svg'
          menucolor.value='black'
          // console.log(menuTheme.theme);
          
        }else{
          menuTheme.theme = darkTheme;
          menuTheme.UIStyle = {color:'white'}
          menuTheme.BarStyle = {backgroundColor:'rgba(0,0,0,0)'}
          logoURL.value='/idlw-light.svg'
          console.log(menuTheme.theme);
          menucolor.value='white'
        }
        
      })
    }}
    )
  

    return {
      activeKey: ref(null),
      menuOptions,
      logoURL,
      menuTheme,
      router,
      showMini,
      lightTheme,
      menucolor
    };
  }
}
</script>

<style lang='scss' scoped>
.navBar{
  width:100%;
  height: 60px;
  // box-shadow: 5px 0px 5px rgba(152, 152, 152, 0.5) ;
  display:flex;
  align-items: center;
  justify-content: right;
  position:fixed;
  top:0;
  z-index: 999;
  transition:all 0.3s;
  // padding-right: 10px;
  .ui-logo{
    display: flex;
    justify-content: center;
    align-items: center;
    position:absolute;
    left:12px;
    width:180px;
    font-size:24px;
    font-family: harmonyOS;
    cursor: pointer;
    transition: opacity 0.3s;
    img{
      width:40px;
      height: 40px;
      margin-right: 20px;
    }
    &:hover{
      opacity: 0.6;
    }
  }
  .search{
    margin-right:20px
  }
  .minimenu{
    color:white;
    cursor: pointer;
    
    .icon{
      width:30px;
      height: 30px;
    }
    .verticalmenu{
      width:200px;
      // height: 500px;
      position:absolute;
      right:50px;
      background-color: rgba(255, 255, 255, 0.8);
      animation-duration: 0.3s;
      border-radius: 5px;
      box-shadow: 0 0 3px #656565;
      max-height: 400px;
      overflow: scroll;
    }
  }
  .avatar{
    cursor: pointer;
    // position:absolute;
    // right:20px;
    margin-left: 20px;
    margin-top:6px;
    margin-right:20px;
  }
}


/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar{
  width:5px;
  height: 0px;
  // background-color: #403E4E;
}

// 定义滚动条轨道
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
  margin-right: 10px;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #403E4E;
}

/**过度无效？ */
.menu{
  transition: width 0.4s;
}


// 响应式
@media only screen and (max-width: 500px) {
//  .title{
//     display: none;
//   }
  .ui-logo{
    width:auto;
    img{
      // margin-right: 0px;
      margin-left: 12px;
    }
  }

}

@media only screen and (max-width:720px){
  .menu{
    width:0px;
    overflow: hidden;
  }
}

@media only screen and (min-width: 720px){
   .minimenu{
    // width:0;
    // height: 0;
    // overflow: hidden;
    display: none;
  }
}

</style>