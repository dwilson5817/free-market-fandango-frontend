<template>
  <div class="container">
    <div class="row row-cols-2">
      <div v-for="(stockProps, stockName) in this.stocks" class="col">
        <display-board-stock-list-item :stock-code="stockName" :stock-props="stockProps"></display-board-stock-list-item>
      </div>
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
    }, 5000)
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
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  created() {
    this.updateValues();
  }
}
</script>

<style scoped>

</style>