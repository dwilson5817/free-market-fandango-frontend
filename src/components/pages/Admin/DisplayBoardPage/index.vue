<template>
  <div class="flex flex-col h-screen">
    <div class="flex-grow">
      <Transition
          mode="out-in"
          name="slide-fade"
      >
        <div v-if="! status.active" class="h-full">
          <div class="flex flex-col h-full gradient-ease">
            <div class="bg-black w-full text-center py-4 text-white bg-opacity-50 ">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight">Market closed</h5>
              Stock information will be displayed here when the market is opened.
            </div>
            <div class="flex flex-grow">
              <display-board-waiting-screen/>
            </div>
          </div>
        </div>
        <div v-else class="h-full">
          <display-board-breaking-news
              :hidden="breakingHidden"
              :news="news"
              @ended="breakingHidden = true"
          />
          <div class="flex flex-col h-full justify-between">
            <header>
              <div v-if="newsError" class="bg-red-600 text-white">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white p-3 text-center">
                  <span
                      class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    Alert
                  </span>
                  {{ newsError.detail }}
                </h5>
              </div>
              <display-board-page-navbar/>
            </header>
            <main>
              <div class="p-4 px-6">
                <div class="grid grid-cols-4 gap-4">
                  <display-board-stocks/>
                </div>
              </div>
            </main>
            <footer>
              <display-board-page-news v-if="news" :news="news"/>
            </footer>
          </div>
        </div>
      </Transition>
    </div>
    <display-board-page-info/>
  </div>
</template>

<script>
import NewsService from "@/services/news.service";
import _ from 'lodash';
import ActivationService from "@/services/activation.service";
import DisplayBoardWaitingScreen from "@/components/pages/Admin/DisplayBoardPage/DisplayBoardWaitingScreen.vue";
import DisplayBoardBreakingNews from "@/components/pages/Admin/DisplayBoardPage/DisplayBoardBreakingNews.vue";
import DisplayBoardPageNavbar from "@/components/pages/Admin/DisplayBoardPage/DisplayBoardPageNavbar.vue";
import DisplayBoardStocks from "@/components/pages/Admin/DisplayBoardPage/DisplayBoardStocks.vue";
import DisplayBoardPageNews from "@/components/pages/Admin/DisplayBoardPage/DisplayBoardPageNews.vue";
import DisplayBoardPageInfo from "@/components/pages/Admin/DisplayBoardPage/DisplayBoardPageInfo.vue";

export default {
  name: "Index",
  components: {
    DisplayBoardPageInfo,
    DisplayBoardPageNews,
    DisplayBoardStocks,
    DisplayBoardPageNavbar,
    DisplayBoardBreakingNews,
    DisplayBoardWaitingScreen
  },
  data() {
    return {
      status: {
        active: false,
        activeFrom: null,
        activeUntil: null
      },
      newsError: null,
      statusError: null,
      news: null,
      breakingHidden: true,
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.updateValues()
    }, 15000);
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  created() {
    this.updateValues();
  },
  methods: {
    updateValues() {
      this.getStatus();
    },
    getNews() {
      NewsService.getNews().then(
          response => {
            if (_.isEqual(this.news, response.data))
              return

            this.newsError = null;
            this.news = response.data;

            if (response.data.breaking)
              this.breakingHidden = false
          },
          error => {
            this.news = null;
            this.newsError =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
          }
      )
    },
    getStatus() {
      ActivationService.getStatus().then(
          response => {
            this.status.active = true;
            this.status.activeFrom = response.data.started_at;
            this.status.activeUntil = response.data.ends_at;

            this.getNews();
          },
          error => {
            this.status.active = false;
            this.status.activeFrom = null;
            this.status.activeUntil = null;

            if (error.response.status !== 404)
                this.statusError =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
          }
      );
    },
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.gradient-ease {
  background: linear-gradient(0deg, #9aca3c, #d5364b);
  background-size: 400% 400%;

  -webkit-animation: gradient-ease 10s ease infinite;
  -moz-animation: gradient-ease 10s ease infinite;
  animation: gradient-ease 10s ease infinite;
}

@-webkit-keyframes gradient-ease {
  0% {
    background-position: 50% 0%
  }
  50% {
    background-position: 50% 100%
  }
  100% {
    background-position: 50% 0%
  }
}

@-moz-keyframes gradient-ease {
  0% {
    background-position: 50% 0%
  }
  50% {
    background-position: 50% 100%
  }
  100% {
    background-position: 50% 0%
  }
}

@keyframes gradient-ease {
  0% {
    background-position: 50% 0%
  }
  50% {
    background-position: 50% 100%
  }
  100% {
    background-position: 50% 0%
  }
}
</style>