<template>
  <!-- 导航头 -->

<div class="titleBlock">
  <ideal-header :theme='headerTheme' :key='headerTheme'></ideal-header>
  <index-title></index-title>
</div>

<div class="main">

  <!-- <div class="overlay"></div> -->
  <canvas id='myCanvas' width='800' height='200'></canvas>
  
  <div class="content">
    <div class="canvas">
      <!-- <reactive-cursor></reactive-cursor> -->
    </div>
  <div class="block">
    <p class="title">有道是，闻名不如见面</p>
    <p class='feeling'>I won't give up, no I won't give in. Till I reach the end. And then I'll start again. No I won’t leave. I want to try everything. I want to try even though I could fail.</p>
  </div>
  <div class="block">
    <p class="title">又道曰，见面胜似闻名</p>
    <p class='feeling'>Do not go gentle into that good night,Old age should burn and rave at close of day;Rage, rage against the dying of the light.Though wise men at their end know dark is right,Because their words had forked no lightning they. Do not go gentle into that good night.Good men, the last wave by, crying how brightTheir frail deeds might have danced in a green bay,Rage, rage against the dying of the light.</p>
  </div>
  <div class="block">
    <p class="title">人生得意须尽欢</p>
    <p class='feeling'>自己尝了吗？尝了一块。感觉怎么样？我去除了大部分的肠的腥味，但是我保留了一部分。我觉得保留了一部分肠的味道，才知道你吃的是大肠。你是有意保留的吗？是清洗的过程中我留下了一部分。是故意的还是不小心？是…故意的。</p>
  </div>
  <div class="block">
    <p class="title" id='莫使金樽空对月'>莫使金樽空对月</p>
    <p class='feeling'>我一说，他啪就站起来了，很快啊！然后上来就是 一个左正蹬 一个右鞭tei，一个左刺拳。我cuan部防区防出去了啊。防出去以后，自然是传统功夫以点到为止，右拳放在了鼻子上，没打他。我笑一下，准备收拳，因为这时间按传统功夫的点到为止，他已经输了。如果我这一拳发力，一拳就把他鼻子打咕遮了，放在鼻子上没有打他，他也承认 我先打到他面部。塔不知道拳放在他鼻子上，塔承认我先打到他面部，啊！<br/>我收拳的时间不打了，他突然袭击，左刺拳来打我脸，啊。我大意了啊，没有闪。唉...他的左拳给我眼 啊右眼蹭了一下，胆没关系啊，塔也说，啊塔截图也说了，两分多钟以后当时流眼泪了，捂着眼，我说停停。然后两分钟以后，额两分多钟以后，唉...就好了。我说小伙子你不讲武德，你不懂。马老师，对不对不起，我不懂规矩，啊我是 他说他是乱打的。他可不是乱打的啊，蒸蹬 鞭tei 左刺拳，训练有素，后来他说他练过 三四年泰拳，啊，看来是 有bear来。这两个 年轻人不讲武德，来骗，来偷吸！我69岁的 老同志。这好吗？这不好。我劝 这位 年轻人，耗子尾汁，好好反思。以后不要再犯这样的聪明，小聪明啊！额...武林要以和为贵，要讲武德。不要搞窝里斗。谢谢朋友们！</p>
    </div>
  </div>

  <my-footer></my-footer>


</div>

</template>

<script>
import IdealHeader from '../components/IdealHeader.vue'
import IndexTitle from '../components/IndexTitle.vue'
import MyFooter from '../components/MyFooter.vue'
import {drawSinWaves} from '../canvas/sinewave'
import {onMounted,watch,ref} from 'vue'
import ScrollReveal from 'scrollreveal'
import themeLight from 'naive-ui/es/rate/styles/light'
import ReactiveCursor from '../components/ReactiveCursor.vue'

export default {
  name:'MainPage',
  components:{IdealHeader,MyFooter,IndexTitle,ReactiveCursor},
  setup(){
    var headerTheme=ref('dark')
    
    watch(scrollY,(oldValue,newValue)=>{
      console.log(newValue);
      if(newValue>100)headerTheme.value = 'light';
      else{headerTheme.value='dark'}
    })
    onMounted(()=>{
      drawSinWaves()
      ScrollReveal().reveal('.block',{
        delay:100,
        distance:'10px',
        duration:800
      })
    })
    return{headerTheme}
  }
}
</script>

<style lang='scss' scoped>
#myCanvas{
  width:100%;
  height: 70px; 
  position: relative;
  top:-70px;
}

  // 模糊蒙版
.overlay{
    position:fixed;
    top:0;
    right:0;
    bottom: 0;
    left: 0;
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);
    z-index:-99;
  }


.main{
  // background-color: rgb(42, 42, 46);
  // padding-bottom: 50px;
  // box-sizing: border-box;
  .content{
    padding:0 50px;
    box-sizing: border-box;
    display: flex;
    flex-direction:column;
    font-family: harmonyOS;
    .canvas{
      opacity:0;
      animation:fadeIn 1.5s forwards;
    }
    .block{
      margin:0px 50px;
      padding:40px 0;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      .title{
        font-weight: bold;
        font-size:3vw;
        padding-left: 10px;
        border-left: 2px solid #898989;
      }
      .feeling{
        font-size: 14px;
        margin:20px 0px;
      }
    }
  
  }
}
@keyframes fadeIn {
  0%{
    opacity:0
  }
  100%{
    opacity:1;
    // z-index:-99
  }
}

</style>