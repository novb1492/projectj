<template>
  <div class="registStorePage ">
      <div id="registStorePage">
        <h5 class="mt-2">매장을 대표하는 사진을 업로드해주세요</h5>
        <img  :src="thumbnail"  id="thumbnail" class="storeThumbnail">
        <br>
        <input type="file" id="img" class="mt-2" name="img" accept=".gif, .jpg, .png">
        <br>
        <input type="button" class="mt-2"  value="업로드"  @click="uploadThumbNail">
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
        <editorComponent class="mt-2"/>
      </div>
      <div id="registStorePage2">
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
      <div id="registStorePage3">
        <div id="map"></div>
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
#registStorePage4{position: absolute;}
#registStorePage3{position: absolute;}
#registStorePage2{position: absolute;}
#registStorePage{position: absolute;} 
</style>
<script>
import * as modules from '../../jslib';
export default {
  name: 'registStorePage',
  data(){
    return  {
      storex:0,
      storey:0,
      text:null,
      map:null,
      marker:null,
      infowindow:null,
      thumbnail:null,
      deliverRadiusFlag:false,
      circle:null,
    }
  },
  created(){
    this.$EventBus.$on('loginInfor',loginInfor=>{
      loginInfor=JSON.parse(loginInfor);
        console.log(loginInfor);
        //비로그인,권한이없는유저 팅겨내기
        if(loginInfor.loginFlag!=true||loginInfor.role==this.$ROLE_USER){
            modules.wrongAccese();
            return;
        }
    });
    this.thumbnail=this.$s3Path+"/jangbogo/2021-12-31660cf46a-7bc0-4f0c-a6ee-dbf1b5aca9ef사본 -스크린샷(2146).png";    
    //카카오 api head에넣기
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load(this.initMap);
    script.src ="//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=95292156744ab5c8586460536149fb32&libraries=services";
    document.head.appendChild(script);
  },
  mounted(){
      document.getElementById('registStorePage').style.left=this.$sideVarWitdh+'px';
      document.getElementById('registStorePage2').style.left=this.$sideVarWitdh+700+'px';
      document.getElementById('registStorePage3').style.left=this.$sideVarWitdh+1200+'px';
      document.getElementById('registStorePage4').style.left=this.$sideVarWitdh+1200+'px';
      document.getElementById('registStorePage4').style.top="570px";
     //에디터 컴포넌트 입력시 받아오기
    this.$EventBus.$on('editorText',get=>{
      this.text=get;
      console.log('에디터내용');
      console.log(this.text);
    });
    localStorage.setItem("pageNum",'1');
  },
  methods:{
    tryInsertStore(){
      var thumbNail=decodeURI(document.getElementById('thumbnail').src);
      var text=this.text;
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
    showCircle(){
      var num=modules.getValueById('deliverRadius');
      //숫자인지검사
      if(isNaN(num)){
        alert('배달거리는 숫자만 입력해주세요');
        return;
      }
      this.drawCircle(num);
    },
    uploadThumbNail(){
      const frm = new FormData();
      console.log(document.getElementById('img').files[0]);
      frm.append("upload",document.getElementById('img').files[0]);
      console.log(frm);
      modules.requestFormAsyncToPost(this.$serverDomain+'/auth/file/upload',frm).then(result=>{
        console.log(result);
        if(result.uploaded){
          this.thumbnail=result.url;
          return;
        }
        alert('파일 업로드에 실패했습니다');

      });
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
      //container.style.marginLeft = '40px';
      this.map.relayout();
    },
    drawCircle(radius){
      //이전원이 있다면 지워줘야함
      if(this.deliverRadiusFlag){
        this.circle.setMap(null); // 지도에서 제거한다.
      }
       // 지도에 표시할 원을 생성합니다
      this.circle = new kakao.maps.Circle({
          center : new kakao.maps.LatLng(this.storey,this.storex),  // 원의 중심좌표 입니다 
          radius: radius*1000, // 미터 단위의 원의 반지름입니다 
          strokeWeight: 5, // 선의 두께입니다 
          strokeColor: '#75B8FA', // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: 'dashed', // 선의 스타일 입니다
          fillColor: '#CFE7FF', // 채우기 색깔입니다
          fillOpacity: 0.7  // 채우기 불투명도 입니다   
      }); 
      // 지도에 원을 표시합니다 
      this.circle.setMap(this.map); 
      this.deliverRadiusFlag=true;
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
        var geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(result.address, (result, status)=> {
        if (status === kakao.maps.services.Status.OK) { 
          // 정상적으로 검색이 완료됐으면 
          alert("주소 선택완료 지도를 확인해 주세요");
          this.storex=result[0].x;
          this.storey=result[0].y
          console.log(this.storex);
          //배달받을 주소표시
          this.showCompanyPlace(new kakao.maps.LatLng(this.storey, this.storex));
          //이전에 이미 반경 표시까지 하고 수정했다면 재 탐색된 좌표로 원그려주기
          if(this.deliverRadiusFlag){
            this.showCircle();
          }
        }else{
          alert('검색 내역이 없습니다');
        } 
      }); 
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
      this.showTextOnMaker(marker,'<div style="width:150px;text-align:center;padding:6px 0;">매장의 위치입니다</div>');
      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      this.map.setCenter(place);
    },
  }
  
}
</script>