<template>
  <div class="marginLeftSideSize">
      <ul style="text-align: center;">
        <li><img src="" alt="" id="productImg" srcset=""></li>
        <li id="productName"></li>
        <li id="origin"></li>
        <li id="price"></li>
        <li ><input type="number"  id="count" min="1" value="1" ></li>
        <li > <input type="button" value="장바구니담기" @click="insertBasket"></li>
      </ul>
  </div>
</template>
<style>

</style>
<script>
import { getParam, getValueById, requestAsyncToGet, requestAsyncToPost } from '../../jslib'
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
        document.getElementById('origin').innerHTML='원산지: '+result.message.origin;
        console.log(result);
      });
    },
    methods:{
      insertBasket(){
        let date=JSON.stringify({
          "count":getValueById('count'),
          "productId":this.productId,
        });
        requestAsyncToPost(this.$serverDomain+'/auth/user/basket',date).then(result=>{
          alert(result.message);
        });
      },
    },
}
</script>