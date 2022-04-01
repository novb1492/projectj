<template>
  <div class="margintopNavSize marginLeftSideSize">
      <div class="row">
          <div  class="col" v-for="(payment,index) in paymentArr" :key="index">
              <a href="javascript:void();" @click="showDetail(payment.mcht_trd_no)">
                <ul>
                    <li>주문번호:{{payment.mcht_trd_no}}</li>
                    <li>결제방식:{{payment.method}}</li>
                    <li>입금여부:fdf</li>
                    <li>취소 횟수:{{payment.cncl_ord}}</li>
                    <li>배송주소:{{payment.payment_address}}</li>
                    <li>배송상세주소:{{payment.payment_detail_address}}</li>
                    <li>재고부족시 요청사항 :{{payment.soldout_action}}</li>
                    <li>주문자 이메일:{{payment.user_email}}</li>
                    <span v-if="payment.payment_total_price==0">
                      <li>완전 취소된 주문입니다</li>
                    </span>
                    <span v-else-if="payment.method=='vbank'">
                        <span v-if="payment.vbank_status==0">
                          <li>입금대기</li>
                        </span>
                        <span v-else>
                          <li>입금완료</li>
                        </span>
                    </span>
                    <span v-else>
                      <li>입금완료</li>
                    </span>
                </ul>
              </a>
              <input type="checkbox" :id="payment.mcht_trd_no+'checkbox'" @click="clickCheck(payment.mcht_trd_no)" >
              <span v-if="checkState(payment.mcht_trd_no)">
              </span>
          </div>
      </div>
      <input type="button" value="다음" id="nextButton" @click="changePage(1)">
      <input type="button" value="이전" id="beforeButton" @click="changePage(-1)">
      <br>
      <input type="button" value="배달준비하기" @click="makeRoom">
  </div>
</template>
<style>

</style>
<script>
import { disabledById, getParam, openPOPup, requestAsyncToGet, requestAsyncToPost } from '../../jslib'
export default {
  name: 'ordersPage',
    data() {
    return {
      subSideVarIds:['storeDetailSubSide'],
      storeId:getParam('storeid'),
      paymentArr:[],
      checkedArr:[],
    }
  },
  created(){
    //사이드바 생성
    this.$emit('openSubSide',this.subSideVarIds);
    //새로고침 대응
    this.$emit('changeStoreId',this.storeId);
    this.requestTo(getParam('page'),null);
  },
  methods:{
    makeRoom(){
      let data=JSON.stringify({
        "mchtTrdNos":this.checkedArr,
      });
      requestAsyncToPost(this.$serverDomain+'/auth/store/deliver/ready/'+this.storeId,data).then(result=>{
        alert(result.message);
      });
    },
    clickCheck(mchtTrdNo){
      var num=this.checkcheckedArr(mchtTrdNo);
      if(num==-1){
          this.checkedArr[this.checkedArr.length]=mchtTrdNo;
      }else{
        this.checkedArr.splice(num,num+1);
      }
      console.log(this.checkedArr);
    },
    checkState(mchtTrdNo){
      this.$nextTick(()=>{
        if(this.checkcheckedArr(mchtTrdNo)!=-1){
          document.getElementById(mchtTrdNo+'checkbox').checked=true;
        }else{
          document.getElementById(mchtTrdNo+'checkbox').checked=false;
        }
      });
      return true;
    },
    checkcheckedArr(mchtTrdNo){
      return this.checkedArr.indexOf(mchtTrdNo);
    },
    backEvent(page,keyword){
      this.requestTo(page,keyword);
    },
    changePage(num){
      this.$router.push("/companyPage/10?storeid="+this.storeId+"&page="+(getParam('page')*1+num)+"&keyword="+getParam("keyword"));
    },
    showDetail(mcht_trd_no){
      openPOPup('/store/paymentDetailPage?storeid='+this.storeId+'&mcht_trd_no='+mcht_trd_no,'paymentDetailPage',window.innerWidth,window.innerHeight);
    },
    requestTo(page,keyword){
        requestAsyncToGet(this.$serverDomain+'/auth/store/orders/'+this.storeId+'/'+page+'/'+keyword).then(result=>{
            console.log(result);
            if(!result.flag){
                alert(result.message);
                return;
            }
            this.paymentArr=result.message;
            if(page==1){
              disabledById('beforeButton',true);
            }else{
              disabledById('beforeButton',false);
            }
            if(result.totalPage==page){
              disabledById('nextButton',true);
            }else{
              disabledById('nextButton',false);
            }
  
        });
    },
  },
}
</script>