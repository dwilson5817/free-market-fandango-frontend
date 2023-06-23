<script setup>
import { Button } from "flowbite-vue";
import PurchaseService from "@/services/purchase.service";
import {computed, onBeforeUnmount, onMounted, reactive, ref} from "vue";
import PurchasePageLatestPurchases from "@/components/pages/PurchasePage/PurchasePageLatestPurchases.vue";
import VAlertMessage from "@/components/VAlertMessage.vue";
import PurchasePageStockSelector from "@/components/pages/PurchasePage/PurchasePageStockSelector.vue";
import PurchasePageAccountInput from "@/components/pages/PurchasePage/PurchasePageAccountInput.vue";
import VNavbar from "@/components/VNavbar.vue";
import StockService from "@/services/stock.service";
import AccountService from "@/services/account.service";
import PurchasePageAccountInfo from "@/components/pages/PurchasePage/PurchasePageAccountInfo.vue";

const purchase = reactive({
  card_number: null,
  stock_code: null
});

const accountInfo = ref(null);
const accountLoading = ref(false);
const stocks = ref([]);
const stocksLoading = ref(true);
const stocksTimer = ref(null)
const submitting = ref(false);
const errorMessage = ref(null);
const refreshPurchases = ref(true);

onMounted(() => {
  stocksTimer.value = setInterval(() => {
    updateStocks()
  }, 5000)
});

onBeforeUnmount(() => {
  clearInterval(stocksTimer.value)
})

const selectedStockPrice = computed(() => {
  const selectedStock = stocks.value.filter(stock => stock.code === purchase.stock_code)

  if (selectedStock.length === 0)
    return null

  return selectedStock[0].price;
})

const selectedAccountBalance = computed(() => {
  if (accountInfo.value !== null)
    return accountInfo.value.balance

  return null
})

function submitPurchase() {
  submitting.value = true;

  PurchaseService.createPurchase(purchase).then(
    response => {
      purchase.card_number = null;
      purchase.stock_code = null;

      accountInfo.value = null;

      submitting.value = false;
      refreshPurchases.value = true;
    },
    error => {
      errorMessage.value =
          (error.response &&
              error.response.data &&
              error.response.data.message) ||
          error.message ||
          error.toString();

      submitting.value = false;
    }
  )
}

function updateStocks() {
  StockService.getStocks().then(
    response => {
      stocks.value = response.data;
      stocksLoading.value = false;
    },
    error => {
      errorMessage.value =
          (error.response &&
              error.response.data &&
              error.response.data.message) ||
          error.message ||
          error.toString();

      stocksLoading.value = false;
    }
  )
}

function getAccountInfo() {
  accountLoading.value = true;

  AccountService.getAccount(purchase.card_number).then(
    response => {
      accountInfo.value = response.data;
      accountLoading.value = false;
    },
    error => {
      accountInfo.value = null;
      accountLoading.value = false;
      errorMessage.value =
          (error.response &&
              error.response.data &&
              error.response.data.message) ||
          error.message ||
          error.toString();
    }
  )
}

updateStocks();
</script>

<template>
  <v-navbar />
  
  <div class="max-w-screen-xl mx-auto mt-4">
    <div class="w-full p-6 mb-4">
      <div class="mb-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <svg class="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
        </svg>
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Record purchase</h5>
        <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
          Charge a card with the purchase of a stock.
        </p>
        <v-alert-message
          :display="errorMessage !== null"
          type="danger"
          dismissible
          @close="errorMessage = null"
        >
          {{ errorMessage }}
        </v-alert-message>
        <form @submit.prevent="submitPurchase">
          <purchase-page-account-input v-model="purchase.card_number" :submitting="submitting" @change="getAccountInfo" />
          <purchase-page-account-info :accountInfo="accountInfo" class="mt-4" />
          <purchase-page-stock-selector v-model="purchase.stock_code" :stocks="stocks" :disabled="submitting || purchase.card_number === ''" />
          <v-alert-message v-if="selectedAccountBalance !== null && selectedStockPrice !== null && selectedAccountBalance < selectedStockPrice"
            :display="true"
            type="danger"
          >
            The current stock price (<strong>{{ selectedStockPrice }} Edinbucks</strong>) is more than the balance of the account!
          </v-alert-message>
          <v-alert-message v-else :display="selectedAccountBalance !== null && selectedStockPrice !== null" type="success">
            <p class="mb-2">Looks good, OK to submit!</p>
            <p class="mb-2">The final price of the stock will be calculated upon submitting the request.</p>
            <strong>Check everything is correct before submitting.  You cannot undo a purchase!</strong>
          </v-alert-message>
          <transition mode="out-in" name="slide-left">
            <Button v-if="submitting" :loading="submitting" disabled size="lg" color="alternative">
              Loading...
            </Button>
            <Button type="submit" v-else size="lg" color="green" :disabled="selectedAccountBalance === null || selectedStockPrice === null || selectedAccountBalance < selectedStockPrice">
              Submit
            </Button>
          </transition>
        </form>
      </div>

      <purchase-page-latest-purchases
        :refresh="refreshPurchases"
        @refreshed="refreshPurchases = false"
      />
    </div>
  </div>
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.2s ease-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>