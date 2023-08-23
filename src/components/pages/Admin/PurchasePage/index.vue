<script setup>
import { Button } from "flowbite-vue";
import PurchaseService from "@/services/purchase.service";
import {computed, onBeforeUnmount, onMounted, reactive, ref, watch} from "vue";
import PurchasePageLatestPurchases from "@/components/pages/Admin/PurchasePage/PurchasePageLatestPurchases.vue";
import VAlertMessage from "@/components/VAlertMessage.vue";
import PurchasePageStockSelector from "@/components/pages/Admin/PurchasePage/PurchasePageStockSelector.vue";
import PurchasePageAccountInput from "@/components/pages/Admin/PurchasePage/PurchasePageAccountInput.vue";
import StockService from "@/services/stock.service";
import AccountService from "@/services/account.service";
import PurchasePageAccountInfo from "@/components/pages/Admin/PurchasePage/PurchasePageAccountInfo.vue";
import AppLayout from "@/components/AppLayout.vue";
import AppCard from "@/components/AppCard.vue";

const card_number = ref(null);
const stock_code = ref(null);

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
  const selectedStock = stocks.value.filter(stock => stock.code === stock_code.value)

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

  PurchaseService.createPurchase({ card_number: card_number.value, stock_code: stock_code.value }).then(
    response => {
      card_number.value = null;
      stock_code.value = null;

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

  AccountService.getAccount(card_number.value).then(
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

watch(card_number, async (newCardNumber) => {
  if (newCardNumber !== null && newCardNumber.length === 4)
  getAccountInfo();
})

updateStocks();
</script>

<template>
  <AppLayout page-name="Record purchase">
    <AppCard class="mb-4">
      <template #svg>
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </template>

      <template #title>
        Record purchase
      </template>

      <template #body>
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
          <purchase-page-account-input v-model="card_number" :submitting="submitting" />
          <purchase-page-account-info :accountInfo="accountInfo" class="mt-4" />
          <purchase-page-stock-selector v-model="stock_code" :stocks="stocks" :disabled="submitting || card_number === ''" />
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
      </template>
    </AppCard>

    <PurchasePageLatestPurchases
      :refresh="refreshPurchases"
      @refreshed="refreshPurchases = false"
    />
  </AppLayout>
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