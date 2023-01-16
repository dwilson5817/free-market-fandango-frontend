<template>
  <div class="card border-primary mt-3">
    <div class="card-header">
      Placeholders
    </div>
    <div class="card-body">
      <div v-if="message" class="alert alert-danger alert-dismissible fade show" role="alert">
        {{ message }}
        <button @click.prevent="message = null" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Values</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="Object.keys(this.placeholders).length === 0">
            <th class="align-content-center text-center py-4" colspan="3">No placeholders have been created yet!</th>
          </tr>
          <tr v-else v-for="(values, name) in this.placeholders">
            <th class="align-middle" scope="row"><span class="badge text-bg-primary font-monospace">{{ name }}</span></th>
            <td class="align-middle">
              <span v-if="values.length === 0" class="badge rounded-pill text-bg-danger me-1">None</span>
              <span v-else v-for="value in values" class="badge rounded-pill text-bg-warning me-1">{{ value }}</span>
            </td>
            <td><button @click.prevent="deletePlaceholder(name)" class="btn btn-outline-danger">Delete</button></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th class="align-middle" scope="row">
              <input v-model="placeholder.name" type="text" class="form-control font-monospace" placeholder="Name" aria-label="Name">
            </th>
            <td>
              <input v-model="placeholder.values" type="text" class="form-control" placeholder="Values" aria-label="Values">
            </td>
            <td>
              <button @click.prevent="createPlaceholder" class="btn btn-outline-success" type="submit">Create</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import PlaceholderService from "@/services/placeholder.service";

export default {
  name: "AdminPageEditPlaceholders",
    data() {
    return {
      placeholders: {},
      placeholder: {
        name: null,
        values: null
      },
      message: null
    }
  },
  mounted() {
    this.updateValues();
  },
  methods: {
    deletePlaceholder(placeholderName) {
      PlaceholderService.deletePlaceholder(placeholderName).then(
        response => {
          this.updateValues();
        },
        error => {
          this.message =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
      );
    },
    createPlaceholder() {
      PlaceholderService.createPlaceholder(this.placeholder).then(
        response => {
          this.placeholder = {
            name: null,
            values: null
          }

          this.updateValues();
        },
        error => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
        }
      );
    },
    updateValues() {
      PlaceholderService.getPlaceholders().then(
        response => {
          this.placeholders = response.data;
        },
        error => {
          this.message =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
      )
    }
  }
}
</script>

<style scoped>

</style>