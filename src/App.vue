<template>
  <div id="app">
    <!-- 导航 -->
    <MyNavi></MyNavi>
    <!-- 大标题 -->
    <section>
    <h1 class="title1">&#10024;你的理想世界 v0.4<br />Your Ideal World</h1>
    <!-- 日期 -->
    <p>{{date}}</p>
    </section>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyNavi from './components/MyNavi.vue'
import MyFooter from './components/MyFooter.vue'

export default {
  name: 'App',
  components: {
    MyNavi,
    MyFooter
  },
  computed:{
    // 当前日期
    date(){
        let d = new Date()
        // 获取星期数，用数组对应成中文，注意从星期日开始算起
        let chday=['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
        // 计算距离项目开始过去了多少天
        let d0 = new Date()

        // 切记月份从0开始计数！！
        d0.setFullYear(2022,10-1,21)
        let daysCount = Math.floor((d-d0)/864e5)

        return  d.getFullYear() + '年 ' + (d.getMonth()+1) +'月 ' + d.getDate()+"日 " + chday[d.getDay()] + "\n" + '第' + daysCount + '天'
      }
    }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
section{
  height:100vh; overflow: hidden; background-image: url(/public/assets/Coffee-In-Rain.gif);opacity:0;animation:appear 1s forwards
}
h1{
  color:white; background-color: rgba(0,0,0,0.1);height:100vh;box-sizing: border-box;padding: 190px 0;width:100%; transform:translateY(-30px);animation: appear 1s forwards;background-image: none;
}
p{
  position:absolute;bottom:0px;right:20px;color:#fff;font-family: FZXS_12;font-size: 20px;transform:translateY(-30px);animation: appear 1s forwards;
}
</style>
