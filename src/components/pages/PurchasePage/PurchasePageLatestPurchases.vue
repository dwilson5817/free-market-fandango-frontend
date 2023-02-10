<template>
  <div class="card border-warning">
    <div class="card-body">
      <v-alert-message :display="errorMessage !== null" @close="errorMessage = null" type="danger" dismissible>
        {{ errorMessage }}
      </v-alert-message>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Price</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody v-if="loading">
          <tr>
            <th class="align-content-center text-center py-4" :colspan="4">Loading...</th>
          </tr>
        </tbody>
        <tbody v-else-if="Object.keys(purchases).length === 0">
          <tr>
            <th class="align-content-center text-center py-4" :colspan="4">No purchases yet!</th>
          </tr>
        </tbody>
        <TransitionGroup v-else name="slide" tag="tbody">
          <tr :key="purchase.id" v-for="purchase in purchases">
            <th v-for="account in purchase.account" scope="row">{{ account.name }}</th>
            <td v-for="(stock, code) in purchase.stock">{{ stock.fullName }} ({{ code }})</td>
            <td>{{ purchase.price }}</td>
            <td>{{ timeSince(purchase.datetime) }}</td>
          </tr>
        </TransitionGroup>
      </table>
    </div>
  </div>
</template>

<script>
import {formatDistance} from "date-fns";
import PurchaseService from "@/services/purchase.service";
import VAlertMessage from "@/components/VAlertMessage.vue";

export default {
  name: "PurchasePageLatestPurchases",
  data() {
    return {
      errorMessage: null,
      purchases: {},
      loading: false
    }
  },
  components: {VAlertMessage},
  props: [ 'refresh' ],
  methods: {
    timeSince(datetime) {
      return formatDistance(new Date(datetime), new Date(), { addSuffix: true })
    },
    getPurchases() {
      PurchaseService.getPurchases().then(
        response => {
          this.purchases = response.data;
          this.loading = false;

          this.$emit('refreshed');
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
  },
  watch: {
    refresh() {
      this.loading = true;
      this.getPurchases()
    }
  }
}
</script>

<style scoped>

</style>