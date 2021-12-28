<template>
  <div class="registStorePage">
    registStorePage
  </div>
</template>
<style>
</style>
<script>
import * as modules from '../../jslib';
export default {
  name: 'registStorePage',
  created(){
    this.$EventBus.$on('loginFlag',loginFlag=>{
        console.log(loginFlag);
        //비로그인 팅겨내기
        if(loginFlag!=true){
            modules.wrongAccese();
            return;
        }
        //기업회원인지 role가져오기
        modules.requestAsyncToGet(this.$serverDomain+"/auth/user/check?detail=role").then(result=>{
            console.log(result);
            var role=result.message;
            if(role!='role_company'||role.flag!=true){
                modules.wrongAccese();
                return;
            }
            
        })
    });
  }
}
</script>