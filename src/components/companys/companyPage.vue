<template>
  <div>
      <side-bar id="side"/>
      <span v-if="choose=='1'">
        <regist-store-page/>
      </span>
        <span v-if="choose=='2'">
        <show-st/>
      </span>
  </div>
</template>
<style>
#side{position: absolute;}
</style>
<script>
import SideBar from '../layout/sideBar.vue';
import RegistStorePage from './registStorePage.vue';
import ShowSt from './showSt.vue';
export default {
  components: {  SideBar, RegistStorePage, ShowSt },
  name: 'foot',
  data() {
    return {
        choose:null,
    }
  },
  mounted(){
      var pageNum=localStorage.getItem('pageNum');
      if(pageNum==null){
        pageNum='2';
      }
      console.log(pageNum);
      this.choose=pageNum;
      //새로고침시 이벤트 버스가 호출되지 않음
      this.$EventBus.$on('pageNum',pageNum=>{
      console.log("pageNum");
      this.choose=pageNum;
    });
  },
  methods:{
    chooseComponent(pageNum){
      this.choose=pageNum;
    }
  }
}
</script>