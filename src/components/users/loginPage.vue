<template>
  <div id="container">
      <short-logo/>
        <ul class="loginCenter">
          <li>이메일을 입력해 주세요</li>
          <li><input type="text" class="mb-2 " id="email" @keyup.enter="tryLogin" placeholder="email"></li>
          <li>비밀번호를 입력해 주세요</li>
          <li><input type="password" class="center"  @keyup.enter="tryLogin" placeholder="password" id="pwd"></li>
            <li><input type="button" class="mt-3" @click="tryLogin" value="로그인"></li>
              <li><input type="button" class="mb-3 mt-3 mr20" @click="soLogin('naver')" value="네이버로그인"><input type="button" @click="soLogin('kakao')" value="카카오로그인"></li>
                <li><a href="/findAccountPage?scope=email" class="mr20">이메일 찾기</a><a href="/findAccountPage?scope=pwd">비밀번호 찾기</a></li>
        </ul>
      <br>
      <br>
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
  mounted(){
    //풋터 하단고정
    modules.footerAtButton(this.$footerHeigth);
  },
  methods:{
    soLogin(kind){
      modules.requestGet(this.$serverDomain+'/social/'+kind+'/login').then(result=>{
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
      modules.requestPost(this.$serverDomain+"/login",data).then(result=>{
        console.log(result);
        var res=result.data;
        if(res.flag){
          location.href="/";
        }else{
          alert(res.message);
        }
      });
    }
  },
  
}
</script>