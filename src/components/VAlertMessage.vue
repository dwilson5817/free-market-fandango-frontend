<template>
  <Transition name="slide">
    <div v-if="message !== null" :class="alertClassName" class="alert alert-dismissible">
      {{ message }}
      <a @click.prevent="closeAlert" type="button" class="btn-close" aria-label="Close"></a>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "VAlertMessage",
  props: [
      'message',
      'type'
  ],
  computed: {
    alertClassName() {
      return 'alert-' + this.type;
    }
  },
  methods: {
    closeAlert() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>