<template>
  <div class="card border-primary mt-3">
    <div class="card-header">
      Stocks
    </div>
    <div class="card-body">
      <div v-if="message" class="alert alert-danger alert-dismissible fade show" role="alert">
        {{ message }}
        <button @click.prevent="message = null" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Code</th>
            <th scope="col">Full name</th>
            <th scope="col">Current price</th>
            <th scope="col">Tags</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="Object.keys(this.stocks).length === 0">
            <th class="align-content-center text-center py-4" colspan="5">No stocks have been created yet!</th>
          </tr>
          <tr v-else v-for="(stockProps, stockName) in this.stocks">
            <th class="align-middle" scope="row"><span class="badge text-bg-primary font-monospace">{{ stockName }}</span></th>
            <td class="align-middle">{{ stockProps.fullName }}</td>
            <td class="align-middle">{{ stockProps.currentPrice }}</td>
            <td class="align-middle">
              <span v-if="stockProps.tags.length === 0" class="badge rounded-pill text-bg-danger me-1">None</span>
              <span v-else v-for="tag in stockProps.tags" class="badge rounded-pill text-bg-warning me-1">{{ tag }}</span>
            </td>
            <td><button @click.prevent="deleteStock(stockName)" class="btn btn-outline-danger">Delete</button></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th class="align-middle" scope="row">
              <input v-model="stock.code" type="text" maxlength="4" class="form-control font-monospace" placeholder="Code" aria-label="Code">
            </th>
            <td class="align-middle">
              <input v-model="stock.fullName" type="text" class="form-control" placeholder="Full Name" aria-label="Name">
            </td>
            <td>
              <input v-model="stock.price" type="number" class="form-control" placeholder="Price" aria-label="Price">
            </td>
            <td>
              <input v-model="stock.tags" type="text" class="form-control" placeholder="Tags" aria-label="Tags">
            </td>
            <td>
              <button @click.prevent="createStock" class="btn btn-outline-success" type="submit">Create</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import StockService from "@/services/stock.service";

export default {
  name: "AdminPageEditStocks",
    data() {
    return {
      stocks: {},
      stock: {
        code: null,
        fullName: null,
        price: null,
        tags: null
      },
      message: null
    }
  },
  mounted() {
    this.updateValues();
  },
  methods: {
    deleteStock(stockCode) {
      StockService.deleteStock(stockCode).then(
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
    createStock() {
      StockService.createStock(this.stock).then(
        response => {
          this.stock = {
            code: null,
            fullName: null,
            price: null
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
      StockService.getStocks().then(
        response => {
          this.stocks = response.data;
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