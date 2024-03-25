<template>
  <div class="main">
    <div class="skeleton">
    <img class='bg' src="/src/assets/img/cyberpunk.png" alt="">
    <img class='bf' src="/src/assets/img/cb-butterfly.png" alt="">
    </div>
    <div class="titles">
      <p class="title">Your Ideal World</p>
      <p class="subtitle">只属于你一人的理想世界</p>
    </div>
  </div>
</template>

<script>
// vuelazyload
import 'vfonts/RobotoSlab.css'
export default {
  name:"IndexTitle",
  setup(){
    function handler(component){
      console.log('this component is showing...');
    }
    return{handler}
  }
}
</script>

<style lang="scss" scoped>
.main{
  display: flex;
  width: 100%;
  position: relative;
  z-index: -2;
  overflow: hidden;
  animation: fadeIn 1.5s ease-in-out forwards;
  .skeleton{
    width:100%;
    height:30%;
    background-color: #c6c6c6;
  }
  .bg{
    width:100%;
    z-index: -99;
  }
  .bf{
      width:100%;
      position:absolute;
      top:25%;
      z-index:99;
      animation: flying 4s linear infinite;
    }
  .titles{
    font-family:v-sans,harmonyOS;
    font-weight: 500;
    z-index: 1;
    width:100%;
    color:white;
    text-align: center;
    position:absolute;
    text-shadow:0px 0px 5px #727272;
    top:25%;
    .title{
      font-size:7vw;
      line-height: 5px;
    }
    .subtitle{
      font-size:4vw;
      line-height: 5px;
    }
  }
}

@keyframes flying {
  25%{
    top:24%;
  }
  75%{
    top:26%;
  }
  0%,50%,100%{
    top:25%;
  }
}

@keyframes fadeIn {
  0%{
    opacity: 0;
    transform: translateY(-30px)
  }
  100%{
    opacity: 1;
    transform: translateY(0)
  }
}


</style>
