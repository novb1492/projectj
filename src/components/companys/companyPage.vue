<template>
  <div id="container">
    <side-bar ref="side_var"  v-on:clickStore="clickStore"/>
    <span v-if="choose==1">
      <show-st ref="show_st"  />
    </span>
    <span v-else-if="choose==2">
      <show-store-detail-page v-on:changePageAndKeyword="changePageAndKeyword" v-on:changeStoreId="changeStoreId" v-on:openSubSide="openSubSide" ref="store_detail"/>
    </span>
    <span v-else-if="choose==3">
      <delivery-page ref="delivery_page" v-on:openSubSide="openSubSide" v-on:changeStoreId="changeStoreId"  />
    </span>
    <span v-else-if="choose==4">
        <delivery-detail-page ref="deliver_detail"/>
    </span>
    <span v-else-if="choose==5">
        <flyer-st-page ref="flyer_st"  v-on:openSubSide="openSubSide" />
    </span>
    <span v-else-if="choose==6">
      <regist-flyer-page ref="regist_flyer" v-on:changeStoreId="changeStoreId" v-on:openSubSide="openSubSide" />
    </span>
    <span v-else-if="choose==7">
      <flyer-detail-page ref="flyer_detail" v-on:changeStoreId="changeStoreId" v-on:openSubSide="openSubSide" />
    </span>
    <span v-else>
      <component v-bind:is="chooseComponet" ref="childComponet" ></component>
    </span>
  </div>
</template>
<style>
</style>
<script>
import {  getParam } from '../../jslib';
import SideBar from '../layout/sideBar.vue';
import DeliveryDetailPage from './deliveryDetailPage.vue';
import DeliveryPage from './deliveryPage.vue';
import FlyerDetailPage from './flyerDetailPage.vue';
import FlyerStPage from './flyerStPage.vue';
import RegistFlyerPage from './registFlyerPage.vue';
import ShowSt from './showSt.vue';
import ShowStoreDetailPage from './showStoreDetailPage.vue';

export default {
  name: 'companyPage',
  data() {
    return {
        choose:null,
        id:null,
        beforePath:null,
        page:1,
        keyword:null,
        deliveryPage:1,
        deliveryStart:null,
        deliveryEnd:null,
        storeId:0,
    }
  },
  watch:{ 
    //뒤로가기 앞으로가기 버튼대응
    $route(to,from){
      console.log('watch');
      //서브사이드바 지우는 함수 호출
      this.subSideVarOnOff(to,from);
      this.paging(to,from);
      this.choose=this.$route.params.id;
    } 
  },
   components:{
      'registStorePage': () => import('./registStorePage.vue'),
      //'showSt': () => import('./showSt.vue'),
      'showStoreDetailPage':()=> import('./showStoreDetailPage.vue'),
      SideBar,
      ShowSt,
      ShowStoreDetailPage,
      DeliveryPage,
      DeliveryDetailPage,
      RegistFlyerPage,
      FlyerStPage,
      FlyerDetailPage,
  },
  computed:{
    chooseComponet(){
      if(this.choose==0){
        return 'registStorePage';
      }
      //잘못된경로로 왔을때
      return 'registStorePage';
    }
  },
  mounted(){
    var num=this.$route.params.id;
    if(num==1){
      this.page=getParam('page');
      this.keyword=getParam('keyword');
    }
    this.choose=num;
    console.log(this.choose);
  },
  methods:{
    paging(to,from){
       ///companyPage/1는 같은 라우터내에서 뒤로/앞으로가기시 페이지별로 내용이 달라야한다
      if(to.path=='/companyPage/1'&&from.path=='/companyPage/1'){
        this.$refs.show_st.backEvent(getParam('page'),getParam('keyword'));
      }else if(to.path=='/companyPage/3'&&from.path=='/companyPage/3'){
        this.$refs.delivery_page.backEvent(getParam('page'),getParam('start'),getParam('end'));
      }else if(to.path=='/companyPage/5'&&from.path=='/companyPage/5'){
        this.$refs.flyer_st.backEvent(getParam('page'),getParam('start'),getParam('end'));
      }
    },
    subSideVarOnOff(to,from){
       if(from.path=='/companyPage/2'&&from.path!=to.path&&to.path!='/companyPage/3'&&to.path!='/companyPage/4'&&to.path!='/companyPage/6'){
        this.$refs.side_var.closeSubSide(this.$refs.store_detail.getSubSideVarIds());
      }else if(from.path=='/companyPage/3'&&from.path!=to.path&&to.path!='/companyPage/2'&&to.path!='/companyPage/4'&&to.path!='/companyPage/6'){
        this.$refs.side_var.closeSubSide(this.$refs.delivery_page.getSubSideVarIds());
      }else if(from.path=='/companyPage/4'&&from.path!=to.path&&to.path!='/companyPage/2'&&to.path!='/companyPage/3'&&to.path!='/companyPage/6'){
       this.$refs.side_var.closeSubSide(this.$refs.deliver_detail.getSubSideVarIds());
      }else if(from.path=='/companyPage/6'&&from.path!=to.path&&to.path!='/companyPage/2'&&to.path!='/companyPage/3'&&to.path!='/companyPage/4'){
        this.$refs.side_var.closeSubSide(this.$refs.regist_flyer.getSubSideVarIds());
      }
    },
    changePageAndKeyword(pageAndKeyword){//storest
      console.log(pageAndKeyword);
      this.page=pageAndKeyword.page;
      this.keyword=pageAndKeyword.keyword;
    },
    openSubSide(ids){//storeDetailPage
      this.$refs.side_var.openSubSideVar(ids);
    },
    checkLoginAndRoll(logingInfor){//입장시 판별
      console.log(logingInfor);
      if(logingInfor.loginFlag==false||logingInfor.role!=this.$ROLE_COMPANY){
        alert('기업회원이 아닙니다');
        location.href='/';
      }
    },
    changeStoreId(id){
      this.storeId=id;
    },
    clickStore(){
      this.$router.push('/companyPage/2?storeid='+this.storeId+'&page='+this.page+'&keyword='+this.keyword);
    }
  }

}
</script>
