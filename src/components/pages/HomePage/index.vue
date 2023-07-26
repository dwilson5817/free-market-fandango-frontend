<script setup>
import AppCard from "@/components/AppCard.vue";
import AppLayout from "@/components/AppLayout.vue";
</script>

<template>
  <AppLayout>
    <AppCard>
      <template #title>
          <h1 class="mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Hello, welcome to Free Market Fandango!
          </h1>
      </template>

      <template #body>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          A stock market themed party where drink choices and events affect prices.
        </p>
      </template>
    </AppCard>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
      <AppCard>
        <template #svg>
          <path
            d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </template>

        <template #title>
          How to play
        </template>

        <template #body>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Click below to see how the Free Market Fandango works.
          </p>

          <RouterLink to="/how-to-play" class="inline-flex items-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            How to play
          </RouterLink>
        </template>
      </AppCard>

      <AppCard>
        <template #svg>
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </template>

        <template #title>
          Check your card
        </template>

        <template #body>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            See the current balance of your card and any recent transactions.
          </p>

          <RouterLink to="/my-card" class="inline-flex items-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            View my card
          </RouterLink>
        </template>
      </AppCard>

      <AppCard>
        <template #svg>
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
        </template>

        <template #title>
          Live stock information
        </template>

        <template #body>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            See the current prices of stocks and their historical trends.
          </p>

          <RouterLink to="/stock-info" class="inline-flex items-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Live stock information
          </RouterLink>
        </template>
      </AppCard>
    </div>
  </AppLayout>
</template>

<style scoped>

</style>