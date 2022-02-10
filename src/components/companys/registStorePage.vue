<template>
  <div  class="margintopNavSize marginLeftSideSize" >
      <div id="registStorePage" style="float: left;">
        <h5 class="mt-2">매장을 대표하는 사진을 업로드해주세요</h5>
        <img  :src="thumbnail"  id="thumbnail" class="storeThumbnail">
        <br>
        <input type="file" id="img" class="mt-2" name="img" accept=".gif, .jpg, .png" @change="uploadThumbNail">
        <!--<br>
        <input type="button" class="mt-2"  value="업로드"  @click="uploadThumbNail">-->
        <br>
         <span class="mt-2" >상호</span>
        <input
          type="text"
          class="ml135 mt-2"
          id="storeName"
          placeholder="상호"   
        />
        <br>
        <span>사업자번호(숫자만)</span>
        <input type="text"
          class="ml45 mt-2"
          id="num"
          placeholder="상호"   
        />
        <br>
        <span>오픈시간</span>
        <input type="time"
          class="ml135 mt-2"
          id="openTime"
          placeholder="오픈시간"
        />
        <br>
        <span>마감시간</span>
        <input type="time"
          class="ml135 mt-2 mb-2"
          id="closeTime"
          placeholder="마감시간"
        />
        <br>
        <span >간단한 가게 설명을 적어주세요</span>
        <editor class="mt-2" :text="null" ref="ck_editor"/>
      </div>
      <div id="registStorePage2" style="float: left;">
         <vue-daum-postcode
        id="kpost"
        @complete="onComplete"
        style="overflow: scroll; width: 400px; height: 500px;"
      />
        <span>우편번호</span>
        <input
        type="text"
        class="ml105 mt-2"
        id="postcode"
        placeholder="우편번호"
        disabled
      />
      <br>
      <span>주소</span><input
        type="text"
        class="ml135 mt-2"
        id="address"
        placeholder="주소"
        disabled
      />
      <br>
      <span>상세주소</span><input
        type="text"
        class="ml105 mt-2"
        id="detailAddress"
        placeholder="상세주소"
      />
      <br>
      <span>최소배달금액(원)</span>
      <input type="number"
        class="ml105 mt-2"
        id="minPrice"
        placeholder="최소배달금액"
      />
      <br>
      <span>최대배달반경(km)</span>
      <input type="number"
        class="ml80 mt-2"
        id="deliverRadius"
        placeholder="최대배달반경"
        @keyup="showCircle"
      />
      <br>
      </div>
      <div id="registStorePage3" >
        <k-map :width="400" :height="500" :zoomLevel=5 ref="k_map"/>
      <br>
      </div>
      <div id="registStorePage4">
      <span >휴대폰번호</span>
      <input type="text" class="ml80" id="phone">
      <br>
      <span>매장전화번호</span>
      <input type="text" class="ml80 mt-2" id="tel">
      <br>
      <input type="button" @click="showAuthPage('phone')" id="check_phone_button" class="mt-2" value="전화인증" />
      <input type="button" value="가맹점 등록" @click="tryInsertStore" >
      </div>
  </div>
</template>
<style>
</style>
<script>
import * as modules from '../../jslib';
import kMap from '../../kMap.vue';
import Editor from '../editor.vue';
export default {
  components: { kMap, Editor },
  name: 'registStorePage',
  data(){
    return  {
      deliverRadiusFlag:false,
      radius:0,
      thumbnail:null,
    }
  },
  mounted(){
    //기본 썸네일 출력
    this.thumbnail=this.$s3Path+"/jangbogo/test2.jpeg";  
  },
  methods:{
    tryInsertStore(){
      var thumbNail=decodeURI(document.getElementById('thumbnail').src);
      var text=this.$refs.ck_editor.getText();
      var postcode=modules.getValueById('postcode');
      var address=modules.getValueById('address');
      var storeName=modules.getValueById('storeName');
      var detailAddress=modules.getValueById('detailAddress');
      var num=modules.getValueById('num');
      var openTime=modules.getValueById('openTime');
      var closeTime=modules.getValueById('closeTime');
      var minPrice=modules.getValueById('minPrice');
      var deliverRadius=modules.getValueById('deliverRadius');
      var tel=modules.getValueById('tel');
      var phone=modules.getValueById('phone');
      let data=JSON.stringify({
        "thumbNail":thumbNail,
        "text":text,
        "postcode":postcode,
        "address":address,
        "storeName":storeName,
        "detailAddress":detailAddress,
        "num":num,
        "openTime":openTime,
        "closeTime":closeTime,
        "minPrice":minPrice,
        "deliverRadius":deliverRadius,
        "tel":tel,
        "phone":phone,
      });
      modules.requestAsyncToPost(this.$serverDomain+"/auth/store/join",data).then(result=>{
        alert(result.message);
        if(result.flag){
          location.href="/showStoresPage?page=1&keyword=null";
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
        modules.openPOPup('/authPage?scope='+type+'&detail=auth2&kind='+modules.getParam('scope'),'authPage',500,500);
      },
      uploadThumbNail(){
      const frm = new FormData();
      console.log(document.getElementById('img').files[0]);
      frm.append("upload",document.getElementById('img').files[0]);
      console.log(frm);
      modules.requestFormAsyncToPost(this.$serverDomain+'/auth/file/upload',frm).then(result=>{
        console.log(result);
        if(result.flag){
          this.thumbnail=result.message;
          return;
        }
        alert('파일 업로드에 실패했습니다');

      });
    },
    onComplete(result) {
      console.log(result);
      document.getElementById("postcode").value = result.zonecode;
      document.getElementById("address").value = result.address;
      var data=new Object();
      data.address=result.address;
      data.deliverRadiusFlag=this.deliverRadiusFlag;
      if(this.deliverRadiusFlag){
        data.radius=this.radius;
      }
      this.$refs.k_map.drawCicleAndMakerWithAddress(data);   
    },
    showCircle(){
      var num=modules.getValueById('deliverRadius');
      //숫자인지검사
      if(isNaN(num)){
        alert('배달거리는 숫자만 입력해주세요');
        return;
      }
      this.deliverRadiusFlag=true;
      this.radius=num;
      this.$refs.k_map.drawCircle(num);   
    },
  }
  
}
</script>