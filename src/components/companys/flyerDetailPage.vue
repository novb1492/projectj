<template>
    <div class="margintopNavSize marginLeftSideSize">
        <div>
         <h3>전단이미지</h3>
          
      </div>
    </div>
</template>
<style>

</style>
<script>
import { getParam } from '../../jslib'
export default {
  name: 'flyerDetailPage',
   data() {
    return {
      subSideVarIds:['storeDetailSubSide'],
      storeId:getParam('storeid'),
      flyerArr:[],
    }
  },
  created(){

  },
  methods:{

  },
}
</script>