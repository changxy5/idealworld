<template>
  <nav>
    <a href="/index.html" class="navhead">回到主页</a>

    <div class="nav_block">
        <a class="droptitle" href="/pages/about.html">关于你</a>
    </div>

    <!-- 记得改成路由 -->
    <div class="nav_block">
        <a class="droptitle active" href="javascript:void(0)">学习笔记</a>
        <div class="dropdown">
        <a href="/pages/notebook/html.html">HTML</a>
        <a href="/pages/notebook/css.html">CSS</a>
        <a href="/pages/notebook/javascript.html">Javascript</a>
        <a href="/pages/vue/vue.html">Vue</a>
        <a href="/pages/games/canvas.html">Canvas 2d</a>
        <a href="javascript:void(0)">three.js</a>
        <a href="javascript:void(0)">Node.js</a>
        </div>
    </div>

    <div class="nav_block">
        <a class=droptitle href="javascript:void(0)">小游戏</a>
        <div class="dropdown">
            <a href="javascript:void(0)">flappy bird</a>
            <a href="javascript:void(0)">贪吃蛇</a>
        </div>
    </div>

    <div class="nav_block">
        <a class=droptitle href="javascript:void(0)">数据分析</a>
        <div class="dropdown">
            <a href="\pages\analysis\echarts.html">echarts</a>
        </div>
    </div>
    <my-search></my-search>
  </nav>
</template>

<script>
import MySearch from './MySearch.vue'
export default {
  name:'MyNavi',
  components:{
    MySearch
  }
}
</script>

<style scoped>
nav{
  box-sizing: border-box;background-color: rgba(0,0,0,0); box-shadow: none; position:fixed; bottom: 0;width:100%; transform:translateY(-30px); opacity:0;animation:appear 1s forwards;
  height: var(--nav_height);
}
.nav_block{
    display: block;
    width: 150px;
    margin-right: 2px;
}
.droptitle{
    display: block;
    width:inherit;
    height: var(--nav_height);
    box-sizing: border-box;
    border-bottom: none;
}
.active, .droptitle:hover{
    border-bottom: 5px solid var(--grey);
    color:var(--grey);
    background-color: rgba(0,0,0,0);
}
.dropdown{
    /* display: none; */
    visibility: hidden;
    background-color: #f1f1f1;
    z-index:1;

    opacity:0;
    transition: opacity 0.3s;
}
.nav_block:hover .dropdown{
    /* display: block; */
    visibility: visible;
    opacity: 1;
}
.dropdown a{
    display: block;
    height: var(--nav_height);
    width: inherit;
    border-bottom: 1px solid white;
}
/* 回到主页按钮 */
.navhead{
    overflow: hidden;
    background-color: var(--grey);
    color:white;
    border-bottom: none;
    margin-left:0px;
    width: 200px;
    /* 过渡效果，背景颜色和缩放 */
    transition: background-color 0.2s, transform 0.2s;
}

a.navhead:hover{
    color:white;
    background-color: grey;
    /* 过渡效果，放大 */
    transform:scale(1.2,1.2);
    /* 放大的原点（默认是几何中心，需要改成左侧，但是回放时会出现bug？） */
    /* transform-origin:0; */
}
</style>