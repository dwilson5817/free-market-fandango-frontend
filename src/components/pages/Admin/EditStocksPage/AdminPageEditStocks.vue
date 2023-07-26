<script setup>
import StockService from "@/services/stock.service";
import {onMounted, ref} from "vue";
import VAlertMessage from "@/components/VAlertMessage.vue";
import VAdminPageTable from "@/components/VAdminPageTable.vue";
import {Button} from "flowbite-vue";

const shape = {
  code: 'Stock Code',
  name: 'Full Name',
  price: 'Price',
  tags: 'Tags'
}

const stocks = ref({})
const errorMessage = ref(null)
const creating = ref(false)
const loading = ref(true)
const clearInput = ref(false)

onMounted(() => {
  updateValues()
})

function deleteStock(stockCode) {
  const stockToDelete = stocks.value.find(account => {
    return account.code === stockCode
  });

  stockToDelete.deleting = true;

  StockService.deleteStock(stockCode).then(
    response => {
      updateValues();
    },
    error => {
      errorMessage.value =
          (error.response &&
              error.response.data &&
              error.response.data.message) ||
          error.message ||
          error.toString();

      stockToDelete.deleting = false;
    }
  );
}

function updateStockInStockStatus(stockCode, inStock) {
  const stockToUpdate = stocks.value.find(account => {
    return account.code === stockCode
  });

  StockService.updateStockInStockStatus(stockCode, inStock).then(
    response => {
      updateValues();
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


function createStock(newStock) {
  creating.value = true;

  StockService.createStock(newStock).then(
    response => {
      updateValues();

      creating.value = false;
      clearInput.value = true;
    },
    error => {
      errorMessage.value =
          (error.response &&
              error.response.data &&
              error.response.data.message) ||
          error.message ||
          error.toString();

      creating.value = false;
    }
  );
}

function updateValues() {
  StockService.getStocks().then(
    response => {
      stocks.value = response.data;
      loading.value = false;
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
</script>

<template>
  <v-admin-page-table
    key-name="code"
    :data="stocks"
    :shape="shape"
    :creating="creating"
    :clear-input="clearInput"
    :loading="loading"
    :table="stocks"
    @cleared="clearInput = false"
    @create="createStock"
    @delete="deleteStock"
  >
    <template #header>
      <svg class="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
      <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Stocks</h5>
      <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
        Stocks represent drinks which are to be sold on the market, their price fluctuates according to demand and current events.
      </p>
      <v-alert-message
        :display="errorMessage !== null"
        type="danger"
        dismissible
        @close="errorMessage = null"
      >
        {{ errorMessage }}
      </v-alert-message>
    </template>
    <template #none>
      No stocks have been created yet!
    </template>
    <template #actions="actionsProps">
      <div class="whitespace-nowrap">
      <transition
        name="fade"
        mode="out-in"
        class="mr-3"
      >
        <Button v-if="actionsProps.row.in_stock" @click.prevent="updateStockInStockStatus(actionsProps.row.code, false)" color="red">
          Out of stock
        </Button>
        <Button v-else @click.prevent="updateStockInStockStatus(actionsProps.row.code, true)" color="green">
          In stock
        </Button>
      </transition>
      <transition
        name="fade"
        mode="out-in"
      >
        <Button v-if="actionsProps.row.deleting" color="red" disabled loading>
          Deleting...
        </Button>
        <Button v-else @click.prevent="deleteStock(actionsProps.row.code)" color="red">
          Delete
        </Button>
      </transition>
      </div>
    </template>
  </v-admin-page-table>
</template>

<style scoped>

</style>