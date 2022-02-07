<template>
  <div class="margintopNavSize marginLeftSideSize">
    <span v-for="(room,index) in this.rooms" :key="index">
      <span v-if="room.deliver_rooms_flag==1">
        <input type="button" :value="room.room_id+'배달완료'" @click="goDetailPage(room.room_id)" >
      </span>
      <span v-else-if="room.deliver_rooms_flag==0">
        <input type="button" :value="room.room_id+'배달'" @click="goDetailPage(room.room_id)">
      </span>
      <span v-else-if="room.deliver_rooms_flag==2">
        <input type="button" :value="room.room_id+'배달중'" @click="goDetailPage(room.room_id)">
      </span>
    </span>
    <br>
    <div>
      <input type="button" value="다음" id="nextButton" @click="changePage(1)">
      <input type="button" value="이전" id="beforeButton" @click="changePage(-1)">
    </div>
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
      page:0,
      start:modules.getParam('start'),
      end:modules.getParam('end'),
    }
  },
  created(){
   this.deliveryFlag=localStorage.getItem(this.deliveryFlagText);
   console.log(this.deliveryFlag);
    this.$emit('openSubSide',this.subSideVarIds);
    this.storeId=modules.getParam('storeid');
    //새로고침 대응
    this.$emit('changeStoreId',this.storeId);
    this.requestServer(modules.getParam('page'),this.start,this.end);

  },
  methods : {
    backEvent(page,start,end){
      this.requestServer(page,start,end);
    },
    requestServer(page,start,end){
      modules.requestAsyncToGet(this.$serverDomain+'/auth/store/gets/deliver/'+page+'/'+this.storeId+'/'+start+'/'+end).then(result=>{
      console.log(result);
      if(!result.flag){
        alert(result.message);
        return;
      }
      this.rooms=result.message;
      this.page=page;
      if(page<=1){
        modules.disabledById('beforeButton',true);
      }
    })
    },
    changePage(num){
      this.$router.push("/companyPage/3?page="+(this.page*1+num*1)+"&start="+this.start+'&end='+this.end+'&storeid='+this.storeId);
    },
    goDetailPage(deliverid){
      this.$router.push('/companyPage/4?storeid='+this.storeId+'&page='+1+'&keyword='+null+'&deliverId='+deliverid);
    },
    getSubSideVarIds(){//페이지 이탈시 사용
      return this.subSideVarIds;
    },
  }
}
</script>