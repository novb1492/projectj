<template>
  <div class="marginLeftSideSize">
      <ul style="text-align: center;">
        <li><img src="" alt="" id="productImg" srcset=""></li>
        <li id="productName"></li>
         <li id="price"></li>
      </ul>
  </div>
</template>
<style>

</style>
<script>
import { getParam, requestAsyncToGet } from '../../jslib'
export default {
  name: 'showProductDetailPage',
   data() {
        return {
            storeId:getParam('storeid'),
            productId:getParam('productid'),
            product:null,
        }
    },
    mounted(){
      requestAsyncToGet(this.$serverDomain+'/store/get/product/'+this.productId).then(result=>{
        if(!result.flag){
          alert(result.message);
          return;
        }
        document.getElementById('productImg').src=result.message.productImgPath;
        document.getElementById('productName').innerHTML=result.message.productName;
        document.getElementById('price').innerHTML=result.message.price+'원';
        console.log(result);
      });
    },
}
</script>