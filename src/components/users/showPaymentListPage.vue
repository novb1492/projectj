<template>
  <div>
      FDFDF
  </div>
</template>
<style>

</style>
<script>
import { requestAsyncToGet } from '../../jslib'
export default {
  name: 'showPaymentListPage',
  created(){
    requestAsyncToGet(this.$serverDomain+'/auth/user/payments/1/null/null').then(result=>{
        console.log(result);
    });
  },
  methods:{

  },
}
</script>