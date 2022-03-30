<template>
  <div class="margintopNavSize marginLeftSideSize">
      fdgdggf
  </div>
</template>
<style>

</style>
<script>
import { getParam, openPOPup, requestAsyncToGet } from '../../jslib'
export default {
  name: 'ordersPage',
    data() {
    return {
      subSideVarIds:['storeDetailSubSide'],
      storeId:getParam('storeid'),
      paymentArr:[],
    }
  },
  created(){
    //사이드바 생성
    this.$emit('openSubSide',this.subSideVarIds);
    //새로고침 대응
    this.$emit('changeStoreId',this.storeId);
    this.requestTo(getParam('page'),null);
  },
  methods:{
    showDetail(mcht_trd_no){
      openPOPup('/companyPage/11?storeid='+this.storeId+'&mcht_trd_no='+mcht_trd_no,'paymentDetailPage',window.innerWidth,window.innerHeight);
    },
    requestTo(page,keyword){
        requestAsyncToGet(this.$serverDomain+'/auth/store/orders/'+this.storeId+'/'+page+'/'+keyword).then(result=>{
            console.log(result);
            if(!result.flag){
                alert(result.message);
                return;
            }
            this.paymentArr=result.message;

        });
    },
  },
}
</script>