<script>

export default{

}

</script>

<template>
<div id='app'> 
  <n-dialog-provider>
  <n-message-provider> 
   <div class="backtop">
  <n-back-top :right="40" />
  </div>
  <router-view></router-view>
  </n-message-provider>
  </n-dialog-provider>
</div>
</template>

<style scoped>
.backtop{
  z-index: 999;
}

</style>
