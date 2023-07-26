<script setup>
import { useSlots } from "vue";

const slots = useSlots();
</script>

<template>
  <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <svg
        v-if="slots.svg"
        class="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
      <slot name="svg" />
    </svg>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      <slot name="title" />
    </h5>

    <slot name="body" />
  </div>
</template>

<style scoped>

</style>