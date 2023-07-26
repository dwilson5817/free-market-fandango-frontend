<script setup>
import DisplayBoardStocks from "@/components/pages/Admin/DisplayBoardPage/DisplayBoardStocks.vue";
import AppCard from "@/components/AppCard.vue";
import AppLayout from "@/components/AppLayout.vue";
</script>

<template>
  <AppLayout page-name="Live stock information">
    <AppCard>
      <template #svg>
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </template>

      <template #title>
        Live stock information
      </template>

      <template #body>
        <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">
          See the current prices of stocks and their historical trends.
        </p>

        <p class="font-normal text-gray-700 dark:text-gray-400">
          The information on this page refreshes automatically every 30 seconds.
        </p>
      </template>
    </AppCard>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <DisplayBoardStocks :interactive="true"/>
    </div>
  </AppLayout>
</template>

<style scoped>

</style>