<template>
  <div class="resultPage giveCenter">
      <short-logo/>
  </div>
</template>
<style>
</style>
<script>
import * as modules from '../jslib';
import shortLogo from './layout/shortLogo.vue';
export default {
  components: { shortLogo },
  name: 'resultPage',
   data() {
    return {
      kind:null,
      flag:modules.getParam('result'),
      action:modules.getParam('action'),
      message:modules.getParam('message'),
    };
  },
  created(){
    console.log('action: '+this.action);
    if(this.action=='login'){
      console.log("로그인 결과 처리");
      this.login();
    }else if(this.action=='payment'){
      console.log("결제 결과 처리");
      this.pay();
    }
  },
  methods:{
    login(){
      if(this.flag=='true'){
        opener.location.href='/';
      }else{
        alert(this.message);
      }
      self.close();
    },
    pay(){
      alert(this.message);
    },
  },
}
</script>