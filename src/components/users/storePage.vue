<template>
  <div id="container" class="margintopNavSize">
      <side-bar />
      <span v-if="choose==0">
          
      </span>
  </div>
</template>
<style>

</style>
<script>
import { getParam } from '../../jslib';
import sideBar from '../layout/sideBar.vue';
export default {
  components: { sideBar },
  name: 'storePage',
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