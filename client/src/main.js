import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 载入配置文件
import config from '../config'
/** 载入第三方模块
 * axios
 * pinia
 * sass
 * vue-router
 * naive-ui+vfonts
 * wangeditor
 * animate.css
 * hover.css
 * moment.js
 * vicons/ionicons5 在使用到的组件内引入
 * v-d-editor
 */
import {createPinia} from 'pinia'
import axios from 'axios';
// axios的默认后端域名，使用env配合不同模式动态调整
axios.defaults.baseURL =import.meta.env.VITE_SERVER_BASE_URL
// 全局安装naive-ui（不推荐）
import naive from 'naive-ui'
// 特效库
import 'animate.css'
import 'hover.css'
// vuelazyload
import VueLazyload from 'vue-lazyload'
// vuemark  markdown解析器
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/style/preview.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// 引入语言包
import Prism from 'prismjs';
VMdEditor.use(vuepressTheme, {
  Prism
});
VMdPreview.use(vuepressTheme, {
  Prism
});

// 测试vite的import.meta.env
console.log('import.env/////////', import.meta.env);

// 配置naive-ui
// 使用独立API调用naive的message,slidebar等功能
import {createDiscreteApi} from 'naive-ui'
const { message, dialog, notification, loadingBar } = createDiscreteApi(
  ["message", "dialog", "notification", "loadingBar"]);
  
// 配置主题色


/** 载入路由模块*/
import {router} from './common/router'
// 路由跳转加载条
router.beforeEach((to,from,next)=>{
  loadingBar.start()
  next()
})
router.afterEach(()=>{
  loadingBar.finish()
})
// 载入字体模块&scrollreveal
import './assets/css/fonts.css'


const app = createApp(App)
app.provide('axios',axios) // 全局提供axios
//全局提供naive的message，dialog,loadingbar
app.provide('message',message)
app.provide('dialog',dialog)
app.provide('notification',notification)
app.use(createPinia())
app.use(naive)
app.use(router)
app.use(createPinia())
app.use(VueLazyload,{
  lazyComponent:true
})
app.use(VMdPreview);
app.use(VMdEditor);
app.mount('#app')

