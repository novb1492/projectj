<template>
  <div class="marginLeftSideSize">
      <span v-for="(flyer,index) in flyerImgPaths" :key="index">
            <img :src="flyer" alt="전단이미지">
      </span>
  </div>
</template>
<style>

</style>
<script>
import { getParam, requestAsyncToGet } from '../../jslib'
export default {
    name: 'showFlyerPage',
    data() {
        return {
            storeId:getParam('storeid'),
            flyerImgPaths:[],
        }
    },
    mounted(){
        requestAsyncToGet(this.$serverDomain+'/store/get/flyerImg/'+this.storeId).then(result=>{
            if(result.flag){
                this.flyerImgPaths=result.message;
            }else{  
                alert(result.message);
            }
        });
    },
}
</script>