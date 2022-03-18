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
    requestAsyncToGet(this.$serverDomain+'/auth/user/payment').then(result=>{
        console.log(result);
    });
  },
  methods:{
      
  },
}
</script>