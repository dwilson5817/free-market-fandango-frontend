<template>
  <Transition name="slide">
    <div v-if="display" :class="alertClassName" class="alert">
      <slot></slot>
      <a v-if="dismissible" @click.prevent="closeAlert" type="button" class="btn-close" aria-label="Close"></a>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "VAlertMessage",
  emits: [ 'close' ],
  props: {
      type: String,
      display: Boolean,
      dismissible: Boolean,
  },
  computed: {
    alertClassName() {
      return {
        ['alert-' + this.type]: true,
        'alert-dismissible': this.dismissible
      };
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