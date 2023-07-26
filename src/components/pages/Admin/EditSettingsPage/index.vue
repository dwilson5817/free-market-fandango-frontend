<script setup>
import AdminPageActiveButtons from "@/components/pages/Admin/EditSettingsPage/AdminPageActiveButtons.vue";
import AdminPageEditSpotify from "@/components/pages/Admin/EditSettingsPage/AdminPageEditSpotify.vue";
import AdminPageEditSettings from "@/components/pages/Admin/EditSettingsPage/AdminPageEditSettings.vue";
import AppLayout from "@/components/AppLayout.vue";
</script>

<template>
  <AppLayout page-name="Settings">
    <AdminPageActiveButtons class="mb-4" />
    <AdminPageEditSpotify class="mb-4" />
    <AdminPageEditSettings />
  </AppLayout>
</template>

<style scoped>

</style>