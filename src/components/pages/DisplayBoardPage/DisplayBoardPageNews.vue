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
          <h4 class="my-2">
            {{ news.body }}
            <span v-if="news.breaking" class="badge text-bg-light mx-3">BREAKING</span>
            <span v-else class="mx-3">&#9608;</span>
          </h4>
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
  props: [
    'news'
  ]
}
</script>

<style scoped>

</style>