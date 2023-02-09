<template>
  <display-board-breaking-news :news="news" :hidden="breakingHidden" @ended="breakingHidden = true"></display-board-breaking-news>
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
        <display-board-page-news :news="news"></display-board-page-news>
      </div>
    </div>
  </div>
</template>

<script>
import DisplayBoardPageNavbar from "@/components/pages/DisplayBoardPage/DisplayBoardPageNavbar.vue";
import DisplayBoardPageNews from "@/components/pages/DisplayBoardPage/DisplayBoardPageNews.vue";
import DisplayBoardStocks from "@/components/pages/DisplayBoardPage/DisplayBoardStocks.vue";
import DisplayBoardBreakingNews from "@/components/pages/DisplayBoardPage/DisplayBoardBreakingNews.vue";
import NewsService from "@/services/news.service";
import _ from 'lodash';


export default {
  name: "index",
  components: {DisplayBoardBreakingNews, DisplayBoardStocks, DisplayBoardPageNews, DisplayBoardPageNavbar },
  data() {
    return {
      error: null,
      news: {},
      breakingHidden: true
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.updateValues()
    }, 5000)
  },
  methods: {
    updateValues() {
      NewsService.getNews().then(
        response => {
          if (_.isEqual(this.news, response.data))
            return

          this.news = response.data;

          if (response.data.breaking)
            this.breakingHidden = false
        },
        error => {
          this.error =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
        }
      )
    }
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  created() {
    this.updateValues();
  }
}
</script>

<style scoped>

</style>