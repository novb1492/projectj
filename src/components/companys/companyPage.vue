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
import * as modules from '../../jslib';
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
  created(){
    this.$EventBus.$on('loginInfor',loginInfor=>{
      loginInfor=JSON.parse(loginInfor);
        console.log(loginInfor);
        //비로그인,권한이없는유저 팅겨내기
        if(loginInfor.loginFlag!=true||loginInfor.role==this.$ROLE_USER){
            modules.wrongAccese();
            return;
        }
    });
  },
  mounted(){
      //새로고침 대응 로직
      var pageNum=localStorage.getItem('pageNum');
      if(pageNum==null){
        pageNum='2';
      }
      console.log(pageNum);
      this.choose=pageNum;
      //사이드바 클릭시 페이지 내용변경
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