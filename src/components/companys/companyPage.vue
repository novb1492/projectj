<template>
  <div>
      <side-bar id="side"/>
      <span v-if="choose=='/registStorePage'">
        <regist-store-page/>
      </span>
        <span v-if="choose=='/showStoresPage?page=1&keyword=null'">
        <show-st/>
      </span>
  </div>
</template>
<style>
#side{position: absolute;}
</style>
<script>
import * as modules from '../../jslib'
import SideBar from '../layout/sideBar.vue';
import RegistStorePage from './registStorePage.vue';
import ShowSt from './showSt.vue';
export default {
  components: {  SideBar, RegistStorePage, ShowSt },
  name: 'foot',
  data() {
    return {
        choose:null,
    }
  },
  mounted(){
      console.log('a');
      this.$EventBus.$on('changeuri',text=>{
      console.log(text);
      this.choose=text;
      if(text=='/showStoresPage?page=1&keyword=null'){
          modules.changeUrl('/showStoresPage?page=1&keyword=null');
      }
    });
  }
}
</script>