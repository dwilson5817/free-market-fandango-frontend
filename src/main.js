import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import store from './store'
import App from './App.vue'
import './index.css';
import HomePage from "@/components/pages/HomePage/index.vue";
import ViewCardPage from "@/components/pages/ViewCardPage/index.vue";
import HowToPlayPage from "@/components/pages/HowToPlayPage/index.vue";
import StocksPage from "@/components/pages/StocksPage/index.vue";
import AdminIndexPage from "@/components/pages/Admin/AdminIndexPage/index.vue";
import EditSettingsPage from "@/components/pages/Admin/EditSettingsPage/index.vue";
import EditAccountsPage from "@/components/pages/Admin/EditAccountsPage/index.vue";
import EditEventsPage from "@/components/pages/Admin/EditEventsPage/index.vue";
import EditStocksPage from "@/components/pages/Admin/EditStocksPage/index.vue";
import LoginPage from "@/components/pages/Admin/LoginPage/index.vue";
import PurchasePage from "@/components/pages/Admin/PurchasePage/index.vue";
import DisplayBoardPage from "@/components/pages/Admin/DisplayBoardPage/index.vue";

const routes = [
  { path: '/', component: HomePage },
  { path: '/my-card', component: ViewCardPage },
  { path: '/how-to-play', component: HowToPlayPage },
  { path: '/stock-info', component: StocksPage },
  { path: '/admin', component: AdminIndexPage },
  { path: '/admin/settings', component: EditSettingsPage },
  { path: '/admin/accounts', component: EditAccountsPage },
  { path: '/admin/events', component: EditEventsPage },
  { path: '/admin/stocks', component: EditStocksPage },
  { path: '/admin/auth', component: LoginPage },
  { path: '/admin/purchase', component: PurchasePage },
  { path: '/admin/board', component: DisplayBoardPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const adminPages = ['/admin'];
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
