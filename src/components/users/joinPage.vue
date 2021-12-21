<template>
  <div class="joinPage giveCenter">
    <short-logo/>
    <div class="mb-2">
      <span>이메일</span
      ><input type="email" id="email" class="ml120" placeholder="이메일을 입력해주세요" />
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
        style="overflow: scroll; margin-left: 50px; width: 400px; height: 500px"
      />
      <div v-if="scope!='persnal'">
        <div id="map"></div>
      </div>
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
      <span>영업시작시간</span
      ><input
        type="time"
        id="open_time"
        class="ml180"
      />
    </div>
      <div class="mb-2">
      <span>영업종료시간</span
      ><input
        type="time"
        id="close_time"
        class="ml180"
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
      <span>개업일자</span
      ><input
        type="number"
        id="start_dt"
        class="ml135"
      />
    </div>
    </div>
    <div v-else>
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
      storex:0,
      storey:0,
      map:null,
      marker:null,
      infowindow:null,
    };
  },
  created(){
    this.scope=modules.getParam('scope');
    console.log('회원가입 유형: '+this.scope);
    if(this.scope!=this.buyer&&this.scope!=this.seller&&this.scope!=this.persnal){
      modules.wrongAccese();
    }
    //기업회원만지도표시
    if(this.scope!=this.persnal){
      //카카오 api head에넣기
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src ="//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=95292156744ab5c8586460536149fb32&libraries=services";
      document.head.appendChild(script);
    }
  },
  mounted() {
    //리사이즈 될때 창크기 고정
    window.onresize = () => {
      window.resizeTo(500, 900);
    };
  },
  methods: {
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
          var open_time=modules.getValueById('open_time');
          var close_time=modules.getValueById('close_time');
          var tel=modules.getValueById('tel');
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
          "open_time":open_time,
          "close_time":close_time,
          "tel":tel,
          "name":name,
          });
        }else{
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
          });
        }
        modules.requestPost('http://localhost:8080/user/insert',data).then(result=>{
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
        modules.openPOPup('/authPage?scope='+type+'&detail=auth&kind='+modules.getParam('scope'),'authPage',300,300);
      },
      initMap() {
      //불러오기
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };
      //지도그리기
      this.map = new kakao.maps.Map(container, options);
      //지도사이즈 
      container.style.width ='410px';
      container.style.height = '500px';
      container.style.marginLeft = '40px';
      this.map.relayout();
    },
     getMarker(place){
       //이전 마커가 존재 한다면 null아니다
       if(this.marker!=null){
          this.marker.setMap(null);//이전 마커 지우기
       }
       //새마커 설정
      this.marker= new kakao.maps.Marker({
                map: this.map,
                position: place
      });
      return this.marker;
  },
    onComplete(result) {
      console.log(result);
      document.getElementById("postcode").value = result.zonecode;
      document.getElementById("address").value = result.address;
      if(this.scope==this.persnal){
        alert("주소 선택 완료");
      }else{
        alert("주소 선택완료 지도를 확인해 주세요");
          var geocoder = new kakao.maps.services.Geocoder();
          geocoder.addressSearch(result.address, (result, status)=> {
          // 정상적으로 검색이 완료됐으면 
          if (status === kakao.maps.services.Status.OK) { 
            this.storex=result[0].x;
            this.storey=result[0].y
            console.log(this.storex);
            //배달받을 주소표사
            this.showCompanyPlace(new kakao.maps.LatLng(this.storey, this.storex));
          }else{
            alert('검색 내역이 없습니다');
          } 
        }); 
      } 
    },
     showTextOnMaker(marker,text){
       //이미 인포 윈도우가 존재 한다면 지워줘야한다
       if(this.infowindow!=null){
         this.infowindow.close();
       }
       //새로 그릴 정보 만들기
        this.infowindow =  new kakao.maps.InfoWindow({
                content: text
        }); //new kakao.maps.InfoWindow({zIndex:1});
        //infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        //마커위치에 표시
        this.infowindow.open(this.map, marker);
    },
    showCompanyPlace(place){
      console.log(place);
      // 결과값으로 받은 위치를 마커로 표시합니다
      var marker = this.getMarker(place);
      // 인포윈도우로 장소에 대한 설명을 표시합니다
      this.showTextOnMaker(marker,'<div style="width:150px;text-align:center;padding:6px 0;">기업의 위치입니다</div>');
      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      this.map.setCenter(place);
    },
  },

 
};
</script>