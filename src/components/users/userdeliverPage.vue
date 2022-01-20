<template>
  <div class="margintopNavSize"> 
    userdeliverPage
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
    }
  },
  created(){
    this.connect();
  },
  methods:{
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
       this.websocket.onmessage = function(event) {
          console.log(event.data);
          //JSON.parse(event.data);
        };
    };
    },
  }
}
</script>