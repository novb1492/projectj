<template>
  <div id="container" class="margintopNavSize">
      <side-bar />
      <span v-if="choose==0">
          <show-flyer-page  />
      </span>
      <span v-else-if="choose==1">
        <show-products-page ref="product_page" />
      </span>
      <span v-else-if="choose==2"> 
        <show-product-detail-page />
      </span>
  </div>
</template>
<style>

</style>
<script>
import { getParam } from '../../jslib';
import sideBar from '../layout/sideBar.vue';
import ShowFlyerPage from './showFlyerPage.vue';
import ShowProductDetailPage from './showProductDetailPage.vue';
import ShowProductsPage from './showProductsPage.vue';
export default {
  components: { sideBar, ShowFlyerPage, ShowProductsPage, ShowProductDetailPage },
  name: 'storePage',
  watch:{ 
    $route(to,from){
        console.log('watch');
        console.log(to)
        console.log(from);
        this.choose=this.$route.params.id;
        if(to.path=='/storePage/1'&&from.path=='/storePage/1'){
          this.$refs.product_page.changeEvent();
        }
    } 
  },
  data() {
    return {
        choose:null,
        storeId:getParam('storeId'),
    }
  },
  mounted(){
   this.choose=this.$route.params.id;
  },
}
</script>