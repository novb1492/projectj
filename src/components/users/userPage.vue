<template>
    <div id="container" class="margintopNavSize"> 
        <side-bar />
        <span v-if="choose==0">
            <basket-page />
        </span>
    </div>
</template>
<style>

</style>
<script>
import SideBar from '../layout/sideBar.vue';
import basketPage from './basketPage.vue';
export default {
  components: { basketPage, SideBar },
name: 'userPage',
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
        }
    },
    mounted(){
    this.choose=this.$route.params.id;
    },
}
</script>