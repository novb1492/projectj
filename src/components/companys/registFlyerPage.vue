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
          <product-componet />
          <input type="button" value="상품등록"  @click="insert" />
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
import {  changeValueById, getParam, getValueById, requestAsyncToPost, requestFormAsyncToPost } from '../../jslib'
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
      eventFlag:false,
      dateArr:[],
      defaultText2:'',
      productImgPath:'',
      ids:['productName','price','origin','img2','eventDate'],
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
   imgUpload(){
      const frm = new FormData();
      frm.append("upload",document.getElementById('img2').files[0]);
      requestFormAsyncToPost(this.$serverDomain+'/auth/file/upload',frm).then(result=>{
        console.log(result);
        if(result.flag){
          this.productImgPath=result.message;
          return;
        }
        alert('파일 업로드에 실패했습니다');

      });
    },
    insert(){
      //이번트 날짜에 입력한 가격부여
      if(this.eventFlag){
        var events=document.getElementsByClassName('eventPrice');
        var len=this.dateArr.length;
        for(var i=0;i<events.length;i++){
          for(var ii=0;ii<len;ii++){
            if(this.dateArr[ii].date==events[i].id){
              this.dateArr[ii].price=events[i].value;
              break;
            }
          }
        }
        
      }
      var eFlag=0;
      if(this.eventFlag){
        eFlag=1;
      }
      var category=document.getElementById("category");
      let data=JSON.stringify({
        "productName":getValueById('productName'),
        "eventFlag":eFlag,
        "eventInfors":this.dateArr,
        "price":getValueById('price'),
        "text":this.$refs.ck_editor.getText(),
        "category":category.options[category.selectedIndex].value,
        "flyerId":this.flyerId,
        "flyerPath":this.imgPath,
        "productImgPath":this.productImgPath,
        "origin":getValueById('origin'),
        "storeId":this.storeId
      });
      console.log(data);
      requestAsyncToPost(this.$serverDomain+'/auth/store/flyer/insert',data).then(result=>{
        alert(result.message);
        if(result.flag){
          //다음 상품등록을 위해 전단 제외 비워주기
          this.clearEvent();
          this.clearValues();
          this.dateArr=[];
          this.$refs.ck_editor.setText('');
          this.productImgPath=null;
        }
      });
      

    },
    clearValues(){
      for(var i=0;i<this.ids.length;i++){
        changeValueById(this.ids[i],'');
      }
    },
    clearEvent(){
      if(this.eventFlag){
        document.getElementById('eventPriceArea').innerHTML='';
      }
      this.closeEvent();

    },

    closeEvent(){
      document.getElementById("eventCheck").checked = false;
      this.eventFlag=false;
      document.getElementById('eventInfor').hidden=true;
    },
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