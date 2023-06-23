<script setup>
import { Button } from 'flowbite-vue'
import { Dropdown } from "flowbite";
import ActivationService from "@/services/activation.service";
import {computed, onMounted, reactive, ref} from "vue";
import VAlertMessage from "@/components/VAlertMessage.vue";
import {da} from "date-fns/locale";

const status = reactive({
  active: false,
  activeFrom: null,
  activeUntil: null
})
const errorMessage = ref(null);
const successMessage = ref(null);
const closeMarketDropdown = ref(null);

function getStatus() {
  ActivationService.getStatus().then(
    response => {
      status.active = true;
      status.activeFrom = response.data.started_at;
      status.activeUntil = response.data.ends_at;
    },
    error => {
      status.active = false;
      status.activeFrom = null;
      status.activeUntil = null;

      if (error.response.status !== 404)
        errorMessage.value =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
    }
  );
}

function startMarket() {
  ActivationService.startMarket().then(
      response => {
        successMessage.value = "Market has been started!";

        getStatus();
      },
      error => {
        errorMessage.value =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
      }
  );
}

function stopMarket(minutes) {
  ActivationService.stopMarket(minutes).then(
      response => {
        successMessage.value = "Market stopped!";

        getStatus();
      },
      error => {
        errorMessage.value =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
      }
  );
}

function crashMarket() {
  ActivationService.crashMarket().then(
      response => {
        successMessage.value = "Market crashed!";
      },
      error => {
        errorMessage.value =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
      }
  );
}

getStatus();

function showDropdown() {
  closeMarketDropdown.value.show();
}

function hideDropdown() {
  closeMarketDropdown.value.hide();
}

onMounted(() => {
  // set the dropdown menu element
  const $targetEl = document.getElementById('closeMarketDropdown');

  // set the element that trigger the dropdown menu on click
  const $triggerEl = document.getElementById('closeMarketButton');

  closeMarketDropdown.value = new Dropdown($targetEl, $triggerEl);
});

function friendlyTime(datetime) {
  const date = new Date(Date.parse(datetime))

  return date.toLocaleString('en-GB', {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });
}
</script>

<template>
  <div class="max-w-screen-xl mx-auto mt-4">
    <div class="w-full p-6 pb-0">
      <VAlertMessage
        type="danger"
        :display="errorMessage !== null"
        dismissible
        @close="errorMessage = null"
      >
        {{ errorMessage }}
      </VAlertMessage>
      <div class="col">
        <v-alert-message
          type="success"
          :display="successMessage !== null"
          dismissible
          @close="successMessage = null"
        >
          {{ successMessage }}
        </v-alert-message>
        <VAlertMessage v-if="status.active" type="success" :display="true" class="mb-6">
          <p :class="{ 'mb-0': status.activeUntil === null }">
            The market is active!
          </p>

          <p
            v-if="status.activeUntil !== null"
            class="mb-0"
          >
            The market will end on {{ friendlyTime(status.activeUntil) }}.
          </p>
        </VAlertMessage>
        <VAlertMessage
          v-else
          type="warning"
          :display="true"
          class="mb-6"
        >
          The market is not currently active.
        </VAlertMessage>

        <div class="grid grid-cols-3 gap-4">
          <Button @click.prevent="crashMarket" color="red" size="xl" class="place-content-center">
            <template #prefix>
              <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" d="M1 2.75A.75.75 0 011.75 2h16.5a.75.75 0 010 1.5H18v8.75A2.75 2.75 0 0115.25 15h-1.072l.798 3.06a.75.75 0 01-1.452.38L13.41 18H6.59l-.114.44a.75.75 0 01-1.452-.38L5.823 15H4.75A2.75 2.75 0 012 12.25V3.5h-.25A.75.75 0 011 2.75zM7.373 15l-.391 1.5h6.037l-.392-1.5H7.373zm7.49-8.931a.75.75 0 01-.175 1.046 19.326 19.326 0 00-3.398 3.098.75.75 0 01-1.097.04L8.5 8.561l-2.22 2.22A.75.75 0 115.22 9.72l2.75-2.75a.75.75 0 011.06 0l1.664 1.663a20.786 20.786 0 013.122-2.74.75.75 0 011.046.176z" fill-rule="evenodd"></path>
              </svg>
            </template>

            Market crash
          </Button>
          <Button @click.prevent="startMarket" :disabled="status.active" color="green" size="xl" class="place-content-center">
            <template #prefix>
              <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" fill-rule="evenodd"></path>
              </svg>
            </template>

            Open market
          </Button>
          <div id="closeMarketButton">
            <button v-if="! status.active" class="focus:outline-none text-white bg-yellow-400 focus:ring-4 font-medium rounded-lg dark:focus:ring-yellow-900 cursor-not-allowed opacity-50 px-6 py-3 inline-flex items-center place-content-center w-full focus:outline-none text-white bg-yellow-400 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg dark:focus:ring-yellow-900 cursor-not-allowed opacity-50 text-base px-6 py-3 inline-flex items-center place-content-center w-full" type="button" disabled>
              <svg class="w-6 h-6 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm5-2.25A.75.75 0 017.75 7h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-4.5z" fill-rule="evenodd"></path>
              </svg>

              Close market

              <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <button v-else class="focus:outline-none text-white bg-yellow-400 focus:ring-4 font-medium rounded-lg dark:focus:ring-yellow-900 hover:bg-yellow-500 px-6 py-3 inline-flex items-center place-content-center w-full focus:outline-none text-white bg-yellow-400 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg dark:focus:ring-yellow-900 hover:bg-yellow-500 text-base px-6 py-3 inline-flex items-center place-content-center w-full" type="button">
              <svg class="w-6 h-6 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm5-2.25A.75.75 0 017.75 7h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-4.5z" fill-rule="evenodd"></path>
              </svg>

              Close market

              <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
          <!-- Dropdown menu -->
          <div id="closeMarketDropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <a @click.prevent="stopMarket(10)" href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">in 10 minutes</a>
                </li>
                <li>
                  <a @click.prevent="stopMarket(20)" href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">in 20 minutes</a>
                </li>
                <li>
                  <a @click.prevent="stopMarket(30)" href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">in 30 minutes</a>
                </li>
                <li>
                  <a @click.prevent="stopMarket(0)" href="#" class="block px-4 py-2 text-red-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-red-700">Immediately</a>
                </li>
              </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>