<template>
  <div id="container" class="beforeJoinPage giveCenter">
    <short-logo/>
    <a href="/joinPage?scope=seller"><img src="" />나는 기업회원입니다</a>
    <br>
    <a href="/joinPage?scope=persnal"><img src="" />나는 개인회원입니다</a>
  </div>
</template>
<style>
</style>
<script>
import * as modules from '../../jslib';
export default {
  name: "foot",
  mounted(){
    modules.footerAtButton(this.$footerHeigth);
  }
};
</script>