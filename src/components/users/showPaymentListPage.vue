<template>
  <div>
      <table>
          <th>주문번호</th>
          <th>주문제품이름</th>
          <th>주문개수</th>
          <th>쿠폰</th>
          <th>주문일</th>
          <th>결제상태</th>
          <th>결제수단</th>
        
      </table>
  </div>
</template>
<style>

</style>
<script>
import { requestAsyncToGet } from '../../jslib'
export default {
  name: 'showPaymentListPage',
  data() {
    return {
      infors:[],
    }
  },
  created(){
    requestAsyncToGet(this.$serverDomain+'/auth/user/payments/1/null/null').then(result=>{
        console.log(result);
        if(result.flag){
          this.infors=result.message;
          return;
        }
        alert(result.message);
    });
  },
  methods:{

  },
}
</script>