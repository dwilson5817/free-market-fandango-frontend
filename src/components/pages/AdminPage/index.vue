<script setup>

import VNavbar from "@/components/VNavbar.vue";
import AdminPageActiveButtons from "@/components/pages/AdminPage/AdminPageActiveButtons.vue";
import AdminPageEditSpotify from "@/components/pages/AdminPage/AdminPageEditSpotify.vue";
import AdminPageEditSettings from "@/components/pages/AdminPage/AdminPageEditSettings.vue";
import AdminPageEditAccounts from "@/components/pages/AdminPage/AdminPageEditAccounts.vue";
import AdminPageEditStocks from "@/components/pages/AdminPage/AdminPageEditStocks.vue";
import AdminPageEditEvents from "@/components/pages/AdminPage/AdminPageEditEvents.vue";
</script>

<template>
  <v-navbar />
  <admin-page-active-buttons />
  <admin-page-edit-spotify />
  <admin-page-edit-settings />
  <admin-page-edit-accounts />
  <admin-page-edit-stocks />
  <admin-page-edit-events />
  <div class="mb-6"></div>
</template>

<style scoped>

</style>