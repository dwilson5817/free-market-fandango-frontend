<template>
  <v-navbar></v-navbar>
  <div class="container">
    <transition name="slide-left" mode="out-in">
      <div v-if="account">
        <button @click.prevent="account = null" type="button" class="btn btn-danger mt-3">Back</button>
        <div class="card border-primary my-3">
          <div class="card-body">
            <span v-for="(vals, key) in account">
              <h4>Hello, {{ vals.name }}</h4>
              <p class="mb-0">Your card number: <span class="badge text-bg-primary">{{ key }}</span></p>
              <p class="mb-0">Your account balance: {{ vals.balance }}</p>
            </span>
          </div>
        </div>
      </div>
      <div v-else class="card border-primary my-3">
        <div class="card-body">
          <v-alert-message :message="errorMessage" type="danger" v-on:close="errorMessage = null"></v-alert-message>

          <form @submit.prevent="checkBalance">
            <h5 class="card-title mb-3">Enter your card number below to see your current balance.</h5>
            <div class="row">
              <div class="col-md-8 col-lg-10 me-3 me-md-0">
                <input v-model="cardNumber" type="number" class="form-control form-control-lg" placeholder="Card number" :disabled="loading">
              </div>
              <div class="col-md-4 col-lg-2 my-3 my-md-0">
                <div class="d-inline-block w-100 position-relative" style="height: 2rem">
                  <Transition name="slide-left">
                    <button v-if="loading" type="submit" class="btn btn-success btn-lg w-100 position-absolute" disabled>
                      <span class="spinner-border spinner-border-sm my-auto" role="status" aria-hidden="true"></span>
                      Checking...
                    </button>
                    <button v-else type="submit" class="btn btn-success w-100 btn-lg position-absolute text-center">
                      Continue
                    </button>
                  </Transition>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import VAlertMessage from "@/components/VAlertMessage.vue";
import AccountService from "@/services/account.service";
import VNavbar from "@/components/VNavbar.vue";

export default {
  name: "index",
  components: {VNavbar, VAlertMessage},
  methods: {
    checkBalance() {
      this.loading = true;

      AccountService.getAccount(this.cardNumber).then(
        response => {
          this.account = response.data;
          this.loading = false;
          this.cardNumber = null;
          this.errorMessage = null;
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
      );
    }
  },
  data() {
    return {
      cardNumber: null,
      errorMessage: null,
      account: null,
      loading: false
    }
  },
}
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.2s ease-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>