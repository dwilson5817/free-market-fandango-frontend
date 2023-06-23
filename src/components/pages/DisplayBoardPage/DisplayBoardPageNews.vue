<template>
  <div class="px-3 grid grid-cols-7 gap-0 bg-red-600 shadow-red-950">
    <div class="text-center p-3">
      <h3 class="uppercase text-4xl font-bold tracking-tight text-gray-900 dark:text-white">News</h3>
    </div>

    <div class="w-full col-span-6 bg-red-700 border-x-2 border-white h-full relative">
      <div class="absolute w-full top-1/2 -translate-y-1/2">
        <marquee-text
          :key="news"
          :repeat=5
          class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white h-full items-center"
        >
          <h4>
              <span class="uppercase mr-3">{{ news.title }}</span>
              &#x2022;
              <small class="ml-3">{{ news.body }}</small>

                          <span
              v-if="news.breaking"
              class="bg-red-100 text-red-800 text-xl font-medium mx-4 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 animate-flicker"
            >BREAKING</span>
            <span
              v-else
              class="mx-4 animate-flicker"
            >&#9608;</span>
          </h4>
        </marquee-text>
      </div>
    </div>
  </div>
</template>

<script>
import MarqueeText from "vue-marquee-text-component";
import DisplayBoardPageAccounts from "@/components/pages/DisplayBoardPage/DisplayBoardPageAccounts.vue";

export default {
  name: "DisplayBoardPageNews",
  components: {
    DisplayBoardPageAccounts,
    MarqueeText
  },
  props: [
    'news'
  ]
}
</script>

<style scoped>
  @keyframes flickerAnimation {
    0%   { opacity:1; }
    50%  { opacity:0.4; }
    100% { opacity:1; }
  }

  @-o-keyframes flickerAnimation{
    0%   { opacity:1; }
    50%  { opacity:0.4; }
    100% { opacity:1; }
  }

  @-moz-keyframes flickerAnimation{
    0%   { opacity:1; }
    50%  { opacity:0.4; }
    100% { opacity:1; }
  }

  @-webkit-keyframes flickerAnimation{
    0%   { opacity:1; }
    50%  { opacity:0.4; }
    100% { opacity:1; }
  }

  .animate-flicker {
     -webkit-animation: flickerAnimation 1s infinite;
     -moz-animation: flickerAnimation 1s infinite;
     -o-animation: flickerAnimation 1s infinite;
      animation: flickerAnimation 1s infinite;
  }
</style>