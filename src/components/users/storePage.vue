<template>
  <div id="container" class="margintopNavSize">
      <side-bar />
      <span v-if="choose==0">
          <show-flyer-page :flyerImgPath="flyerImgPath" />
      </span>
  </div>
</template>
<style>

</style>
<script>
import { getParam } from '../../jslib';
import sideBar from '../layout/sideBar.vue';
import ShowFlyerPage from './showFlyerPage.vue';
export default {
  components: { sideBar, ShowFlyerPage },
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
        flyerImgPath:null,
    }
  },
  mounted(){
   this.choose=this.$route.params.id;
  },
}
</script>