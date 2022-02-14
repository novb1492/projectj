<template>
    <div class="margintopNavSize marginLeftSideSize">
        <ul id="listArea">

        </ul>
    </div>
</template>
<style>

</style>
<script>
import { getParam, requestAsyncToGet } from '../../jslib'
export default {
  name: 'flyerStPage',
  data() {
    return {
      storeId:getParam('storeid'),
      page:getParam('page'),
      keyword:getParam('keyword'),
    }
  },
  mounted(){
    requestAsyncToGet(this.$serverDomain+'/auth/store/gets/flyers/'+this.page+'/'+null+','+null+'?storeId='+this.storeId).then(result=>{
      console.log(result);
    });
  }
}
</script>