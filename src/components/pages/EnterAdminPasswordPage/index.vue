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
        <div class="alert alert-danger d-flex align-items-center" role="alert">
          <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
          <div>
            <p class="mb-0">You are attempting to login to the admin panel to control the settings for this app!</p>
            <strong>You need an administrator password to continue.</strong>
          </div>
        </div>
        <v-alert-message :message="message" type="danger" @close="message = null"></v-alert-message>
        <div class="card border-danger">
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="inputAdminPassword" class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" id="inputAdminPassword" aria-describedby="adminPasswordHelp">
                <div id="adminPasswordHelp" class="form-text">Enter the administrator password to continue.</div>
              </div>
              <div class="d-inline-block position-relative" style="height: 2rem">
                <Transition name="slide-left">
                  <button v-if="loading" type="submit" class="btn btn-primary position-absolute d-flex flex-nowrap" disabled>
                    <span class="spinner-border spinner-border-sm me-1 my-auto" role="status" aria-hidden="true"></span>
                    Loading...
                  </button>
                  <button v-else type="submit" class="btn btn-primary position-absolute">
                    Continue
                  </button>
                </Transition>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VAlertMessage from "@/components/VAlertMessage.vue";
import VNavbar from "@/components/VNavbar.vue";

export default {
  name: "index",
  components: {VNavbar, VAlertMessage},
  data() {
    return {
      password: null,
      message: null,
      loading: false
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/admin");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;

      this.$store.dispatch("auth/login", this.password).then(
          () => {
            this.$router.push("/admin");
          },
          (error) => {
            this.loading = false;
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },
  }
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