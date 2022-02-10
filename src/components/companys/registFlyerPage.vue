<template>
    <div class="marginLeftSideSize margintopNavSize">
      <input type="file" id="img" class="mt-2" name="img" accept=".gif, .jpg, .png" @change="uploadAndGetProducts">
      <br>
       <img :src="imgPath" id="flyerImg" alt="이미지를 업로드해주세요">
       <br>
       {{defaultText}}
       <div>
         추출한 글자들
       </div>
        <div>
          {{text}}
        </div>
    </div>
</template>
<style>
#textArea{width: 100%;}
#flyerImg{ width: 100%; height: 100%;}
</style>
<script>
import {  getParam, requestFormAsyncToPost } from '../../jslib'
export default {
  name: 'insertFlyerPage',
   data() {
    return {
      storeId:getParam('storeId'),
      imgPath:null,
      subSideVarIds:['storeDetailSubSide'],
      text:'',
      defaultText:'',
    }
  },
  created(){
    //사이드바 생성
    this.$emit('openSubSide',this.subSideVarIds);
  },
  methods:{
    getSubSideVarIds(){
      return this.subSideVarIds;
    },
    uploadAndGetProducts(){
      const frm = new FormData();
      console.log(document.getElementById('img').files[0]);
      frm.append("upload",document.getElementById('img').files[0]);
      console.log(frm);
     this.defaultText='글자를 추출중입니다 시간이 걸리니 페이지를 벗어나지 마세요';
      requestFormAsyncToPost(this.$serverDomain+'/auth/store/uploadAndGet',frm).then(result=>{
        console.log(result);
        if(result.uploaded){
          this.imgPath=result.url;
          this.defaultText='';
          alert(result.ocr.message.length);
          this.text=result.ocr.message;
          return;
        }
        alert('파일 업로드에 실패했습니다');

      });
    },
  }
}
</script>