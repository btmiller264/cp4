<template>
  <div class="home">
    <HelloWorld msg="Welcome to The Champions League"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style>
  .home {
    width: 100%;
    height: 100%;
    background-image: url('../images/cl.jpg');
    background-size: cover;
  }
</style>
