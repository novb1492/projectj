import Vue from 'vue';
import VueRouter from 'vue-router';
import firstdoor from './firstdoor.vue';
import showLeafletPage from './components/storeViews/showLeafletPage.vue';
import loginPage from './components/users/loginPage.vue';
import joinPage from './components/users/joinPage.vue';
import beforeJoinPage from './components/users/beforeJoinPage.vue';
import authPage from './components/users/authPage.vue';
import findAccountPage from './components/users/findAccountPage.vue';
import changePwdPage from './components/users/changePwdPage.vue';

Vue.use(VueRouter);
const router =new VueRouter({
    mode:'history',
    base: process.env.BASE_URL,
    routes: [
      {path:'/',component: firstdoor},  
      {path:'/showLeaflet',component: showLeafletPage}, 
      {path:'/loginPage',component:loginPage},
      {path: '/joinPage', component: joinPage },
      {path:'/beforeJoinPage',component:beforeJoinPage},
      {path: '/authPage',component:authPage},
      {path:'/loginPage',component:loginPage},
      {path:'/findAccountPage',component:findAccountPage},
      {path:'/changePwdPage',component:changePwdPage},
    ]
});
export default router;