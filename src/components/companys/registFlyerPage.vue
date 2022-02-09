<template>
    <div class="marginLeftSideSize margintopNavSize">
      <img :src="imgPath" alt="이미지를 업로드해주세요">
      <input type="file" id="img" class="mt-2" name="img" accept=".gif, .jpg, .png" @change="test">
    </div>
</template>
<style>

</style>
<script>
export default {
  name: 'insertFlyerPage',
   data() {
    return {
      storeId:0,
      imgPath:null,

    }
  },
}
</script>