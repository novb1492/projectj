<template>
  <div>
    <table border="1">
        <th>id</th>
        <th>상품이름</th>
        <th>수량</th>
        <th>가격</th>
        <th>담은날짜</th>
        <th>선택</th>
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
            <td><input type="button" value="삭제" @click="deleteBasket(basket.id)"></td>
        </tr>
    </table>
    <input type="button" id="nextButton" value="next" @click="changePage(1)">
    <input type="button" id="beforeButton" value="before" @click="changePage(-1)">
    <br>
    <input type="button" value="선택 구매하기" />
    <br>
    <input type="button" value="전체구매하기" />
  </div>
</template>
<style>

</style>
<script>
import { changeValueById, disabledById, getParam, getValueById, requestAsyncToDelete, requestAsyncToGet, requestAsyncToPut } from '../../jslib'
export default {
  name: 'basketPage',
  data() {
    return {
      baskets:[],
    }
  },
  mounted(){
    this.requestServer(getParam('page'));
  },
  methods:{
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
        var totalPage=result.totalPage;
        if(page==totalPage){
          disabledById('nextButton',true);
        }else{
          disabledById('nextButton',false);
        }
        if(page==1){
          disabledById('beforeButton',true);
        }else{
          disabledById('beforeButton',false);
        }
      });
    },
  },
}
</script>