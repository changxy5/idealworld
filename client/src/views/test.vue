<template>
<div>
<h1>测试模块</h1>
<reactive-cursor></reactive-cursor>
<button @click='isShow=!isShow'>demo1:监听鼠标坐标</button>
<demo1 v-if="isShow"></demo1>
<button @click="isShow2=!isShow2">demo2:响应式防抖</button>
<demo-2 v-if = 'isShow2'></demo-2>
欣赏由chatgpt画的图标：
<div class="chatgptsvg" style='height:100px;display:flex'>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M20.172 8.828c-2.63-2.63-6.872-2.63-9.502 0L12 9.656l-1.67-1.828c-2.63-2.63-6.872-2.63-9.502 0-.315.315-.57.677-.767 1.065-.197.389-.325.813-.384 1.244-.118.901-.07 1.82.144 2.696.214.879.58 1.706 1.083 2.448l6.43 7.041c.398.436.922.734 1.497.849.168.03.338.044.508.044.406 0 .808-.104 1.174-.308l6.43-3.803c.739-.438 1.366-1.073 1.804-1.804.438-.739.679-1.582.679-2.445 0-.863-.24-1.706-.678-2.445-.438-.739-1.065-1.366-1.804-1.804z" fill="#FFC800" />
  <path d="M11.999 22.001c-2.063 0-4.101-.812-5.656-2.367-3.125-3.125-3.125-8.19 0-11.314 1.562-1.562 3.621-2.344 5.656-2.344s4.093.782 5.656 2.344c3.125 3.125 3.125 8.19 0 11.314-1.555 1.555-3.593 2.367-5.656 2.367zM18.121 8.879c-2.828-2.828-7.42-2.828-10.246 0-2.828 2.828-2.828 7.42 0 10.246 1.414 1.414 3.293 2.207 5.303 2.207s3.89-.793 5.303-2.207c2.828-2.828 2.828-7.42 0-10.246z" fill="#F85B7C" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search">
  <circle cx="11" cy="11" r="8"></circle>
  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text">
  <path d="M14 3v7a2 2 0 0 0 2 2h7"></path>
  <path d="M16 21v-6a2 2 0 0 0-2-2H4V5h8"></path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart">
  <path d="M12 21.35l-7.56-7.27a5.5 5.5 0 0 1 7.56-7.28a5.5 5.5 0 0 1 7.56 7.28l-7.56 7.27z" fill="pink"></path>
</svg>
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="45" fill="#FEE440" stroke="#F5AD1F" stroke-width="10"/>
  <path d="M50 40a20 20 0 1 0 0 40 20 20 0 1 0 0-40zm0 30a10 10 0 1 1 0-20 10 10 0 1 1 0 20z" fill="#FFFFFF"/>
  <path d="M40 50c0-10 8-18 18-18s18 8 18 18" stroke="#2D2D2D" stroke-width="6" fill="none"/>
  <circle cx="60" cy="48" r="6" fill="#2D2D2D"/>
  <circle cx="40" cy="48" r="6" fill="#2D2D2D"/>
</svg>
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="50" fill="#FFCE00"/>
  <path d="M 30 60 Q 50 90 70 60 Q 50 75 30 60" fill="none" stroke="#000" stroke-width="5"/>
  <circle cx="38" cy="45" r="8" fill="#000"/>
  <circle cx="62" cy="45" r="8" fill="#000"/>
  <path d="M 50 75 Q 42 65 35 45" fill="none" stroke="#000" stroke-width="5"/>
  <path d="M 50 75 Q 58 65 65 45" fill="none" stroke="#000" stroke-width="5"/>
</svg>
</div>
<canvas id="myCanvas"></canvas>
</div>
</template>

<script>
import {ref,onMounted} from 'vue'
import demo1 from './demo/demo1.vue'
import demo2 from './demo/demo2.vue'
import ReactiveCursor from '../components/ReactiveCursor.vue'
export default {
  name:'demo',
  components:{demo1,demo2,ReactiveCursor},
  setup(){
    let isShow = ref(true)
    let isShow2 = ref(false)

    onMounted(()=>{
      
    

      // 获取canvas元素
      var canvas = document.getElementById('myCanvas');
      var ctx = canvas.getContext('2d');
      
      // 添加鼠标点击事件监听器
      canvas.addEventListener('click', function(e) {
        // 获取鼠标点击的位置
        var x = e.clientX - canvas.offsetLeft;
        var y = e.clientY - canvas.offsetTop;
        
        // 生成若干个小球
        for (var i = 0; i < 10; i++) {
          var radius = Math.random() * 10 + 10; // 半径在10到20之间随机
          var speed = Math.random() * 10 + 5; // 速度在5到15之间随机
          var color = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
          var ball = {
            x: x,
            y: y,
            radius: radius,
            speed: speed,
            color: color
          };
          balls.push(ball);
        }
      });
      
      // 存储小球的数组
      var balls = [];
      
      // 绘制小球
      function drawBalls() {
        for (var i = 0; i < balls.length; i++) {
          var ball = balls[i];
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
          ctx.fillStyle = ball.color;
          ctx.fill();
        }
      }
      
      // 更新小球位置
      function updateBalls() {
        for (var i = 0; i < balls.length; i++) {
          var ball = balls[i];
          ball.x += Math.random() * ball.speed - ball.speed / 2;
          ball.y += Math.random() * ball.speed - ball.speed / 2;
          ball.radius -= 0.2;
          if (ball.radius < 0) {
            balls.splice(i, 1);
          }
        }
      }
      
      // 清空画布
      function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      // 主循环
      function mainLoop() {
        clearCanvas();
        drawBalls();
        updateBalls();
        requestAnimationFrame(mainLoop);
      }
      mainLoop()
    })

    return {isShow,isShow2}
    
  }
  
}




</script>

<style scoped>
div{
  margin: 0 auto;
  width:100%;
  text-align: center;
}
#myCanvas{
  border:1px solid #000;
}
</style>