<template>
  <marquee-text class="w-100 text-white border-start" :key="this.accounts">
    <h4 class="my-2">
      <span v-for="account in this.accounts" class="me-3">
        {{ account.name }}
        <span class="badge bg-dark text-white">
          <span class="edinbuck-sign"></span>
          {{ toCurrency(account.balance) }}
        </span>
      </span>
    </h4>
  </marquee-text>
</template>

<script>
import MarqueeText from "vue-marquee-text-component";
import StockService from "@/services/stock.service";
import AccountService from "@/services/account.service";

export default {
  name: "DisplayBoardPageAccounts",
  components: {
    MarqueeText
  },
  data() {
    return {
      accounts: {}
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.updateValues()
    }, 5000)
  },
  methods: {
    updateValues() {
      AccountService.getAccounts().then(
        response => {
          this.accounts = response.data;
        },
        error => {
          this.error =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
        }
      )
    },
    toCurrency(value) {
      if (typeof value !== "number") {
        return value;
      }

      return value.toLocaleString('en-GB', { minimumFractionDigits: 2 });
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
  .edinbuck-sign {
      background-image: url(../../../assets/edinbuck.svg);
      display: inline-block;
      background-size: contain;
      position: relative;
      top: 3px;
      width: 9px;
      height: 18px;
  }
</style>