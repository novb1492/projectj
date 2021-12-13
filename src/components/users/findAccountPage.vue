<template>
  <div class="findAcountPage giveCenter">
      <short-logo/>
      <div v-if="scope=='email'">
          <div>가입하신 핸드폰번호를 입력해주세요</div>
          <input type="text" id="phone" class="mt-2" placeholder="번호를 입력해주세요">
      </div>
      <div v-if="scope=='pwd'">
          <div>이메일을 입력해주세요</div>
          <input type="email" id="email" class="mt-2" placeholder="이메일을 입력해주세요">
      </div>
      <input type="button" class="mt-2" id="send" @click="sendsns"  value="인증번호 전송">
      <div class="mt-3">인증번호를 입력해주세요</div>
      <input type="text" id="num" disabled>
      <br>
      <input type="button" id="confrim" class="mt-2" @click="confrim" value="인증번호 확인">
  </div>
</template>
<style>
</style>
<script>
import * as modules from '../../jslib';
import shortLogo from '../layout/shortLogo.vue';
export default {
  components: { shortLogo },
  name: 'findAccountPage',
  data(){
      return{
          scope:null,
          email:'email',
          pwd:'pwd',  
      }
  },
  created(){
      this.scope=modules.getParam('scope');
      console.log(this.scope);
      if(this.scope!=this.email&&this.scope!=this.pwd){
          modules.wrongAccese();
      }
  },
  methods:{
      sendsns(){
        var kind=null;
        if(this.scope=='email'){
            kind='phone';
        }else{
            kind='email';
        }
        var val=modules.getValueById(kind);
        if(modules.checkNull(val)){
            alert('입력후 요청해주세요');
            return;
        }
        alert('인증번호 전송');
        document.getElementById('send').value='다시전송';
        modules.disabledById('num',false);
      },
      confrim(){
        let data=JSON.stringify({
              "scope": this.scope,
              "val":document.getElementById('num').value
        });
          alert(data);
          modules.disabledById('confrim',true);
          var me='휴대폰으로 이메일을 전송해드렸습니다';
          if(this.scope=='pwd'){
              me='이메일을 확인해주세요';
          }
          alert(me);

      }
  },
}
</script>