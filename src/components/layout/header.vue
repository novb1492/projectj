<template>
  <div class="he">
    <input type="button" @click="showHomeAddress()" value="받을 주소 불러오기">
  </div>
</template>
<style>
 .he{margin-bottom: 60px;}
</style>
<script>
export default {
  name: 'he',
  props:['a'],
  data() {
    return {
    }
  },
  methods : {
    showHomeAddress(){
        console.log('주소부여');
        sessionStorage.setItem("homeAddress","서울특별시 동작구 흑석동 서달로 2길 29");
        sessionStorage.setItem("destinationFlag",true);
        console.log(sessionStorage.getItem("homeAddress"));   
        location.reload();
    },
  }
}
</script>