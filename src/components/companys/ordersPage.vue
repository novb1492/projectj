<template>
  <div class="margintopNavSize marginLeftSideSize">
      <div class="row">
          <div  class="col" v-for="(payment,index) in paymentArr" :key="index">
             {{payment.user_email}}
          </div>
      </div>
  </div>
</template>
<style>

</style>
<script>
import { getParam, requestAsyncToGet } from '../../jslib'
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
    this.requestTo(1,null);
  },
  methods:{
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