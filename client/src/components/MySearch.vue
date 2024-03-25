<template>
  <div id="search">
    <form><input type="text" placeholder="你在寻找什么..."></form>
</div>
</template>

<script>
export default {
  name:'MySearch'
}
</script>

<style lang='scss' scoped>
#search{
    // width: 20px;
    // height: 20px;
    // transform: scale(0.8);
    input{
      box-sizing: border-box;
      width:40px;
      border-radius: 20px;
      height: 40px;
      background-image: url(/public/search.svg);
      background-repeat: no-repeat;
      background-size: 20px 20px;
      background-position: 8px;
      padding-left: 35px;
      transition: width 0.4s ease-in-out;
      background-color: rgba(255,255,255,0.5);
    }
}

#search input[type=text]:hover{
    width:250px;
}

#search input[type=text]:focus{
    width:250px;
    border:0;
    box-shadow: 0 0 5px #fff;
}
</style>