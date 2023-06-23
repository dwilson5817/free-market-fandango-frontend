<script setup>
import {ref, watch} from "vue";
import {formatDistance} from "date-fns";
import PurchaseService from "@/services/purchase.service";
import VAlertMessage from "@/components/VAlertMessage.vue";

const errorMessage = ref(null);
const loading = ref(false);
const purchases = ref({});

const props = defineProps({
  refresh: Boolean
})

const emit = defineEmits([
    'refreshed'
]);

watch(() => props.refresh, (value, oldValue) => {
  if (value && !oldValue) {
    loading.value = true;
    getPurchases()
  }
})

function timeSince(datetime) {
  return formatDistance(new Date(datetime), new Date(), { addSuffix: true })
}

function getPurchases() {
  PurchaseService.getPurchases().then(
    response => {
      purchases.value = response.data;
      loading.value = false;

      emit('refreshed');
    },
    error => {
      errorMessage.value =
          (error.response &&
              error.response.data &&
              error.response.data.message) ||
          error.message ||
          error.toString();

      loading.value = false;
    }
  )
}

getPurchases();
</script>

<template>
  <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  <svg class="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" fill-rule="evenodd"></path>
  </svg>
  <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Latest purchases</h5>
  <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
    A list of all the purchases made during the Free Market Fandango, with the newest first.
  </p>
  <v-alert-message
    :display="errorMessage !== null"
    type="danger"
    dismissible
    @close="errorMessage = null"
  >
    {{ errorMessage }}
  </v-alert-message>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" class="px-6 py-3">
                      Card owner
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Stock name
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Time
                  </th>
              </tr>
          </thead>
          <tbody v-if="loading">
              <tr class="bg-white dark:bg-gray-900 dark:border-gray-700">
                  <th scope="row" colspan="4" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Loading...
                  </th>
              </tr>
          </tbody>
          <tbody v-else-if="purchases.length === 0">
              <tr class="bg-white dark:bg-gray-900 dark:border-gray-700">
                  <th scope="row" colspan="4" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      No purchases found!
                  </th>
              </tr>
          </tbody>
          <TransitionGroup tag="tbody" v-else>
              <tr v-for="purchase in purchases" :key="purchase.id" class="bg-white dark:bg-gray-900 dark:border-gray-700" :class="{'border-b': purchase.id !== purchases[Object.keys(purchases)[Object.keys(purchases).length - 1]].id}">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {{ purchase.account.name }}
                  </th>
                  <td class="px-6 py-4">
                      {{ purchase.stock.name }} ({{ purchase.stock.code }})
                  </td>
                  <td class="px-6 py-4">
                      {{ purchase.purchase_price }}
                  </td>
                  <td class="px-6 py-4">
                      {{ timeSince(purchase.purchased_at) }}
                  </td>
              </tr>
          </TransitionGroup>
      </table>
  </div>
  </div>
</template>

<style scoped>

</style>