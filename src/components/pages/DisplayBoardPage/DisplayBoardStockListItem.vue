<script setup>
import {computed, reactive, watch} from "vue";
import { gsap } from "gsap";

const props = defineProps({
  stock: Object
})

const percentChange = computed(() => {
  return (((props.stock.price - props.stock.initial_price) / props.stock.initial_price) * 100).toFixed(2)
})

const tweened = reactive({
  stock_price: 0,
})

watch(() => props.stock.price, (n) => {
  gsap.to(tweened, { duration: 0.5, stock_price: Number(n) || 0 })
})

gsap.to(tweened, { duration: 0.5, stock_price: Number(props.stock.price) || 0 })
</script>

<template>
  <div class="relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div class="grid grid-cols-12 gap-4 p-6">
      <div class="col-span-8">
        <Transition name="bounce" mode="out-in">
          <img v-if="percentChange < 0" class="h-12 mb-2" src="../../../assets/up.svg" alt="Change image">
          <img v-else-if="percentChange > 0" class="h-12 mb-2" src="../../../assets/down.svg" alt="Change image">
          <img v-else class="h-12 mb-2" src="../../../assets/flat.svg" alt="Change image">
        </Transition>
        <p class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          <span class="font-mono mr-3">{{ stock.code }}</span>

          <span class="font-normal text-gray-500 dark:text-gray-400">
            {{ stock.name }}
          </span>
        </p>
      </div>
      <div class="text-white text-right col-span-4">
          <div :class="{ 'animate-flicker': stock.in_stock }">
            <div class="text-3xl mb-4">
              <span class="edinbuck-sign" />{{ tweened.stock_price.toFixed(2) }}
            </div>
            <div>
              <span v-if="percentChange < 0" class="bg-red-100 text-red-800 text-base font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                {{ (percentChange < 0 ? "" : "+") + percentChange }}%
              </span>
              <span v-else-if="percentChange > 0" class="bg-green-100 text-green-800 text-base font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                {{ (percentChange < 0 ? "" : "+") + percentChange }}%
              </span>
              <span v-else class="bg-gray-100 text-gray-800 text-base font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">No change</span>
            </div>
          </div>
      </div>
    </div>
    <Transition name="fade">
      <div v-if="! stock.in_stock" class="absolute top-1/2 -translate-y-1/2 w-full h-full bg-black bg-opacity-40 rounded-lg">
        <div class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white font-semibold text-lg bg-red-600 px-3 py-2 -rotate-12 rounded-md">
          Out of stock!
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
  .edinbuck-sign {
      background-image: url(../../../assets/edinbuck.svg);
      display: inline-block;
      background-size: contain;
      position: relative;
      top: 5px;
      width: 16px;
      height: 32px;
      margin-right: 4px;
  }

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

  .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.gradient-ease {
    background: linear-gradient(0deg, #9aca3c, #d5364b);
    background-size: 400% 400%;

    -webkit-animation: gradient-ease 10s ease infinite;
    -moz-animation: gradient-ease 10s ease infinite;
    animation: gradient-ease 10s ease infinite;
}

@-webkit-keyframes gradient-ease {
    0%{background-position:50% 0%}
    50%{background-position:50% 100%}
    100%{background-position:50% 0%}
}

@-moz-keyframes gradient-ease {
    0%{background-position:50% 0%}
    50%{background-position:50% 100%}
    100%{background-position:50% 0%}
}

@keyframes gradient-ease {
    0%{background-position:50% 0%}
    50%{background-position:50% 100%}
    100%{background-position:50% 0%}
}
</style>
