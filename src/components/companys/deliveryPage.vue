<template>
  <div class="margintopNavSize marginLeftSideSize">
    <div class="row">
        <div class="col"  v-for="(room,index) in this.rooms" :key="index">
            <span v-if="room.deliver_rooms_flag==1">
            <input type="button" :value="room.room_id+'배달완료'" @click="goDetailPage(room.room_id)" >
          </span>
          <span v-else-if="room.deliver_rooms_flag==0">
            <input type="button" :value="room.room_id+'배달'" @click="goDetailPage(room.room_id)">
          </span>
          <span v-else-if="room.deliver_rooms_flag==2">
            <input type="button" :value="room.room_id+'배달중'" @click="goDetailPage(room.room_id)">
          </span>
        </div>
    </div>  
    <br>
    <div>
      <input type="button" value="다음" id="nextButton" @click="changePage(1)">
      <input type="button" value="이전" id="beforeButton" @click="changePage(-1)">
      <br>
      <input type="date" id="start">
      <input type="date" id="end">
      <input type="button" value="기간으로 검색하기" @click="changeDate">
      <br>
      <input type="button" value="배달방 만들기" @click="makeRoom">
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
      storeId:modules.getParam('storeid'),
    }
  },
  created(){
   this.deliveryFlag=localStorage.getItem(this.deliveryFlagText);
    this.$emit('openSubSide',this.subSideVarIds);
    //새로고침 대응
    this.$emit('changeStoreId',this.storeId);
    this.requestServer(this.getPage(),this.getStart(),this.getEnd());
  },
  methods : {
    makeRoom(){
      modules.openPOPup('/makeDeliverRoomPage?storeid='+this.storeId,'makeDeliverRoomPage',window.innerWidth,window.innerHeight);
    },
    changeDate(){
      this.$router.push("/companyPage/3?page=1&start="+modules.getValueById('start')+'&end='+modules.getValueById('end')+'&storeid='+this.storeId+'&state='+modules.getParam('state'));
    },
    backEvent(page,start,end){
      this.requestServer(page,start,end);
    },
    requestServer(page,start,end){
      modules.requestAsyncToGet(this.$serverDomain+'/auth/store/gets/deliver/'+page+'/'+start+','+end+'?storeId='+this.storeId).then(result=>{
      console.log(result);
      if(!result.flag){
        alert(result.message);
        this.rooms=[];
        return;
      }
      this.rooms=result.message;
      if(page<=1){
        modules.disabledById('beforeButton',true);
      }else{
        modules.disabledById('beforeButton',false);
      }
      if(page>=result.totalPage){
        modules.disabledById('nextButton',true);
      }else{
        modules.disabledById('nextButton',false);
      }
      modules.changeValueById('start',this.getStart());
      modules.changeValueById('end',this.getEnd());
    })
    },
    changePage(num){
      this.$router.push("/companyPage/3?page="+(this.getPage()*1+num*1)+"&start="+this.getStart()+'&end='+this.getEnd()+'&storeid='+this.storeId+'&state='+modules.getParam('state'));
    },
    goDetailPage(deliverid){
      this.$router.push('/companyPage/4?storeid='+this.storeId+'&page='+1+'&keyword='+null+'&deliverId='+deliverid);
    },
    getStart(){
      return modules.getParam('start');
    },
    getEnd(){
      return modules.getParam('end');
    },
    getPage(){
      return modules.getParam('page');
    }
    
  }
}
</script>