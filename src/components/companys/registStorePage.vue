<template>
  <div class="registStorePage giveCenter">
      <h5 class="mt-3">썸네일을 업로드해주세요</h5>
      <img :src=thumnail id="thumnail" class="storeThumnail">
      <br>
      <input type="file" id="img" name="img" accept=".gif, .jpg, .png"><input type="button"  value="업로드"  @click="uploadThumNail">
      <br>
      <h5 class="mt-3">간단한 가게 설명을 입력해주세요</h5>
      <br>
      <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
      <br>
     <vue-daum-postcode
        id="kpost"
        @complete="onComplete"
        style="overflow: scroll; width: 400px; height: 500px; margin-left: 35%"
      />
      <div id="map" style="margin-left: 35%"></div>
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
      <span>최소배달금액</span>
      <input type="number"
        class="ml105"
        id="minPrice"
        placeholder="최소배달금액"
      />
      <br>
      <span>최대배달반경(km)</span>
      <input type="number"
        class="ml80"
        id="deliver"
        placeholder="최대배달반경"
      />
      <br>
      <input type="button" value="가맹점 등록">
  </div>
</template>
<style>
</style>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from '../../MyUploadAdapter';
import * as modules from '../../jslib';
export default {
  name: 'registStorePage',
  data(){
    return  {
      storex:0,
      storey:0,
      map:null,
      marker:null,
      infowindow:null,
      thumnail:this.$s3Path+'/jangbogo/스크린샷 2021-12-28 오후 10.31.41.png',
         editor: ClassicEditor,
                editorData: '<p>.</p>',
                editorConfig: {
                    extraPlugins: [this.MyCustomUploadAdapterPlugin],
                }
    }
  },
  created(){
    this.$EventBus.$on('loginInfor',loginInfor=>{
        console.log(loginInfor);
        //비로그인 팅겨내기
        if(loginInfor[0]!=true){
            modules.wrongAccese();
            return;
        }
    });

    //카카오 api head에넣기
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load(this.initMap);
    script.src ="//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=95292156744ab5c8586460536149fb32&libraries=services";
    document.head.appendChild(script);
  },
  methods:{
    MyCustomUploadAdapterPlugin( editor ) {
            editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
            // Configure the URL to the upload script in your back-end here!
            return new MyUploadAdapter( loader );
            };
    },
    uploadThumNail(){
      const frm = new FormData();
      console.log(document.getElementById('img').files[0]);
      frm.append("upload",document.getElementById('img').files[0]);
      console.log(frm);
      modules.requestFormAsyncToPost(this.$serverDomain+'/auth/file/upload',frm).then(result=>{
        console.log(result);
        if(result.uploaded){
          this.thumnail=result.url;
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
        // 정상적으로 검색이 완료됐으면 
        alert("주소 선택완료 지도를 확인해 주세요");
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
  }
  
}
</script>