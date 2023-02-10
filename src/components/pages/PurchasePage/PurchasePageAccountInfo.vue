<template>
  <v-alert-message v-if="account !== null" :display="true" type="info">
    <div v-for="(account) in account">
      <strong>{{ account.name }}</strong> currently has <strong>{{ account.balance }} Edinbucks</strong> in their account.
    </div>
  </v-alert-message>
  <v-alert-message v-else :display="error !== null" type="danger">
    {{ error }}
  </v-alert-message>
</template>

<script>
import AccountService from "@/services/account.service";
import VAlertMessage from "@/components/VAlertMessage.vue";

export default {
  name: "PurchasePageAccountInfo",
  components: { VAlertMessage },
  emits: [ 'accountLoaded' ],
  props: [ 'loadAccount', 'cardNumber' ],
  data() {
    return {
      account: null,
      error: null
    }
  },
  watch: {
    loadAccount(refresh) {
      if (refresh)
        this.getAccountInfo();
    }
  },
  methods: {
    getAccountInfo() {
      AccountService.getAccount(this.cardNumber).then(
        response => {
          this.account = response.data;
          this.$emit('accountLoaded', this.account[this.cardNumber].balance);
        },
        error => {
          this.account = null;
          this.error =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();

          this.$emit('accountLoaded', null);
        }
      )
    },
  }
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>