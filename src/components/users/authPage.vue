<template>
  <div class="authPage giveCenter">
    <h1><p class="pinkText mt-3">JangBoGo</p></h1>
    <hr>
    <input type="button" @click="sendnum" id="sendnum" value="인증번호 전송">
    <div>인증번호를 입력해주세요</div>
    <input type="text" placeholder="인증번호를 입력해주세요" id="authnum">
    <input type="button" @click="checknum" value="확인">
  </div>
</template>
<style>
</style>
<script>
import * as modules from '../../jslib';
export default {
  name: 'authPage',
  data(){
      return{
        scope:null,
        detail:null,
        phone:'phone',
        email:'email',
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
  },
  methods:{
      sendnum(){
        var val=null;
        if(this.scope=='phone'){
            val=opener.document.getElementById("phone").value;
        }else if(this.scope=='email'){
            val=opener.document.getElementById("email").value;
        }else{
            modules.wrongAccese();
        }
        let data=JSON.stringify({
            "type":this.scope,
            "val":val,
            "detail":this.detail
        });
        modules.requestPost('http://localhost:8080/sns',data).then(result=>{
            var res=result.data;
            alert(res.message);
        });
      },
  },
}
</script>