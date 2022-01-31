<template>
  <div >
   <div id="showStorsPage" class="margintopNavSize marginLeftSideSize">
      <ul style="float: left; text-align: center;">
      <span v-for="(shop,index) in this.shops" :key="index">
        <li style="float: left; margin-left: 10px;">
          <a href="#" @click="showStore(shop.sid)">
            <img :src="shop.thumb_nail" alt="">
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
    <span>{{inPage}}</span>/<span>{{totalPage}}</span>
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
export default {  
  name: 'showStorsPage',
  props:['page','keyword'],
  data() {
    return {
        email:null,
        storesArr:null,
        totalPage:null,
        shops:[],
        sessionStorageName:'showSt',
        inPage:this.page,
        inKeyword:this.keyword,
        
    }
  },
  created(){
    //비정상접근시 페이지,키워드임의로 부여
    if(modules.checkNull(this.inPage)){
      this.inPage=1;
      this.inKeyword=null;
      this.getStores(this.inPage,this.inKeyword);
    }else{//정상적인접근일때
      this.reqestServer(this.inPage,this.inKeyword);
    }
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
     return modules.requestAsyncToGet(this.$serverDomain+'/auth/store/gets/'+page+'/'+keyword).then(result=>{
        console.log(result);
        //예외발생 혹은 검색결과없을때
        if(!result.flag){
          alert(result.message);
          return false;
        }
        this.inPage=page;
        this.inKeyword=keyword;
        this.shops=result.message.message;
        this.totalPage=result.message.totalPage;
        if(this.inPage>=this.totalPage){
          modules.disabledById('nextbutton',true);
        }else{
          modules.disabledById('nextbutton',false);
        } 
        if(this.inPage<=1){
          modules.disabledById('beforebutton',true);
        }else{
          modules.disabledById('beforebutton',false);
        }
        //null인경우 공백으로 표시
        var k=null;
        if(this.inKeyword=="null"){
          k="";
        }else{
          k=this.inKeyword;
        }
        document.getElementById('searchinput').value=k; 
        return true;
      });
    },
    showStore(id){
     var arr = { id: id, page: this.inPage, keyword: this.inKeyword};
     this.$router.push('/companyPage/2?id='+arr.id+'&page='+arr.page+'&keyword='+arr.keyword);
    },
    search(){
      this.getStores(1,modules.getValueById('searchinput'));
    },
    changePage(num){
      console.log(num);
      if(this.inPage==null){
        return;
      }  
      var np=this.inPage*1+num;
      this.reqestServer(np,this.inKeyword).then(result=>{
        if(result){
          modules.changeUrl(this.$domain+"/companyPage/1?page="+np+"&keyword="+this.inKeyword);
        }
      })
    },
    getStores(page,keyword){
      this.reqestServer(page,keyword).then(result=>{
        if(result){
          this.$router.push("/companyPage/1?page="+page+"&keyword="+keyword);
        }
      });
    },
  },
}
</script>

