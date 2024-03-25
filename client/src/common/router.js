import {createRouter,createWebHistory} from 'vue-router'
import test from '../views/test.vue'
import MainPage from '../views/MainPage.vue'
import LoginRouter from '../views/login.vue'
import Docs from '../views/Docs.vue'
import ArticleList from '../components/ArticleList.vue'
import BlogDetails from '../views/BlogDetails.vue'

let routes = [
  {
    path:'/',
    component: MainPage
  },
  {
    path:'/test',
    component:test
  },
  {
    path:'/login',
    component:LoginRouter
  },
  {
    path:'/docs',
    name:'docs',
    component:Docs,
    children:[
      {path:'list',name:'list',component:()=>import('../views/MyArticles.vue')},
      {
        path:'search',
        name:'search',
        component:ArticleList
      },
      {
        path:'details',
        name:'details',
        component:BlogDetails
      },{
        path:'add',
        name:'add',
        component:()=>import('../views/AddBlog.vue')
      },{
        path:'edit',
        name:'edit',
        component:()=>import('../views/EditBlog.vue')
      }
    ]
  }
]

const router = createRouter({
  history:createWebHistory(),
  routes
})
export {router, routes}