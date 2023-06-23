import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import store from './store'
import App from './App.vue'
import HomePage from "@/components/pages/HomePage/index.vue";
import DisplayBoardPage from "@/components/pages/DisplayBoardPage/index.vue";
import AdminPage from "@/components/pages/AdminPage/index.vue";
import PurchasePage from "@/components/pages/PurchasePage/index.vue";
import AccountPage from "@/components/pages/AccountPage/index.vue";
import './index.css';
import AdminLoginPage from "@/components/pages/AdminLoginPage/index.vue";

const routes = [
  { path: '/', component: HomePage },
  { path: '/account', component: AccountPage },
  { path: '/admin', component: AdminPage },
  { path: '/admin/auth', component: AdminLoginPage },
  { path: '/admin/purchase', component: PurchasePage },
  { path: '/admin/board', component: DisplayBoardPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const adminPages = ['/admin', '/admin/purchase'];
  const authRequired = adminPages.includes(to.path);
  const loggedIn = localStorage.getItem('authToken');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/admin/auth');
  } else {
    next();
  }
})

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
