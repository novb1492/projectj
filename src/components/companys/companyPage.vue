<template>
  <div  id="container">
    <side-bar/>
    <component v-bind:is="witchStep"></component>
  </div>
</template>
<style>
</style>
<script>
import SideBar from '../layout/sideBar.vue';
export default {
  name: 'foot',
  data() {
    return {
        choose:null,
    }
  },
  components:{
      'registStorePage': () => import('./registStorePage.vue'),
      'showSt': () => import('./showSt.vue'),
      SideBar,

  },
  computed:{
    witchStep(){
       if(this.choose==0){
        return 'registStorePage';
      }
      return 'showSt';
    }
  },
  mounted(){
    this.choose=this.$route.params.id;
    //사이드바에서 클릭하면 여기로와서 컴포넌트 교체
      this.$EventBus.$on('pageNum',pageNum=>{
      console.log("pageNum");
      this.choose=pageNum;
      this.witchStep(this.choose);
   
    });
  },
}
</script>
