<template>
  <v-navbar></v-navbar>
  <div class="container">
    <div class="row mt-3">
      <div class="col">
        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
          <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </symbol>
        </svg>
        <div class="card border-warning mb-3">
          <div class="card-body">
            <v-alert-message :display="errorMessage !== null" type="danger" @close="errorMessage = null" dismissible>
              {{ errorMessage }}
            </v-alert-message>
            <form @submit.prevent="submitPurchase">
              <purchase-page-account-input @card-number-changed="cardNumberChanged" @balance-changed="balanceChanged"></purchase-page-account-input>
              <purchase-page-stock-selector :submitting="submitting" @stock-changed="stockChanged"></purchase-page-stock-selector>
              <v-alert-message :display="accountBalance !== null && stockPrice !== null && accountBalance < stockPrice" type="danger">
                The current stock price (<strong>{{ stockPrice }} Edinbucks</strong>) is more than the balance of the account!
              </v-alert-message>
              <div class="d-inline-block position-relative" style="height: 2rem">
                <Transition name="slide-left">
                  <button v-if="submitting" type="submit" class="btn btn-primary position-absolute d-flex flex-nowrap" disabled>
                    <span class="spinner-border spinner-border-sm me-1 my-auto" role="status" aria-hidden="true"></span>
                    Loading...
                  </button>
                  <button v-else type="submit" class="btn btn-primary position-absolute" :disabled="accountBalance === null || stockPrice === null || accountBalance < stockPrice">
                    Continue
                  </button>
                </Transition>
              </div>
            </form>
          </div>
        </div>
        <purchase-page-latest-purchases :refresh="refreshPurchases" @refreshed="refreshPurchases = false"></purchase-page-latest-purchases>
      </div>
    </div>
  </div>
</template>

<script>
import VNavbar from "@/components/VNavbar.vue";
import VAlertMessage from "@/components/VAlertMessage.vue";
import PurchaseService from "@/services/purchase.service";
import PurchasePageLatestPurchases from "@/components/pages/PurchasePage/PurchasePageLatestPurchases.vue";
import PurchasePageAccountInfo from "@/components/pages/PurchasePage/PurchasePageAccountInfo.vue";
import PurchasePageStockSelector from "@/components/pages/PurchasePage/PurchasePageStockSelector.vue";
import PurchasePageAccountInput from "@/components/pages/PurchasePage/PurchasePageAccountInput.vue";

export default {
  name: "PurchasePage",
  components: { PurchasePageAccountInput, PurchasePageStockSelector, PurchasePageAccountInfo, PurchasePageLatestPurchases, VNavbar, VAlertMessage },
  mounted() {
    this.refreshPurchases = true;
  },
  data() {
    return {
      purchase: {
        account: null,
        stock: null
      },
      accountBalance: null,
      stockPrice: null,
      submitting: false,
      errorMessage: null,
      refreshPurchases: false
    }
  },
  methods: {
    stockChanged(stockCode, stockPrice) {
      this.purchase.stock = stockCode;
      this.stockPrice = stockPrice;
    },
    cardNumberChanged(cardNumber) {
      this.purchase.account = cardNumber;
    },
    balanceChanged(balance) {
      this.accountBalance = balance;
    },
    submitPurchase() {
      this.submitting = true;

      PurchaseService.createPurchase(this.purchase).then(
        response => {
          this.purchase = {
            account: null,
            stock: null
          };

          this.account = null;
          this.submitting = false;
        },
        error => {
          this.errorMessage =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();

          this.submitting = false;
        }
      )
    }
  }
}
</script>

<style scoped>

</style>