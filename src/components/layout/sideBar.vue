<template>
  <div  class="sideBar">
  <div class="flex-shrink-0 p-3 bg-white" style="width: 250px; float: left;">
    <span v-if="checkPage()==homeNum"><!--firstdoor사이드바-->
    <a href="/" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
      <svg class="bi me-2" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
      <a :href="'/storePage/0?storeid='+storeId" class="fs-5 fw-semibold">방문하기</a>
    </a>
    <ul class="list-unstyled ps-0">
      <li class="mb-1">
        <img :src="thumbNail" alt="" srcset="" style=" height: 200px; width:200px;" >
      </li>
      <li class="mb-1" style="overflow:auto; height: 200px;"> 
        <h5>{{storeName}}</h5>
        <div>{{storePhone}}</div>
         <div>{{tel}}</div>
        <div>{{address}}</div>
        <div>{{roadAddress}}</div>
         <div>{{detailAddress}}</div>
        <div>{{openTime}}~{{closeTime}}</div>
        <h6>매장소개</h6>
        <div id="storeIntroduceArea"></div>
      </li>
      <span v-if="userRole==this.$ROLE_USER">
         <li class="mb-1">
          <textarea id="editor"></textarea>
          <editor :placeHolder="'간단리뷰를 적어주세요'"  ref="ck_editor" />
          <input type="button" value="리뷰등록" @click="insertReview"/>
          </li>
      </span>
      <li class="mb-1 " id="reviewsArea" style="overflow:auto; height: 300px;">
        <ul  id="reviewsArea">
            <li v-for="(review,index) in storeReviews" :key="index" style="" @readystatechange="readyEditor">
              <textarea name="" :id="index" cols="30" rows="10"></textarea>
            </li>
        </ul>
      </li>
    </ul>
    </span>
    <span v-if="checkPage()==companyNum"><!--회사 페이지 가게관리 사이드바---------------------------------------------------------->
        <span class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
      <svg class="bi me-2" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
      <span class="fs-5 fw-semibold">Actions</span>
        </span>
    <ul class="list-unstyled ps-0">
         <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded" @click="changePage(0)">
          매장등록하기
        </button>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded" @click="changePage(1)">
          모든매장보기
        </button>
      </li>
      <!--<li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
          주문조회
        </button>
        <div class="collapse" id="dashboard-collapse" style="">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="javascript:void();" class="link-dark rounded">완료된주문</a></li>
            <li><a href="javascript:void();" class="link-dark rounded">배달이전주문</a></li>
            <li><a href="javascript:void();" class="link-dark rounded">배달중인주문</a></li>
            <li><a href="javascript:void();" class="link-dark rounded">환불된주문</a></li>
          </ul>
        </div>
      </li>-->
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
          매출차트보기
        </button>
        <div class="collapse" id="orders-collapse" style="">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="javascript:void();" class="link-dark rounded">기간별</a></li>
            <li><a href="javascript:void();" class="link-dark rounded">매장별</a></li>
          </ul>
        </div>
      </li>
      <li class="border-top my-3"></li>
      <span id="storeDetailSubSide" >
         <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed"  @click="changePage(3)">
          배달조회
        </button>
      </li>
        <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded" @click="changePage(4)">
          매장정보 
        </button>
        </li>
        <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded" @click="changePage(5)">
          전단목록(상품목록) 
        </button>
        </li>
        <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded" @click="changePage(6)">
          전단등록(상품등록) 
        </button>
        </li>
         <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded" @click="changePage(10)">
          주문조회
        </button>
        </li>
      </span>
    </ul>
    </span>
     <span v-if="checkPage()==storeNum"><!--유저 매장입장 페이지 가게관리 사이드바---------------------------------------------------------->
        <span class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
      <svg class="bi me-2" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
      <span class="fs-5 fw-semibold">Actions</span>
        </span>
    <ul class="list-unstyled ps-0">
         <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded" @click="changePage(7)">
          전단보기
        </button>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
          상품보기
        </button>
        <div class="collapse" id="orders-collapse" style="">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="javascript:void();" class="link-dark rounded"  @click="changePage(8)">공산품</a></li>
            <li><a href="javascript:void();" class="link-dark rounded" @click="changePage(8.1)">청과/야채</a></li>
            <li><a href="javascript:void();" class="link-dark rounded" @click="changePage(8.2)">수산물</a></li>
            <li><a href="javascript:void();" class="link-dark rounded" @click="changePage(8.3)">축산물</a></li>
            <li><a href="javascript:void();" class="link-dark rounded" @click="changePage(8.4)">식품</a></li>
            <li><a href="javascript:void();" class="link-dark rounded" @click="changePage(8.5)">비식품</a></li>
            <li><a href="javascript:void();" class="link-dark rounded" @click="changePage(8.6)">잡화</a></li>
          </ul>
        </div>
      </li>
    </ul>
    </span>
  </div>
  </div>
</template>
<style>
</style>
<script>
import { getParam, requestAsyncToGet, requestAsyncToPost, requestAsyncToPut } from '../../jslib';
import editor from '../editor.vue';
export default {
  components: { editor },
  props:["loginInfors"],
  name: 'sideBar',
  data() {
    return {
      //company
      uri:null,
      choose:0,
      homeNum:0,
      companyNum:1,
      subSideNum:0,
      storeDetailNum:1,
      storeId:0,
      //firstdoor
      storePhone:null,
      storeName:null,
      thumbNail:null,
      storeReviews:null,
      firstDoorPage:0,
      tel:null,
      address:null,
      roadAddress:null,
      detailAddress:null,
      openTime:null,
      closeTime:null,
      userId:0,
      userRole:this.$ROLE_USER,
      //store
      storeNum:2,
      flyerId:0,
    }
  },
  created(){
    this.uri=location.pathname;
  },
  mounted(){
    document.getElementById('storeDetailSubSide').hidden=true;
  },
  methods:{
    setFlyerId(flyerId){
      this.flyerId=flyerId;
    },
    updateReview(id){
      let data=JSON.stringify({
        "text":this.$refs.ck_editor.getText(),
      });
      requestAsyncToPut(this.$serverDomain+'/auth/user/review/update/'+id,data).then(result=>{
        alert(result.message);
        if(result.flag){
          alert('a');
        }
      });
    },
    insertReview(){
      let data=JSON.stringify({
        "text":this.$refs.ck_editor.getText(),
      });
      requestAsyncToPost(this.$serverDomain+'/auth/user/review/insert/'+this.storeId,data).then(result=>{
        alert(result.message);
        if(result.flag){
          this.$refs.ck_editor.setText('');
          requestAsyncToGet(this.$serverDomain+'/store/get/reviews/'+this.storeId+'/1').then(result=>{
            if(!result.flag){
              return;
            }
            this.storeReviews=result.message.reviews;
          })
        }
      });
    },
    changeFirstDoorPage(num){
      var page=(this.firstDoorPage+num);
      requestAsyncToGet(this.$serverDomain+'/store/get/reviews/'+this.storeId+'/'+page).then(result=>{
        console.log(result);
        if(!result.flag){
          alert(result.message);
          return;
        }
        this.checkTotalPage(page,result.message.totalPage);
        this.storeReviews=result.message.reviews;
      })
    },
    showStoreAndReview(result){
      console.log(result);
      this.firstDoorPage=1;
      this.storeId=result.id;
      this.storePhone=result.storePhone;
      this.thumbNail=result.thumbNail;
      this.storeName=result.storeName;
      this.storeReviews=result.reviews;
      this.tel=result.storeTel;
      this.address=result.storeAddress;
      this.roadAddress=result.storeRoadAddress;
      this.detailAddress=result.storeDetailAddress;
      this.openTime=result.openTime;
      this.closeTime=result.closeTime;
      document.getElementById('storeIntroduceArea').innerHTML=result.text;
      this.checkTotalPage(this.firstDoorPage,result.totalPage);
      console.log(this.loginInfors);
      this.userId=this.loginInfors.id;
      this.userRole=this.loginInfors.role;
    },
    checkTotalPage(page,totalPage){
      if(page>=totalPage){
        document.getElementById('nextButton').disabled=true;

      }else{
        document.getElementById('nextButton').disabled=false;
      }
      if(page<=1){
        document.getElementById('beforeButton').disabled=true;
      }else{
        document.getElementById('beforeButton').disabled=false;
      }
      this.firstDoorPage=page;
    },
    checkPage(){
      if(this.uri=='/'){
        this.choose=this.homeNum;
      }else if(this.uri.indexOf('/company')!=-1){
        this.choose=this.companyNum;
      }else if(this.uri.indexOf('/store')!=-1){
        this.storeId=getParam('storeid');
        this.choose=this.storeNum;
      }
      return this.choose;
    },
    changePage(pageNum){
      if(pageNum==0){
        this.$router.push('/companyPage/0');
      }else if(pageNum==1){
        this.$router.push('/companyPage/1?page=1&keyword=null');
      }else if(pageNum==3){
        this.$router.push('/companyPage/3?&page=1&start=null&end=null&storeid='+getParam('storeid'));
      }else if(pageNum==4){
        this.$emit('clickStore',null);
      }else if(pageNum==5){
        this.$router.push('/companyPage/5?storeid='+getParam('storeid')+'&page=1&start=null&end=null');
      }else if(pageNum==6){
        this.$router.push('/companyPage/6?storeid='+getParam('storeid'));
      }else if(pageNum==7){
        this.$router.push('/storePage/0?storeid='+getParam('storeid'));
      }else if(pageNum>=8&&pageNum<9){
        this.$router.push('/storePage/1?storeid='+getParam('storeid')+'&page=1&keyword=null&category='+pageNum+'&flyerid='+this.flyerId);
      }else if(pageNum==10){
        this.$router.push('/companyPage/10?storeid='+getParam('storeid')+'&page=1&keyword=null');
      }else{
        alert('사이드바에 없는 요청');
      }

    },
    openSubSideVar(idArr){
      for(var i=0;i<idArr.length;i++){
         document.getElementById(idArr[i]).hidden=false
      }
    },
    closeSubSide(idArr){
      for(var i=0;i<idArr.length;i++){
        document.getElementById(idArr[i]).hidden=true
      }
    },
  }
}
</script>