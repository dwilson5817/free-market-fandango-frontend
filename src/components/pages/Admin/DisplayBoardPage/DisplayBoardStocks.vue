<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue";
import StockService from "@/services/stock.service";
import DisplayBoardStockListItem from "@/components/pages/Admin/DisplayBoardPage/DisplayBoardStockListItem.vue";
import AppCard from "@/components/AppCard.vue";

const stocks = ref({});
const error = ref(null);
const stocksTimer = ref(null);
const loading = ref(true);

defineProps([
    'interactive'
])

onMounted(() => {
  updateValues();

  stocksTimer.value = setInterval(() => {
    updateValues()
  }, 30000);
})

onBeforeUnmount(() => {
  clearInterval(stocksTimer.value)
})

const updateValues = () => {
  StockService.getStocks().then(
    response => {
      stocks.value = response.data;
      loading.value = false;
    },
    error => {
      error.value =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      loading.value = false;
    }
  )
}
</script>

<template>
    <AppCard v-if="loading" class="col-span-12">
      <template #title>
          <h1 class="mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Loading...
          </h1>
      </template>

      <template #body>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          Please wait while we retrieve the latest stock information...
        </p>
      </template>
    </AppCard>
    <AppCard v-else-if="stocks.length === 0" class="col-span-12">
      <template #title>
          <h1 class="mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            No stocks have been created yet
          </h1>
      </template>

      <template #body>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          Ask an administrator to create some!
        </p>
      </template>
    </AppCard>
    <DisplayBoardStockListItem v-else v-for="stock in stocks" :interactive="interactive" class="col"
      :stock="stock"
    />
</template>

<style scoped>

</style>