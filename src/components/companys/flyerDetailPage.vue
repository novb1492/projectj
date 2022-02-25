<template>
    <div class="margintopNavSize marginLeftSideSize">
        <div>
         <h3>전단이미지</h3>
          <input type="file" id="img" class="mt-2" name="img" accept=".gif, .jpg, .png" @change="uploadAndGetProducts" multiple>
          <br>
          <input type="button" value="전단상품 전체삭제" @click="deleteFlyerAll"/>
          <input type="button" value="전단 수정" @click="updateFlyer" />
            <div id="imgArea" hidden>
               <input type="checkbox" value="1" id="eventCheck" />기본전단으로 지정
              <span v-for="(flyerDetail,index) in flyerDetails" :key="index ">
                <button type="button" class="btn-close deleteFlyerButton" aria-label="Close" :id="'deleteFlyer'+index" @click="deleteFlyer(index)"></button>
                 <img :src="flyerDetail.flyer_img_path" :id="'flyerImg'+index" @click="defaultFlyer(index)" >
                 <br>
              </span>
          </div>
            <br>
            <h5>전단고유번호</h5>
            <br>
            <input type="text" placeholder="업로드시 자동 부여 됩니다" id="flyerId" :value="flyerId" disabled/>
            {{defaultText}}
            <br>
            <product-componet :flyerId="flyerId" :storeId="storeId"  v-on:changeProduct="changeProduct" />
            <ul style="float: left; text-align: center;">
            <span v-for="(product,index) in products" :key="index">
            <li style="float: left; margin-left: 10px;">
              <a href="#" @click="productDetail(product.product_id)">
                <img id="productImg" :src=product.product_img_path alt="">
                <br>
                <div id="productName">{{product.product_name}}</div>
                원산지:<span id="origin">{{product.origin}}</span>
                <br>
                가격:<span id="price">{{product.price}}</span>
                <span v-if="product.event_state==1">
                  <br>
                  이벤트 일정이 있는 상품
                </span>
              </a>
            </li>
          </span>
         </ul>
          
      </div>
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
          <span v-for="(flyerDetail,index) in flyerDetails" :key="index ">
                      {{flyerDetail.text}}
          </span>
        </div>
    </div>
</template>
<style>
#productImg{width: 300px;}
</style>
<script>
import Vue from 'vue';
import { changeValueById, checkNull, getParam, requestAsyncToDelete, requestAsyncToGet, requestAsyncToPut, requestFormAsyncToPost } from '../../jslib'
import ProductComponet from './productComponet.vue';
export default {
  name: 'flyerDetailPage',
  components: { ProductComponet },
   data() {
      return {
      subSideVarIds:['storeDetailSubSide'],
      storeId:getParam('storeid'),
      products:0,
      flyerId:0,
      len:0,
      text:'',
      defaultText:'',
      flyerDetails:[],
      defaultImg:null,
    }
  },
  created(){
    //사이드바 생성
    this.$emit('openSubSide',this.subSideVarIds);
    //새로고침 대응
    this.$emit('changeStoreId',this.storeId);
  },
  mounted(){
     requestAsyncToGet(this.$serverDomain+'/auth/store/get/flyer/'+getParam('flyerid')+'?storeId='+this.storeId).then(result=>{
        console.log(result);
        if(!result.flyerFlag){
          alert(result.flyerMessage);
        }else{
          var len=result.flyerDetail.length;
          for(var i=0;i<len;i++){
            this.flyerDetails[this.flyerDetails.length]=result.flyerDetail[i];
            if(result.flyerDetail[i].default){
              this.defaultImg=result.flyerDetail[i].flyer_img_path;
            }
          }
          document.getElementById('imgArea').hidden=false;
        }
        this.flyerId=result.flyer.flyer_id;
        if(result.productFlag){
          var a=result.products;
          this.products=a;
        }else{
          alert(result.productMessage);
        }
    });
  },
  methods:{
    reRender(){
      requestAsyncToGet(this.$serverDomain+'/auth/store/get/flyer/'+getParam('flyerid')+'?storeId='+this.storeId).then(result=>{
              console.log(result);
              if(!result.flyerFlag){
                alert(result.flyerMessage);
              }else{
                var len=result.flyerDetail.length;
                 var arr=[];
                for(var i=0;i<len;i++){
                  arr[arr.length]=result.flyerDetail[i];
                  if(result.flyerDetail[i].default){
                    this.defaultImg=result.flyerDetail[i].flyer_img_path;
                  }
                }
                 this.flyerDetails=arr;
                 if(result.productFlag){
                    this.products=result.products;
                  }else{
                    alert(result.productMessage);
                  }
              }
          });
    },
    changeProduct(){
      this.reRender();
    },
    updateFlyer(){
      var defaultNum=0;
      if(document.getElementById('eventCheck').checked){
        defaultNum=1;
      }
      var imgPaths=[];
      for(var i in this.flyerDetails){
        imgPaths[imgPaths.length]=this.flyerDetails[i].flyer_img_path;
      }
      let data=JSON.stringify({
        "flyerImgs":imgPaths,
        "defaultFlag":defaultNum,
        "thumbNail":this.defaultImg
      });
      requestAsyncToPut(this.$serverDomain+'/auth/store/flyer/update/'+this.flyerId+'/'+this.storeId,data).then(result=>{
        alert(result.message);
        if(result.flag){
           requestAsyncToGet(this.$serverDomain+'/auth/store/get/flyer/'+getParam('flyerid')+'?storeId='+this.storeId).then(result=>{
              console.log(result);
              if(!result.flyerFlag){
                alert(result.flyerMessage);
              }else{
                var len=result.flyerDetail.length;
                 var arr=[];
                for(var i=0;i<len;i++){
                  arr[arr.length]=result.flyerDetail[i];
                  if(result.flyerDetail[i].default){
                    this.defaultImg=result.flyerDetail[i].flyer_img_path;
                  }
                }
                 this.flyerDetails=arr;
              }
          });
        }
      });
    },
    deleteFlyerAll(){
      requestAsyncToDelete(this.$serverDomain+'/auth/store/flyer/'+this.storeId+'/'+this.flyerId).then(result=>{
        alert(result.message);
      })
    },
    defaultFlyer(index){
      this.defaultImg=this.flyerDetails[index].flyer_img_path;
      alert('썸네일이 지정되었습니다 수정 버튼을 누르면 적용됩니다');
    },
    deleteFlyer(index){
      if(this.flyerDetails[index].flyer_img_path==this.defaultImg){
        if(confirm("썸네일로 지정되어 있습니다 삭제하겠습니까?")){
          this.deleteFlyerRequest(index);
        }
        return;
      }else{
        this.deleteFlyerRequest(index);
      }
    },
    deleteFlyerRequest(index){
      if(!checkNull(this.flyerDetails[index].id)){
         requestAsyncToDelete(this.$serverDomain+'/auth/store/flyerDetail/'+this.storeId+'/'+this.flyerDetails[index].id).then(result=>{
           alert(result.message);
           if(result.flag){
              requestAsyncToGet(this.$serverDomain+'/auth/store/get/flyer/'+getParam('flyerid')+'?storeId='+this.storeId).then(result=>{
                  console.log(result);
                  if(!result.flyerFlag){
                    alert(result.flyerMessage);
                  }else{
                    var len=result.flyerDetail.length;
                    var arr=[];
                    for(var i=0;i<len;i++){
                      arr[arr.length]=result.flyerDetail[i];
                      if(result.flyerDetail[i].default){
                        this.defaultImg=result.flyerDetail[i].flyer_img_path;
                      }
                    }
                    this.flyerDetails=arr;
                  }
              });
            }
         })
          return;
      }
      this.deleteSuc(index);
    },
    deleteSuc(index){
      if(this.flyerDetails[index].flyer_img_path==this.defaultImg){
        this.defaultImg=null;
      }
      Vue.set(this.flyerDetails, index, null);
      Vue.set(this.texts, index, null);
      document.getElementById('deleteFlyer'+index).remove();
    },
    productDetail(id){
      this.$router.push("/companyPage/8?storeid="+this.storeId+"&page="+this.getPage()+"&keyword="+null+"&productid="+id+"&flyerid="+this.flyerId);
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
      var imgs=document.getElementById('img').files;
      for(var i=0;i<imgs.length;i++){
        frm.append("upload",imgs[i]);
      }
      frm.append("storeId",this.storeId);
      console.log(frm);
     this.defaultText='글자를 추출중입니다 시간이 걸리니 페이지를 벗어나지 마세요';
      requestFormAsyncToPost(this.$serverDomain+'/auth/store/uploadAndGet/'+this.storeId,frm).then(result=>{
        console.log(result);
        if(result.flag){
          var resultMessageArr=result.message;
          for(var i=0;i<resultMessageArr.length;i++){
            var object=new Object;
            object.flyer_img_path=result.message[i].message;
            object.id=null;
            object.text=result.message[i].ocr.message;
            this.flyerDetails[this.flyerDetails.length]=object;
          }
          document.getElementById('imgArea').hidden=false;
          this.defaultText='';
          //change일어 날 수있게 
          changeValueById('img',null);
          return;
        }
        alert('파일 업로드에 실패했습니다');

      });
    },
  },
}
</script>