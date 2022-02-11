<template>
    <div class="marginLeftSideSize margintopNavSize">
       <h3>전단이미지를 등록해주세요</h3>
      <input type="file" id="img" class="mt-2" name="img" accept=".gif, .jpg, .png" @change="uploadAndGetProducts">
      <br>
       <img :src="imgPath" id="flyerImg" hidden>
       <br>
       {{defaultText}}
       <div id="insertProductArea" ><!--hidden-->
       <h3>상품을 등록해주세요</h3>
        <h5>상품카테고리</h5>
         <select style="width:200px;">
            <option value="공산품">공산품</option>
            <option value="청과야채">청과/야채</option>
            <option value="수산물">수산물</option>
            <option value="축산물">축산물</option>
            <option value="공산품(식)">식품</option>
            <option value="공산품(비)">비식품</option>
            <option value="잡화">잡화</option>
         </select>
         <h5>행사 여부</h5>
          진행함<input type="checkbox" value="1" @change="doEvent">
          <div id="eventInfor" hidden>
            이벤트일자<input type="date" id="eventDate" @change="saveDate"/>
            <br>
            <div id="eventPriceArea" >
              {{defaultText2}}
            </div>
          </div>
       </div>
       <br>
       <br>
       <div>
         추출한 글자들
         <br>
         원래 이글자들로 전단이 클릭되면 반응 하게 하려했으나
         <br>
         말도안되는 기술이라는걸 깨닫고 포기하고.. 
         <br>
         맛보기 ocr 만 구축 해논 상태입니다
       </div>
        <div>
          {{text}}
        </div>
    </div>
</template>
<style>
#textArea{width: 100%;}
#flyerImg{ width: 100%; height: 600px;}
</style>
<script>
import {  getParam, getValueById, requestFormAsyncToPost } from '../../jslib'
export default {
  name: 'insertFlyerPage',
   data() {
    return {
      storeId:getParam('storeid'),
      imgPath:null,
      subSideVarIds:['storeDetailSubSide'],
      text:'',
      defaultText:'',
      eventFlag:false,
      dateArr:[],
      defaultText2:'',
    }
  },
  created(){
    //사이드바 생성
    this.$emit('openSubSide',this.subSideVarIds);
       //새로고침 대응
    this.$emit('changeStoreId',this.storeId);
  },
  methods:{
    saveDate(){
      this.defaultText2='가격은 한글없이 ,(쉼표)로 구분해서 입력해주세요 ex)1,000';
      var dateAndPrice=new Object;
      var chooseDate=getValueById('eventDate');
      dateAndPrice.date=chooseDate;
      this.dateArr[this.dateArr.length]=dateAndPrice;
      var eventPriceArea = document.getElementById('eventPriceArea');
      var p=document.createElement('p');
      p.innerHTML=chooseDate+"날의 가격"+"<input type='text' placeholder='ex)1,000' id='"+dateAndPrice.date+"' class='eventPrice' />"
      eventPriceArea.appendChild(p);
    },
    doEvent(){
      if(this.eventFlag){
        document.getElementById('eventInfor').hidden=true;
        this.eventFlag=false;
      }else{
        //false 일때 check가되고 flag->true가됨 그래서 false일때 히든해제
        document.getElementById('eventInfor').hidden=false;
        this.eventFlag=true;
      }
    },
    getSubSideVarIds(){
      return this.subSideVarIds;
    },
    uploadAndGetProducts(){
      const frm = new FormData();
      console.log(document.getElementById('img').files[0]);
      frm.append("upload",document.getElementById('img').files[0]);
      console.log(frm);
     this.defaultText='글자를 추출중입니다 시간이 걸리니 페이지를 벗어나지 마세요';
      requestFormAsyncToPost(this.$serverDomain+'/auth/store/uploadAndGet',frm).then(result=>{
        console.log(result);
        if(result.flag){
          document.getElementById('flyerImg').hidden=false;
          this.imgPath=result.message;
          this.defaultText='';
          this.text=result.ocr.message;
          document.getElementById('insertProductArea').hidden=false;
          return;
        }
        alert('파일 업로드에 실패했습니다');

      });
    },
  }
}
</script>