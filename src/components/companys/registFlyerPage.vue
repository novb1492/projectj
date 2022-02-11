<template>
    <div class="marginLeftSideSize margintopNavSize">
      <input type="file" id="img" class="mt-2" name="img" accept=".gif, .jpg, .png" @change="uploadAndGetProducts">
      <br>
       <img :src="imgPath" id="flyerImg" alt="이미지를 업로드해주세요">
       <br>
       {{defaultText}}
       <div id="insertProductArea" hidden>
         
       </div>
       <br>
       <br>
       <div>
         추출한 글자들
         <br>
         원래 이글자들로 전단이 클릭되면 반응 하게 하려했으나
         <br>
         말도안되는 기술이라는걸 깨닫고 포기하고.. 
         <br>
         맛보기 ocr 만 구축 해논 상태입니다
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
      storeId:getParam('storeid'),
      imgPath:null,
      subSideVarIds:['storeDetailSubSide'],
      text:'',
      defaultText:'',
    }
  },
  created(){
    //사이드바 생성
    this.$emit('openSubSide',this.subSideVarIds);
       //새로고침 대응
    this.$emit('changeStoreId',this.storeId);
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
        if(result.flag){
          this.imgPath=result.message;
          this.defaultText='';
          this.text=result.ocr.message;
          document.getElementById('insertProductArea').hidden=false;
          return;
        }
        alert('파일 업로드에 실패했습니다');

      });
    },
  }
}
</script>