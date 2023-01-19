<template>
  <div class="card border-primary mt-3">
    <div class="card-header">
      Placeholders
    </div>
    <div class="card-body">
      <v-alert-message :message="errorMessage" type="danger" v-on:close="errorMessage = null"></v-alert-message>
      <v-admin-page-table
          name="placeholder"
          :table="placeholders"
          key-name="name"
          :value-names="values"
          :loading="loading"
          :creating="creating"
          :clear-input="clearInput"
          v-on:cleared="clearInput = false"
          v-on:delete="deletePlaceholder"
          v-on:create="createPlaceholder"></v-admin-page-table>
    </div>
  </div>
</template>

<script>
import PlaceholderService from "@/services/placeholder.service";
import VAdminPageTable from "@/components/VAdminPageTable.vue";
import VAlertMessage from "@/components/VAlertMessage.vue";

export default {
  name: "AdminPageEditPlaceholders",
  components: {VAlertMessage, VAdminPageTable},
    data() {
    return {
      placeholders: {},
      errorMessage: null,
      values: ['values'],
      creating: false,
      loading: true,
      clearInput: false
    }
  },
  mounted() {
    this.updateValues();
  },
  methods: {
    deletePlaceholder(placeholderName) {
      this.placeholders[placeholderName].deleting = true;

      PlaceholderService.deletePlaceholder(placeholderName).then(
        response => {
          this.updateValues();
        },
        error => {
          this.errorMessage =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();

          this.placeholders[placeholderName].deleting = false;
        }
      );
    },
    createPlaceholder(newPlaceholder) {
      this.creating = true;

      PlaceholderService.createPlaceholder(newPlaceholder).then(
        response => {
          this.updateValues();
          this.creating = false;
          this.clearInput = true;
        },
        error => {
            this.errorMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            this.creating = false;
        }
      );
    },
    updateValues() {
      PlaceholderService.getPlaceholders().then(
        response => {
          this.placeholders = response.data;
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
      )
    }
  }
}
</script>

<style scoped>

</style>