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
              <button type="submit" class="btn btn-primary">Continue</button>
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

</style>