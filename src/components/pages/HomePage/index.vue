<template>
  <v-navbar />

  <div class="max-w-screen-xl mx-auto mt-4">
    <VHowToPlay />
  </div>
</template>

<script>
import VNavbar from "@/components/VNavbar.vue";
import VBalanceCheck from "@/components/pages/AccountPage/AccountPageAccountInfo.vue";
import VHowToPlay from "@/components/VHowToPlay.vue";

export default {
  name: "Index",
  components: {VHowToPlay, VBalanceCheck, VNavbar },
}
</script>

<style scoped>

</style>