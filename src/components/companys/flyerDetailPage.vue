<template>
    <div class="margintopNavSize marginLeftSideSize">
        <div>
         <h3>전단이미지</h3>
          <input type="file" id="img" class="mt-2" name="img" accept=".gif, .jpg, .png" @change="uploadAndGetProducts">
            <br>
            <img :src="flyerImgPath" id="flyerImg" >
            <br>
            <h5>전단고유번호</h5>
            (업로드시 자동발급)
            <br>
            <input type="text" placeholder="업로드시 자동 부여 됩니다" id="flyerId" :value="flyerId" disabled/>
            {{defaultText}}
         <ul>
            <span v-for="(product,index) in products.length" :key="index">
            <li style="float: left; margin-left: 10px;">
                <product-componet :flag="true" :flyerId="flyerId" :storeId="storeId" ref="product_com" :product="products[index]"/>
            </li>
          </span>
         </ul>
          
      </div>
    </div>
</template>
<style>

</style>
<script>
import { getParam, requestAsyncToGet, requestFormAsyncToPost } from '../../jslib'
import ProductComponet from './productComponet.vue'
export default {
  name: 'flyerDetailPage',
  components: { ProductComponet },
   data() {
      return {
      subSideVarIds:['storeDetailSubSide'],
      storeId:getParam('storeid'),
      products:[],
      flyerImgPath:null,
      events:null,
      flyerId:0,
      len:0,
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
  mounted(){
    requestAsyncToGet(this.$serverDomain+'/auth/store/get/flyer/'+getParam('flyerid')).then(result=>{
        console.log(result);
        if(!result.flyerFlag){
          alert(result.message);
          return;
        }
        this.flyerImgPath=result.flyer.img_path;
        this.flyerId=result.flyer.id;
        if(result.productFlag){
          this.products=result.products;
        }
        if(result.eventFlag){
          this.events=result.events;
        }
    });
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
  },
}
</script>