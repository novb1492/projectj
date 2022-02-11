<template>
    <div class="marginLeftSideSize margintopNavSize">
      <div>
         <h3>전단이미지를 등록해주세요</h3>
          <input type="file" id="img" class="mt-2" name="img" accept=".gif, .jpg, .png" @change="uploadAndGetProducts">
          <br>
          <img :src="imgPath" id="flyerImg" hidden>
          <br>
       {{defaultText}}
      </div>
       <div id="insertProductArea" hidden><!--hidden-->
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
         <h5>상품이름</h5>
         전체 이름을 입력해주세요 
         <br>
         ex)소고기 150g
         <br>
         <input type="text" id="productName" placeholder="상품이름을 입력해주세요">
         <div id="eventArea">
              <h5>행사 여부</h5>
              진행함<input type="checkbox" value="1" id="eventCheck" @change="doEvent">
              <div id="eventInfor" hidden>
                이벤트일자<input type="date" id="eventDate" @change="saveDate"/>
                <br>
                <div id="eventPriceArea" >
                  {{defaultText2}}
                </div>
          </div>
         </div>
         <div id="inforArea">
            기본 가격을 입력해주세요
            <br>
            (가격은 한글없이 ,(쉼표)로 구분해서 입력해주세요 ex)1,000)
            <br>
            <input type="text" placeholder="ex)1,000" />
            <br>
            원산지를 입력해주세요
            <br>
            <input type="text" placeholder="원산지"/>
            <br>
            간단한 상품설명을 입력해주세요(필수아님)
            <editor  class="mt-2" :text="null" ref="ck_editor" />
         </div>
         <br>
          <div id="productImgArea">
            <h5>상품이미지를 업로드해주세요</h5>
              <img :src="productImgPath" id="productImg"  >
              <br>
              <input type="file" id="img2" class="mt-2" name="img2" accept=".gif, .jpg, .png" @change="imgUpload" >
              <br>
          </div>
          <input type="button" value="상품등록"  @click="insert" />
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
import {  changeValueById, getParam, getValueById, requestFormAsyncToPost } from '../../jslib'
import editor from '../editor.vue';
export default {
  components: { editor },
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
      productImgPath:'',
    }
  },
  created(){
    //사이드바 생성
    this.$emit('openSubSide',this.subSideVarIds);
       //새로고침 대응
    this.$emit('changeStoreId',this.storeId);
  },
  methods:{
   imgUpload(){
      const frm = new FormData();
      frm.append("upload",document.getElementById('img2').files[0]);
      requestFormAsyncToPost(this.$serverDomain+'/auth/file/upload',frm).then(result=>{
        console.log(result);
        if(result.flag){
          this.productImgPath=result.message;
          return;
        }
        alert('파일 업로드에 실패했습니다');

      });
    },
    insert(){
      //이번트 날짜에 입력한 가격부여
      if(this.eventFlag){
        var events=document.getElementsByClassName('eventPrice');
        var len=this.dateArr.length;
        for(var i=0;i<events.length;i++){
          for(var ii=0;ii<len;ii++){
            if(this.dateArr[ii].date==events[i].id){
              this.dateArr[ii].price=events[i].value;
              break;
            }
          }
        }
      }
      this.closeEvent();
      changeValueById('productName','');
      alert('vv');

    },
    saveDate(){
      this.defaultText2='가격은 한글없이 ,(쉼표)로 구분해서 입력해주세요 ex)1,000';
      var dateAndPrice=new Object;
      //날짜 가져오기
      var chooseDate=getValueById('eventDate');
      //날짜 연관배열에넣기
      dateAndPrice.date=chooseDate;
      dateAndPrice.price=0;
      //연관배열 일반배열에 넣기
      this.dateArr[this.dateArr.length]=dateAndPrice;
      //가격 입력창만들기
      var eventPriceArea = document.getElementById('eventPriceArea');
      var p=document.createElement('p');
      var p2=document.createElement('p');
      p.innerHTML="<span id='"+chooseDate+"text' >"+chooseDate+"날의 가격</span> <input type='text' placeholder='ex)1,000' id='"+chooseDate+"' class='eventPrice' /> ";
      p2.innerHTML="<input type='button' id='"+chooseDate+"delete' value='삭제'  />";
      //삭제버튼 이벤트 리스너 넣기
      p2.addEventListener("click",()=>{
        document.getElementById(chooseDate).remove();
        document.getElementById(chooseDate+'delete').remove();
        document.getElementById(chooseDate+'text').remove();
        //남은 이벤트 개수확인
        var len=document.getElementsByClassName('eventPrice').length;
        //0개라면 플래그 꺼주기
        if(len==0){
          this.closeEvent();
        }
      });
      eventPriceArea.appendChild(p);
      eventPriceArea.appendChild(p2);
    },
    closeEvent(){
      document.getElementById("eventCheck").checked = false;
      this.eventFlag=false;
      document.getElementById('eventInfor').hidden=true;
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