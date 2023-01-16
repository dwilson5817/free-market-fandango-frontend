<template>
  <div class="container-fluid px-0 d-flex min-vh-100 flex-column overflow-hidden">
    <div class="row g-0">
        <div class="col">
            <display-board-page-navbar></display-board-page-navbar>
        </div>
    </div>
    <div class="row g-0 bg-dark text-white flex-fill fill d-flex justify-content-start">
        <div class="col portlet-container portlet-dropzone">
          <display-board-stocks></display-board-stocks>
        </div>
    </div>
    <div class="row g-0 bg-danger">
      <div class="col">
        <DisplayBoardPageNews></DisplayBoardPageNews>
      </div>
    </div>
  </div>
</template>

<script>
import DisplayBoardPageNavbar from "@/components/pages/DisplayBoardPage/DisplayBoardPageNavbar.vue";
import DisplayBoardPageNews from "@/components/pages/DisplayBoardPage/DisplayBoardPageNews.vue";
import DisplayBoardStocks from "@/components/pages/DisplayBoardPage/DisplayBoardStocks.vue";

export default {
  name: "index",
  components: { DisplayBoardStocks, DisplayBoardPageNews, DisplayBoardPageNavbar }
}
</script>

<style scoped>

</style>