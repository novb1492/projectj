<template>
  <div class="margintopNavSize">
    <span v-for="(room,index) in this.rooms" :key="index">
      <span v-if="room.deliverRoomFlag==1">
        <input type="button" :value="room.roomId+'배달완료'" @click="goDetailPage(room.roomId)" disabled>
      </span>
      <span v-else-if="room.deliverRoomFlag==0">
        <input type="button" :value="room.roomId+'배달'" @click="goDetailPage(room.roomId)">
      </span>
      <span v-else-if="room.deliverRoomFlag==2">
        <input type="button" :value="room.roomId+'배달중'" @click="goDetailPage(room.roomId)">
      </span>
    </span>
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
      storeId:0,
    }
  },
  created(){
   this.deliveryFlag=localStorage.getItem(this.deliveryFlagText);
   console.log(this.deliveryFlag);
   this.storeId=modules.getParam('storeid');
    modules.requestAsyncToGet(this.$serverDomain+'/auth/store/gets/deliver/1/'+this.storeId+'/2022-01-28/2022-01-28').then(result=>{
      console.log(result);
      if(!result.flag){
        alert(result.message);
        return;
      }
      this.rooms=result.message;
      //사이드바 생성
      this.$emit('openSubSide',this.subSideVarIds);
      //새로고침 대응
      this.$emit('changeStoreId',this.storeId);
    })
  },
  methods : {
    goDetailPage(deliverid){
      this.$router.push('/companyPage/4?storeid='+this.storeId+'&page='+1+'&keyword='+null+'&deliverId='+deliverid);
    },
    getSubSideVarIds(){//페이지 이탈시 사용
      return this.subSideVarIds;
    },
  }
}
</script>