<template>
  <div id="container">
    <side-bar ref="side_var"/>
    <span v-if="choose==1">
      <show-st :page=page :keyword=keyword  ref="show_st"  />
    </span>
    <span v-else-if="choose==2">
      <show-store-detail-page v-on:changePageAndKeyword="changePageAndKeyword" v-on:openSubSide="openSubSide"/>
    </span>
    <span v-else>
      <component v-bind:is="chooseComponet" ></component>
    </span>
  </div>
</template>
<style>
</style>
<script>
import {  getParam } from '../../jslib';
import SideBar from '../layout/sideBar.vue';
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
    }
  },
  watch:{ 
    //뒤로가기 앞으로가기 버튼대응
    $route(to,from){
      console.log('watch');
      //매장 디테일에서 빠져 나올때 서브사이드바 지우는 함수 호출
      if(from.path=='/companyPage/2'){
        this.$EventBus.$emit('closeSubSide','storeDetailSubSide');
      }
      ///companyPage/1는 같은 라우터내에서 뒤로/앞으로가기시 페이지별로 내용이 달라야한다
      if(to.path=='/companyPage/1'&&from.path=='/companyPage/1'){
        this.$refs.show_st.backEvent(getParam('page'),getParam('keyword'));
      }
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
    changePageAndKeyword(pageAndKeyword){
      console.log(pageAndKeyword);
      this.page=pageAndKeyword.page;
      this.keyword=pageAndKeyword.keyword;
    },
    openSubSide(id){//storeDetailPage
      this.$refs.side_var.openSubSideVar(id);
    },
  }

}
</script>
