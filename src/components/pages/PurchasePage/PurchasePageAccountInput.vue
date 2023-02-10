<template>
  <div class="mb-3">
    <label for="inputAdminPassword" class="form-label">Card number</label>
    <input @change="changeCardNumber" v-model="cardNumber" type="number" class="form-control" id="inputAdminPassword" aria-describedby="adminPasswordHelp" :disabled="submitting">
    <div id="adminPasswordHelp" class="form-text">The card number associated with the purchasers account.</div>
  </div>
  <purchase-page-account-info :load-account="cardNumberChanged" :card-number="cardNumber" @account-loaded="accountLoaded"></purchase-page-account-info>
</template>

<script>
import PurchasePageAccountInfo from "@/components/pages/PurchasePage/PurchasePageAccountInfo.vue";

export default {
  name: "PurchasePageAccountInput",
  props: [ 'submitting' ],
  emits: [ 'cardNumberChanged', 'balanceChanged' ],
  components: { PurchasePageAccountInfo },
  data() {
    return {
      cardNumber: null,
      account: null,
      cardNumberChanged: false
    }
  },
  methods: {
    changeCardNumber() {
      this.cardNumberChanged = true;
      this.$emit('cardNumberChanged', this.cardNumber)
    },
    accountLoaded(balance) {
      this.cardNumberChanged = false;
      this.$emit('balanceChanged', balance);
    }
  }
}
</script>

<style scoped>

</style>