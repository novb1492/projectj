<template>
  <div>
    <short-logo/>
    <div class="row">
        <div class="col" v-for="(order,index) in orderArr" :key="index">
            <img id="productImg" :src="order.product_img_path" alt="" srcset="">
            <br>
            <span>상품이름:{{order.product_name}}</span>
            <br>
            <span>주문요청개수:{{order.order_count}}</span>
            <br>
            <span>결제금액:{{order.order_price}}</span>
            <br>
            <span v-if="order.order_coupon!=null">
                쿠폰:{{order.order_coupon}}
                <br>
            </span>
            <span v-if="order.oder_cancle_flag==1">
                환불된 제품입니다
            </span>
            <span>
                <input type="button" value="환불하기">
            </span>
        </div>
    </div>
    <input type="button" value="장보기시작" @click="startPickUp">
  </div>
</template>
<style>
#productImg{width: 300px;}
</style>
<script>
import { getParam, requestAsyncToGet } from '../../jslib'
import shortLogo from '../layout/shortLogo.vue';
export default {
  components: { shortLogo },
  name: 'paymentDetailPage',
    data() {
    return {
      storeId:getParam('storeid'),
      mcht_trd_no:getParam('mcht_trd_no'),
      orderArr:[],
    }
  },
  created(){
    requestAsyncToGet(this.$serverDomain+'/auth/store/order/'+this.storeId+'/'+this.mcht_trd_no).then(result=>{
        console.log(result);
        if(!result.flag){
            alert(result.message);
            return;
        }
        this.orderArr=result.message;
    });
  },
  methods:{
    startPickUp(){

    }
  },
}
</script>