<template>
  <div class="margintopNavSize marginLeftSideSize">
    <div class="row">
      <div class="col"> 
        <k-map :width="500" :height="500" :zoomLevel="5" ref="k_map"  @canplay="showDestiantions"/>
      </div>
      <div class="col" v-for="(address,index) in this.destinationAddress" :key="index">
         목적지 주소:{{address.deliver_room_detail_address}}
         <input type="button" value="배달완료" @click="chagneDeliverState('doneDeliver',address.deliver_room_detail_mcht_trd_no,address.user_id)">
         <input type="button" value="배달취소" @click="chagneDeliverState('cancleDeliver',address.deliver_room_detail_mcht_trd_no,address.user_id)">
      </div>
    </div>
      <br>
      <input type="button" @click="connect" id="startButton" :value="roomId+'번배달 시작'">
  </div>
</template>
<style>

</style>
<script>
import * as modules from '../../jslib';
import kMap from '../../kMap.vue';
export default {
  components: { kMap },
  name: 'deliveryPage',
   data() {
    return {
      websocket:null,
      deliveryFlag:false,
      deliveryFlagText:'deliveryFlag',
      roomId:modules.getParam("deliverId"),
      rooms:[],
      subSideVarIds:['storeDetailSubSide'],
      storeId:modules.getParam('storeid'),
      destinationAddress:null,
      connectFlag:false,
    }
  },
  mounted(){
        modules.requestAsyncToGet(this.$serverDomain+'/auth/store/get/deliver/'+this.roomId+'?storeId='+this.storeId).then(result=>{
      console.log(result);
      if(!result.flag){
        alert(result.message);
        return;
      }
      this.destinationAddress=result.message;
      //사이드바 생성
      this.$emit('openSubSide',this.subSideVarIds);
       //새로고침 대응
    this.$emit('changeStoreId',this.storeId);
      this.$nextTick(()=>{
        var size=this.destinationAddress.length;
        for(var i=0;i<size;i++){
          this.$refs.k_map.drawMarkerByAddress(this.destinationAddress[i].split('/')[1]);
        }
      });
    })
     
  },
  methods : {
    showDestiantions(){
        var size=this.destinationAddress.length;
        for(var i=0;i<size;i++){
            this.$refs.k_map.drawMarkerByAddress(this.destinationAddress[i]);
        }
     },
    connect() {
        this.websocket = new WebSocket("ws://"+this.$shortServerDomain+this.$deliverSocketUrl+'?storeid='+this.storeId+'&roomid='+this.roomId);
        this.socketOpen();
        this.websocket.onerror = function(error) {
        console.log(error);
        //토큰 시간 때매 에러나면 다시 연결
        modules.requestAsyncToGet(this.$serverDomain+'/auth/user/check?detail=email').then(result=>{
          this.reconnect(result.flag);
        })
        }.bind(this);
        this.websocket.onclose = function (event) {
          console.log(event);
          modules.disabledById('startButton',false);
        }.bind(this);
    },
    reconnect(flag){
      if(flag){
        this.websocket = new WebSocket("ws://"+this.$shortServerDomain+this.$deliverSocketUrl+'?storeid='+this.storeId+'&roomid='+this.roomId);
        this.socketOpen();            
      }else{
        alert('소켓연결에 실패했습니다');
      }
    },
    socketOpen(){
      this.websocket.onopen = e=> {
        console.log(e);
        var options2 = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };
        navigator.geolocation.watchPosition(this.success,this.error,options2);
       // setInterval(this.test,1000);
        modules.disabledById('startButton',true);
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
    chagneDeliverState(state,mchtTrdNo,userId){
      let data=JSON.stringify({
        "state":state,
        'roomid':this.roomId,
        'storeid':this.storeId,
        "mchtTrdNo":mchtTrdNo,
        "userid":userId,
      });
      this.websocket.send(data);
     

    },
    closeSocket(){
      this.websocket.close();
    },
    success(position){
      var lat = position.coords.latitude;// 위도
      var lon = position.coords.longitude; // 경도
      alert(position);
      let data=JSON.stringify({
        "latitude":lat,
        "longitude":lon,
        "roomId":this.roomId
      })
    
      this.websocket.send(data);
    },
    error(){
      alert('위치정보를 가져올 수 없습니다');
    }
  }
}
</script>