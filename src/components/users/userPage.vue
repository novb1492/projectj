<template>
    <div id="container" class="margintopNavSize"> 
        <side-bar />
        <span v-if="choose==0">
            <basket-page ref="basket_page" />
        </span>
        <span v-if="choose==1">
            <show-payment-list-page ref="paymentList"/>
        </span>
    </div>
</template>
<style>

</style>
<script>
import SideBar from '../layout/sideBar.vue';
import basketPage from './basketPage.vue';
import ShowPaymentListPage from './showPaymentListPage.vue';
export default {
  components: { basketPage, SideBar, ShowPaymentListPage },
name: 'userPage',
   watch:{ 
    $route(to,from){
        console.log('watch');
        console.log(to)
        console.log(from);
        this.choose=this.$route.params.id;
        if(to.path=='/userPage/0'&&from.path=='/userPage/0'){
            this.$refs.basket_page.re();
        }
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