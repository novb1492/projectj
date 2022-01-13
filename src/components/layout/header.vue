<template>
  <div v-if="useHeader()">
  <div class="he">
    <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand "  href="/"><p class="pinkText">JangBoGo</p></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#" @click="test">sendMessage</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">{{loginFlag}}</a>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            User
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <div v-if="loginFlag">
                <li><a class="dropdown-item" href="#" @click="logout">로그아웃</a></li>
              <div v-if="!roleFlag">
                <!--일반회원 목록-->
                <li><a class="dropdown-item" href="#">장바구니가기</a></li>
                <li><a class="dropdown-item" href="#" @click="showHomeAddress()">받을 주소 불러오기</a></li>
                <li><a class="dropdown-item" href="#" @click="showHomeAddress()">마이페이지</a></li>
                <li><a class="dropdown-item" href="#" @click="showHomeAddress()">주문내역 보기</a></li>
                <!--<li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>-->
              </div>
              <div v-else>
                <!--기업회원 목록-->
                <li><a class="dropdown-item" href="/registStorePage">가게등록하기</a></li>
                <li><a class="dropdown-item" href="/showCompanyinforPage?page=1&keyword=">가게관리하기</a></li>
                <li><a class="dropdown-item" href="/showStoresPage">주문현황</a></li>
              </div>
            </div>
            <div v-else>
              <li><a class="dropdown-item" href="/loginPage" >로그인</a></li>
              <li><a class="dropdown-item" href="/beforeJoinPage" >회원가입</a></li>
            </div>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <div v-if="searchflag">
      <span class="d-flex">
        <input class="form-control me-2" id="search" type="search" placeholder="00슈퍼,00마트등 검색" @keyup.enter="callFirstDoor" aria-label="Search">
        <button class="btn btn-outline-success" @click="callFirstDoor" type="button">Search</button>
      </span>
      </div>
    </div>
  </div>
</nav>
  </div>
  
</div>
</template>
<script>
import * as modules from '../../jslib';
//import axios from 'axios';
//import Stomp from 'webstomp-client';
//import SockJS from 'sockjs-client';

export default {
  name: 'he',
  data() {
    return {
      loginFlag:false,
      uri:location.pathname,
      searchflag:false,
      role:"noLogin",
      email:null,
      roleFlag:false,
      websocket:null,
    }
  },
  created() {
    //부트스트랩
    var recaptchaScript = document.createElement('script');
    recaptchaScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js');
    recaptchaScript.setAttribute('integrity', 'sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM');
    recaptchaScript.setAttribute('crossorigin','anonymous');
    document.head.appendChild(recaptchaScript);
    recaptchaScript = document.createElement('link');
    recaptchaScript.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css');
    recaptchaScript.setAttribute('rel', 'stylesheet');
    recaptchaScript.setAttribute('integrity','sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC');
    recaptchaScript.setAttribute('crossorigin','anonymous');
    document.head.appendChild(recaptchaScript);
  },
  mounted(){
    console.log(this.uri);
    var detail='email';
    if(this.uri=='/myPage'){
      detail='all';
    }
    modules.requestAsyncToGet(this.$serverDomain+'/auth/user/check?detail='+detail).then(result=>{
      if(result.flag){
        var message=result.message.split(",");
        this.loginFlag=true;
        this.email=message[0];
        this.role=message[1];
         this.connect();
      }else{
        this.loginFlag=false;
      }
      //로그인여부
      this.$EventBus.$emit('loginInfor',this.getUserInfor());  
      },error=>{
      console.log(error);
      this.$EventBus.$emit('loginInfor',this.getUserInfor());  
    });
    if(this.uri=='/'){
      this.searchflag=true;
    }
  },
  methods : {
        connect() {
         this.websocket = new WebSocket("ws://localhost:8080/auth/ws/chat");
         this.websocket.onerror = function(error) {
           console.log(error);
         }
        /*this.websocket.onclose = function (event) {
          console.log(event);
        }*/
         this.websocket.onmessage = function(event) {
          console.log(event.data);
          JSON.parse(event.data);
        };
      
    },
    test(){
      this.websocket.send("helloMessage");
    },
    getUserInfor(){
      var arr=JSON.stringify({
        "loginFlag":this.loginFlag,
        "email":this.email,
        "role":this.role,
      });
      if(this.role==this.$ROLE_COMPANY){
        this.roleFlag=true;
      }
      return arr;
    },
    logout(){
      modules.requestAsyncToGet(this.$serverDomain+'/auth/user/logout').then(result=>{
        if(result.flag){
          this.loginFlag=false;
          location.reload();
        }else{
          alert(result.message);
        }
      });
    },
    openPopUP(uri,popName,width,height){
      modules.openPOPup(uri,popName,width,height);
    },
    callFirstDoor(){
      var storeKeyword=modules.getValueById('search');
      sessionStorage.setItem('findStore',storeKeyword);
      this.$EventBus.$emit('searchStore',storeKeyword);
    },
    useHeader(){
        var showOrNot=true;
        if(this.uri=='/resultPage'||this.uri=='/joinPage'||this.uri=='/loginPage'||this.uri=='/myPage'||this.uri=='/findPwdPage'||this.uri=='/findEmailPage'||this.uri=='/changePhonePage'||this.uri=='/showItemPage'||this.uri=='/showSucBuyPage'||this.uri=='/popUpClose'||this.uri=='/beforeJoinPage'||this.uri=='/authPage'||this.uri=='/findAccountPage'){
           showOrNot= false;
        }
        return showOrNot;
    },
    showHomeAddress(){
      if(!this.loginFlag){
        alert('로그인후 주소를 불러와주세요');
        return;
      }
      console.log('주소부여');
      sessionStorage.setItem("homeAddress","서울특별시 동작구 흑석동 서달로 2길 29");
      sessionStorage.setItem("destinationFlag",true);
      console.log(sessionStorage.getItem("homeAddress"));   
      location.reload();
    },
  }
}
</script>