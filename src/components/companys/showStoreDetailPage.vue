<template>
  <div class="showStoreDetailPage giveCenter">
      <h5 class="mt-3">썸네일</h5>
      <img  :src="thumbnail"  id="thumbnail" class="storeThumbnail">
      <br>
      <input type="file" id="img" name="img" accept=".gif, .jpg, .png"><input type="button"  value="업로드"  @click="uploadThumbNail">
      <br>
      <br>
      <editorComponent/>
      <br>
     <vue-daum-postcode
        id="kpost"
        @complete="onComplete"
        style="overflow: scroll; width: 400px; height: 500px; margin-left: 40%"
      />
      <div id="map" style="margin-left: 40%"></div>
      <span>우편번호</span
      ><input
        type="text"
        class="ml105"
        id="postcode"
        placeholder="우편번호"
        disabled
      />
      <br>
      <span>주소</span><input
        type="text"
        class="ml135"
        id="address"
        placeholder="주소"
        disabled
      />
      <br>
      <span>상세주소</span><input
        type="text"
        class="ml105"
        id="detailAddress"
        placeholder="상세주소"
      />
      <br>
      <span>상호</span>
      <input
        type="text"
        class="ml135"
        id="storeName"
        placeholder="상호"   
      />
      <br>
      <span>사업자번호(숫자만)</span>
      <input type="text"
        class="ml45"
        id="num"
        placeholder="상호"   
      />
      <br>
      <span>오픈시간</span>
      <input type="time"
        class="ml135"
        id="openTime"
        placeholder="오픈시간"
      />
      <br>
      <span>마감시간</span>
      <input type="time"
        class="ml135"
        id="closeTime"
        placeholder="마감시간"
      />
      <br>
      <span>최소배달금액(원)</span>
      <input type="number"
        class="ml105"
        id="minPrice"
        placeholder="최소배달금액"
      />
      <br>
      <span>최대배달반경(km)</span>
      <input type="number"
        class="ml80"
        id="deliverRadius"
        placeholder="최대배달반경"
        @keyup="showCircle"
      />
      <br>
      <span>휴대폰번호</span>
      <input type="text" class="ml80" id="phone">
      <br>
      <span>매장전화번호</span>
      <input type="text" class="ml80" id="tel">
      <br>
      <input type="button" @click="showAuthPage('phone')" id="check_phone_button" value="전화인증" />
      <input type="button" value="가맹점 등록" @click="tryInsertStore" >
  </div>
</template>
<style>
</style>
<script>
import * as modules from '../../jslib';
export default {
  name: 'showStoreDetailPage',
  data(){
    return  {
      thumbnail:null,
    }
  },
  created(){
    this.$EventBus.$on('loginInfor',loginInfor=>{
      loginInfor=JSON.parse(loginInfor);
      console.log(loginInfor);
      //비로그인,권한이없는유저 팅겨내기
      if(modules.checkRole(loginInfor.role,loginInfor.loginFlag,this.$ROLE_USER)){
          modules.wrongAccese();
        return;
      }
    });
    modules.requestAsyncToGet(this.$serverDomain+'/auth/store/get/'+modules.getParam('id')).then(result=>{
      console.log(result);
      if(!result.flag){
        alert(result.message);
        return;
      }
      this.thumbnail=result.message.simg;
    });
  },
  methods:{
    tryUpdate(){
      
    },
  }
}
</script>