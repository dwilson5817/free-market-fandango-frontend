<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-md">
      <a class="navbar-brand" href="#">
        <img src="../assets/logo.svg" alt="Logo" height="32" class="d-inline-block align-text-top">
        <span v-if="route.path.startsWith('/admin')" class="badge rounded-pill text-bg-danger ms-2">Admin</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" :class="{ 'active': route.path === '/' }" class="nav-link" :aria-current="{ 'page': route.path === '/' }">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin" :class="{ 'active': route.path === '/admin' }" class="nav-link" :aria-current="{ 'page': route.path === '/admin' }">Admin</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <button v-if="loggedIn" @click="logout" class="btn btn-outline-danger">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  name: "VNavbar",
  computed: {
    route: () => useRoute(),
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/admin/auth');
    }
  }
}
</script>

<style scoped>

</style>