<template>
  <div class="card border-primary mb-3">
    <div class="card-header">
      Stocks
    </div>
    <div class="card-body">
      <v-alert-message :display="errorMessage !== null" type="danger" @close="errorMessage = null" dismissible>
        {{ errorMessage }}
      </v-alert-message>
      <v-admin-page-table
          name="stock"
          key-name="code"
          :value-names="valueNames"
          :creating="creating"
          :loading="loading"
          :table="stocks"
          :clear-input="clearInput"
          v-on:cleared="clearInput = false"
          v-on:create="createStock"
          v-on:delete="deleteStock"></v-admin-page-table>
    </div>
  </div>
</template>

<script>
import StockService from "@/services/stock.service";
import VAlertMessage from "@/components/VAlertMessage.vue";
import VAdminPageTable from "@/components/VAdminPageTable.vue";

export default {
  name: "AdminPageEditStocks",
  components: {VAdminPageTable, VAlertMessage},
    data() {
    return {
      stocks: {},
      valueNames: ['fullName', 'currentPrice', 'tags'],
      errorMessage: null,
      creating: false,
      loading: true,
      clearInput: false
    }
  },
  mounted() {
    this.updateValues();
  },
  methods: {
    deleteStock(stockCode) {
      this.stocks[stockCode].deleting = true;

      StockService.deleteStock(stockCode).then(
        response => {
          this.updateValues();
        },
        error => {
          this.errorMessage =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();

          this.stocks[stockCode].deleting = false;
        }
      );
    },
    createStock(newStock) {
      this.creating = true;

      StockService.createStock(newStock).then(
        response => {
          this.stock = {
            code: null,
            fullName: null,
            price: null
          }

          this.updateValues();
          this.creating = false;
          this.clearInput = true;
        },
        error => {
          this.errorMessage =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();

          this.creating = false;
        }
      );
    },
    updateValues() {
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
    }
  }
}
</script>

<style scoped>

</style>