<template>
  <div class="margintopNavSize"> 
    <input type="test" disabled id="test">
    <div id="map"></div>
  </div>
</template>
<style>

</style>
<script>
import * as modules from '../../jslib';
export default {
  name: 'userdeliverPage',
   data() {
    return {
      websocket:null,
      map:null,
    }
  },
  created(){
    this.connect();
  },
  methods:{
    connect() {
        this.websocket = new WebSocket("wss://"+this.$shortServerDomain+this.$deliverSocketUrl);
        this.socketOpen();
        this.websocket.onerror = function(error) {
        console.log(error);
        //토큰 시간 때매 에러나면 다시 연결
        modules.requestAsyncToGet(this.$serverDomain+'/auth/user/check?detail=email').then(result=>{
          this.reconnect(result.flag);
        })
        }.bind(this);
        /*this.websocket.onclose = function (event) {
          console.log(event);
        }*/
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
    this.websocket.onopen = e=> {
        console.log(e);
       this.websocket.onmessage = function(event) {
          modules.changeValueById('test',event.data);
          let xy=JSON.parse(event.data);
          console.log(xy);
        };
    };
    },
  }
}
</script>