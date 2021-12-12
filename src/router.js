import Vue from 'vue';
import VueRouter from 'vue-router';
import firstdoor from './firstdoor.vue';
import showLeafletPage from './components/storeViews/showLeafletPage.vue';
import loginPage from './components/users/loginPage.vue';
import joinPage from './components/users/joinPage.vue';
Vue.use(VueRouter);
const router =new VueRouter({
    mode:'history',
    base: process.env.BASE_URL,
    routes: [
      {path:'/',component: firstdoor},  
      {path:'/showLeaflet',component: showLeafletPage}, 
      {path:'/loginPage',component:loginPage},
      {path:'/joinPage',component:joinPage},
    ]
});
export default router;