<template>
  <div class="margintopNavSize">
    <span v-for="(room,index) in this.rooms" :key="index">
      <span v-if="room.deliverRoomFlag==1">
        <input type="button" :value="room.roomId+'배달완료'" @click="connect(room.roomId)" disabled>
      </span>
      <span v-else-if="room.deliverRoomFlag==0">
        <input type="button" :value="room.roomId+'배달'" @click="connect(room.roomId)">
      </span>
      <span v-else-if="room.deliverRoomFlag==2">
        <input type="button" :value="room.roomId+'배달중'" @click="connect(room.roomId)">
      </span>
    </span>
      <input type="button" value="배달완료" @click="close"> 
  </div>
</template>
<style>

</style>
<script>
import * as modules from '../../jslib';
export default {
  name: 'deliveryPage',
   data() {
    return {
      websocket:null,
      deliveryFlag:false,
      deliveryFlagText:'deliveryFlag',
      roomId:0,
      rooms:[],
      subSideVarIds:['storeDetailSubSide'],
    }
  },
  created(){
   this.deliveryFlag=localStorage.getItem(this.deliveryFlagText);
   console.log(this.deliveryFlag);
    modules.requestAsyncToGet('http://localhost:8080/auth/store/gets/deliver/1/45/2022-01-28/2022-01-28').then(result=>{
      console.log(result);
      if(!result.flag){
        alert(result.message);
        return;
      }
      this.rooms=result.message;
      //사이드바 생성
      this.$emit('openSubSide',this.subSideVarIds);
    })
  },
  methods : {
    getSubSideVarIds(){//페이지 이탈시 사용
      return this.subSideVarIds;
    },
      connect(roomId) {
        this.roomId=roomId;
        console.log(roomId);
        this.websocket = new WebSocket("ws://"+this.$shortServerDomain+this.$deliverSocketUrl);
        this.socketOpen();
        this.websocket.onerror = function(error) {
        console.log(error);
        //토큰 시간 때매 에러나면 다시 연결
        modules.requestAsyncToGet(this.$serverDomain+'/auth/user/check?detail=email').then(result=>{
          this.reconnect(result.flag);
        })
        }.bind(this);
    },
    reconnect(flag){
      if(flag){
        this.websocket = new WebSocket("ws://"+this.$shortServerDomain+this.$deliverSocketUrl);
        this.socketOpen();            
      }else{
        alert('소켓연결에 실패했습니다');
      }
    },
    socketOpen(){
      this.deliveryFlag=true;
      localStorage.setItem(this.deliveryFlagText,this.deliveryFlag);
    this.websocket.onopen = e=> {
        console.log(e);
        var options2 = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };
        navigator.geolocation.watchPosition(this.success,this.error,options2);
        setInterval(this.test,1000);
    };
    },
    test(){
      var message=null;
      if(this.roomId==1){
        message="1번배달 출발 위도경도";
      }else if(this.roomId==2){
        message="2번배달 출발 위도경도";
      }else {
        message="3번배달출발 위도경도";
      }
      let data=JSON.stringify({
        "message":message,
        "roomId":this.roomId,
      })
      this.websocket.send(data);
    },
    close(){
      this.deliveryFlag=false;
      localStorage.setItem(this.deliveryFlagText,this.deliveryFlag);
      this.websocket.close();
    },
    success(position){
      var lat = position.coords.latitude;// 위도
      var lon = position.coords.longitude; // 경도
      let data=JSON.stringify({
        "latitude":lat,
        "longitude":lon,
        "roomId":this.roomId
      })
    
      this.websocket.send(data);
    },
    error(){

    }
  }
}
</script>