<template>
  <div class="joinPage giveCenter">
    <short-logo/>
    <div class="mb-2">
      <span>이메일</span
      ><input type="email" id="email" @keyup="checkEmail" class="ml120" placeholder="이메일을 입력해주세요" />
    </div>
    <div class="mb-2">
      <span>비밀번호</span
      ><input
        type="password"
        class="ml105"
        placeholder="최소 4자 최대 10자입니다"
        id="pwd"
      />
    </div>
    <div class="mb-2">
      <span>비밀번호번호확인</span
      ><input
        type="password"
        class="ml45"
        placeholder="최소 4자 최대 10자입니다"
        id="pwd2"
      />
    </div>
    <div class="mb-2">
      <vue-daum-postcode
        id="kpost"
        @complete="onComplete"
        style="overflow: scroll; margin-left: 50%; transform: translateX(-50%);  width: 400px; height: 500px"
      />
      <span>우편번호</span
      ><input
        type="text"
        class="ml105"
        id="postcode"
        placeholder="우편번호"
        disabled
      />
    </div>
    <div class="mb-2">
      <span>주소</span
      ><input
        type="text"
        class="ml135"
        id="address"
        placeholder="주소"
        disabled
      />
      <br />
      <span>상세주소</span><input
        type="text"
        class="ml105"
        id="detailAddress"
        placeholder="상세주소를 입력해 주세요"
      />
    </div>
    <div class="mb-2">
      <span>휴대폰번호</span
      ><input
        type="text"
        class="ml105"
        id="phone"
        placeholder="-기호 없이 입력해주세요"
      />
    </div>
    <div v-if="scope!='persnal'">
      <div class="mb-2">
      <span>회사번호</span
      ><input
        type="text"
        class="ml105"
        id="tel"
        placeholder="-기호 없이 입력해주세요"
      />
    </div>
     <div class="mb-2">
      <span>사업자번호</span
      ><input
        type="text"
        id="company_num"
        placeholder="-기호 없이 입력해주세요"
        class="ml105"
      />
    </div>
    <div class="mb-2">
      <span>상호</span
      ><input
        type="text"
        id="store_name"
        class="ml135"
      />
    </div>
    <div class="mb-2">
      <span>대표자성명</span
      ><input
        type="text"
        id="name"
        class="ml135"
      />
    </div>
    <div class="mb-2">
      <span>개업연월일</span
      ><input
        type="date"
        id="start_dt"
        class="ml135"
      />
    </div>
    </div>
    <div v-else>
      <div class="mb-2">
      <span>이름</span
      ><input
        type="text"
        id="name"
        class="ml135"
      />
    </div>
    <div class="mb-2">
      <span>생년월일</span
      ><input
        type="date"
        id="birth"
        class="ml135"
      />
    </div>
    </div>
    <div class="mb-2">
      <input type="button" @click="showAuthPage('phone')" id="check_phone_button" value="전화인증" />
      <input type="button" @click="showAuthPage('email')" id="check_email_button" value="이메일인증" />
    </div>
    <div class="mb-2">
      <input type="button" @click="tryJoin" id="try_join_button" value="회원가입" />   
    </div>
  </div>
</template>
<style>
</style>
<script>
import * as modules from '../../jslib';
export default {
  name: "joinPage",
  data() {
    return {
      scope:null,
      persnal:'persnal',
      seller:'seller',
      buyer:'buyer',
    };
  },
  created(){
    this.scope=modules.getParam('scope');
    console.log('회원가입 유형: '+this.scope);
    if(this.scope!=this.buyer&&this.scope!=this.seller&&this.scope!=this.persnal){
      modules.wrongAccese();
    }
  },
  mounted() {
    modules.footerAtButton(this.$footerHeigth);
  },
  methods: {
      checkEmail(){
      var email=modules.getValueById('email');
      modules.requestGet(this.$serverDomain+'/user/checkEmail?email='+email).then(result=>{
        var res=result.data;
        if(!res.flag){
          document.getElementById('email').style.backgroundColor='blue';
        }else{
          document.getElementById('email').style.backgroundColor='red';
        }
      });
    },
      tryJoin(){
        var email=modules.getValueById('email');
        var pwd=modules.getValueById('pwd');
        var pwd2=modules.getValueById('pwd2');
        var phone=modules.getValueById('phone');
        var post_code=modules.getValueById('postcode');
        var address=modules.getValueById('address');
        var detail_address=modules.getValueById('detailAddress');
        var name=modules.getValueById('name');
        let data=null;
        if(this.scope!=this.persnal){
          var company_num=modules.getValueById('company_num');
          var tel=modules.getValueById('tel');
          var store_name=modules.getValueById('store_name');
          var start_dt=modules.getValueById('start_dt');
          data=JSON.stringify({
          "scope":this.scope,
          "email":email,
          "pwd":pwd,
          "pwd2":pwd2,
          "phone":phone,
          "post_code":post_code,
          "address":address,
          "detail_address":detail_address,
          "company_num":company_num,
          "tel":tel,
          "name":name,
          "store_name":store_name,
          "start_dt":start_dt,
          });
        }else{
          var birth=modules.getValueById('birth');
          data=JSON.stringify({
          "scope":this.scope,
          "email":email,
          "pwd":pwd,
          "pwd2":pwd2,
          "phone":phone,
          "post_code":post_code,
          "address":address,
          "detail_address":detail_address,
          "name":name,
          "birth":birth,
          });
        }
        modules.requestPost(this.$serverDomain+'/user/join',data).then(result=>{
          console.log(result);
          var res=result.data;
          alert(res.message);
          if(res.flag){
            location.href="/loginPage";
          }
        });
      },
      showAuthPage(type){
        var message='휴대폰을 입력해주세요';
        var vl=document.getElementById('phone').value;
        if(type=='email'){  
          message='이메일을 입력해주세요';
          vl=document.getElementById('email').value;
        }
        if(modules.checkNull(vl)){
          alert(message);
          return;
        }
        modules.openPOPup('/authPage?scope='+type+'&detail=auth&kind='+modules.getParam('scope'),'authPage',500,500);
      },
    onComplete(result) {
      console.log(result);
      document.getElementById("postcode").value = result.zonecode;
      document.getElementById("address").value = result.address;
      alert("주소 선택 완료");
    },
  },

 
};
</script>