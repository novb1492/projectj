<template>
  <div class="marginLeftSideSize">
      <ul  style="float: left; text-align: center;">
          <li v-for="(product,index) in products" :key="index" style="float: left; margin-left: 10px;">
              <a href="javascript:void();" @click="goDetail(product.product.id)">
                <img :src="product.product.product_img_path" alt="" srcset="" style="width:300px;">
                <br>
                {{product.product.product_name}}
                <br>
                원산지:{{product.product.origin}}
                {{product.product.price}}원
              </a>
          </li>
      </ul>
      <input type="button" value="next"  id="nextButton" @click="changePage(1)"><input type="button" id="beforeButton" value="before" @click="changePage(-1)">
      <input type="text" value="" id="keyword" placeholder="검색어를 입력하세요">
      <input type="button" value="검색" @click="search">
  </div>
</template>
<style>

</style>
<script>
import { disabledById, getParam, getValueById, requestAsyncToGet } from '../../jslib'
export default {
    name: 'showProductsPage',
    data() {
        return {
            storeId:getParam('storeid'),
            products:[],
        }
    },  
    mounted(){
        this.requestServer(getParam('page'),getParam('keyword'));
    },
    methods:{
        search(){
            var keyword=getValueById('keyword');
            this.$router.push("/storePage/1?storeid="+this.storeId+"&page=1&keyword="+keyword+"&category="+getParam('category'));
        },
        changeEvent(){
            this.requestServer(getParam('page'),getParam('keyword'));
        },
        changePage(num){
            this.$router.push("/storePage/1?storeid="+this.storeId+"&page="+((getParam('page')*1+num)+"&keyword="+getParam('keyword'))+"&category="+getParam('category'));
        },
        goDetail(id){
            alert(id);
        },
        requestServer(page,keyword){
            var category=getParam('category');
            if(category==8){
                category='공산품';
            }
            requestAsyncToGet(this.$serverDomain+'/store/get/products/'+this.storeId+'/'+category+'/'+page+'/'+keyword).then(result=>{
                if(!result.flag){
                    alert(result.message);
                    return;
                }
                console.log(result);
                this.products=result.products;
                var totalPage=result.totalPage;
                if(page==1){
                    disabledById('beforeButton',true);
                }else{
                    disabledById('beforeButton',false);
                }
                if(totalPage==page){
                    disabledById('nextButton',true);
                }else{
                    disabledById('nextButton',false);
                }
            });
        },
    },
}
</script>