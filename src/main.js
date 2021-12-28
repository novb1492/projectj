import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueDaumPostcode from "vue-daum-postcode"
import shortHeader from './components/layout/shortLogo.vue';
Vue.use(VueDaumPostcode)
Vue.config.productionTip = false;
Vue.prototype.$EventBus = new Vue();//컴포넌트간 통신위해
Vue.component(shortHeader.name, shortHeader); //이렇게 하면 글로벌 컴포넌츠가 된다 
Vue.prototype.$serverDomain = 'http://localhost:8080';

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
