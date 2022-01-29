<template>
  <div id="container">
    <side-bar/>
    <span v-if="choose==0">
      <regist-store-page/>
    </span>
    <span v-else-if="choose==1">
      <show-st/>
    </span>
      <span v-else-if="choose==2">
        <show-store-detail-page/>
    </span>
  </div>
</template>
<style>
</style>
<script>
import * as modules from '../../jslib';
import SideBar from '../layout/sideBar.vue';
import RegistStorePage from './registStorePage.vue';
import ShowSt from './showSt.vue';
import ShowStoreDetailPage from './showStoreDetailPage.vue';
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
      console.log('watch');
      console.log(to);
      console.log(from); 
      //매장 디테일에서 빠져 나올때 서브사이드바 지우는 함수 호출
      if(from.path=='/companyPage/2'){
        this.$EventBus.$emit('closeSubSide','storeDetailSubSide');
      }
      //뒤로가기 앞으로 가기 할때 마다 링크 이동 
        console.log(location.protocol+"//"+location.host + location.pathname+location.search);
        if(location.pathname=='/companyPage/1'){
          this.choose=1;
          //같은 페이지에서 뒤로가기시에만 콜하는것
          if(to.path==from.path){
            console.log(1);
            this.$EventBus.$emit('backSituationDetailPage',null);
          }
        }
      //  location.href=location.protocol+"//"+window.location.host + window.location.pathname+location.search;//새로고침일어나게 이동
    } 
  },
  components:{
    RegistStorePage,
    ShowSt,
    SideBar,
    ShowStoreDetailPage,

  },
 
  /*methods:{
    chooseComponet(){
      console.log('chooseComponet');
      if(this.choose==0){
        return 'registStorePage';
      }
    }
  },*/
  mounted(){
    this.choose=this.$route.params.id;
    console.log(this.choose);
    //사이드바에서 클릭하면 여기로와서 컴포넌트 교체
      this.$EventBus.$on('pageNum',pageArr=>{
      console.log("pageNum");
      console.log(pageArr);
      this.choose=pageArr.pageNum;  
    });
    //매장 목록에서 매장클릭시
    this.$EventBus.$on('showStoreDetail',arr=>{
      console.log(arr);
      this.choose=2;
      if(modules.checkNull(arr.keyword)){
        arr.keyword=null;
      }
      this.$router.push('/companyPage/2?id='+arr.id+'&page='+arr.page+'&keyword='+arr.keyword);

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
