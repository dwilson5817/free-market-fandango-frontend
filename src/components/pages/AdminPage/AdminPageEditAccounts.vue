<template>
  <div class="card border-primary mt-3">
    <div class="card-header">
      Accounts
    </div>
    <div class="card-body">
      <v-alert-message :message="errorMessage" v-on:close="errorMessage = null" type="danger"></v-alert-message>
      <v-admin-page-table
          name="account"
          key-name="cardNumber"
          :table="accounts"
          :value-names="valueNames"
          :creating="creating"
          :loading="loading"
          :clear-input="clearInput"
          v-on:cleared="clearInput = false"
          v-on:delete="deleteAccount"
          v-on:create="createAccount"></v-admin-page-table>
    </div>
  </div>
</template>

<script>
import AccountService from "@/services/account.service";
import VAlertMessage from "@/components/VAlertMessage.vue";
import VAdminPageTable from "@/components/VAdminPageTable.vue";

export default {
  name: "AdminPageEditAccounts",
  components: {VAdminPageTable, VAlertMessage},
    data() {
    return {
      accounts: {},
      valueNames: ['name', 'balance'],
      errorMessage: null,
      loading: true,
      creating: false,
      clearInput: false
    }
  },
  mounted() {
    this.updateValues();
  },
  methods: {
    deleteAccount(cardNumber) {
      this.accounts[cardNumber].deleting = true;

      AccountService.deleteAccount(cardNumber).then(
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

          delete this.accounts[cardNumber].deleting
        }
      );
    },
    createAccount(newAccount) {
      this.creating = true;

      AccountService.createAccount(newAccount).then(
        response => {
          this.account = {
            cardNumber: null,
            name: null
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

          this.creating = false
        }
      );
    },
    updateValues() {
      AccountService.getAccounts().then(
        response => {
          this.accounts = response.data;
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