<script setup>
import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppBreadcrumbs from "@/components/AppBreadcrumbs.vue";

defineProps([
    'pageName'
]);
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppNavbar />

    <div class="max-w-screen-xl mx-auto w-full">
      <div class="w-full px-4">
        <AppBreadcrumbs :page-name="pageName" class="mb-4"/>

        <slot />
      </div>
    </div>

    <AppFooter class="mt-auto" />
  </div>
</template>

<style scoped>

</style>