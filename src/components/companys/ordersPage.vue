<template>
  <div class="margintopNavSize marginLeftSideSize">
      <div class="row">
          <div  class="col" v-for="(payment,index) in paymentArr" :key="index">
              <a href="#">
                <ul>
                    <li>주문번호:{{payment.mcht_trd_no}}</li>
                    <li>결제방식:{{payment.method}}</li>
                    <li>금액:{{payment.payment_total_price}}</li>
                    <li>입금여부:fdf</li>
                    <li>취소 횟수:{{payment.cncl_ord}}</li>
                    <li>배송주소:{{payment.payment_address}}</li>
                    <li>배송상세주소:{{payment.payment_detail_address}}</li>
                    <li>재고부족시 요청사항 :{{payment.soldout_action}}</li>
                    <li>주문자 이메일:{{payment.user_email}}</li>
                    <span v-if="payment.payment_total_price==0">
                        완전 취소된 주문입니다
                    </span>
                </ul>
              </a>
          </div>
      </div>
  </div>
</template>
<style>

</style>
<script>
import { getParam, requestAsyncToGet } from '../../jslib'
export default {
  name: 'ordersPage',
    data() {
    return {
      subSideVarIds:['storeDetailSubSide'],
      storeId:getParam('storeid'),
      paymentArr:[],
    }
  },
  created(){
    //사이드바 생성
    this.$emit('openSubSide',this.subSideVarIds);
    //새로고침 대응
    this.$emit('changeStoreId',this.storeId);
    this.requestTo(1,null);
  },
  methods:{
    requestTo(page,keyword){
        requestAsyncToGet(this.$serverDomain+'/auth/store/orders/'+this.storeId+'/'+page+'/'+keyword).then(result=>{
            console.log(result);
            if(!result.flag){
                alert(result.message);
                return;
            }
            this.paymentArr=result.message;

        });
    },
  },
}
</script>