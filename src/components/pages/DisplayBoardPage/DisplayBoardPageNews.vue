<template>
  <div class="text-white container">
    <div class="row">
      <div class="col-2 text-uppercase border-end">
        <h1 class="mb-0">
          <strong>News</strong>
        </h1>
      </div>
      <div class="col-10 g-0 border-end">
        <marquee-text class="w-100" :key="this.news">
          <h4 class="my-2">{{ news }} <span class="mx-3">&#9608;</span></h4>
        </marquee-text>
      </div>
    </div>
  </div>
</template>

<script>
import MarqueeText from "vue-marquee-text-component";

export default {
  name: "DisplayBoardPageNews",
  components: {
    MarqueeText
  },
  data() {
    return {
      news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a purus at justo ultrices commodo. Ut vitae nisi nisi. Phasellus tempor vestibulum nulla, sit amet vehicula nunc.",
    }
  }
}
</script>

<style scoped>

</style>