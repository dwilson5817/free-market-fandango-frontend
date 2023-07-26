<script setup>
import { useRouter } from "vue-router";

const router = useRouter()

defineProps([
    'to'
]);
</script>

<template>
  <li>
    <RouterLink :to="to" class="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
        <div class="font-semibold">
          <slot name="header" />
        </div>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          <slot />
        </span>
    </RouterLink>
  </li>
</template>

<style scoped>

</style>