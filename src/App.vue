<template>
  <div id="app">
    <he v-on:searchStore="searchStore" v-on:loginInfor="loginInfor"/>
    <router-view ref="router_view" :loginInfors="loginInfors" ></router-view>
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
  },
   data() {
    return {
      loginInfors:null,
    };
  },
  created() {
    //부트스트랩
    var recaptchaScript = document.createElement('script');
    recaptchaScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js');
    recaptchaScript.setAttribute('integrity', 'sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM');
    recaptchaScript.setAttribute('crossorigin','anonymous');
    document.head.appendChild(recaptchaScript);
    recaptchaScript = document.createElement('link');
    recaptchaScript.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css');
    recaptchaScript.setAttribute('rel', 'stylesheet');
    recaptchaScript.setAttribute('integrity','sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC');
    recaptchaScript.setAttribute('crossorigin','anonymous');
    document.head.appendChild(recaptchaScript);
  },
  methods:{
    searchStore(text){
      this.$refs.router_view.callSearch(text);
    },
    loginInfor(loginInfor){
      this.loginInfors=loginInfor;
      console.log('app');
      console.log(this.loginInfors);
    },
  }
}
</script>

<style>
.marginLeftSideSize{margin-left: 250px;}
.margintopNavSize{margin-top: 55px;}
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
