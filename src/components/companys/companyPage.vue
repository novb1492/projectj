<template>
  <div id="container">
    <side-bar/>
    <span v-if="choose==1">
      <show-st :page=page :keyword=keyword  ref="show_st"  />
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
      console.log(to);
      console.log(from); 
      var id=this.$route.params.id;
      //매장 디테일에서 빠져 나올때 서브사이드바 지우는 함수 호출
      if(from.path=='/companyPage/2'){
        this.$EventBus.$emit('closeSubSide','storeDetailSubSide');
      }
      console.log(id);
      if(to.path=='/companyPage/1'&&from.path=='/companyPage/1'){
        this.$refs.show_st.backEvent(getParam('page'),getParam('keyword'));
      }
      this.choose=id;
    } 
  },
   components:{
      'registStorePage': () => import('./registStorePage.vue'),
      //'showSt': () => import('./showSt.vue'),
      'showStoreDetailPage':()=> import('./showStoreDetailPage.vue'),
      SideBar,
      ShowSt,
  },
  computed:{
    chooseComponet(){
      if(this.choose==0){
        return 'registStorePage';
      }else if(this.choose==2){
        return 'showStoreDetailPage';
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


}
</script>
