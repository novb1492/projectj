<template>
  <div class="showCompanyinforPage">
    <ul>
      <span v-for="shop in this.shops" :key="shop">
        <li>
          <a href="#">
            <img :src="shop.simg" alt="">
            <br>
            {{shop.sname}}
            <br>
            {{shop.saddress}}
            <br>
            <span v-if="shop.ssleep==0">
              영업중인 매장입니다
            </span>
            <span v-else>
              영업중지중인 매장입니다
            </span>
          </a>
        </li>
      </span>
        

    </ul>
    <br>
    <input type="button" @click="changePage(1)" id="nextbutton" value="다음">
    <span>{{page}}</span>/<span>{{totalPage}}</span>
    <input type="button" @click="changePage(-1)" id="beforebutton" value="뒤로">
  </div>
</template>
<style>
ul{float: left; text-align: center;} 
li{float: left; margin-left: 10px;}
</style>
<script>
import * as modules from '../../jslib';
export default {
  name: 'showCompanyinforPage',
  data() {
    return {
        email:null,
        storesArr:null,
        page:null,
        totalPage:null,
        shops:[],
        
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
        this.getShops(modules.getParam('page'));
    });
    
  },
  methods:{
    changePage(num){
      if(this.page==null){
        return;
      }
      this.getShops(this.page*1+num);
    },
    getShops(page){
      modules.requestAsyncToGet(this.$serverDomain+'/auth/store/get/all?page='+page).then(result=>{
        console.log(result);
        //예외발생 혹은 검색결과없을때
        if(!result.flag){
          alert(result.message);
          return;
        }
        this.page=page;
        this.shops=result.message.message;
        this.totalPage=result.message.totalPage;
        if(this.page>=this.totalPage){
          modules.disabledById('nextbutton',true);
        }else{
          modules.disabledById('nextbutton',false);
        } 
        if(this.page<=1){
          modules.disabledById('beforebutton',true);
        }else{
          modules.disabledById('beforebutton',false);
        }
      });
    },
  },

}
</script>