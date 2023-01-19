<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3 mt-3">
        <div v-if="message" class="alert alert-danger" role="alert">
          {{ message }}
        </div>
        <div class="card border-danger my-3">
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
export default {
  name: "index",
  data() {
    return {
      password: '',
      message: '',
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