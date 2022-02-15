<template>
    <div class="margintopNavSize marginLeftSideSize">
        <div>
         <h3>전단이미지</h3>
          
      </div>
    </div>
</template>
<style>

</style>
<script>
import { getParam, requestAsyncToGet } from '../../jslib'
export default {
  name: 'flyerDetailPage',
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
    requestAsyncToGet(this.$serverDomain+'/auth/store/get/flyer/'+getParam('flyerid')).then(result=>{
        console.log(result);
    });
  },
  methods:{

  },
}
</script>