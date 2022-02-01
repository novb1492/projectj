<template>
    <div id="mapPage margintopNavSize">
      <side-bar id="side" hidden/>
      <k-map :width=width :height=height :zoomLevel=9 :resizeFlag=true :dragEventFlag=true :dragEventNum=1 :positionEventFlag=true ref="k_map"/>
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
  components: { sideBar, KMap },
   name :'firstdoor',
    data() {
    return {
      width:window.innerWidth,
      height:window.innerHeight,
     
    };
  },
  methods:{
    callSearch(text){
      this.$refs.k_map.callSearch(text);
    }
  }
 
 
   
}

</script>
