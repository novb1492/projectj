<template>
  <div>
    <table border="1">
        <th>id</th>
        <th>상품이름</th>
        <th>수량</th>
        <th>가격</th>
        <th>담은날짜</th>
        <tr v-for="(basket,index) in baskets" :key="index"> 
          <td >{{basket.id}}</td>
            <td >
              <img src="" alt="상품이미지" >
              {{basket.product_name}}
            </td>
            <td><input type="number"  :id="basket.id+'count'" :value="basket.basket_count" @change="changeCount(basket.id)"></td>
            <td><input type="text"  :id="basket.id+'price'" :value="basket.price+'원'" disabled></td>
            <td>{{basket.basket_created}}</td>
        </tr>
    </table>
    <input type="button" value="선택 구매하기" />
    <input type="button" value="전체구매하기" />
  </div>
</template>
<style>

</style>
<script>
import { changeValueById, getParam, getValueById, requestAsyncToGet, requestAsyncToPut } from '../../jslib'
export default {
  name: 'basketPage',
  data() {
    return {
      baskets:[],
    }
  },
  mounted(){
    this.requestServer();
  },
  methods:{
    changeCount(id){
      var count=getValueById(id+'count');
      requestAsyncToPut(this.$serverDomain+'/auth/user/basket/'+id+'/'+count).then(result=>{
        if(result.flag){
          changeValueById(id+'price',result.message+'원');
        }
      });
    },
    requestServer(){
      requestAsyncToGet(this.$serverDomain+'/auth/user/baskets/'+getParam('page')).then(result=>{
        if(!result.flag){
          alert(result.message);
          return;
        }
        this.baskets=result.baskets;
        console.log(this.baskets);
      });
    },
  },
}
</script>