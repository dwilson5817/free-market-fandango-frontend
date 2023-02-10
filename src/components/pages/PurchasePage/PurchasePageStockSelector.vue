<template>
  <div class="mb-3">
    <label for="stockSelect" class="form-label">Stock</label>
    <select v-model="stockCode" @change="$emit('stockChanged', stockCode, stocks[stockCode].currentPrice)" id="stockSelect" class="form-select" :disabled="submitting">
      <option v-if="stocks === null">Loading...</option>
      <option v-else-if="Object.keys(stocks).length === 0">No stocks created</option>
      <option v-else v-for="(stock, code) in stocks" :value="code">{{ stock.fullName }} ({{ code }})</option>
    </select>
    <div id="stockSelectHelp" class="form-text">The stock the user is purchasing.</div>
  </div>
  <v-alert-message :display="errorMessage !== null" type="danger" @close="errorMessage = null" dismissible>
    {{ errorMessage }}
  </v-alert-message>
</template>

<script>
import StockService from "@/services/stock.service";
import VAlertMessage from "@/components/VAlertMessage.vue";

export default {
  name: "PurchasePageStockSelector",
  props: [ 'submitting' ],
  emits: [ 'stockChanged' ],
  components: { VAlertMessage },
  data() {
    return {
      stocks: null,
      stockCode: null,
      loading: false,
      errorMessage: null,
    }
  },
  methods: {
    updateStocks() {
      StockService.getStocks().then(
        response => {
          this.stocks = response.data;
          this.loading = false;
        },
        error => {
          this.errorMessage =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();

          this.loading = false;
        }
      )
    },
  },
  mounted() {
    this.loading = true;
    this.updateStocks();
  }
}
</script>

<style scoped>

</style>