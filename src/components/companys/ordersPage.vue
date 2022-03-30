<template>
  <div class="margintopNavSize marginLeftSideSize">
      <div class="row">
          <div  class="col" v-for="(payment,index) in paymentArr" :key="index">
              <a href="javascript:void();" @click="showDetail(payment.mcht_trd_no)">
                <ul>
                    <li>주문번호:{{payment.mcht_trd_no}}</li>
                    <li>결제방식:{{payment.method}}</li>
                    <li>입금여부:fdf</li>
                    <li>취소 횟수:{{payment.cncl_ord}}</li>
                    <li>배송주소:{{payment.payment_address}}</li>
                    <li>배송상세주소:{{payment.payment_detail_address}}</li>
                    <li>재고부족시 요청사항 :{{payment.soldout_action}}</li>
                    <li>주문자 이메일:{{payment.user_email}}</li>
                    <span v-if="payment.payment_total_price==0">
                      <li>완전 취소된 주문입니다</li>
                    </span>
                    <span v-else-if="payment.method=='vbank'">
                        <span v-if="payment.vbank_status==0">
                          <li>입금대기</li>
                        </span>
                        <span v-else>
                          <li>입금완료</li>
                        </span>
                    </span>
                    <span v-else>
                      <li>입금완료</li>
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
import { getParam, openPOPup, requestAsyncToGet } from '../../jslib'
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
    this.requestTo(getParam('page'),null);
  },
  methods:{
    showDetail(mcht_trd_no){
      openPOPup('/store/paymentDetailPage?storeid='+this.storeId+'&mcht_trd_no='+mcht_trd_no,'paymentDetailPage',window.innerWidth,window.innerHeight);
    },
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