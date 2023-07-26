<script>
import {defineComponent} from 'vue'
import {useRoute} from "vue-router";

export default defineComponent({
  name: "AppNavbarLink",
  props: {
    active: Boolean,
    to: String
  },
  computed: {
    route: () => useRoute(),
  }
})
</script>

<template>
  <li v-if="route.path === to">
    <RouterLink :to="to" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
      <slot />
    </RouterLink>
  </li>
  <li v-else>
    <RouterLink :to="to" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
      <slot />
    </RouterLink>
  </li>
</template>

<style scoped>

</style>