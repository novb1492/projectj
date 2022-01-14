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
.margintopNavSize{margin-top: 48px;}
html, body {
    margin: 0;
    padding: 0;
    height: 100%;
}
.foot {
    position:absolute;
    bottom:0px;
    width:100%;
}
.mr20{margin-right: 20px;}
a{ text-decoration:none }
.ml80{margin-left: 80px;}
.ml135{margin-left: 135px;}
.ml105{margin-left: 105px;}
.ml45{margin-left: 45px;}
.ml120{margin-left: 120px;}
.ml180{margin-left: 180px;}
ul{list-style:none;}
li{list-style-type: none; }
.pinkText{color: pink; margin: 0px;}
.giveCenter {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

}
.loginCenter{text-align: center;}
.storeThumbnail{width: 200px; height: 200px;}
</style>
