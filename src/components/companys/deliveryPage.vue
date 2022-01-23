<template>
  <div class="margintopNavSize">
      <input type="button" value="배달시작" @click="connect">
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
    }
  },
  created(){
   this.deliveryFlag=localStorage.getItem(this.deliveryFlagText);
   console.log(this.deliveryFlag);

  },
  methods : {
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
        setInterval(this.test,1000);
    };
    },
    close(){
      this.deliveryFlag=false;
      localStorage.setItem(this.deliveryFlagText,this.deliveryFlag);
      this.websocket.close();
    },
    test(){
      this.websocket.send("helloMessage");
    },
  }
}
</script>