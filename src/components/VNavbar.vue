<template>
  <nav class="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a
        href="#"
        class="flex items-center"
      >
        <img
          src="../assets/logo.svg"
          class="h-8 mr-3"
          alt="Free Market Fandango Logo"
        >
        <span
          v-if="route.path.startsWith('/admin')"
          class="self-center bg-red-100 text-red-800 text-base font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 whitespace-nowrap"
        >Admin</span>
      </a>
      <div class="flex md:order-2">
        <RouterLink
          v-if="!loggedIn"
          to="/admin/auth"
          class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-base px-4 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Admin
        </RouterLink>
        <ul
          v-else
          class="flex flex-col ml-2 font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700"
        >
          <VNavbarAdminDropdown>
            Admin
          </VNavbarAdminDropdown>
        </ul>
        <button
          id="navbar-button"
          type="button"
          class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-cta"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          /></svg>
        </button>
      </div>
      <div
        id="navbar-dropdown"
        class="hidden w-full md:block ml-auto md:mr-5 md:w-auto"
      >
        <ul class="flex flex-col font-medium mt-5 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
          <VNavbarLink to="/">
            Home
          </VNavbarLink>
          <VNavbarLink to="/account">
            Account
          </VNavbarLink>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { Collapse } from 'flowbite'
import { useRoute } from "vue-router";
import VNavbarLink from "@/components/VNavbarLink.vue";
import VNavbarDropdown from "@/components/VNavbarAdminDropdown.vue";
import VNavbarAdminDropdown from "@/components/VNavbarAdminDropdown.vue";

export default {
  name: "VNavbar",
  components: {VNavbarAdminDropdown, VNavbarDropdown, VNavbarLink},
  computed: {
    route: () => useRoute(),
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  mounted() {
    const $targetEl = document.getElementById('navbar-dropdown');
    const $triggerEl = document.getElementById('navbar-button');

    const collapse = new Collapse($targetEl, $triggerEl);
  }
}
</script>

<style scoped>

</style>