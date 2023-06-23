<template>
  <div class="w-full">
    <div class="grid grid-cols-2">
      <div v-if="currentlyPlaying !== null && currentlyPlaying.hasOwnProperty('name')" class="bg-spotify-green relative">
        <div class="grid grid-cols-12">
          <div class="col-span-2">
            <img :src="currentlyPlaying.artwork">
          </div>
          <div class="col-span-10 px-5 h-full align-items-center relative">
            <div class="absolute top-1/2 -translate-y-1/2">
              <div>
                <div>
                  <svg class="w-6 mb-2 inline" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" d="M17.721 1.599a.75.75 0 01.279.584v11.29a2.25 2.25 0 01-1.774 2.198l-2.041.442a2.216 2.216 0 01-.938-4.333l2.662-.576a.75.75 0 00.591-.734V6.112l-8 1.73v7.684a2.25 2.25 0 01-1.774 2.2l-2.042.44a2.216 2.216 0 11-.935-4.33l2.659-.574A.75.75 0 007 12.53V4.237a.75.75 0 01.591-.733l9.5-2.054a.75.75 0 01.63.149z" fill-rule="evenodd"></path>
                  </svg>
                </div>

                <h5 class="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-black">
                  {{ currentlyPlaying.name }}
                </h5>
              </div>
              <div class="font-semibold opacity-75">
                {{  currentlyPlaying.album }}
              </div>
              <div class="font-semibold opacity-75">
                {{ currentlyPlaying.artists }}
              </div>
            </div>
          </div>
        </div>
        <div class="w-full bg-gray-200 h-2.5 dark:bg-gray-700">
          <div class="bg-gray-300 h-2.5" :style="{ width: playTimePct + '%' }"></div>
        </div>
        <div v-if="paused" class="absolute h-full w-full bg-green-800 top-0 left-0 bg-opacity-75 text-white">
          <div class="relative w-full h-full">
            <div class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
              <svg class="h-16 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z"></path>
              </svg>
              The music is paused!
            </div>
          </div>
        </div>
      </div>
      <div v-else class="bg-spotify-green">
        <div class="grid grid-cols-12">
          <div class="col-span-2">
            <svg class="w-full p-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" d="M17.721 1.599a.75.75 0 01.279.584v11.29a2.25 2.25 0 01-1.774 2.198l-2.041.442a2.216 2.216 0 01-.938-4.333l2.662-.576a.75.75 0 00.591-.734V6.112l-8 1.73v7.684a2.25 2.25 0 01-1.774 2.2l-2.042.44a2.216 2.216 0 11-.935-4.33l2.659-.574A.75.75 0 007 12.53V4.237a.75.75 0 01.591-.733l9.5-2.054a.75.75 0 01.63.149z" fill-rule="evenodd"></path>
            </svg>
          </div>
          <div class="col-span-10 p-2 h-full align-items-center relative">
            <div class="absolute top-1/2 -translate-y-1/2">
              <div>
                <h5 class="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-black">
                  Nothing playing right now
                </h5>
              </div>
              <div class="font-semibold opacity-75">
                ...or this app has went to shit
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12">
        <div class="col-span-10 bg-white dark:bg-gray-800 dark:border-gray-700 p-5">
          <h5 class="mb-1 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Welcome to Free Market Fandango!
          </h5>

          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            See how it works and check your balance at <strong>dyln.dev/u/cIMI2y</strong> or use the QR code on the right.
          </p>
        </div>
        <div class="col-span-2 bg-white h-full align-items-center relative">
          <div class="absolute top-1/2 -translate-y-1/2">
            <img class="w-full" src="../../../assets/qr_code.png">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpotifyService from "@/services/spotify.service";

export default {
  name: "DisplayBoardPageInfo",
  components: {},
  data() {
    return {
      currentlyPlaying: null,
      updatedAt: Date.now(),
      playTimePct: 60,
      paused: false,
      error: null
    }
  },
  created() {
    this.getCurrentlyPlaying();
  },
  beforeUnmount() {
    clearInterval(this.timer)
    clearInterval(this.songProgressTimer)
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getCurrentlyPlaying()
    }, 30000);

    this.songProgressTimer = setInterval(() => {
      this.updateSongProgress()
    }, 500);
  },
  methods: {
    getCurrentlyPlaying() {
      SpotifyService.getCurrentlyPlaying().then(
        response => {
          if (this.currentlyPlaying !== null) {
            console.log('Time drift was ' + String((this.currentlyPlaying.progress_ms + (Date.now() - this.updatedAt)) - response.data.progress_ms) + 'ms')

            if (this.currentlyPlaying.progress_ms === response.data.progress_ms) {
              this.paused = true;
            }

            if (this.paused && this.currentlyPlaying.progress_ms !== response.data.progress_ms) {
               this.paused = false;
            }
          }

          this.currentlyPlaying = response.data;
          this.updatedAt = Date.now();
        },
        error => {
          this.error =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
        }
      )
    },
    updateSongProgress() {
      if (this.paused)
        return

      const newPlayTimePct = ((this.currentlyPlaying.progress_ms + (Date.now() - this.updatedAt)) / this.currentlyPlaying.duration_ms) * 100

      if (newPlayTimePct >= 100)
        this.playTimePct = 100
      else
        this.playTimePct = newPlayTimePct

      if (this.playTimePct === 100)
        this.getCurrentlyPlaying();
    }
  }
}
</script>

<style scoped>

</style>
