<template>
  <div class="card border-primary mt-3">
    <div class="card-header">
      Accounts
    </div>
    <div class="card-body">
      <div v-if="message" class="alert alert-danger alert-dismissible fade show" role="alert">
        {{ message }}
        <button @click.prevent="message = null" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Card Number</th>
            <th scope="col">Name</th>
            <th scope="col">Balance</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="Object.keys(this.accounts).length === 0">
            <th class="align-content-center text-center py-4" colspan="4">No accounts have been created yet!</th>
          </tr>
          <tr v-else v-for="(account, cardNumber) in this.accounts">
            <th class="align-middle" scope="row"><span class="badge text-bg-primary font-monospace">{{ cardNumber }}</span></th>
            <td class="align-middle">{{ account.fullName }}</td>
            <td class="align-middle">{{ account.balance }}</td>
            <td><button @click.prevent="deleteAccount(cardNumber)" class="btn btn-outline-danger">Delete</button></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th class="align-middle" scope="row">
              <input v-model="account.cardNumber" type="number" class="form-control font-monospace" placeholder="Card Number" aria-label="Code">
            </th>
            <td class="align-middle">
              <input v-model="account.name" type="text" class="form-control" placeholder="Name" aria-label="Name">
            </td>
            <td>
              <input v-model="account.balance" type="number" class="form-control" placeholder="Opening Balance" aria-label="Price">
            </td>
            <td>
              <button @click.prevent="createAccount" class="btn btn-outline-success" type="submit">Create</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import AccountService from "@/services/account.service";

export default {
  name: "AdminPageEditAccounts",
    data() {
    return {
      accounts: {},
      account: {
        cardNumber: null,
        name: null
      },
      message: null
    }
  },
  mounted() {
    this.updateValues();
  },
  methods: {
    deleteAccount(cardNumber) {
      AccountService.deleteAccount(cardNumber).then(
        response => {
          this.updateValues();
        },
        error => {
          this.message =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
      );
    },
    createAccount() {
      AccountService.createAccount(this.account).then(
        response => {
          this.account = {
            cardNumber: null,
            name: null
          }

          this.updateValues();
        },
        error => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
        }
      );
    },
    updateValues() {
      AccountService.getAccounts().then(
        response => {
          this.accounts = response.data;
        },
        error => {
          this.message =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
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