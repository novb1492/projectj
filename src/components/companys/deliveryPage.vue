<template>
  <div class="margintopNavSize">
       <input type="button" value="배달시작" @click="connect">
  </div>
</template>
<style>

</style>
<script>
export default {
  name: 'deliveryPage',
   data() {
    return {
      websocket:null,
    }
  },
  methods : {
        connect() {
         this.websocket = new WebSocket("ws://localhost:8080/auth/ws/chat");
         this.websocket.onopen = function(e) {
           console.log(e);

          this.websocket.send("helloMessage");
        };
         this.websocket.onerror = function(error) {
           console.log(error);
            location.reload();
             this.websocket = new WebSocket("ws://localhost:8080/auth/ws/chat");
           
         }
        /*this.websocket.onclose = function (event) {
          console.log(event);
        }*/
         this.websocket.onmessage = function(event) {
          console.log(event.data);
          //JSON.parse(event.data);
        };
      
    },
    test(){
      this.websocket.send("helloMessage");
    },
  }
}
</script>