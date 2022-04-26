<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import resource from './api/resource.js'
  export default {
    name: 'app',
    created(){
      // this.$router.push('/index')
      resource.getUserStatus().then(res => {
        if(res.data.code == 1){
          this.$router.push('/index')
        }else{
          this.$toast(res.data.msg);
        }
      })
    }
  }
</script>

<style>

</style>
