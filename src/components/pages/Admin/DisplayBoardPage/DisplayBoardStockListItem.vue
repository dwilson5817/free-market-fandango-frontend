<script setup>
import { computed, reactive, ref, watch } from "vue";
import { gsap } from "gsap";
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, TimeSeriesScale, LinearScale, PointElement } from 'chart.js'
import 'chartjs-adapter-date-fns';

ChartJS.register(Title, Tooltip, Legend, LineElement, TimeSeriesScale, LinearScale, PointElement)

const openPriceInfo = ref(false);

const priceHistoryChartOptions = {
  parsing: {
    xAxisKey: 'changed_at',
    yAxisKey: 'new_price'
  },
  scales: {
      x: {
          type: 'timeseries',
      }
  }
}

const props = defineProps({
  stock: Object,
  interactive: Boolean
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
  <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div class="relative">
      <div class="grid grid-cols-12 gap-4 p-6">
        <div class="col-span-8">
          <Transition name="bounce" mode="out-in">
            <img v-if="percentChange < 0" class="h-12 mb-2" src="../../../../assets/up.svg" alt="Change image">
            <img v-else-if="percentChange > 0" class="h-12 mb-2" src="../../../../assets/down.svg" alt="Change image">
            <img v-else class="h-12 mb-2" src="../../../../assets/flat.svg" alt="Change image">
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
        <div v-if="! stock.in_stock" :class="{ 'rounded-b-lg': !interactive }" class="absolute top-1/2 -translate-y-1/2 w-full h-full bg-black bg-opacity-40 rounded-t-lg">
          <div class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white font-semibold text-lg bg-red-600 px-3 py-2 -rotate-12 rounded-md">
            Out of stock!
          </div>
        </div>
      </Transition>
    </div>

    <div v-if="interactive" class="">
      <div data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
        <h2>
          <button @click="openPriceInfo = !openPriceInfo" type="button" class="px-6 flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-t border-gray-200 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
            <span>See price history</span>
            <svg :class="{ 'rotate-180': !openPriceInfo }" class="w-3 h-3 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
            </svg>
          </button>
        </h2>
        <div :class="{ 'hidden': !openPriceInfo }">
          <div class="px-6 py-5 border-t border-gray-200 dark:border-gray-700">
            <p class="mb-2 text-gray-500 dark:text-gray-400">
              <strong>{{ stock.name }}</strong> is currently <strong>{{ stock.in_stock ? 'in stock' : 'out of stock' }}</strong>.  {{ stock.in_stock ? 'It is currently' : 'It was last' }} priced at <strong>{{ stock.price }}</strong> Edinbucks, this {{ stock.in_stock ? 'is' : 'was' }} <strong>{{ percentChange > 0 ? 'an increase of ' + percentChange + '% from' : percentChange < 0 ? 'a decrease of ' + Math.abs(percentChange) + '% from' : 'the same as' }}</strong> the initial price of <strong>{{ stock.initial_price }} Edinbucks</strong>.
            </p>
            <p class="mb-2 text-gray-500 dark:text-gray-400">
              The full price history of {{ stock.name }} is shown in the line chart below.
            </p>
            <Line :id="'chart-' + stock.code" :data="{ datasets: [{ label: stock.name, borderColor: '#3cba9f', data: stock.price_changes }] }" :options="priceHistoryChartOptions" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .edinbuck-sign {
      background-image: url(../../../../assets/edinbuck.svg);
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
