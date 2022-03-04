<template>
  <div>
     <vue-daum-postcode 
        id="otherAddressArea"
        @complete="onComplete"
        style="overflow: scroll; margin-left: 50%; transform: translateX(-50%);  width: 400px; height: 500px"
      />
  </div>
</template>
<style>

</style>
<script>
export default {
  name: 'basketPage',
  data() {
    return {

    }
  },
  methods:{
     onComplete(result) {
      console.log(result);
      document.getElementById("postcode").value = result.zonecode;
      document.getElementById("address").value = result.address;
      alert("주소 선택 완료");
    },
  },
}
</script>