<script setup>
import { Dropdown } from 'flowbite'
import {computed, onMounted} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const store = useStore()
const router = useRouter()

onMounted(() => {
   // set the dropdown menu element
    const $targetEl = document.getElementById('dropdownNavbar');
    // set the element that trigger the dropdown menu on click
    const $triggerEl = document.getElementById('dropdownNavbarLink');

    if ($targetEl) {
        const dropdown = new Dropdown($targetEl, $triggerEl);
    }
})

const isLoggedIn = computed(() => {
  return store.state.auth.status.loggedIn
})

function logout() {
    store.dispatch('auth/logout');
    router.push('/admin/auth');
}
</script>

<template>
  <li>
    <button
      id="dropdownNavbarLink"
      data-dropdown-toggle="dropdownNavbar"
      class="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
    >
      <slot />
      <svg
        class="w-5 h-5 ml-1"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <!-- Dropdown menu -->
    <div
      id="dropdownNavbar"
      class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
    >
      <ul
        v-if="isLoggedIn"
        class="py-2 text-sm text-gray-700 dark:text-gray-400"
        aria-labelledby="dropdownLargeButton"
      >
        <li>
          <RouterLink
            to="/admin"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Settings
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/admin/purchase"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Purchase
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/admin/board"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Board
          </RouterLink>
        </li>
      </ul>
      <div
        v-if="isLoggedIn"
        class="py-2"
      >
        <a
          href="#"
          role="button"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
          @click="logout"
        >Sign out</a>
      </div>
      <div
        v-else
        class="py-2"
      >
        <RouterLink
          to="/admin/auth"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
        >
          Login
        </RouterLink>
      </div>
    </div>
  </li>
</template>

<style scoped>

</style>