<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue";

const section = ref(null);
const logo = ref(null);
const timer = ref(null);

const FPS = 60;

// section.style.height = window.innerHeight + "px";
// section.style.width = window.innerWidth + "px";

// Logo moving velocity Variables
let xPosition = 10;
let yPosition = 10;
let xSpeed = 4;
let ySpeed = 4;

function update() {
  logo.value.style.left = xPosition + "px";
  logo.value.style.top = yPosition + "px";
}

onMounted(() => {
  timer.value = setInterval(() => {
    if (logo.value === null || section.value === null)
      return

    if (xPosition + logo.value.clientWidth >= section.value.clientWidth || xPosition <= 0) {
      xSpeed = -xSpeed;
    }

    if (yPosition + logo.value.clientHeight >= section.value.clientHeight || yPosition <= 0) {
      ySpeed = -ySpeed;
    }

    xPosition += xSpeed;
    yPosition += ySpeed;

    update();
  }, 1000 / FPS);
})

onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>

<template>
<div ref="section" class="relative w-full h-full">
  <img ref="logo" src="../../../../assets/logo.svg" class="h-24 absolute" alt="Free Market Fandango Logo">
</div>
</template>

<style scoped>

</style>