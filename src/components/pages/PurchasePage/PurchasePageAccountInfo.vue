<script setup>
import VAlertMessage from "@/components/VAlertMessage.vue";

const props = defineProps({
  accountInfo: Object
})
</script>

<template>
  <v-alert-message
    v-if="accountInfo !== null"
    :display="true"
    type="info"
  >
    <strong>{{ accountInfo.name }}</strong> currently has <strong>{{ accountInfo.balance }} Edinbucks</strong> in their account.
  </v-alert-message>
</template>

<style scoped>

</style>
