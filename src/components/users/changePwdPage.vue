<template>
  <div class="changePwdPage giveCenter">
      <h3 class="mt-5">새로사용하실 비밀번호를 입력해주세요</h3>
      <input type="password" class="mt-3" id="pwd" placeholder="비밀번호는 4~10자입니다">
      <h5 class="mt-3">재입력</h5>
      <input type="password" class="mt-2" id="pwd2" placeholder="비밀번호는 4~10자입니다">
      <br>
      <input type="button" @click="trychange" value="변경">
  </div>
</template>
<style>
</style>
<script>
import * as modules from '../../jslib';
export default {
  name: 'changePwdPage',
  created(){
    var check=modules.getParam('token');
    if(modules.checkNull(check)){
      modules.wrongAccese();
    }
    modules.requestGet('http://localhost:8080/user/checkPage?token='+check).then(result=>{
      console.log(result);
      var res=result.data;
      if(!res.flag){
        alert(res.message)
        location.href="/";
      }
    });
  },
  methods:{
    trychange(){
      var pwd=modules.getValueById('pwd');
      var pwd2=modules.getValueById('pwd2');
      var token=modules.getParam('token');
      let data=JSON.stringify({
        "pwd":pwd,
        "pwd2":pwd2,
        "token":token
      });
      modules.requestPutToServer('http://localhost:8080/user/newpwd',data).then(res=>{
        console.log(res);
        alert(res.message);
        if(res.flag){
          location.href='/';
        }
      });
    }
  },
}
</script>