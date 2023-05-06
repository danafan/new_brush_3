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
      resource.getLoginStatus().then(res => {
        if(res.data.code == 1){
          localStorage.setItem('user_type',res.data.data.user_type);
          this.$router.push('/index');
        }else{
          this.$toast(res.data.msg);
        }
      })
    }
  }
</script>

<style>

</style>
