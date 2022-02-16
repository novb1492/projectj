<template>
  <div >
   <div id="showStorsPage" class="margintopNavSize marginLeftSideSize">
      <ul style="float: left; text-align: center;">
      <span v-for="(shop,index) in this.shops" :key="index">
        <li style="float: left; margin-left: 10px;">
          <a href="#" @click="showStore(shop.store_id)">
            <img :src="shop.thumb_nail" id="shopImg" alt="">
            <br>
            {{shop.store_name}}
            <br>
            {{shop.store_address}}
            <br>
            <span v-if="shop.store_sleep==0">
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
    <span id="nowPage" ></span>/<span id="totalPage" ></span>
    <input type="button" @click="changePage(-1)" id="beforebutton" value="뒤로">
    <br>
    <input type="text" id="searchinput" @keyup.enter="search"> 
    <input type="button" @click="search" value="매장이름으로 검색">
   </div>
    </div>  
    
  </div>
</template>
<style>
#shopImg{width: 150px;height: 150px;}
</style>
<script>
import * as modules from '../../jslib';
export default {  
  name: 'showStorsPage',
  data() {
    return {
        email:null,
        storesArr:null,
        totalPage:null,
        shops:[],
        sessionStorageName:'showSt',        
    }
  },
  created(){
      this.reqestServer(this.getPage(),this.getKeyword());
    
  },
  mounted(){
    document.getElementById('showStorsPage').style.left=this.$sideVarWitdh+'px';
  },
  methods:{
    //뒤로/앞으로가기 버튼시 호출되는 함수
    backEvent(page,keyword){
      this.reqestServer(page,keyword);
    },
    reqestServer(page,keyword){
     return modules.requestAsyncToGet(this.$serverDomain+'/auth/store/gets/stores/'+page+'/'+keyword).then(result=>{
        console.log(result);
        //예외발생 혹은 검색결과없을때
        if(!result.flag){
          alert(result.message);
          return false;
        }
        this.shops=result.message.message;
        var totalPage=result.message.totalPage;
        if(page>=totalPage){
          modules.disabledById('nextbutton',true);
        }else{
          modules.disabledById('nextbutton',false);
        } 
        if(page<=1){
          modules.disabledById('beforebutton',true);
        }else{
          modules.disabledById('beforebutton',false);
        }
        //null인경우 공백으로 표시
        var keyword=this.getKeyword();
        if(modules.checkNull(keyword)){
          keyword="";
        }
        document.getElementById('searchinput').value=keyword; 
        document.getElementById('nowPage').innerHTML=page;
        document.getElementById('totalPage').innerHTML=totalPage;
        return true;
      });
    },
    showStore(id){
     this.$router.push('/companyPage/2?storeid='+id+'&page='+this.getPage()+'&keyword='+this.getKeyword());
    },
    search(){
     this.$router.push('/companyPage/1?&page=1&keyword='+modules.getValueById('searchinput'));
    },
    changePage(num){
      this.$router.push("/companyPage/1?page="+(this.getPage()*1+num)+"&keyword="+this.getKeyword());
    },
    getPage(){
      return modules.getParam('page');
    },
    getKeyword(){
      return modules.getParam('keyword');
    },
  },
}
</script>

