<script setup>
import { useRoute, useRouter} from "vue-router";
import { useStore } from "vuex";
import AppNavbarLink from "@/components/AppNavbarLink.vue";
import { computed, onMounted, ref } from "vue";
import AppNavbarDropdownLink from "@/components/AppNavbarDropdownLink.vue";
import { Collapse } from "flowbite";

const store = useStore();
const router = useRouter();

const hideAdminMenu = ref(true);

onMounted(() => {
    const $targetEl = document.getElementById('navbar-dropdown');
    const $triggerEl = document.getElementById('navbar-button');

    const collapse = new Collapse($targetEl, $triggerEl);
})

const loggedIn = computed(() => {
  return store.state.auth.status.loggedIn
})

function logout() {
    store.dispatch('auth/logout');
    router.push('/admin/auth');
}
</script>

<template>
  <nav class="bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <RouterLink to="/" class="flex items-center">
              <img src="../assets/logo.svg" class="h-10 mr-3" alt="Free Market Fandango Logo" />
          </RouterLink>
          <button id="navbar-button" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu-full" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
          </button>
          <div id="navbar-dropdown" class="items-center justify-between font-medium hidden w-full md:flex md:w-auto md:order-1">
              <ul class="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <AppNavbarLink to="/">
                  Home
                </AppNavbarLink>
                <AppNavbarLink to="/how-to-play">
                  How to play
                </AppNavbarLink>
                <AppNavbarLink to="/my-card">
                  View my card
                </AppNavbarLink>
                <AppNavbarLink to="/stock-info">
                  Live stock information
                </AppNavbarLink>
                <li v-if="loggedIn">
                    <button @click="hideAdminMenu = !hideAdminMenu" class="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                      Admin

                      <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                      </svg>
                    </button>
                </li>
                <AppNavbarLink v-else to="/admin/auth">
                  Admin login
                </AppNavbarLink>
                <li v-if="loggedIn">
                    <button @click="logout" class="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                      Log out
                    </button>
                </li>
              </ul>
          </div>
      </div>
      <div :class="{ 'hidden': hideAdminMenu }" class="mt-1 mb-4 border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600">
          <div class="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
              <ul>
                <AppNavbarDropdownLink to="/admin/settings">
                  <template #header>
                    Settings
                  </template>

                  Configure the settings for this app.
                </AppNavbarDropdownLink>
                <AppNavbarDropdownLink to="/admin/stocks">
                  <template #header>
                    Stocks
                  </template>

                  Add or delete the stocks available for purchase.
                </AppNavbarDropdownLink>
                <AppNavbarDropdownLink to="/admin/accounts">
                  <template #header>
                    Accounts
                  </template>

                  Add or delete cards which can be used to buy stocks.
                </AppNavbarDropdownLink>
              </ul>
              <ul>
                <AppNavbarDropdownLink to="/admin/events">
                  <template #header>
                    Events
                  </template>

                  Add or delete news events which will happen throughout the evening.
                </AppNavbarDropdownLink>
                <AppNavbarDropdownLink to="/admin/purchase">
                  <template #header>
                    Purchase
                  </template>

                  Charge a card with the purchase of a stock.
                </AppNavbarDropdownLink>
                <AppNavbarDropdownLink to="/admin/board">
                  <template #header>
                    Display board
                  </template>

                  Open the display board which shows the current state of the market, designed for a TV display.
                </AppNavbarDropdownLink>
              </ul>
          </div>
      </div>
  </nav>
</template>

<style scoped>

</style>