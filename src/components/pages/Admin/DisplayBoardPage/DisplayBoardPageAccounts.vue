<template>
  <div class="relative w-full h-full">
    <div class="absolute w-full top-1/2 -translate-y-1/2">
      <marquee-text
        :key="getSimpleHash"
        :repeat=5
        class="w-full text-xl text-white border-start h-full items-center whitespace-nowrap"
      >
        <h4>
          <span
            v-for="account in accounts"
            class="mr-2"
          >
            {{ account.name }}
            <span class="bg-gray-100 text-gray-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
              <span class="edinbuck-sign svg-gray" />
              {{ toCurrency(account.balance) }}
            </span>
            &#x2022;
          </span>
        </h4>
      </marquee-text>
    </div>
  </div>
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
    }, 30000)
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  created() {
    this.updateValues();
  },
  computed: {
    getSimpleHash() {
      let result = '';

      for (let account in this.accounts)
        result += this.accounts[account].card_number + this.accounts[account].balance

      return result.split('.').join('');
    }
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
  }
}
</script>

<style scoped>
  .edinbuck-sign {
      background-image: url(../../../../assets/edinbuck.svg);
      display: inline-block;
      background-size: contain;
      position: relative;
      top: 3px;
      width: 9px;
      height: 18px;
  }

  .svg-gray {
      filter: brightness(0) saturate(100%) invert(97%) sepia(2%) saturate(1089%) hue-rotate(188deg) brightness(90%) contrast(89%);
  }
</style>