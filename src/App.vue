<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created(){
      this.$router.push('/disciple_order')
    }
  }
</script>

<style>

</style>
