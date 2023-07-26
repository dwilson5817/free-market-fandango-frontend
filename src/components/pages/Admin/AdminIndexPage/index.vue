<script setup>
import AppCard from "@/components/AppCard.vue";
import AppLayout from "@/components/AppLayout.vue";
</script>

<template>
  <AppLayout>
    <AppCard>
      <template #title>
          <h5 class="mb-1 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome to the admin panel
          </h5>
      </template>

      <template #body>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          From here you can modify the functionality of Free Market Fandango.
        </p>
      </template>
    </AppCard>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
      <AppCard>
        <template #svg>
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </template>

        <template #title>
          Settings
        </template>

        <template #body>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Configure settings for the Free Market Fandango including starting and stopping the market, connecting Spotify and configuring variables.
          </p>

          <RouterLink to="/admin/settings" class="inline-flex items-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Edit settings
          </RouterLink>
        </template>
      </AppCard>

      <AppCard>
        <template #svg>
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
        </template>

        <template #title>
          Events
        </template>

        <template #body>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Events are news stories which will run throughout the night.  They can increase or decrease stock prices when run.
          </p>

          <RouterLink to="/admin/events" class="inline-flex items-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Edit events
          </RouterLink>
        </template>
      </AppCard>

      <AppCard>
        <template #svg>
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </template>

        <template #title>
          Stocks
        </template>

        <template #body>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Stocks represent the drinks (and potentially other items) to be sold on the market, their prices fluctuate throughout the night.
          </p>

          <RouterLink to="/admin/stocks" class="inline-flex items-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Edit stocks
          </RouterLink>
        </template>
      </AppCard>

      <AppCard>
        <template #svg>
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </template>

        <template #title>
          Cards
        </template>

        <template #body>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Cards carry a balance which can be used to purchase a stock.  Each card is registered to a single person who can check their balance online.
          </p>

          <RouterLink to="/admin/accounts" class="inline-flex items-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Edit cards
          </RouterLink>
        </template>
      </AppCard>

      <AppCard>
        <template #svg>
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </template>

        <template #title>
          Purchases
        </template>

        <template #body>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            A purchase uses the balance of a card to pay for a stock, the price of stocks is also influenced by a purchase.
          </p>

          <RouterLink to="/admin/purchase" class="inline-flex items-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Record purchase
          </RouterLink>
        </template>
      </AppCard>

      <AppCard>
        <template #svg>
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
        </template>

        <template #title>
          Display board
        </template>

        <template #body>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            The display board is the screen shown on a TV to display the current stock prices, card balances, news events and others.
          </p>

          <RouterLink to="/admin/board" class="inline-flex items-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Open display board
          </RouterLink>
        </template>
      </AppCard>
    </div>
  </AppLayout>
</template>

<style scoped>

</style>