<template>
  <div >
   <div id="showStorsPage" class="margintopNavSize marginLeftSideSize">
      <ul style="float: left; text-align: center;">
      <span v-for="(shop,index) in this.shops" :key="index">
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
   <div id="buttonArea">
    <input type="button" @click="changePage(1)"   id="nextbutton" value="다음">
    <span>{{page}}</span>/<span>{{totalPage}}</span>
    <input type="button" @click="changePage(-1)" id="beforebutton" value="뒤로">
    <br>
    <input type="text" id="searchinput" @keyup.enter="search"> 
    <input type="button" @click="search" value="매장이름으로 검색">
   </div>
    </div>  
  </div>
</template>
<style>
img{width: 150px;height: 150px;}
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
        sessionStorageName:'showSt',
    }
  },
  created(){
    var key=modules.getParam('keyword');
    var page=modules.getParam('page');
    this.getStores(page,key);
  },
  mounted(){
    document.getElementById('showStorsPage').style.left=this.$sideVarWitdh+'px';
  },
  methods:{
    showStore(id){
      var arr = { id: id, page: this.page, keyword: this.keyword};
      this.$EventBus.$emit('showStoreDetail',arr);  
    },
    search(){
      this.getStores(1,modules.getValueById('searchinput'));
    },
    changePage(num){
      if(this.page==null){
        return;
      }
      this.getStores(this.page*1+num,this.keyword);
    },
    getStores(page,keyword){
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
        //null인경우 공백으로 표시
        if(this.keyword=="null"){
          this.keyword='';
        }
        document.getElementById('searchinput').value=this.keyword;
        modules.changeUrl(location.pathname+"?page="+this.page+"&keyword="+this.keyword);
      });
    },
  },
}
</script>

