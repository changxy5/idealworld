<template>
  <canvas id='cirCanvas' width='1000' height='200'></canvas>
</template>

<script>
import { onMounted } from 'vue'
import {mouseMovingCircles} from '../canvas/drawCircle'
export default {
  name:'ReactiveCursor',
  setup(){

    onMounted(()=>{
      mouseMovingCircles('cirCanvas')
    })
    
  }
}
</script>

<style lang='scss'>
$radius : 20px;

#cirCanvas{
  // opacity: 0.5;
  width:100%;
  // height: 100%;
  z-index:-100;
  position: fixed;
  bottom:0;
  left:0;
}

</style>