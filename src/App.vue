<template>
  <div id="app">
    <he />
    <router-view></router-view>
    <foot />
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import he from './components/layout/header.vue';
import foot from './components/layout/footer.vue';
export default {
  name: 'App',
  components: {
    he,
    foot
    //HelloWorld
  }
}
</script>

<style>
ul{list-style:none;}
.pinkText{color: pink; margin: 0px;}
.giveCenter {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
