<template>
  <div  class="sideBar">
  <div class="flex-shrink-0 p-3 bg-white" style="width: 250px; float: left;">
    <span v-if="checkPage()==homeNum"><!--firstdoor사이드바-->
    <a href="/" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
      <svg class="bi me-2" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
      <span class="fs-5 fw-semibold">Collapsible</span>
    </a>
    <ul class="list-unstyled ps-0">
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
          22
        </button>
        <div class="collapse show" id="home-collapse" style="">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-dark rounded">Overview</a></li>
            <li><a href="#" class="link-dark rounded">Updates</a></li>
            <li><a href="#" class="link-dark rounded">Reports</a></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
          Dashboard
        </button>
        <div class="collapse" id="dashboard-collapse" style="">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-dark rounded">Overview</a></li>
            <li><a href="#" class="link-dark rounded">Weekly</a></li>
            <li><a href="#" class="link-dark rounded">Monthly</a></li>
            <li><a href="#" class="link-dark rounded">Annually</a></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
          Orders
        </button>
        <div class="collapse" id="orders-collapse" style="">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-dark rounded">New</a></li>
            <li><a href="#" class="link-dark rounded">Processed</a></li>
            <li><a href="#" class="link-dark rounded">Shipped</a></li>
            <li><a href="#" class="link-dark rounded">Returned</a></li>
          </ul>
        </div>
      </li>
      <li class="border-top my-3"></li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
          Account
        </button>
        <div class="collapse" id="account-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-dark rounded">New...</a></li>
            <li><a href="#" class="link-dark rounded">Profile</a></li>
            <li><a href="#" class="link-dark rounded">Settings</a></li>
            <li><a href="#" class="link-dark rounded">Sign out</a></li>
          </ul>
        </div>
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
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
          주문조회
        </button>
        <div class="collapse" id="dashboard-collapse" style="">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-dark rounded">완료된주문</a></li>
            <li><a href="#" class="link-dark rounded">배달이전주문</a></li>
            <li><a href="#" class="link-dark rounded">배달중인주문</a></li>
            <li><a href="#" class="link-dark rounded">환불된주문</a></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
          매출차트보기
        </button>
        <div class="collapse" id="orders-collapse" style="">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-dark rounded">기간별</a></li>
            <li><a href="#" class="link-dark rounded">품목별</a></li>
            <li><a href="#" class="link-dark rounded">Shipped</a></li>
            <li><a href="#" class="link-dark rounded">Returned</a></li>
          </ul>
        </div>
      </li>
      <li class="border-top my-3"></li>
      <span id="storeDetailSubSide" >
        <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded" @click="changePage(3)">
          배달현황 
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
      </span>
    </ul>
    </span>
  </div>
  </div>
</template>
<style>
</style>
<script>
import { getParam } from '../../jslib';
export default {
  name: 'sideBar',
  data() {
    return {
      uri:null,
      choose:0,
      homeNum:0,
      companyNum:1,
      subSideNum:0,
      storeDetailNum:1,
      storeId:0,
    }
  },
  created(){
    this.uri=location.pathname;
  },
  mounted(){
    document.getElementById('storeDetailSubSide').hidden=true;
  },
  methods:{
    checkPage(){
      if(this.uri=='/'){
        this.choose=this.homeNum;
      }else if(this.uri.indexOf('/company')!=-1){
        this.choose=this.companyNum;
      }
      return this.choose;
    },
    changePage(pageNum){
      if(pageNum==1){
        this.$router.push('/companyPage/1?page=1&keyword=null');
      }else if(pageNum==3){
      this.$router.push('/companyPage/3?&page=1&start=null&end=null&storeid='+getParam('storeid'));
      }else if(pageNum==4){
        this.$emit('clickStore',null);
      }else if(pageNum==6){
        this.$router.push('/companyPage/6?storeid='+getParam('storeid'));
      }else{
        this.$router.push('/companyPage/'+pageNum);
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