<template>
    <div class="kmap margintopNavSize">
        <div id="map"></div>
    </div>
</template>
<style>
#map{overflow:scroll;}
</style>
<script>
export default {
  name: 'kMapComponent',
    data() {
    return {
      //지도관련
      map: null,//카카오지도 객체
      destinationFlag:false,//받을 주소를 선택했는지 판별하는 플래그
      destinationX:null,
      destinationY:null,
      maketX:0,
      maketY:0,
      address:null,
      width:0,
      height:0,
      defalutZoom:0,
      resizeFlag:false,
      //검색정보 마커윈도우
      searchMakers:[],
      searchInforWindows:[],
      //드래그했을때 카머윈도우
      dragMarkers:[],
      dragInforWindows:[],
      //사이드바 관련 변수
      sideFlag:false,//사이드바존재 여부
      deleteFlag:false,
      moveFlag:false,//드래그 했는지 ,검색했는지
      //사용자 위치표시 
      userPosFlag:false,
      forcusFlag:true,
      userMarker:null,
    };
  },
  mounted(){
    this.$EventBus.$on('drawMap',configs=>{
        console.log(configs);
        //페이지별 지정사이즈 받기
        this.width=configs.width;
        this.height=configs.height;
        this.defalutZoom=configs.zoom;
        this.resizeFlag=configs.resizeFlag;
       //카카오 api head에넣기
        const script = document.createElement("script");
        /* global kakao */
        script.onload = () => kakao.maps.load(this.initMap);
        script.src ="//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=95292156744ab5c8586460536149fb32&libraries=services";
        document.head.appendChild(script);
        this.$EventBus.$on('searchStore',text=>{
        this.moveFlag=true;
        console.log(text);
        //this.search(text);
        });
        //리사이즈 될때 감지
        if(this.resizeFlag){
            window.onresize = ()=> {
                console.log('resize');
                const container = document.getElementById("map");
                container.style.width = window.innerWidth+'px';
                container.style.height = (window.innerHeight-150)+'px';
                this.map.relayout();
            };
        }
    });
  },
  methods:{
    initMap() {
      //지도 초기설정
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: this.defalutZoom,
      };
      this.map = new kakao.maps.Map(container, options);
      container.style.width = this.width+'px';
      container.style.height = (this.height-this.$footerHeigth)+'px';
      this.map.relayout();
      //지도 드래그 이동시 이벤트등록 
      kakao.maps.event.addListener(this.map, 'dragend', function() {        
        this.changeMapEvent();   
        //this.map.setLevel(4);      
      }.bind(this));//첫 bind사용s
      //내위치 표시
      var options2 = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      //실시간 위치 서비스
      navigator.geolocation.watchPosition(this.success,this.error,options2);
    },
  },
}
</script>