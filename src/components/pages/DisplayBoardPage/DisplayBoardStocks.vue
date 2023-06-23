<template>
  <div class="p-4 px-6">
    <div class="grid grid-cols-4 gap-4">
      <display-board-stock-list-item v-for="stock in stocks" class="col"
        :stock="stock"
      />
    </div>
  </div>
</template>

<script>
import DisplayBoardStockListItem from "@/components/pages/DisplayBoardPage/DisplayBoardStockListItem.vue";
import StockService from "@/services/stock.service";

export default {
  name: "DisplayBoardStocks",
  components: { DisplayBoardStockListItem },
  data() {
    return {
      stocks: {},
      error: null,
      timer: null
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.updateValues()
    }, 30000)
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  created() {
    this.updateValues();
  },
  methods: {
    updateValues() {
      StockService.getStocks().then(
        response => {
          this.stocks = response.data;
        },
        error => {
          this.error =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
        }
      )
    }
  }
}
</script>

<style scoped>

</style>