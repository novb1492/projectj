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
      this.$EventBus.$on('pageNum',pageNum=>{
      console.log("pageNum");
      this.choose=pageNum;
      //새로고침시 대응로직
      this.witchStep(this.choose);
   
    });
  },
  methods:{
    /*changeUrl(pageNum){
      sessionStorage.setItem("pageNum",pageNum);
      modules.changeUrl(location.pathname+"?selectPage="+pageNum);
    },
    chooseComponent(pageNum){
      this.choose=pageNum;
    }*/
  }
}
</script>
