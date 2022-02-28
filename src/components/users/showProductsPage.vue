<template>
  <div class="marginLeftSideSize">
        sdsd
  </div>
</template>
<style>

</style>
<script>
import { getParam, requestAsyncToGet } from '../../jslib'
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
            });
        },
    },
}
</script>