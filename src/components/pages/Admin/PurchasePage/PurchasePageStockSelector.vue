<script setup>
import {computed, ref} from "vue";
import VAlertMessage from "@/components/VAlertMessage.vue";

const errorMessage = ref(null);

const props = defineProps(['modelValue', 'stocks', 'loading', 'disabled']);
defineEmits(['update:modelValue']);

const inStockStocks = computed(() => {
  return props.stocks.filter(stock => stock.in_stock);
})
</script>

<template>
  <label for="stockSelect" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select an option</label>
  <select id="stockSelect" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :disabled="disabled" class="block w-full px-4 py-3 mb-4 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option v-if="stocks === null">
        Loading...
      </option>
      <option v-else-if="Object.keys(inStockStocks).length === 0">
        No stocks available
      </option>
      <option
        v-for="stock in inStockStocks"
        v-else
        :value="stock.code"
      >
        {{ stock.code }} {{ stock.name }} ({{ stock.price }} Edinbucks)
      </option>
  </select>

  <v-alert-message
    :display="errorMessage !== null"
    type="danger"
    dismissible
    @close="errorMessage = null"
  >
    {{ errorMessage }}
  </v-alert-message>
</template>

<style scoped>

</style>