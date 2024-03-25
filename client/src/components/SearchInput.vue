<template>
  <div class="input">
  <div class="inputTitle">
    请输入查询条件：
  </div>
    <div class="boolean">
    <n-space vertical size='large'>
      包含全部关键词：<n-input v-model:value="searchAll" type="text" placeholder="" />
      包含任意关键词：
      <n-input v-model:value="searchEither" type="text" placeholder="" />
      不包含关键词
      <n-input v-model:value="searchNeither" type="text" placeholder="" />
    </n-space>
    </div>
    <div class="model">
    <n-space size='large'>
      <n-radio-group v-model:value="checked" name="radiogroup">
        <n-space>
          <n-radio v-for="model in models" :key="model.value" :value="model.value">
            {{ model.label }}
          </n-radio>
        </n-space>
      </n-radio-group>
    </n-space>
    <div class="handin">
      <n-button type="primary" :loading="loading"  @click='handin'>检索</n-button>
    </div>
    </div>
  </div>
</template>

<script>
import {ref,watch} from 'vue'
import {useStore} from '../stores/search'
import {useMessage} from 'naive-ui'
export default {
  setup(){
    let loading = ref(false)
    // pinia store
    const store = useStore()
    const message = useMessage()
    
    // 模型选择
    let searchAll = ref('')
    let searchEither = ref('')
    let searchNeither = ref('')
    // 其他模型，'vcm,pbm'
    let checked = ref(null)
    const models = [
      {value:'blm',label:'布尔模型'},
      {value:'vsm',label:'向量空间模型'},
      {value:'pbm',label:'概率统计模型'}
    ]
    // 提交检索请求
    function handin(){
      loading.value=true
      message.loading('世界树检索中...')
      // 使用$patch提交响应式请求
      // 注意！改成静态数据，否则会不停地被订阅到变化
      store.$patch({
        checked: checked.value,
        searchAll: searchAll.value,
        searchEither:searchEither.value,
        searchNeither:searchNeither.value
      })
      
      setTimeout(()=>{loading.value=false},1000)

      console.log('我是SearchInput组件，我提交了一个数据到仓库',store);
      
    }
    return {store,models,checked,searchAll,searchEither,searchNeither,handin,loading}
  }
}
</script>

<style lang="scss" scoped>
  .input{
    opacity:0;
    animation: fadeIn 1.5s ease-in-out 0.4s forwards;
    margin-top:30px;
    .inputTitle{
      margin-bottom:10px;
      font-size:20px
    }
    .model{
      margin-top:15px
    }
    .handin{
      float:right;
      width:50px
    }
  }
  @keyframes fadeIn {
  0%{
    opacity: 0;
    transform: translateY(-20px)
  }
  100%{
    opacity: 1;
    transform: translateY(0)
  }
  }
</style>