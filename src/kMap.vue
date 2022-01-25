<template>
    <div class="kmap margintopNavSize">
        <div id="map"></div>
    </div>
</template>
<style>
#map{overflow:scroll;}
</style>
<script>
import * as modules from './jslib';
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
      dragEventFlag:false,
      dragEventNum:0,
      positionEventFlag:false,
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
      //원그리기
      deliverRadiusFlag:false,
      circle:null,
      circlex:0,
      circley:0,
      radius:0,
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
        this.dragEventFlag=configs.dragEventFlag;
        this.dragEventNum=configs.dragEventNum;
        this.positionEventFlag=configs.positionEventFlag;
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
        //리사이즈 이벤트 판별
        if(this.resizeFlag){
            this.resizeEvent();
        }
    });
    this.$EventBus.$on('callSearch',text=>{
      this.moveFlag=true;
      this.search(text);
    });
    //사이드바 표시여부 조절
    document.getElementById('map').addEventListener('click',()=>{
      if(!this.sideFlag){
        this.deleteFlag=true;
        this.sideFlag=false;
        return ;
      }else{
        //아니라면 삭제되어야하는지 판단
        if(this.deleteFlag){
          //사이드바제거
          document.getElementById('side').hidden=true;
          //마진 0로 꽉차게
          document.getElementById('map').style.marginLeft='0px';
          return;
        }
        this.deleteFlag=true;
      }
        
    });
  },
  methods:{
    resizeEvent(){
        window.onresize = ()=> {
            console.log('resize');
            const container = document.getElementById("map");
            container.style.width = window.innerWidth+'px';
            container.style.height = (window.innerHeight-150)+'px';
            this.map.relayout();
        };
    },
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
      //드래그이벤트가 있는지 판별
      if(this.dragEventFlag){
          this.chooseDragEvent(this.dragEventNum);
      }
      //위치이벤트가 필요한지 판별
      if(this.positionEventFlag){
          this.positionEvent();
      }
      //한개만 마커를 그리는 기능 
       this.$EventBus.$on('showOnlyOnePlace',address=>{
            console.log(address);
            var geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch(address, (result, status)=> {
                if (status === kakao.maps.services.Status.OK) { 
                    // 정상적으로 검색이 완료됐으면 
                    alert("주소 선택완료 지도를 확인해 주세요");
                    this.circlex= result[0].x;
                    this.circley=result[0].y;
                    console.log('x: '+this.circlex);
                    console.log('y: '+this.circley);
                    if(this.deliverRadiusFlag){
                        this.drawCircle(this.radius);
                    }
                            //배달받을 주소표시
                    this.showOnePlace(new kakao.maps.LatLng(result[0].y, result[0].x));
                }else{
                    alert('검색 내역이 없습니다');
                } 
            }); 
        });
        //원 한개만 그리기
         this.$EventBus.$on('drawCircle',num=>{
            this.drawCircle(num);
        });
    },
    positionEvent(){
        var options2 = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
        };
        navigator.geolocation.watchPosition(this.success,this.error,options2);
    },
    success(position){
      console.log(position);
      //이전 위치가 존재한다면 지움
      if(this.userPosFlag){
        this.userMarker.setMap(null);
      }
      var lat = position.coords.latitude;// 위도
      var lon = position.coords.longitude; // 경도
      var locPosition = new kakao.maps.LatLng(lat, lon);
      this.userMarker=this.getMarker(locPosition);
      this.userPosFlag=true;
      //초기입장 한번만 사용자 위치로 고정
      if(this.forcusFlag){
        this.forcusFlag=false;
        this.map.setCenter(locPosition);
      }

    },
    error(){
      alert('위치를 불러오는데 실패했습니다');
    },
    chooseDragEvent(dragEventNum){
        switch(dragEventNum){
            case 1:
                this.firstDoorDragEvent();
                break;
            default:
                alert('올바른 지도 드래그이벤트가 없습니다');

        }
    },
    firstDoorDragEvent(){
    //지도 드래그 이동시 이벤트등록 
    kakao.maps.event.addListener(this.map, 'dragend', function() {        
        this.changeMapEvent();   
        //this.map.setLevel(4);      
      }.bind(this));//첫 bind사용s
    },
    changeMapEvent(){
        // 지도 중심좌표를 얻어옵니다 
        var latlng = this.map.getCenter(); 
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();
        var message = '변경된 지도 중심좌표는 ' + latlng.getLat() + ' 이고, ';
        message += '경도는 ' + latlng.getLng() + ' 입니다';
        console.log(message);
        //좌표=>주소
        geocoder.coord2RegionCode(latlng.getLng(), latlng.getLat(), (result,status)=>{
        //주소를 받아 근처 마트 검색
        console.log(result);
        if(status==kakao.maps.services.Status.OK){
          for(var i=0;i<result.length;i++){
            console.log(result[i].address_name);
            this.moveFlag=false;
            this.search(result[i].address_name+' 슈퍼');
          } 
        }
      });           
    },
    search(va){
        var n=va;
        console.log("검색한 마트 키워드"+n);
        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places();
        // 키워드로 장소를 검색합니다
        ps.keywordSearch(n, (result,status)=>{
            if (status === kakao.maps.services.Status.OK) {
              //마커,인포윈도우 정리
              this.deleteMarkerAndWindow();
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                console.log('move'+this.moveFlag);
                var bounds = new kakao.maps.LatLngBounds();
               var num=0;
                for (var i=0; i<result.length; i++) {
                    console.log(result[i]);
                    //상점혹은건물 사업종류를 꺼냄
                    var category_name=result[i].category_name;
                    var category_group_code=result[i].category_group_code;
                    //MT1=대형마트,CS2=편의점, 일반 마트 슈퍼는 카테고리가 비어있음 그래서 카테코리 name으로 검출해야함
                    if(category_group_code=='CS2'||category_group_code=='MT1'||category_name.includes('가정,생활 > 생활용품점')||category_name.includes('가정,생활 > 슈퍼마켓')||category_name.includes('가정,생활 > 식품판매 >')){
                      this.displayMarker(result[i]);  
                      //드래그 이동시 무시  
                      num++;
                    }
                }
                       
                if(this.moveFlag){
                  if(num>0){//검색결과가 0보다 커야함
                    //지도이동 드래그이동시는 무시
                    bounds.extend(new kakao.maps.LatLng(result[0].y, result[0].x));
                    this.map.setBounds(bounds);
                    this.map.setLevel(3);
                  }else{
                    console.log('1');
                    alert('검색범위가 너무 크거나 지역에 존재하는 매장이 없습니다');
                  }
                }
                sessionStorage.setItem("searchStore",n);
            }else{
              alert('검색 내역이 없습니다');
            } 

        });
    },
    deleteMarkersAndWinodws(markers,inforWindows){
            var size=markers.length;
                 for(var i=0;i<size;i++){
                  markers[i].setMap(null);
                 inforWindows[i].close();
                }
    },
    deleteMarkerAndWindow(){
       if(this.moveFlag){
        //검색했다면 이전검색/드래그로 생긴흔적 삭제
        this.deleteMarkersAndWinodws(this.searchMakers,this.searchInforWindows);
        this.deleteMarkersAndWinodws(this.dragMarkers,this.dragInforWindows);
        //검색 배열지우기
        this.searchMakers=[];
        this.searchInforWindows=[];
        }else{
          //드래그중이라면 검색내역이 있다면 내비두고 드래그 흔적만 지움
          this.deleteMarkersAndWinodws(this.dragMarkers,this.dragInforWindows);
        }
        //드래그 배열 비우기 얘는 어떤 상황에서든 비워져야 하므로 여기 배치
        this.dragMarkers=[];
        this.dragInforWindows=[];
    },
    insertMarkerAndWindow(marker,infor){
    if(this.moveFlag){
            this.searchMakers.push(marker);
            this.searchInforWindows.push(infor);
          }else{
            this.dragMarkers.push(marker);
            this.dragInforWindows.push(infor);
          }
    },
    displayMarker(place) {
        // 마커를 생성하고 지도에 표시합니다
        var marker = this.getMarker(new kakao.maps.LatLng(place.y, place.x));
        // 마커위에 상호명 표시
        var infor=this.showTextOnMaker(marker,'<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        //마커와 인포윈도우 배열에 담기 삭제위해
        this.insertMarkerAndWindow(marker,infor);
        //배열에 상점별 위도경도 저장합니다
        //var obj = { name : 'jaehee', x : place.x,y:place.y };
        var x=place.x;
        var y=place.y;
        var address=place.address_name;
        var name=place.place_name;
        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click',()=>{
          console.log(x+" "+this.destinationX);
          modules.requestAsyncToGet("http://localhost:8080/checkDestination?x="+this.destinationX+"&y="+this.destinationY+"&mx="+x+"&my="+y+"&ma="+address+"&mn="+name).catch(()=>{
              this.sideFlag=true;//테스트코드
              document.getElementById('map').style.marginLeft='250px';//테스트코드
              document.getElementById('side').hidden=false;//테스트코드
          }).then(result=>{
              console.log(result);
              if(result.flag==false){
                alert(result.message)
                return;
              }
              //응답이 성공적이라면 사이드바 펼치키
              this.sideFlag=true;
              //마진부여후 사이드바 공간 확보
              document.getElementById('map').style.marginLeft=this.$sideVarWidth+'px';
              //히든 속성 꺼주기
              document.getElementById('side').hidden=false;
          });          
        });
    },
    getMarker(place){
      var  marker= new kakao.maps.Marker({
                map: this.map,
                position: place
      });
      return marker;
    },
    showTextOnMaker(marker,text){
       var infowindow =  new kakao.maps.InfoWindow({
                content: text
        }); //new kakao.maps.InfoWindow({zIndex:1});
        //infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(this.map, marker);
        return infowindow;
    },
      drawCircle(radius){
        console.log("X: "+this.circlex+" y: "+this.circley)
      //이전원이 있다면 지워줘야함
      if(this.deliverRadiusFlag){
        this.circle.setMap(null); // 지도에서 제거한다.
      }
       // 지도에 표시할 원을 생성합니다
      this.circle = new kakao.maps.Circle({
          center : new kakao.maps.LatLng(this.circley,this.circlex),  // 원의 중심좌표 입니다 
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
       this.radius=radius;
    },
    showOnePlace(place){
      // 결과값으로 받은 위치를 마커로 표시합니다
      this.getMarkerOnlyOne(place);
      // 인포윈도우로 장소에 대한 설명을 표시합니다
      this.showTextOnMakerOnlyOne(this.marker,'<div style="width:150px;text-align:center;padding:6px 0;">매장의 위치입니다</div>');
      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      this.map.setCenter(place);
    },
    getMarkerOnlyOne(place){
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
     showTextOnMakerOnlyOne(marker,text){
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
  
  },
 
}
</script>