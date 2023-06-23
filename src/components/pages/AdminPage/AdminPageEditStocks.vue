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
      <svg class="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
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