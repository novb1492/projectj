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
            <br>
            <ul style="float: left; text-align: center;">
            <span v-for="(product,index) in products" :key="index">
            <li style="float: left; margin-left: 10px;">
              <a href="#" @click="productDetail(product.id)">
                <img id="productImg" :src=product.productImgPath alt="">
                <br>
                <div id="productName">{{product.productName}}</div>
                원산지:<span id="origin">{{product.origin}}</span>
                <br>
                가격:<span id="price">{{product.price}}</span>
                <span v-if="product.eventFlag==1">
                  <br>
                  이벤트 일정이 있는 상품
                </span>
              </a>
            </li>
          </span>
         </ul>
          
      </div>
    </div>
</template>
<style>
#productImg{width: 300px;}
</style>
<script>
import { getParam, requestAsyncToGet, requestFormAsyncToPost } from '../../jslib'
export default {
  name: 'flyerDetailPage',
   data() {
      return {
      subSideVarIds:['storeDetailSubSide'],
      storeId:getParam('storeid'),
      products:0,
      flyerImgPath:null,
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
    });
  },
  methods:{
    productDetail(id){
      this.$router.push("/companyPage/8?storeid="+this.storeId+"&page="+this.getPage()+"&keyword="+null+"&productid="+id);
    },
    getSubSideVarIds(){
      return this.subSideVarIds;
    },
    getPage(){
      return getParam('page');
    },
    getKeyword(){
      return getParam('start');
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