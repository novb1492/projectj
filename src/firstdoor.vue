<template>
    <div id="mapPage margintopNavSize">
      <side-bar id="side" ref="side_bar" :loginInfors="loginInfors" hidden/>
      <k-map :width=width :height=height :zoomLevel=9 :resizeFlag=true :dragEventFlag=true :dragEventNum=1 :positionEventFlag=true 
      v-on:showStoreAndReview="showStoreAndReview" ref="k_map"  />
    </div>
</template>
<style>
#map{overflow:scroll;}
#side{position: absolute;}
</style>
<script>
import sideBar from './components/layout/sideBar.vue';
import KMap from './kMap.vue';
export default {
  props:["loginInfors"],
  components: { sideBar, KMap },
   name :'firstdoor',
    data() {
    return {
      width:window.innerWidth,
      height:window.innerHeight,
    };
  },
  methods:{
    showStoreAndReview(result){
      this.$refs.side_bar.showStoreAndReview(result);
    },
    callSearch(text){
      this.$refs.k_map.callSearch(text);
    }
  }
 
 
   
}

</script>
