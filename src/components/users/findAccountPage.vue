<template>
  <div id="container" class="findAcountPage giveCenter">
      <short-logo/>
      <div v-if="scope=='email'"><!--이메일찾기일경우-->
          <div>가입하신 핸드폰번호를 입력해주세요</div>
          <input type="text" id="val" class="mt-2" placeholder="번호를 입력해주세요">
      </div>
      <div v-if="scope=='pwd'">
          <div>이메일을 입력해주세요</div><!--비밀번호찾기일경우-->
          <input type="email" id="val" class="mt-2" placeholder="이메일을 입력해주세요">
      </div>
      <input type="button" class="mt-2" id="send" @click="sendnum"  value="인증번호 전송">
      <div class="mt-3">인증번호를 입력해주세요</div>
      <input type="text" id="authnum" disabled>
      <br>
      <input type="button" id="checknum" class="mt-2" @click="checknum" value="인증번호 확인" disabled>
  </div>
</template>
<style>
</style>
<script>
import * as modules from '../../jslib';
export default {
  name: 'findAccountPage',
  data(){
      return{
          scope:null,
          email:'email',
          pwd:'pwd',  
          type:null,
      }
  },
  created(){
      this.scope=modules.getParam('scope');
      console.log(this.scope);
      if(this.scope!=this.email&&this.scope!=this.pwd){
          modules.wrongAccese();
      }
  },
  mounted(){
        modules.footerAtButton(this.$footerHeigth);
  },
  methods:{
     sendnum(){
        var val=modules.getValueById('val');
        this.selectType();
        let data=JSON.stringify({
            "type":this.type,
            "val":val,
            "detail":"find"
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
          "type":this.type,
          "detail":"find"
        });
        modules.requestPost('http://localhost:8080/confrim/auth',data).then(result=>{
            var res=result.data;
            alert(res.message);
            if(res.flag){
              if(this.scope=='pwd'){
                self.close();
              }
            }else{
              modules.disabledById('checknum',false);
            }
        });
      },
      selectType(){
        if(this.scope==this.email){
            this.type='phone';
        } else{
            this.type='pwd';
        }
      },
  },
}
</script>