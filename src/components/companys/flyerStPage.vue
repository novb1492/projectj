<template>
    <div class="margintopNavSize marginLeftSideSize">
        <ul id="listArea" style="float: left; text-align: center;">
             <span v-for="(flyer,index) in this.flyerArr" :key="index">
               <li style="float: left; margin-left: 10px;" > 
                 <a href="javascript:void();" @click="goDetail(flyer.flyer_id)">
                  <img :src="flyer.flyer_thumb_nail" style="width: 200px;"  alt="">
                  <br>
                  전단고유번호:
                  {{flyer.flyer_id}}
                  <br>
                  업로드일:
                  {{flyer.flyer_created}}
                </a>
              </li>
             </span>
        </ul>
        <div id="buttonArea">
          <input type="button" @click="changePage(1)"   id="nextbutton" value="다음">
          <span id="nowPage"></span>/<span id="totalPage"></span>
          <input type="button" @click="changePage(-1)" id="beforebutton" value="뒤로">
          <br>
          <input type="date" id="start">
          <input type="date" id="end">
          <input type="button" value="기간으로 검색하기" @click="changeDate">
        </div>
    </div>
</template>
<style>
</style>
<script>
import { changeValueById, disabledById, getParam, getValueById, requestAsyncToGet } from '../../jslib'
export default {
  name: 'flyerStPage',
  data() {
    return {
      subSideVarIds:['storeDetailSubSide'],
      storeId:getParam('storeid'),
      flyerArr:[],
    }
  },
  created(){
    this.$emit('openSubSide',this.subSideVarIds);
    //새로고침 대응
    this.$emit('changeStoreId',this.storeId);
  },
  mounted(){
    this.requestServer(this.getPage(),this.getStart(),this.getEnd());
  },
  methods:{
    goDetail(id){
      this.$router.push("/companyPage/7?storeid="+this.storeId+"&page="+this.getPage()+"&start="+getValueById('start')+"&end="+getValueById('end')+"&flyerid="+id+"&page=1&keyword=null");
    },
    changeDate(){
      this.$router.push("/companyPage/5?storeid="+this.storeId+"&page=1&start="+getValueById('start')+"&end="+getValueById('end'));
    },
    changePage(num){
      this.$router.push("/companyPage/5?storeid="+this.storeId+"&page="+(this.getPage()*1+num)+"&start="+this.getStart()+"&end="+this.getEnd());
    },
    backEvent(page,start,end){
      this.requestServer(page,start,end);
    },
    requestServer(page,start,end){
      requestAsyncToGet(this.$serverDomain+'/auth/store/gets/flyers/'+page+'/'+start+','+end+'?storeId='+this.storeId).then(result=>{
        console.log(result);
        if(!result.flag){
          alert(result.message);
          return;
        }
        this.flyerArr=result.message;
        if(page==1){
          disabledById('beforebutton',true);
        }else{
          disabledById('beforebutton',false);
        }
        if(page==result.totalPage){
          disabledById('nextbutton',true);
        }else{
          disabledById('nextbutton',false);
        }
        document.getElementById('nowPage').innerHTML=page;
        document.getElementById('totalPage').innerHTML=result.totalPage;
        changeValueById('start',start);
        changeValueById('end',end);
      });
    },
    getPage(){
      return getParam('page');
    },
    getStart(){
      return getParam('start');
    },
    getEnd(){
      return getParam('end');
    },
  },
}
</script>