<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <v-navbar class="absolute w-screen top-0" />

    <RouterLink
      to="/"
      class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
    >
      <img
        class="max-w-[128px] h-8 mr-2"
        src="../../../assets/logo.svg"
        alt="logo"
      >
      <span class="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Admin</span>
    </RouterLink>
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Admin login
        </h1>
        <VAlertMessage
          :display="true"
          type="warning"
          class="mt-5"
        >
          <strong class="mb-3">Caution</strong>

          <p>You are accessing the admin panel for this app.  You need an administrator password to continue.</p>
        </VAlertMessage>
        <VAlertMessage
          :display="message !== null"
          type="danger"
          dismissible
          @close="message = null"
        >
          {{ message }}
        </VAlertMessage>
        <form
          class="space-y-4 md:space-y-6"
          @submit.prevent="handleLogin"
        >
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              name="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            >
          </div>
          <button
            type="submit"
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import VAlertMessage from "@/components/VAlertMessage.vue";
import VNavbar from "@/components/VNavbar.vue";

export default {
  name: "AdminLoginPage",
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