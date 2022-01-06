<template>
  <div class="showStoreDetailPage giveCenter">
    showStoreDetailPage
  </div>
</template>
<style>
</style>
<script>
import * as modules from '../../jslib';
export default {
  name: 'showStoreDetailPage',
  created(){
    this.$EventBus.$on('loginInfor',loginInfor=>{
      loginInfor=JSON.parse(loginInfor);
      console.log(loginInfor);
      //비로그인,권한이없는유저 팅겨내기
      if(modules.checkRole(loginInfor.role,loginInfor.loginFlag,this.$ROLE_USER)){
          modules.wrongAccese();
        return;
      }
    });
    modules.requestAsyncToGet(this.$serverDomain+'/auth/store/get/'+modules.getParam('id')).then(result=>{
      console.log(result);
    });
  },
  methods:{

  }
}
</script>