<template>
  <div>
    <table border="1">
        <th>id</th>
        <th>상품이름</th>
        <th>수량</th>
        <th>가격</th>
        <th>담은날짜</th>
        <tr v-for="(basket,index) in baskets" :key="index"> 
          <td >{{basket.basket_id}}</td>
            <td >
              {{basket.product_name}}
            </td>
            <td>{{basket.basket_count}}</td>
            <td>{{basket.basket_count}}</td>
            <td>{{basket.basket_created}}</td>
        </tr>
    </table>
  </div>
</template>
<style>

</style>
<script>
import { getParam, requestAsyncToGet } from '../../jslib'
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
    requestServer(){
      requestAsyncToGet(this.$serverDomain+'/auth/user/baskets/'+getParam('page')).then(result=>{
        if(!result.flag){
          alert(result.message);
          return;
        }
        this.baskets=result.baskets;
      });
    },
  },
}
</script>