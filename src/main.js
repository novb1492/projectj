import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.prototype.$EventBus = new Vue();
//import he from './components/layout/header.vue';
//Vue.component(he.name, he); 이렇게 하면 글로벌 컴포넌츠가 된다 하지만 eventbus를 사용하면 쉽게 가능하다는 정보를얻어서 eventbus를 사용해보겠다

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
