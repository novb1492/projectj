<template>
    <div class="margintopNavSize marginLeftSideSize">
        <div>
         <h3>전단이미지</h3>
          <span v-for="(product,index) in this.products" :key="index">

            <product-componet :flag="true" :flyerId="flyerId" :storeId="storeId" />
          </span>
      </div>
    </div>
</template>
<style>

</style>
<script>
import { getParam, requestAsyncToGet } from '../../jslib'
import ProductComponet from './productComponet.vue'
export default {
  name: 'flyerDetailPage',
  components: { ProductComponet },
   data() {
      return {
      subSideVarIds:['storeDetailSubSide'],
      storeId:getParam('storeid'),
      products:[],
      flyer:null,
      events:null,
      flyerId:0,
    }
  },
  created(){
    //사이드바 생성
    this.$emit('openSubSide',this.subSideVarIds);
    //새로고침 대응
    this.$emit('changeStoreId',this.storeId);
    requestAsyncToGet(this.$serverDomain+'/auth/store/get/flyer/'+getParam('flyerid')).then(result=>{
        console.log(result);
        if(!result.flyerFlag){
          alert(result.message);
          return;
        }
        this.flyer=result.flyer;
        this.flyerId=this.flyer.id;
        if(result.productFlag){
          this.products=result.products;
        }
        if(result.eventFlag){
          this.events=result.events;
        }
    });
  },
  methods:{

  },
}
</script>