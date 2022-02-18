<template>
    <div class="margintopNavSize marginLeftSideSize">
        <product-componet />
    </div>
</template>
<style>

</style>
<script>
import { getParam } from '../../jslib';
import productComponet from './productComponet.vue'
export default {
  components: { productComponet },
  name: 'productDetailPage',
   data() {
      return {
      subSideVarIds:['storeDetailSubSide'],
      storeId:getParam('storeid'),
    }
  },
  created(){
    //사이드바 생성
    this.$emit('openSubSide',this.subSideVarIds);
    //새로고침 대응
    this.$emit('changeStoreId',this.storeId);
  },
}
</script>