<template>
  <div v-if="useHeader()">
  <div class="he">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand "  href="/"><p class="pinkText">JangBoGo</p></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            User
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <div v-if="loginFlag">
            <li><a class="dropdown-item" href="#">장바구니가기</a></li>
            <li><a class="dropdown-item" href="#" @click="showHomeAddress()">받을 주소 불러오기</a></li>
            <li><a class="dropdown-item" href="#" @click="showHomeAddress()">마이페이지</a></li>
            <li><a class="dropdown-item" href="#" @click="showHomeAddress()">주문내역 보기</a></li>
            <!--<li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>-->
            </div>
            <div v-else>
              <li><a class="dropdown-item" href="#">로그인</a></li>
              <li><a class="dropdown-item" href="#" @click="showHomeAddress()">회원가입</a></li>
            </div>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" id="search" type="search" placeholder="Search" @keyup="callFirstDoor(null)" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
{{loginFlag}}
  </div>
</div>
</template>
<script>
import * as modules from '../../jslib';
export default {
  name: 'he',
  data() {
    return {
      loginFlag:false,
      searchText:null,
    }
  },
  created() {
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
    var storeKeyword=sessionStorage.getItem('findStore');
    if(storeKeyword!=null){
       this.$EventBus.$emit('searchStore',storeKeyword);
    }
  },
  methods : {
    callFirstDoor(store){
      console.log(store);
      var storeKeyword=null;
      if(store!=null){
        storeKeyword=store;
      }else{
        storeKeyword=modules.getValueById('search');
      }
      this.$EventBus.$emit('searchStore',storeKeyword);
    },
    useHeader(){
        var showOrNot=true;
        var uri=location.pathname;
        if(uri=='/joinPage'||uri=='/loginPage'||uri=='/myPage'||uri=='/findPwdPage'||uri=='/findEmailPage'||uri=='/changePhonePage'||uri=='/showItemPage'||uri=='/showSucBuyPage'||uri=='/popUpClose'){
           showOrNot= false;
        }else{
          modules.requestGet('http://localhost:8080/loginCheck').then(result=>{
            var res=result.data;
              if(res.flag){
                  this.loginFlag=true;
              }
          });
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