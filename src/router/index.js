import VueRouter from "vue-router";
import About from '../pages/About.vue'

export default new VueRouter({
  routes:[
    {
      path:'/about',
      component:About
    }
  ]
})
