import Vue from 'vue';
import VueRouter from 'vue-router';
import firstdoor from './firstdoor.vue';
import loginPage from './components/users/loginPage.vue';
import joinPage from './components/users/joinPage.vue';
import beforeJoinPage from './components/users/beforeJoinPage.vue';
import authPage from './components/users/authPage.vue';
import findAccountPage from './components/users/findAccountPage.vue';
import changePwdPage from './components/users/changePwdPage.vue';
import resultPage from './components/resultPage.vue';
import companyPage from './components/companys/companyPage.vue';
import deliveryPage from './components/companys/deliveryPage.vue';
import userDeliverPage from './components/users/userdeliverPage.vue';
import secretPage from './secretPage.vue'
import storePage from './components/users/storePage.vue';
import userPage from './components/users/userPage.vue';
import paymentDetailPage from './components/companys/paymentDetailPage.vue';
Vue.use(VueRouter);
const router =new VueRouter({
    mode:'history',
    base: process.env.BASE_URL,
    routes: [
      {path:'/',component: firstdoor},  
      {path:'/loginPage',component:loginPage},
      {path: '/joinPage', component: joinPage },
      {path:'/beforeJoinPage',component:beforeJoinPage},
      {path: '/authPage',component:authPage},
      {path:'/loginPage',component:loginPage},
      {path:'/findAccountPage',component:findAccountPage},
      {path:'/changePwdPage',component:changePwdPage},
      {path:'/resultPage',component:resultPage},
      {path:'/companyPage/:id',component:companyPage},
      {path:'/del',component:deliveryPage},
      {path:'/del2',component:userDeliverPage},
      {path:'/s',component:secretPage},
      {path:'/storePage/:id',component:storePage},
      {path:'/userPage/:id',component:userPage},
      {path:'/store/paymentDetailPage',component:paymentDetailPage},
    ]
});
export default router;