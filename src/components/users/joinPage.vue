<template>
  <div class="joinPage giveCenter">
      <h1><p class="pinkText mt-3">JangBoGo</p></h1>
      <hr>
      <div class="mb-2">
        <span>이메일</span><input type="email" class="ml120" placeholder="이메일을 입력해주세요">
      </div>
      <div class="mb-2">
        <span >비밀번호</span><input type="password" class="ml105" placeholder="최소 4자 최대 10자입니다">
      </div>
      <div class="mb-2">
        <span >비밀번호번호확인</span><input type="password" class="ml45" placeholder="최소 4자 최대 10자입니다">
      </div>
      <div class="mb-2">
        <vue-daum-postcode id="kpost"  @complete="onComplete" style="overflow:scroll;  margin-left:50px; width:400px; height:500px;" />
        <span >우편번호</span><input type="text" class="ml105 " id="postcode"  placeholder="최소 4자 최대 10자입니다" disabled>
      </div>
      <div class="mb-2">
        <span >주소</span><input type="text" class="ml135 " id="address"  placeholder="최소 4자 최대 10자입니다" disabled>
      </div>   
      <div class="mb-2">
        <span >전화번호</span><input type="text" class="ml105 " id="phone"  placeholder="-기호 없이 전화번호를 입력해주세요">
      </div>         
      <div class="mb-2">
        <input type="button" value="전화인증">
        <input type="button" value="이메일인증">
      </div>  
  </div>
</template>
<style>
</style>
<script>
export default {
  name: 'joinPage',
  data(){
    return {
    };
  },
 mounted(){
    //리사이즈 될때 창크기 고정
    window.onresize = ()=> {
      window.resizeTo(500,900); 
    };
  },
  methods: {
    onComplete(result) {
      console.log(result);
      document.getElementById('postcode').value=result.zonecode;
      document.getElementById('address').value=result.address;
      alert('주소 선택 완료');

    },

  },
}
</script>