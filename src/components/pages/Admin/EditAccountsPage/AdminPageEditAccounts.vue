<script setup>
import AccountService from "@/services/account.service";
import {onMounted, ref} from "vue";
import VAlertMessage from "@/components/VAlertMessage.vue";
import {Button} from "flowbite-vue";
import VAdminPageTable from "@/components/VAdminPageTable.vue";

const shape = {
  'card_number': 'Card number',
  'name': 'Full name',
  'balance': 'Account balance'
}

const accounts = ref({})
const errorMessage = ref(null)
const loading = ref(true)
const creating = ref(false)
const clearInput = ref(false)

onMounted(() => {
  updateValues();
})

function deleteAccount(cardNumber) {
  const accountToDelete = accounts.value.find(account => {
    return account.card_number === cardNumber
  });

  accountToDelete.deleting = true;

  AccountService.deleteAccount(cardNumber).then(
    response => {
      updateValues();
    },
    error => {
      errorMessage.value =
          (error.response &&
              error.response.data &&
              error.response.data.message) ||
          error.message ||
          error.toString();

      accountToDelete.deleting = false;
    }
  );
}

function createAccount(newAccount) {
  creating.value = true;

  AccountService.createAccount(newAccount).then(
    response => {
      updateValues();

      creating.value = false;
      clearInput.value = true;
    },
    error => {
      errorMessage.value =
          (error.response &&
              error.response.data &&
              error.response.data.message) ||
          error.message ||
          error.toString();

      creating.value = false
    }
  );
}

function updateValues() {
  AccountService.getAccounts().then(
      response => {
        accounts.value = response.data;
        loading.value = false;
      },
      error => {
        errorMessage.value =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

        loading.value = false;
      }
  )
}
</script>

<template>
  <v-admin-page-table
    key-name="card_number"
    :shape="shape"
    :data="accounts"
    :clear-input="clearInput"
    :creating="creating"
    :loading="loading"
    @cleared="clearInput = false"
    @delete="deleteAccount"
    @create="createAccount"
  >
    <template #header>
      <svg class="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" fill-rule="evenodd"></path>
      </svg>
      <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Cards</h5>
      <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
        A card is unique number, owned by one person which holds a balance to spend on stocks.
      </p>
      <v-alert-message
        :display="errorMessage !== null"
        type="danger"
        dismissible
        @close="errorMessage = null"
      >
        {{ errorMessage }}
      </v-alert-message>
    </template>
    <template #none>
      No accounts have been created yet.
    </template>
    <template #actions="actionsProps">
            <transition
        name="fade"
        mode="out-in"
      >
        <Button v-if="actionsProps.row.deleting" color="red" disabled loading>
          Deleting...
        </Button>
        <Button v-else @click.prevent="deleteAccount(actionsProps.row.card_number)" color="red">
          Delete
        </Button>
      </transition>
    </template>
  </v-admin-page-table>
</template>

<style scoped>

</style>