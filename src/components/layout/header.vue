<template>
  <div class="he">
    <input type="button" @click="getHomeAddress()" value="받을 주소 불러오기">
  </div>
</template>
<style>
 .he{margin-bottom: 60px;}
</style>
<script>
export default {
  name: 'he',
  methods : {
    getHomeAddress(){
        console.log('주소부여');
        sessionStorage.setItem("homeAddress","서울특별시 동작구 흑석동 서달로 2길 29");
        console.log(sessionStorage.getItem("homeAddress"));
    },
  }
}
</script>