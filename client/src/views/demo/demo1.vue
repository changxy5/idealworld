<template>
<div>
  <p>demo1测试了生命周期钩子，在组件加载/卸载时绑定/解绑事件监听器.<br/>此方法是一个公用方法，放在/src/hook目录下<br/>请观察控制台输出.</p>
  <p>你的鼠标坐标：x:{{point.x}},y:{{point.y}}</p>
</div>
</template>

<script>
import savePoint from '../../hook/savePoint'
export default {
  name:'demo1',
  setup(){
    let point = savePoint()
    return{point}
  }
}
</script>

<style>

</style>