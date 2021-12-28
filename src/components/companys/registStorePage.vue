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
        if(loginFlag!=true){
            modules.wrongAccese();
        }
    });
  }
}
</script>