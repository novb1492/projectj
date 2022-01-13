<template>
  <div >
   sss
    <div id="showStorsPage">
      <ul style="float: left; text-align: center;">
      <span v-for="shop in this.shops" :key="shop">
        <li style="float: left; margin-left: 10px;">
          <a href="#" @click="showStore(shop.sid)">
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
    <input type="button" @click="changePage(1)" style="margin-top:300px;" id="nextbutton" value="다음">
    <span>{{page}}</span>/<span>{{totalPage}}</span>
    <input type="button" @click="changePage(-1)" id="beforebutton" value="뒤로">
    </div>
    
  </div>
</template>
<style>
img{width: 150px;height: 150px;}
#showStorsPage{position: absolute;}
</style>
<script>
import * as modules from '../../jslib';
//import sideVar from '../layout/sideBar.vue';
export default {  
  //components: { sideVar },
  name: 'showStorsPage',
  data() {
    return {
        email:null,
        storesArr:null,
        page:null,
        totalPage:null,
        shops:[],
        keyword:null,
    }
  },
  created(){
    alert('bb');
    this.$EventBus.$on('loginInfor',loginInfor=>{
    loginInfor=JSON.parse(loginInfor);
    console.log('aaa'+loginInfor);
    //비로그인,권한이없는유저 팅겨내기
        if(loginInfor.loginFlag!=true||loginInfor.role==this.$ROLE_USER){
            modules.wrongAccese();
            return;
        }
        var key=modules.getParam('keyword');
        this.getShops(modules.getParam('page'),key);
        document.getElementById('searchinput').value=key;
    });
  },
  mounted(){
      document.getElementById('showStorsPage').style.left=this.$sideVarWitdh+'px';
  },
  methods:{
    showStore(id){
      location.href='/showStoreDetailPage?id='+id;
    },
    search(){
      this.getShops(1,modules.getValueById('searchinput'));
    },
    changePage(num){
      if(this.page==null){
        return;
      }
      this.getShops(this.page*1+num,this.keyword);
    },
    getShops(page,keyword){
      if(modules.checkNull(keyword)){
        keyword=null;
      }
      modules.requestAsyncToGet(this.$serverDomain+'/auth/store/gets/'+page+'/'+keyword).then(result=>{
        console.log(result);
        //예외발생 혹은 검색결과없을때
        if(!result.flag){
          alert(result.message);
          return;
        }
        this.page=page;
        this.shops=result.message.message;
        this.totalPage=result.message.totalPage;
        this.keyword=keyword;
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
        modules.changeUrl(this.$domain+'/showCompanyinforPage?page='+this.page+'&keyword='+this.keyword);
      });
    },
  },

}
</script>