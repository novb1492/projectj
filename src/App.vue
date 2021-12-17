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
.mr20{margin-right: 20px;}
a{ text-decoration:none }
.ml80{margin-left: 80px;}
.ml135{margin-left: 135px;}
.ml105{margin-left: 105px;}
.ml45{margin-left: 45px;}
.ml120{margin-left: 120px;}
.ml180{margin-left: 180px;}
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
