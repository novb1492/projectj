import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueDaumPostcode from "vue-daum-postcode"
import shortHeader from './components/layout/shortLogo.vue';
import CKEditor from '@ckeditor/ckeditor5-vue2';
import ck from './components/editor.vue';
import kMap from './components/map.vue';
import sideBar from './components/layout/sideBar.vue';

Vue.use( CKEditor );
Vue.use(VueDaumPostcode)
Vue.config.productionTip = false;
Vue.prototype.$EventBus = new Vue();//컴포넌트간 통신위해
Vue.prototype.$serverDomain = 'http://localhost:8080';
Vue.prototype.$domain = 'http://localhost:3030';
Vue.prototype.$s3Path='https://s3.ap-northeast-2.amazonaws.com';
Vue.prototype.$ROLE_USER='ROLE_USER';
Vue.prototype.$ROLE_COMPANY='ROLE_COMPANY';
Vue.prototype.$ROLE_ADMIN='ROLE_ADMIN';
Vue.prototype.$sideVarWitdh=250;//수정시 사이드바 width는 가서 직접 수정해줘야한다

//글로벌 컴포넌츠들
Vue.component(shortHeader.name, shortHeader); //이렇게 하면 글로벌 컴포넌츠가 된다 
Vue.component(ck.name,ck);
Vue.component(kMap.name,kMap);
Vue.component(sideBar.name,sideBar);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
