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
      storeId:getParam('storeId'),
      page:getParam('page'),
      keyword:getParam('keyword'),
    }
  },
  mounted(){
    requestAsyncToGet(this.$serverDomain+'/auth/store/gets/flyers/'+this.storeId+'/'+this.page+'/'+this.keyword).then(result=>{
      console.log(result);
    });
  }
}
</script>