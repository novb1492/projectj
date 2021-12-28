<template>
  <div class="authPage giveCenter">
    <short-logo/>
    <input type="button" @click="sendnum" id="sendnum" value="인증번호 전송">
    <div>인증번호를 입력해주세요</div>
    <input type="text" placeholder="인증번호를 입력해주세요" id="authnum" disabled>
    <input type="button" @click="checknum" id="checknum" value="확인" disabled >
  </div>
</template>
<style>
</style>
<script>
import * as modules from '../../jslib';
import shortLogo from '../layout/shortLogo.vue';
export default {
  components: { shortLogo },
  name: 'authPage',
  data(){
      return{
        scope:null,
        detail:null,
        phone:'phone',
        email:'email',
        val:null,
      };
  },
  created(){
    this.scope=modules.getParam('scope');
    this.detail=modules.getParam('detail');
    console.log('인증수단: '+this.scope);
    console.log('사용 분류: '+this.detail);
    if(this.scope!=this.phone&&this.scope!=this.email){
        modules.wrongAccese();
    }
    if(this.scope=='phone'){
      this.val=opener.document.getElementById("phone").value;
    }else if(this.scope=='email'){
      this.val=opener.document.getElementById("email").value;
    }else{
      modules.wrongAccese();
    }
  },
  methods:{
      sendnum(){
        let data=JSON.stringify({
            "type":this.scope,
            "val":this.val,
            "detail":this.detail
        });
        modules.requestPost(this.$serverDomain+'/sns',data).then(result=>{
            var res=result.data;
            alert(res.message);
            if(res.flag){
              modules.disabledById('authnum',false);
              modules.disabledById('checknum',false);
            }
        });
      },
      checknum(){
        let data=JSON.stringify({
          "val":modules.getValueById('authnum'),
          "type":this.scope,
          "detail":this.detail
        });
        modules.requestPost(this.$serverDomain+'/confrim/auth',data).then(result=>{
            var res=result.data;
            alert(res.message);
            if(res.flag){
              if(this.scope=='phone'){
                opener.document.getElementById("check_phone_button").disabled=true;
              }else if(this.scope=='email'){
                opener.document.getElementById("check_email_button").disabled=true;
              }
              self.close();
            }else{
              modules.disabledById('checknum',false);
            }
        });
      },
  },
}
</script>