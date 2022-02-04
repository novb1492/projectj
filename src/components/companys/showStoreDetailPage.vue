 <template>
  <div  class="margintopNavSize marginLeftSideSize" >
      <div id="registStorePage" style="float: left;">
        <h5 class="mt-2">매장을 대표하는 사진을 업로드해주세요</h5>
        <img  src=""  id="thumbnail" class="storeThumbnail">
        <br>
        <input type="file" id="img" class="mt-2" name="img" accept=".gif, .jpg, .png" value="123">
        <br>
        <input type="button" class="mt-2"  value="업로드"  @click="uploadThumbNail">
        <br>
         <span class="mt-2" >상호</span>
        <input
          type="text"
          class="ml135 mt-2"
          id="storeName"
          placeholder="상호"   
        />
        <br>
        <span>사업자번호(숫자만)</span>
        <input type="text"
          class="ml45 mt-2"
          id="num"
          placeholder="상호"   
        />
        <br>
        <span>오픈시간</span>
        <input type="time"
          class="ml135 mt-2"
          id="openTime"
          placeholder="오픈시간"
        />
        <br>
        <span>마감시간</span>
        <input type="time"
          class="ml135 mt-2 mb-2"
          id="closeTime"
          placeholder="마감시간"
        />
        <br>
        <span >간단한 가게 설명을 적어주세요</span>
        <span v-if="doneFlag==1"><!--에디터 너무 빨리생성되지 않게-->
          <editor class="mt-2" :text=text  ref="ck_editor" />
        </span>
      </div>
      <div id="registStorePage2" style="float: left;">
         <vue-daum-postcode
        id="kpost"
        @complete="onComplete"
        style="overflow: scroll; width: 400px; height: 500px;"
      />
        <span>우편번호</span>
        <input
        type="text"
        class="ml105 mt-2"
        id="postcode"
        placeholder="우편번호"
        disabled
      />
      <br>
      <span>주소</span><input
        type="text"
        class="ml135 mt-2"
        id="address"
        placeholder="주소"
        disabled
      />
      <br>
      <span>상세주소</span><input
        type="text"
        class="ml105 mt-2"
        id="detailAddress"
        placeholder="상세주소"
      />
      <br>
      <span>최소배달금액(원)</span>
      <input type="number"
        class="ml105 mt-2"
        id="minPrice"
        placeholder="최소배달금액"
      />
      <br>
      <span>최대배달반경(km)</span>
      <input type="number"
        class="ml80 mt-2"
        id="deliverRadius"
        placeholder="최대배달반경"
        @keyup="showCircle"
      />
      <br>
      </div>
      <div id="registStorePage3" >
        <span v-if="doneFlag==1"><!--지도 너무 빨리생성 되지 않게-->
          <k-map :width=400 :height=500 :address=address :storeDetailFlag=true :radius=radius ref="k_map" />
        </span>
      <br>
      </div>
      <div id="registStorePage4">
      <span >휴대폰번호</span>
      <input type="text" class="ml80" id="phone">
      <br>
      <span>매장전화번호</span>
      <input type="text" class="ml80 mt-2" id="tel">
      <br>
      <input type="button" @click="showAuthPage('phone')" id="check_phone_button" class="mt-2" value="휴대폰인증(번호수정시)" />
      <input type="button" value="가맹점 수정" @click="tryUpdateStore">
      <br>
      <input type="button" value="전단지 등록" >
      <input type="button" @click="leave" value="이전으로 가기">
      </div>
  </div>
</template>
<style>
</style>
<script>
import * as modules from '../../jslib';
import kMap from '../../kMap.vue';
import Editor from '../editor.vue';
export default {
  components: { kMap, Editor },
  name: 'showStoreDetailPage',
  data(){
    return  {
      storeName:null,
      address:null,
      radius:0,
      deliverRadiusFlag:true,
      id:0,
      text:null,
      doneFlag:0,//editor 너무 빨리 생성되지 않게
      subSideVarIds:['storeDetailSubSide'],
    }
  },
  created(){
    //뒤로가기 대응
   /* var pageAndKeyWord=new Object();
    pageAndKeyWord.page=modules.getParam('page');
    pageAndKeyWord.keyword=modules.getParam('keyword');//companypage watch에서 일괄대응
    this.$emit('changePageAndKeyword',pageAndKeyWord);*///매장클릭시 부모 page/keyword 바꿔줘야 뒤로가기시 잘작동함
    modules.requestAsyncToGet(this.$serverDomain+'/auth/store/get/'+modules.getParam('id')).then(result=>{
      console.log(result);
      if(!result.flag){
        alert(result.message);
        this.leave();
        return;
      }
      var infor=result.message;
      this.address=infor.saddress;
      this.radius=infor.deliverRadius;
      this.thumbnail=infor.simg;
      this.text=infor.text; 
      console.log(this.text);
      document.getElementById('thumbnail').src=infor.simg;
      this.id=modules.getParam('id');
      modules.changeValueById('storeName',infor.sname);
      modules.changeValueById('num',infor.snum);
      modules.changeValueById('openTime',infor.openTime);
      modules.changeValueById('closeTime',infor.closeTime);
      modules.changeValueById('postcode',infor.spostcode);
      modules.changeValueById('address',infor.saddress);
      modules.changeValueById('detailAddress',infor.sdetail_address);
      modules.changeValueById('minPrice',infor.minPrice);
      modules.changeValueById('deliverRadius',infor.deliverRadius);
      modules.changeValueById('phone',infor.sphone);
      modules.changeValueById('tel',infor.stel);
      this.doneFlag=1;//정보다 받고 에디터,지도 생성 몸살 후 nexttick로 교체해보자 
      //사이드바 생성
      this.$emit('openSubSide',this.subSideVarIds);
    });
  },
  methods:{
    getSubSideVarIds(){//페이지 이탈시 사용
      return this.subSideVarIds;
    },
    clickDelivery(){
      this.$router.push('/companyPage/3?&page=1&keyword=null&storeid='+this.id);
    },
    leave(){
      //페이지 이탈시 이전 페이지번호,검색어 정보들고있기 
      this.$router.push('/companyPage/1?&page='+modules.getParam('page')+'&keyword='+modules.getParam('keyword'));
    },
    tryUpdateStore(){
      var thumbNail=this.thumbnail;
      console.log(thumbNail);
      var text=this.$refs.ck_editor.getText();
      var postcode=modules.getValueById('postcode');
      var address=modules.getValueById('address');
      var storeName=modules.getValueById('storeName');
      var detailAddress=modules.getValueById('detailAddress');
      var num=modules.getValueById('num');
      var openTime=modules.getValueById('openTime');
      var closeTime=modules.getValueById('closeTime');
      var minPrice=modules.getValueById('minPrice');
      var deliverRadius=modules.getValueById('deliverRadius');
      var tel=modules.getValueById('tel');
      var phone=modules.getValueById('phone');
      let data=JSON.stringify({
        "id":this.id,
        "thumbNail":thumbNail,
        "text":text,
        "postcode":postcode,
        "address":address,
        "storeName":storeName,
        "detailAddress":detailAddress,
        "num":num,
        "openTime":openTime,
        "closeTime":closeTime,
        "minPrice":minPrice,
        "deliverRadius":deliverRadius,
        "tel":tel,
        "phone":phone,
      });
      modules.requestAsyncToPut(this.$serverDomain+"/auth/store/infor/change",data).then(result=>{
        alert(result.message);
      });
    },
     showAuthPage(type){
        var message='휴대폰을 입력해주세요';
        var vl=document.getElementById('phone').value;
        if(type=='email'){  
          message='이메일을 입력해주세요';
          vl=document.getElementById('email').value;
        }
        if(modules.checkNull(vl)){
          alert(message);
          return;
        }
        modules.openPOPup('/authPage?scope='+type+'&detail=auth2&kind='+modules.getParam('scope'),'authPage',500,500);
      },
    uploadThumbNail(){
      const frm = new FormData();
      console.log(document.getElementById('img').files[0]);
      frm.append("upload",document.getElementById('img').files[0]);
      console.log(frm);
      modules.requestFormAsyncToPost(this.$serverDomain+'/auth/file/upload',frm).then(result=>{
        console.log(result);
        if(result.uploaded){
          document.getElementById('thumbnail').src=result.url;
          this.thumbnail=result.url;
          return;
        }
        alert('파일 업로드에 실패했습니다');

      });
    },
    onComplete(result) {
      console.log(result);
      document.getElementById("postcode").value = result.zonecode;
      document.getElementById("address").value = result.address;
      var data=new Object();
      data.address=result.address;
      data.deliverRadiusFlag=this.deliverRadiusFlag;
      if(this.deliverRadiusFlag){
        data.radius=this.radius;
      }
      this.$refs.k_map.drawCicleAndMakerWithAddress(data);
    },
    showCircle(){
      var num=modules.getValueById('deliverRadius');
      //숫자인지검사
      if(isNaN(num)){
        alert('배달거리는 숫자만 입력해주세요');
        return;
      }
      this.deliverRadiusFlag=true;
      this.radius=num;
      this.$refs.k_map.drawCircle(num);
    },
     
  }
  
  
}
</script>