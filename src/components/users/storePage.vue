<template>
  <div id="container" class="margintopNavSize">
      <side-bar />
      <span v-if="choose==0">
          <show-flyer-page  />
      </span>
      <span v-if="choose==1">
        <show-products-page />
      </span>
  </div>
</template>
<style>

</style>
<script>
import { getParam } from '../../jslib';
import sideBar from '../layout/sideBar.vue';
import ShowFlyerPage from './showFlyerPage.vue';
import ShowProductsPage from './showProductsPage.vue';
export default {
  components: { sideBar, ShowFlyerPage, ShowProductsPage },
  name: 'storePage',
  watch:{ 
    $route(to,from){
        console.log('watch');
        console.log(to)
        console.log(from);
        this.choose=this.$route.params.id;
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