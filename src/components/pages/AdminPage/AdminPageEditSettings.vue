<template>
  <div class="max-w-screen-xl mx-auto">
    <div class="w-full p-6 pb-0">
      <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <svg class="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Settings</h5>
        <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
          Settings are the parameters which Free Market Fandango uses to calculate drinks prices, news stories and more.
        </p>
        <v-alert-message
          :display="errorMessage !== null"
          type="danger"
          dismissible
          @close="errorMessage = null"
        >
          {{ errorMessage }}
        </v-alert-message>
        <v-alert-message
          :display="successMessage !== null"
          type="success"
          dismissible
          @close="successMessage = null"
        >
          {{ successMessage }}
        </v-alert-message>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Key
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Value
                        </th>
                    </tr>
                </thead>
                <tbody v-if="loading">
                    <tr class="bg-white dark:bg-gray-900 dark:border-gray-700">
                        <th scope="row" :colspan="2" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Loading...
                        </th>
                    </tr>
                </tbody>
                <tbody>
                    <tr v-for="(value, key) in settings" :key="key" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <td class="px-6 py-4">
                          {{ key }}
                        </td>
                        <td class="px-6 py-4">
                              <input v-model="settings[key]" :disabled="loading || saving" type="number" id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr class="bg-white dark:bg-gray-900 dark:border-gray-700">
                      <td class="px-6 py-4" colspan="2">
                        <transition
                          name="fade"
                          mode="out-in"
                        >
                          <Button v-if="saving" color="green" disabled loading>
                            Saving...
                          </Button>
                          <Button v-else :disabled="saving" @click.prevent="setSettings" color="green">
                            Save
                          </Button>
                        </transition>
                      </td>
                    </tr>
                </tfoot>
            </table>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import VAlertMessage from "@/components/VAlertMessage.vue";
import {Badge, Button, Input} from "flowbite-vue";
import {string} from "postcss-selector-parser";
import StockService from "@/services/stock.service";
import SettingsService from "@/services/settings.service";

export default {
  name: "AdminPageEditSettings",
  components: {Badge, Button, VAlertMessage},
  data() {
    return {
      settings: {},
      loading: true,
      saving: false,
      successMessage: null,
      errorMessage: null,
    }
  },
  mounted() {
    this.getSettings();
  },
  methods: {
    getSettings() {
      this.creating = true;

      SettingsService.getSettings().then(
        response => {
          this.settings = response.data;

          this.loading = false;
        },
        error => {
          this.errorMessage =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();

          this.loading = false;
        }
      );
    },
    setSettings() {
      this.saving = true;

      SettingsService.setSettings(this.settings).then(
        response => {
          this.successMessage = "Settings updated successfully!";
          this.saving = false;

          this.getSettings();
        },
        error => {
          this.errorMessage =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();

          this.saving = false;
        }
      )
    }
  }
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>