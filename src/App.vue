<script setup>

</script>

<template>
  <header />

  <main>
    <router-view v-slot="{ Component, route }">
      <transition
        name="slide-left"
        mode="out-in"
      >
        <div :key="route.path">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </main>
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.2s ease-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
