<template>
  <div class="loginPage givecenter">
      <short-logo/>
      <div class="mb-2">이메일</div>
      <input type="text" class="mb-3" id="email" @keyup.enter="tryLogin" placeholder=" 이메일을 입력해주세요">
      <div class="mb-2">비밀번호</div>
      <input type="password"  @keyup.enter="tryLogin" id="pwd">
      <input type="button" @click="tryLogin" value="로그인">
      <br>
      <input type="button" class="mb-3 mt-3 mr20" @click="soLogin('naver')" value="네이버로그인"><input type="button" @click="soLogin('kakao')" value="카카오로그인">
      <br>
      <a href="/findAccountPage?scope=email" class="mr20">이메일 찾기</a><a href="/findAccountPage?scope=pwd">비밀번호 찾기</a>
  </div>
</template>
<style>
</style>
<script>
import * as modules from '../../jslib';
export default {
  name: 'loginPage',
  data(){
    return{

    };
  },
  methods:{
    soLogin(kind){
      modules.requestGet('http://localhost:8080/social/'+kind+'/login').then(result=>{
        var res=result.data;
        if(res.flag){
          modules.openPOPup(res.message,'soLoginPage',800,800);
        }else{
          alert(res.message);
        }
      });
    },
    tryLogin(){
      var email=modules.getValueById('email');
      var pwd=modules.getValueById('pwd');
      let data=JSON.stringify({
        "email":email,
        "pwd":pwd,
      });
      modules.requestPost("http://localhost:8080/login",data).then(result=>{
        console.log(result);
        var res=result.data;
        if(res.flag){
          opener.location.reload();
          self.close();
        }else{
          alert(res.message);
        }
      });
    }
  },
  
}
</script>