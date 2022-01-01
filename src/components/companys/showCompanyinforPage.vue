<template>
  <div class="showCompanyinforPage giveCenter">
  
  </div>
</template>
<style>
</style>
<script>
import * as modules from '../../jslib';
export default {
  name: 'showCompanyinforPage',
  data() {
    return {
        email:null,
        storesArr:null,
    }
  },
  created(){
    this.$EventBus.$on('loginInfor',loginInfor=>{
    loginInfor=JSON.parse(loginInfor);
    console.log(loginInfor);
    //비로그인,권한이없는유저 팅겨내기
        if(loginInfor.loginFlag!=true||loginInfor.role==this.$ROLE_USER){
            modules.wrongAccese();
            return;
        }
        this.email=loginInfor.email;
        modules.requestAsyncToGet(this.$serverDomain+'/auth/store/getSmall/'+this.email).then(result=>{
            console.log(result);
            
        });
    });
    
  },

}
</script>