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
   /*watch: {
     //뒤로가기 구현 
    '$route'(to, from) {
      console.log(to, from);
      console.log(to.fullPath);
      var beforeUrl=this.$route.
      location.href=to.fullPath;
    }
  },*/
  data() {
    return {
        choose:null,
        id:null,
    }
  },
  components:{
      'registStorePage': () => import('./registStorePage.vue'),
      'showSt': () => import('./showSt.vue'),
      'showStoreDetailPage':()=> import('./showStoreDetailPage.vue'),
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
        modules.changeUrl(this.$domain+'/companyPage/1?page=1&keyword=');
      }
    });
    this.$EventBus.$on('showStoreDetail',id=>{
      console.log(id);
      this.choose=2;
      //modules.changeUrl(this.$domain+'/companyPage/2?id='+id);
    });


  },

}
</script>
