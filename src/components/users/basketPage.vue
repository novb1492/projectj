<template>
  <div>
    *쿠폰 중복사용시 ,로구분해서 입력해주세요
    <br>
    구매개수보다 쿠폰을 많이 사용할 수없습니다
    <table border="1">
        <th>id</th>
        <th>상품이름</th>
        <th>수량</th>
        <th>가격</th>
        <th>담은날짜</th>
        <th>선택</th>
        <th>쿠폰</th>
        <th>삭제</th>
        <tr v-for="(basket,index) in baskets" :key="index" :id="basket.id+'area'"> 
          <td >{{basket.id}}</td>
            <td >
              <img src="" alt="상품이미지" >
              {{basket.product_name}}
            </td>
            <td><input type="number"  :id="basket.id+'count'" :value="basket.basket_count" @change="changeCount(basket.id)"></td>
            <td><input type="text"  :id="basket.id+'price'" :value="basket.price+'원'" disabled></td>
            <td>{{basket.basket_created}}</td>
            <td><input type="checkbox" class="checkBasket" :value="basket.id"></td>
            <td><input type="text" :id="basket.id+'coupon'" value="" @change="confrimCoupon(basket.id)">
            <br>
              <span :id="basket.id+'error'"></span>
            </td>
            <td><input type="button" value="삭제" @click="deleteBasket(basket.id)"></td>
        </tr>
    </table>
    <!--<input type="button" id="nextButton" value="next" @click="changePage(1)">
    <input type="button" id="beforeButton" value="before" @click="changePage(-1)">-->
    <br>
    <br>
    <h6>결제방법 선택</h6>
    card:<input type="radio" name="payKind" class="payKind" value="card">
    vbank:<input type="radio" name="payKind" class="payKind" value="vbank">
    kpay:<input type="radio" name="payKind" class="payKind" value="kpay">
    <br>
    <br>
    <h6>품절시 대체 선택</h6>
    대체상품:<input type="radio" name="soldout" class="soldout" value="replace">
    환불:<input type="radio" name="soldout" class="soldout" value="cancle">
    전화:<input type="radio" name="soldout" class="soldout" value="contact">
    <br>
    <br>
    <h6>받을 주소 선택</h6>
    기본주소<input type="radio" name="destinationAddress"  class="destinationAddress" value="default" @click="showDefaultAddress" >
    다른주소<input type="radio" name="destinationAddress" class="destinationAddress" value="other" @click="chooseOtherAddress">
    <span v-if="otherAddressFlag">
         <post-code-component />
    </span>
    <br>
    <div id="showAddressArea">
      우편번호
      <br>
      <input type="text" id="postcode" disabled>
      <br>
      주소
      <br>
      <input type="text" id="address" disabled>
      <br>
      상세주소
      <br>
      <input type="text" id="detailAddress">
    </div>
    <br>
    <input type="button" value="선택 구매하기" @click="buySelect" />  
    <input type="button" value="전체구매하기" @click="buyAll" />
  </div>
</template>
<style>

</style>
<script src="https://tbnpg.settlebank.co.kr/resources/js/v1/SettlePG.js"></script>
<script>
import { changeValueById, checkNull, disabledById, getParam, getValueById, openPOPup, payForCard, payForVbank, requestAsyncToDelete, requestAsyncToGet, requestAsyncToPost, requestAsyncToPut } from '../../jslib'
import PostCodeComponent from '../postCodeComponent.vue';
export default {
  name: 'basketPage',
    components: { PostCodeComponent },
  data() {
    return {
      baskets:[],
      otherAddressFlag:false,
    }
  },
  mounted(){
    this.requestServer(getParam('page'));
    var recaptchaScript = document.createElement('script');
    recaptchaScript.setAttribute('src', 'https://tbnpg.settlebank.co.kr/resources/js/v1/SettlePG.js');
    document.head.appendChild(recaptchaScript);
  },
  methods:{
    showDefaultAddress(){
      this.otherAddressFlag=false;
      requestAsyncToGet(this.$serverDomain+'/auth/user/check?detail=address').then(result=>{
        if(result.flag){
          changeValueById('postcode',result.postcode);
          changeValueById('address',result.address);
          changeValueById('detailAddress',result.detailAddress);
        }else{
          alert(result.message);
        }
      });
    },
    chooseOtherAddress(){
      changeValueById('postcode','');
      changeValueById('address','');
      changeValueById('detailAddress','');
      this.otherAddressFlag=true;
    },
    buyAll(){
      var checkbox=document.getElementsByClassName('payKind');
      var flag=true;
      var payKind=null;
      for(var ii in checkbox){
        if(checkbox[ii].checked){
          flag=false;
          payKind=checkbox[ii].value;
          break;
        }
      }
      if(flag){
        alert('결제수단을 선택해 주세요');
        return;
      }
      flag=true;
      var soldOut=null;
      checkbox=document.getElementsByClassName('soldout');
      for(var iii in checkbox){
        if(checkbox[iii].checked){
          flag=false;
          soldOut=checkbox[iii].value;
          break;
        }
      }
      if(flag){
        alert('품절시 요청사항을 선택해주세요');
        return;
      }
      var infor=[];
      checkbox=document.getElementsByClassName('checkBasket');
      for(var i in checkbox){
          var id=checkbox[i].value;
          if(checkNull(id)){
            continue;
          }
          var buyInfor=new Object;
          buyInfor.id=id;
          var value=getValueById(id+'coupon');
          if(!checkNull(value)){
            buyInfor.coupon=value;
          }
          infor[infor.length]=buyInfor;
      }
      let data=JSON.stringify({
        "coupons":infor,
        "payKind":payKind,
        "soldOut":soldOut,
        "postcode":getValueById('postcode'),
        "address":getValueById('address'),
        "detailAddress":getValueById("detailAddress"),
      });
      requestAsyncToPost(this.$serverDomain+'/auth/payment',data).then(result=>{
        if(!result.flag){
          alert(result.message);
          return;
        }
        console.log(result);
        if(payKind=='card'){
          payForCard(SETTLE_PG,result);
        }else if(payKind=='vbank'){
          payForVbank(SETTLE_PG,result);
        }else if(payKind=='kpay'){
          // 어플인지,모바일인지,피씨인지 판단 로직필요 일단 pc로 테스트
          openPOPup(result.pc,500,500);
        }
      })
    },
    buySelect(){
      var checkbox=document.getElementsByClassName('payKind');
      var flag=true;
      var payKind=null;
      for(var ii in checkbox){
        if(checkbox[ii].checked){
          flag=false;
          payKind=checkbox[ii].value;
          break;
        }
      }
      if(flag){
        alert('결제수단을 선택해 주세요');
        return;
      }
      flag=true;
      var soldOut=null;
      checkbox=document.getElementsByClassName('soldout');
      for(var iii in checkbox){
        if(checkbox[iii].checked){
          flag=false;
          soldOut=checkbox[iii].value;
          break;
        }
      }
      if(flag){
        alert('품절시 요청사항을 선택해주세요');
        return;
      }
      flag=true;
      var infor=[];
      checkbox=document.getElementsByClassName('checkBasket');
      for(var i in checkbox){
        if(checkbox[i].checked){
          flag=false;
          var id=checkbox[i].value;
          var buyInfor=new Object;
          buyInfor.id=id;
          var value=getValueById(id+'coupon');
          if(!checkNull(value)){
            buyInfor.coupon=value;
          }
          infor[infor.length]=buyInfor;
        }
      }
      if(flag){
        alert('선택한 제품이 없습니다');
        return;
      }
      let data=JSON.stringify({
        "coupons":infor,
        "payKind":payKind,
        "soldOut":soldOut,
        "postcode":getValueById('postcode'),
        "address":getValueById('address'),
        "detailAddress":getValueById("detailAddress"),
      });
      requestAsyncToPost(this.$serverDomain+'/auth/payment',data).then(result=>{
        if(!result.flag){
          alert(result.message);
          return;
        }
      });
    },
    confrimCoupon(id){
      requestAsyncToGet(this.$serverDomain+'/auth/payment/coupon/'+getValueById(id+'coupon')).then(result=>{
        if(result.flag){
          document.getElementById(id+'coupon').style.backgroundColor='blue';
          document.getElementById(id+'error').innerHTML='';
        }else{
          document.getElementById(id+'coupon').style.backgroundColor='red';
          document.getElementById(id+'error').innerHTML=result.message;
        }
      });
    },
    re(){
      this.requestServer(getParam('page'));
    },
    deleteBasket(id){
      requestAsyncToDelete(this.$serverDomain+'/auth/user/basket/'+id).then(result=>{
        console.log(result);
        if(!result.flag){
          alert(result.message);
          return;
        }
       this.requestServer(1);
      });
    },
    changePage(num){
      this.$router.push("/userPage/0?page="+(getParam('page')*1+num));
    },
    changeCount(id){
      var count=getValueById(id+'count');
      requestAsyncToPut(this.$serverDomain+'/auth/user/basket/'+id+'/'+count).then(result=>{
        if(result.flag){
          changeValueById(id+'price',result.message+'원');
        }else{
          if(count==0){
             changeValueById(id+'price','0원');
          }
          alert(result.message);
        }
      });
    },
    requestServer(page){
      requestAsyncToGet(this.$serverDomain+'/auth/user/baskets/'+page).then(result=>{
        if(!result.flag){
          alert(result.message);
          return;
        }
        this.baskets=result.baskets;
        /*var totalPage=result.totalPage;
        if(page==totalPage){
          disabledById('nextButton',true);
        }else{
          disabledById('nextButton',false);
        }
        if(page==1){
          disabledById('beforeButton',true);
        }else{
          disabledById('beforeButton',false);
        }*/
      });
    },
  },
}
</script>