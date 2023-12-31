<script>
import {defineComponent} from 'vue'
import VAlertMessage from "@/components/VAlertMessage.vue";
import AccountService from "@/services/account.service";
import AppCard from "@/components/AppCard.vue";
import {formatDistance} from "date-fns";

export default defineComponent({
  name: "AccountPageAccountInfo",
  components: {AppCard, VAlertMessage},
  data() {
    return {
      cardNumber: null,
      errorMessage: null,
      account: null,
      loading: false
    }
  },
  methods: {
    checkBalance() {
      this.loading = true;

      AccountService.getAccount(this.cardNumber).then(
        response => {
          this.account = response.data;
          this.loading = false;
          this.cardNumber = null;
          this.errorMessage = null;
        },
        error => {
          this.errorMessage =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();

          this.loading = false;

          console.log(this.errorMessage)
        }
      );
    },
    timeSince(datetime) {
      return formatDistance(new Date(datetime), new Date(), { addSuffix: true })
    }
  },
})
</script>

<template>
  <Transition
    name="slide-left"
    mode="out-in"
  >
    <div v-if="account">
      <button
          type="button"
          class="inline-block focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          @click="account = null"
      >
        Back
      </button>

      <AppCard class="my-4">
        <template #title>
          <h1 class="mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Hello, {{ account.name }}!
          </h1>
        </template>

        <template #body>
          <p class="font-normal text-2xl text-gray-700 dark:text-gray-400">
            Your current balance is <strong>{{ account.balance }} Edinbucks</strong>.
          </p>
        </template>
      </AppCard>
      <AppCard>
        <template #svg>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </template>

        <template #title>
          Purchases
        </template>

        <template #body>
          <table class="w-full mt-4 text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Stock code
              </th>
              <th scope="col" class="px-6 py-3">
                Stock name
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Time
              </th>
            </tr>
            </thead>
            <tbody v-if="account.purchases.length === 0">
            <tr class="bg-white dark:bg-gray-900 dark:border-gray-700">
              <th scope="row" colspan="4" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                No purchases found!
              </th>
            </tr>
            </tbody>
            <tbody>
              <tr v-for="purchase in account.purchases" :key="purchase.id" class="bg-white dark:bg-gray-900 dark:border-gray-700" :class="{'border-b': purchase.id !== account.purchases[Object.keys(account.purchases)[Object.keys(account.purchases).length - 1]].id}">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ purchase.stock.code }}
                </th>
                <td class="px-6 py-4">
                  {{ purchase.stock.name }}
                </td>
                <td class="px-6 py-4">
                  {{ purchase.purchase_price }}
                </td>
                <td class="px-6 py-4">
                  {{ timeSince(purchase.purchased_at) }}
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </AppCard>
    </div>
    <div
      v-else
      class="max-w-screen-xl mx-auto p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <svg
        class="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        View your card
      </h5>
      <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
        Enter your card number below then click "Continue" to see the current balance and recent transactions on your card.
      </p>
      <VAlertMessage
        :display="errorMessage !== null"
        type="danger"
        dismissible
        @close="errorMessage = null"
      >
        {{ errorMessage }}
      </VAlertMessage>
      <form @submit.prevent="checkBalance">
        <label
          for="card-number"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Card number</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <input
            id="card-number"
            v-model="cardNumber"
            type="text"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="1234"
            required
          >
          <Transition name="slide-left">
            <button
              v-if="loading"
              disabled
              type="button"
              class="absolute right-2.5 bottom-2.5 px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
              Loading...
            </button>
            <button
              v-else
              type="submit"
              class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Continue
            </button>
          </Transition>
        </div>
      </form>
    </div>
  </Transition>
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.2s ease-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>