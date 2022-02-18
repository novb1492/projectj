<template>
    <div class="margintopNavSize marginLeftSideSize">
        <product-componet ref="product_com" :flag="true" />
    </div>
</template>
<style>

</style>
<script>
import { getParam, requestAsyncToGet } from '../../jslib';
import productComponet from './productComponet.vue'
export default {
  components: { productComponet },
  name: 'productDetailPage',
   data() {
      return {
      subSideVarIds:['storeDetailSubSide'],
      storeId:getParam('storeid'),
      productId:getParam('productid'),
      flyerId:getParam('flyerid'),
    }
  },
  created(){
    //사이드바 생성
    this.$emit('openSubSide',this.subSideVarIds);
    //새로고침 대응
    this.$emit('changeStoreId',this.storeId);
  },
  mounted(){
    requestAsyncToGet(this.$serverDomain+'/auth/store/get/product/'+this.productId+'?storeId='+this.storeId).then(result=>{
      console.log(result);
      if(!result.flag){
        alert(result.message);
        return;
      }
      this.$refs.product_com.detailPage(result.message.product,result.message.events,result.message.event_flag);
    });
  },

}
</script>