<template>
    <div class="marginLeftSideSize margintopNavSize">
      <div>
         <h3>전단이미지를 등록해주세요</h3>
          <input type="file" id="img" class="mt-2" name="img" accept=".gif, .jpg, .png" @change="uploadAndGetProducts">
          <br>
          <img :src="imgPath" id="flyerImg" hidden>
          <br>
          <h5>전단고유번호</h5>
          (업로드시 자동발급)
          <br>
          <input type="text" placeholder="업로드시 자동 부여 됩니다" id="flyerId" :value="flyerId" disabled/>
       {{defaultText}}
      </div>
       <div id="insertProductArea" hidden><!--hidden-->
          <product-componet :flyerId="flyerId" :storeId="storeId" :flyerPath="imgPath" />
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
#flyerImg{ width: 100%; height: 600px;}
</style>
<script>
import {  getParam, requestFormAsyncToPost } from '../../jslib'
import ProductComponet from './productComponet.vue';
export default {
  components: { ProductComponet },
  name: 'insertFlyerPage',
   data() {
    return {
      storeId:getParam('storeid'),
      imgPath:null,
      subSideVarIds:['storeDetailSubSide'],
      text:'',
      defaultText:'',
      flyerId:'',
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
      frm.append("storeId",this.storeId);
      console.log(frm);
     this.defaultText='글자를 추출중입니다 시간이 걸리니 페이지를 벗어나지 마세요';
      requestFormAsyncToPost(this.$serverDomain+'/auth/store/uploadAndGet/'+this.storeId,frm).then(result=>{
        console.log(result);
        if(result.flag){
          document.getElementById('flyerImg').hidden=false;
          this.imgPath=result.message;
          this.defaultText='';
          this.text=result.ocr.message;
          this.flyerId=result.id;
          document.getElementById('insertProductArea').hidden=false;
          return;
        }
        alert('파일 업로드에 실패했습니다');

      });
    },
  }
}
</script>