<template>
  <div class="margintopNavSize">
       <input type="button" value="배달시작" @click="connect(store)">
        <input type="button" value="전송" @click="test">
        <input type="button" value="배달시작" @click="connect(buyer)">
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
      store:0,
      buyer:1,
    }
  },
  methods : {
      connect() {
        this.websocket = new WebSocket("ws://localhost:8080/auth/ws/chat");
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
        this.websocket.onmessage = function(event) {
          console.log(event.data);
          //JSON.parse(event.data);
        };
      
    },
    reconnect(flag){
      if(flag){
        this.websocket = new WebSocket("ws://localhost:8080/auth/ws/chat");
        this.socketOpen();            
      }else{
        alert('소켓연결에 실패했습니다');
      }
    },
    socketOpen(){
    this.websocket.onopen = e=> {
        console.log(e);
        setInterval(this.test,1000);
    };
    },
    test(){
      this.websocket.send("helloMessage");
    },
  }
}
</script>