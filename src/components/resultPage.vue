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
      flag:false,
      action:null,
      message:null,
    };
  },
  created(){
    this.action=modules.getParam('action');
    console.log('action: '+this.action);
    if(this.action=='login'){
      console.log("로그인 결과 처리");
      this.login();
    }
  },
  methods:{
    login(){
      this.flag=modules.getParam('result');
      if(this.flag=='true'){
        opener.location.href='/';
      }else{
        alert(modules.getParam('message'));
      }
      self.close();
    }
  },
}
</script>