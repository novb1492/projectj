<template>
    <div>
               <h3>상품을 등록해주세요</h3>
        <h5>상품카테고리</h5>
         <select id="category" style="width:200px;">
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
              <span v-if="eventFlag">
                진행함<input type="checkbox" value="1" id="eventCheck" @change="doEvent" checked>
              </span>
              <span v-else>
                진행함<input type="checkbox" value="1" id="eventCheck" @change="doEvent">
              </span>
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
            (가격은 한글없이 입력해주세요 ex)1000)
            <br>
            <input type="text" id="price" placeholder="ex)1000" />
            <br>
            원산지를 입력해주세요
            <br>
            <input type="text" id="origin" placeholder="원산지"/>
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
          <span v-if="flag">
            <input type="button" value="상품수정"  @click="update" />
            <input type="button" value="상품삭제"  @click="deleteProduct" />
          </span>
          <span v-else>
            <input type="button" value="상품등록"  @click="insert" />
          </span>
    </div>
</template>
<style>
#productImg{width: 300px;}
</style>
<script>
import { changeValueById, checkNull, getValueById, requestAsyncToPost, requestAsyncToPut, requestFormAsyncToPost } from '../../jslib'
import editor from '../editor.vue';
export default {
  props:['flyerId','storeId','flag'],
  components: { editor },
  name: 'productComponet',
  data() {
    return {
      subSideVarIds:['storeDetailSubSide'],
      text:'',
      defaultText:'',
      eventFlag:false,
      dateArr:[],
      defaultText2:'',
      productImgPath:null,
      ids:['productName','price','origin','img2','eventDate'],
      productId:0,
    }
  },
  
methods:{
  update(){
    requestAsyncToPut(this.$serverDomain+'/auth/store/product/update/'+this.productId+'?storeId='+this.storeId,this.getJson()).then(result=>{
      console.log(result);
    });
  },
  deleteProduct(){

  },
    detailPage(product,events,eventFlag){
      this.productId=product.id;
      this.productImgPath=product.product_img_path;
      changeValueById('price',product.price);
      changeValueById('productName',product.product_name);
      changeValueById('origin',product.origin);
      changeValueById('price',product.price);
      this.$refs.ck_editor.setText(product.text);
      if(eventFlag){
        console.log(events);
        this.eventFlag=true;
        this.$nextTick(()=>{
          document.getElementById('eventInfor').hidden=false;
          var len=events.length;
          for(var i=0;i<len;i++){
            this.saveDateCore(events[i].event_date,events[i].event_price);
          }
        });
      }
    },
    getJson(){
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
      var eFlag=0;
      if(this.eventFlag){
        eFlag=1;
      }
      var category=document.getElementById("category");
      return JSON.stringify({
        "productName":getValueById('productName'),
        "eventFlag":eFlag,
        "eventInfors":this.dateArr,
        "price":getValueById('price'),
        "text":this.$refs.ck_editor.getText(),
        "category":category.options[category.selectedIndex].value,
        "flyerId":this.flyerId,
        "productImgPath":this.productImgPath,
        "origin":getValueById('origin'),
        "storeId":this.storeId
      });
    },
    insert(){
      requestAsyncToPost(this.$serverDomain+'/auth/store/flyer/insert',this.getJson()).then(result=>{
        alert(result.message);
        if(result.flag){
          //다음 상품등록을 위해 전단 제외 비워주기
          this.clearEvent();
          this.clearValues();
          this.dateArr=[];
          this.$refs.ck_editor.setText('');
          this.productImgPath=null;
        }
      });
    },
    clearValues(){
      for(var i=0;i<this.ids.length;i++){
        changeValueById(this.ids[i],'');
      }
    },
    clearEvent(){
      if(this.eventFlag){
        document.getElementById('eventPriceArea').innerHTML='';
      }
      this.closeEvent();

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
    saveDate(){
      this.saveDateCore(getValueById('eventDate'),null);
    },
    saveDateCore(date,price){
      this.defaultText2='가격은 한글없이 입력해주세요 ex)1000';
      var dateAndPrice=new Object;
      //날짜 가져오기
      var chooseDate=date;
      //날짜 연관배열에넣기
      dateAndPrice.date=chooseDate;
      dateAndPrice.price=price;
      //연관배열 일반배열에 넣기
      this.dateArr[this.dateArr.length]=dateAndPrice;
       console.log(this.dateArr);
      //가격 입력창만들기
      var eventPriceArea = document.getElementById('eventPriceArea');
      var p=document.createElement('p');
      var p2=document.createElement('p');
      if(!checkNull(price)){
        p.innerHTML="<span class='dateAndPriceArea'><span id='"+chooseDate+"text' >"+chooseDate+"날의 가격</span> <input type='text' placeholder='ex)1000' id='"+chooseDate+"' class='eventPrice' value='"+price+"' /></span>";
      }else{
        p.innerHTML="<span class='dateAndPriceArea'><span id='"+chooseDate+"text' >"+chooseDate+"날의 가격</span> <input type='text' placeholder='ex)1000' id='"+chooseDate+"' class='eventPrice' /></span>";
      }
      p2.innerHTML="<span class='dateAndPriceAreaButton'><input type='button' id='"+chooseDate+"delete' value='삭제'  /></span>";
      //삭제버튼 이벤트 리스너 넣기
      p2.addEventListener("click",()=>{
        //랜더제거
        document.getElementById(chooseDate).remove();
        document.getElementById(chooseDate+'delete').remove();
        document.getElementById(chooseDate+'text').remove();
        //해당 데이터 지우기
        for(var i=0;i<this.dateArr.length;i++){
          if(this.dateArr[i].date==chooseDate){
            this.dateArr.splice(i,1);
          }
        }
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

  },
}
</script>