<template>
<div class="root">
  <div class="card">

      <div class="avatar">
        <n-avatar
          round
          :size="64"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
      </div>
      <div class="title">{{username}}</div>

    <div class="data">
      <n-row>
      <n-col :span="12">
        <n-statistic label="文档数" :value="99">
          <template #prefix>
            <n-icon>
              <DocumentOutline />
            </n-icon>
          </template>
          <template #suffix>
            / 100
          </template>
        </n-statistic>
      </n-col>
      <n-col :span="12">
        <n-statistic label="点赞数">
          1,234,123
        </n-statistic>
      </n-col>
    </n-row>
    </div>
  </div>
</div>
</template>

<script>
import { DocumentOutline } from '@vicons/ionicons5'
export default {
  components:{DocumentOutline},
  setup(){
    const username = localStorage.getItem('username')
    return{username}
  }
}
</script>

<style lang="scss" scoped>
.root{
  padding:30px 50px;
  display: flex;
  justify-content: center;
  .card{
    height: 100px;
    width:500px;
    border-radius: 50px;
    background-color: #ffffff;
    box-shadow: 0 0 5px #a3a3a3;
    display: flex;
    justify-content:center;
    align-items: center;

    .avatar{
      padding:20px;
    // border: 10px solid #919191;
    }
    .title{
      font-size: 20px;
      font-weight: 600;
    }
    
    .data{
      width: 300px;
      margin-left: 50px;
    }
  }
}
</style>