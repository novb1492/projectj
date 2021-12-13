<template>
  <div class="loginPage givecenter">
      <short-logo/>
      <div class="mb-2">이메일</div>
      <input type="text" class="mb-3" placeholder=" 이메일을 입력해주세요">
      <div class="mb-2">비밀번호</div>
      <input type="password">
      <input type="button" value="로그인">
      <br>
      <input type="button" class="mt-3" value="네이버로그인"><input type="button" value="카카오로그인">

  </div>
</template>
<style>
</style>
<script>
import shortLogo from '../layout/shortLogo.vue';
export default {
  components: { shortLogo },
  name: 'loginPage',
  data(){
    return{

    };
  },
  
}
</script>