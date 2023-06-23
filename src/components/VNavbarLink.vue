<script>
import {defineComponent} from 'vue'
import {useRoute} from "vue-router";

export default defineComponent({
  name: "VNavbarLink",
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
    <RouterLink
      :to="to"
      class="flex items-center justify-between w-full py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
      aria-current="page"
    >
      <slot />
    </RouterLink>
  </li>
  <li v-else>
    <RouterLink
      :to="to"
      class="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    >
      <slot />
    </RouterLink>
  </li>
</template>

<style scoped>

</style>