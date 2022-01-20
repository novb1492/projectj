<template>
    <div class="margintopNavSize">
         <vue-daum-postcode
        id="kpost"
        @complete="onComplete"
        style="overflow: scroll; width: 400px; height: 500px;"
      />
              <div id="map"></div>
    검색한주소
    <input type="text" disabled id="address">
    longitude
    <input type="text" disabled id="la">
    latitude
    <input type="text" disabled id="ma">ß
    </div>
    
</template>
<style>

</style>
<script>
export default {
  name: 'secretPage',
   data(){
    return  {
      storex:0,
      storey:0,
      text:null,
      map:null,
      marker:null,
      infowindow:null,
    }
  },
  created(){
    //카카오 api head에넣기
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load(this.initMap);
    script.src ="//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=95292156744ab5c8586460536149fb32&libraries=services";
    document.head.appendChild(script);
  },
  methods:{
    
     
    
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
  },
    onComplete(result) {
      console.log(result);
      document.getElementById("address").value = result.address;
        var geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(result.address, (result, status)=> {
        if (status === kakao.maps.services.Status.OK) { 
          // 정상적으로 검색이 완료됐으면 
          alert("주소 선택완료 지도를 확인해 주세요");
          this.storex=result[0].x;
          this.storey=result[0].y
          console.log(this.storex);
        document.getElementById("la").value = this.storey;
        document.getElementById("ma").value=this.storex;

          //배달받을 주소표시
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
      this.getMarker(place);
      // 인포윈도우로 장소에 대한 설명을 표시합니다
      this.showTextOnMaker(this.marker,'<div style="width:150px;text-align:center;padding:6px 0;">매장의 위치입니다</div>');
      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      this.map.setCenter(place);
    },
  }
}
</script>