<template>
    <div id="mapPage">
        <div id="map"></div>
        <input type="text" @keyup="search(null)" id="name">
    </div>
</template>
<script>
import * as modules from './jslib';
export default {
   name :'firstdoor',
    data() {
    return {
      map: null,//카카오지도 객체
      destinationFlag:false,//받을 주소를 선택했는지 판별하는 플래그
      destinationX:null,
      destinationY:null,
      maketX:0,
      maketY:0,
      address:null,
    };
  },
  created() {
    document.body.style.overflow = "hidden";
    //카카오 api head에넣기
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load(this.initMap);
    script.src ="//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=95292156744ab5c8586460536149fb32&libraries=services";
    document.head.appendChild(script);
    this.destinationFlag=sessionStorage.getItem("destinationFlag");
    //배달받을 주소를 검색하면 무조건 세션에 남음 없다면 null 대신 false 부여
    if(this.destinationFlag==null){
      this.destinationFlag=false;
    }
    this.destinationX=sessionStorage.getItem("destinationX");
    this.destinationY=sessionStorage.getItem("destinationY");
  },
  methods: {
    showHomePlace(place){
      // 결과값으로 받은 위치를 마커로 표시합니다
      var marker = this.getMarker(place);
      // 인포윈도우로 장소에 대한 설명을 표시합니다
      this.showTextOnMaker(marker,'<div style="width:150px;text-align:center;padding:6px 0;">배달 받으실 주소</div>');
      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      this.map.setCenter(place);
      this.destinationFlag=true;
    },
    initMap() {
      this.address=sessionStorage.getItem("homeAddress");
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);
      container.style.width = window.innerWidth+'px';
      container.style.height = 300+'px';
      this.map.relayout();
      if(this.destinationFlag){//false문자열로 저장되기 때문에 !로 형식변환
        console.log('주소 검색기록 존재');
        //배달받을 주소 표시
        if(this.destinationX==null||this.destinationY==null){
          console.log("주소 좌표 없음 주소 재검색 요청");
          var geocoder = new kakao.maps.services.Geocoder();
          geocoder.addressSearch(this.address, (result, status)=> {
          // 정상적으로 검색이 완료됐으면 
          if (status === kakao.maps.services.Status.OK) { 
            this.destinationX=result[0].x;
            this.destinationY=result[0].y
            //배달받을 주소표사
            this.showHomePlace(new kakao.maps.LatLng(this.destinationY, this.destinationX));
            sessionStorage.setItem("destinationX",this.destinationX);
            sessionStorage.setItem("destinationY",this.destinationY);
            sessionStorage.setItem("destinationFlag",true);
          } 
        });    
        }else{
          console.log("좌표도 있으므로 바로 표사");
          this.showHomePlace(new kakao.maps.LatLng(this.destinationY, this.destinationX));
        }
        this.search(sessionStorage.getItem('searchStore'));
      }
    },
    getMarker(place){
      return new kakao.maps.Marker({
                map: this.map,
                position: place
      });
    },
    showTextOnMaker(marker,text){
       var infowindow =  new kakao.maps.InfoWindow({
                content: text
        }); //new kakao.maps.InfoWindow({zIndex:1});
        //infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(this.map, marker);
    },
    search(va){
        var n=va;
        if(n==null){
          console.log("마트검색 기록 미존재");
          n= document.getElementById('name').value;
        }else{
          console.log('마트 검색 기록 존재');
          document.getElementById('name').value=n;
          n=va;
        }
        console.log("배달 받을 주소 선택 여부 "+this.destinationFlag);
        if(this.destinationFlag==false){
          alert('배달 받으실 주소를 먼저 선택해주세요');
          document.getElementById('name').value="";
          return;
        }
        console.log("검색한 마트 키워드"+n);
        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places();
        // 키워드로 장소를 검색합니다
        ps.keywordSearch(n, (result,status)=>{
            if (status === kakao.maps.services.Status.OK) {
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                var bounds = new kakao.maps.LatLngBounds();
                for (var i=0; i<result.length; i++) {
                    console.log(result[i]);
                    //상점혹은건물 사업종류를 꺼냄
                    var category_name=result[i].category_name;
                    var category_group_code=result[i].category_group_code;
                    //MT1=대형마트,CS2=편의점, 일반 마트 슈퍼는 카테고리가 비어있음 그래서 카테코리 name으로 검출해야함
                    if(category_group_code=='CS2'||category_group_code=='MT1'||category_name.includes('가정,생활 > 생활용품점')||category_name.includes('가정,생활 > 슈퍼마켓')||category_name.includes('가정,생활 > 식품판매 >')){
                      this.displayMarker(result[i]);    
                      bounds.extend(new kakao.maps.LatLng(result[i].y, result[i].x));
                    }
                }       
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                this.map.setBounds(bounds);
                sessionStorage.setItem("searchStore",n);
            } 

        });
    },
    displayMarker(place) {
        // 마커를 생성하고 지도에 표시합니다
        var marker = this.getMarker(new kakao.maps.LatLng(place.y, place.x));
        // 마커위에 상호명 표시
        this.showTextOnMaker(marker,'<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        //배열에 상점별 위도경도 저장합니다
        //var obj = { name : 'jaehee', x : place.x,y:place.y };
        var x=place.x;
        var y=place.y;
        var address=place.address_name;
        var name=place.place_name;
        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click',()=>{
          console.log(x+" "+this.destinationX);
          modules.requestGet("http://localhost:8080/checkDestination?x="+this.destinationX+"&y="+this.destinationY+"&mx="+x+"&my="+y+"&ma="+address+"&mn="+name).then(result=>{
              console.log(result);
              var re=result.data;
              if(re.flag==false){
                alert(re.message)
                return;
              }
              if(confirm(re.message)){
                location.href="/showLeaflet";
              }
          });          
        });
    } 
  },
 
   
}

</script>
