<script setup>
import { Button } from 'flowbite-vue'
import { ref } from 'vue'
import VAlertMessage from "@/components/VAlertMessage.vue";
import SpotifyService from "@/services/spotify.service";
import AppCard from "@/components/AppCard.vue";

const accountInfo = ref(false)
const successMessage = ref(null)
const errorMessage = ref(null)

function getAccountInfo() {
  SpotifyService.getAccountInfo().then(
      response => {
        accountInfo.value = response.data;
      },
      error => {
        errorMessage.value =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
      }
  )
}

function connectAccount() {
  window.location.href = SpotifyService.getConnectUrl();
}

function disconnectAccount() {
  SpotifyService.disconnectAccount().then(
      response => {
        successMessage.value = response.data.message;

        getAccountInfo();
      },
      error => {
        errorMessage.value =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
      }
  )
}

getAccountInfo();
</script>

<template>
  <AppCard>
    <template #svg>
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
    </template>

    <template #title>
      Spotify
    </template>

    <template #body>
      <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
        Connect a Spotify account to show what music is currently playing on the display board.
      </p>

      <v-alert-message
          :display="successMessage !== null"
          dismissible
          type="success"
          @close="successMessage = null"
      >
        {{ successMessage }}
      </v-alert-message>

      <v-alert-message
          :display="errorMessage !== null"
          dismissible
          type="danger"
          @close="errorMessage = null"
      >
        {{ errorMessage }}
      </v-alert-message>

      <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div class="flex items-center justify-between mb-4">
              <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Connected account</h5>
         </div>
         <div class="flow-root">
              <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                  <li v-if="accountInfo" class="pt-3 sm:py-4">
                      <div class="flex items-center space-x-4">
                          <div class="flex-shrink-0">
                              <img class="w-8 h-8 rounded-full" :src="accountInfo.profile_picture" alt="Neil image">
                          </div>
                          <div class="flex-1 min-w-0">
                              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                  {{ accountInfo.name }}
                              </p>
                              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                  Account connected successfully
                              </p>
                          </div>
                          <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              <button @click="disconnectAccount" type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-4 py-2 text-sm dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Disconnect</button>
                          </div>
                      </div>
                  </li>
                  <li v-else class="pt-3 sm:py-4">
                      <div class="flex items-center space-x-4">
                          <div class="flex-shrink-0 text-white">
                              <svg class="w-8 h-8 rounded-full" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" fill-rule="evenodd"></path>
                              </svg>
                          </div>
                          <div class="flex-1 min-w-0">
                              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                  No account connected
                              </p>
                              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                  Click connect to connect an account now
                              </p>
                          </div>
                          <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              <a :href="SpotifyService.getConnectUrl()" target="_blank" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-4 py-2 text-sm dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                Connect
                              </a>
                          </div>
                      </div>
                  </li>
              </ul>
         </div>
      </div>
    </template>
  </AppCard>
</template>

<style scoped>

</style>