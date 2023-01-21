<template>
  <v-navbar></v-navbar>
  <div class="container mb-3">
    <div class="row mt-3">
      <div class="col-md mb-3">
        <button type="button" class="btn btn-lg btn-danger w-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-graph-down-arrow mb-1" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 11.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-1 0v2.6l-3.613-4.417a.5.5 0 0 0-.74-.037L7.06 8.233 3.404 3.206a.5.5 0 0 0-.808.588l4 5.5a.5.5 0 0 0 .758.06l2.609-2.61L13.445 11H10.5a.5.5 0 0 0-.5.5Z"/>
          </svg>
          Market Crash
        </button>
      </div>
      <div class="col-md mb-3">
        <button type="button" class="btn btn-lg btn-success w-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-play-fill mb-1" viewBox="0 0 16 16">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
          </svg>
          Open Market
        </button>
      </div>
      <div class="col-md mb-3">
        <div class="btn-group w-100">
          <button type="button" class="btn btn-lg btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-stop-fill mb-1" viewBox="0 0 16 16">
              <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
            </svg>
            Close Market
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">10 mins</a></li>
            <li><a class="dropdown-item" href="#">20 mins</a></li>
            <li><a class="dropdown-item" href="#">30 mins</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="#">Immediately</a></li>
          </ul>
        </div>

      </div>
    </div>
    <div class="row">
      <div class="col">
        <admin-page-edit-accounts></admin-page-edit-accounts>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <admin-page-edit-stocks></admin-page-edit-stocks>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <admin-page-edit-events></admin-page-edit-events>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <admin-page-edit-placeholders></admin-page-edit-placeholders>
      </div>
    </div>
  </div>
</template>

<script>
import AdminPageEditStocks from "@/components/pages/AdminPage/AdminPageEditStocks.vue";
import AdminPageEditAccounts from "@/components/pages/AdminPage/AdminPageEditAccounts.vue";
import AdminPageEditEvents from "@/components/pages/AdminPage/AdminPageEditEvents.vue";
import AdminPageEditPlaceholders from "@/components/pages/AdminPage/AdminPageEditPlaceholders.vue";
import VNavbar from "@/components/VNavbar.vue";

export default {
  name: "index",
  components: { VNavbar, AdminPageEditPlaceholders, AdminPageEditEvents, AdminPageEditAccounts, AdminPageEditStocks }
}
</script>

<style scoped>

</style>