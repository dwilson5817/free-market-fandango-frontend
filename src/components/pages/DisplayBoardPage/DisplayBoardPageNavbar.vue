<template>
  <nav class="navbar navbar-dark" style="background: linear-gradient(90deg, rgba(154,202,60,1) 0%, rgba(154,202,60,1) 0%, rgba(213,54,75,1) 100%);">
    <div class="container">
      <div class="row">
        <div class="col-2">
          <a class="navbar-brand" href="#">
            <img src="../../../assets/logo.svg" alt="" width="200">
          </a>
        </div>
      </div>
      <div class="col-10">
        <display-board-page-accounts></display-board-page-accounts>
      </div>
    </div>
  </nav>
</template>

<script>
import DisplayBoardPageAccounts from "@/components/pages/DisplayBoardPage/DisplayBoardPageAccounts.vue";

export default {
  name: "DisplayBoardPageNavbar",
  components: {DisplayBoardPageAccounts}
}
</script>

<style scoped>

</style>