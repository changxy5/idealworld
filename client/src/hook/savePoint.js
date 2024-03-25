import {reactive,onMounted,onBeforeUnmount} from 'vue'
export default function(){
  let point = reactive({x:0,y:0})
  function savePoint(event){
    point.x = event.pageX
    point.y = event.pageY
    console.log(`x:${point.x},y:${point.y}`);
  }
  onMounted(()=>{
    window.addEventListener('click',savePoint)
  })
  onBeforeUnmount(()=>{
    window.removeEventListener('click',savePoint)
  })
  return point
}