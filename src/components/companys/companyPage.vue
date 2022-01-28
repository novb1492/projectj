<template>
  <div id="container">
    <side-bar/>
    <component v-bind:is="chooseComponet"></component>
  </div>
</template>
<style>
</style>
<script>
import * as modules from '../../jslib';
import SideBar from '../layout/sideBar.vue';
export default {
  name: 'companyPage',
  data() {
    return {
        choose:null,
        id:null,
        beforePath:null,
    }
  },
  watch:{ 
    //뒤로가기 앞으로가기 버튼대응
    $route(to,from){
      console.log(to);
      console.log(from); 
      //매장 디테일에서 빠져 나올때 서브사이드바 지우는 함수 호출
      if(from.path=='/companyPage/2'){
        this.$EventBus.$emit('closeSubSide','storeDetailSubSide');
      }
      //뒤로가기 앞으로 가기 할때 마다 링크 이동 
        console.log(location.protocol+"//"+location.host + location.pathname+location.search);
       if(location.pathname=='/companyPage/0'){
          this.choose=0;
        }else if(location.pathname=='/companyPage/1'){
          this.choose=1;
          //같은 페이지에서 뒤로가기시에만 콜하는것
          if(to.path==from.path){
            console.log(1);
            this.$EventBus.$emit('backSituationDetailPage',null);
          }
        }else if(location.pathname=='/companyPage/2'){
          this.choose=2;
        }
      //  location.href=location.protocol+"//"+window.location.host + window.location.pathname+location.search;//새로고침일어나게 이동
    } 
  },
  components:{
      'registStorePage': () => import('./registStorePage.vue'),
      'showSt': () => import('./showSt.vue'),
      'showStoreDetailPage':()=> import('./showStoreDetailPage.vue'),
      'deliveryPage':()=>import('./deliveryPage.vue'),
      SideBar,

  },
  computed:{
    chooseComponet(){
      if(this.choose==0){
        return 'registStorePage';
      }else if(this.choose==1){
        return 'showSt';
      }else if(this.choose==2){
        return 'showStoreDetailPage';
      }else if(this.choose==3){
        return 'deliveryPage';
      }
      //잘못된경로로 왔을때
      return 'registStorePage';
    }
  },
  mounted(){
    this.choose=this.$route.params.id;
    //사이드바에서 클릭하면 여기로와서 컴포넌트 교체
      this.$EventBus.$on('pageNum',pageArr=>{
      console.log("pageNum");
      this.choose=pageArr.pageNum;
      if(this.choose==1){
        modules.changeUrl(this.$domain+'/companyPage/1?page=1&keyword=null');
      }
    });
    //매장 목록에서 매장클릭시
    this.$EventBus.$on('showStoreDetail',arr=>{
      console.log(arr);
      //this.choose=2;
      if(modules.checkNull(arr.keyword)){
        arr.keyword=null;
      }
      modules.changeUrl(this.$domain+'/companyPage/2?id='+arr.id+'&page='+arr.page+'&keyword='+arr.keyword);
    });
    //매장 디테일에서 목록 클릭시
   /* this.$EventBus.$on('outDetail',arr=>{
      console.log(arr);
      this.choose=1;
      if(modules.checkNull(arr.keyword)){
        arr.keyword=null;
      }
      modules.changeUrl(this.$domain+'/companyPage/1?page='+arr.page+'&keyword='+arr.keyword);
    });*/


  },

}
</script>
