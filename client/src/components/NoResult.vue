<template>
<transition 
  enter-active-class="animate__animated animate__bounceIn animateConfig"
  leave-active-class="animate__animated animate__bounceOut animateConfig">
  <div class="noresult" v-if="show"><Icon size='28'><MoodCry></MoodCry></Icon>&nbsp;啊呀，此处空空如也...</div>
</transition>
</template>

<script>
import {MoodCry} from '@vicons/tabler'
import {Icon} from '@vicons/utils'
export default {
  components:{MoodCry,Icon},
  props:['show'],
  setup(){
  }
}
</script>

<style lang="scss" scoped>
.noresult{
  display: flex;
  width:300px;
  margin: 0 auto;
  height: 100px;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}
.animateConfig{
  animation-duration: .5s;
}
</style>