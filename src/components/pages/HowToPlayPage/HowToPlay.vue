<script setup>
import {ref} from 'vue'
import {Button, Modal} from "flowbite-vue";
import step_1 from '../../../assets/step_1.jpg';
import step_2 from '../../../assets/step_2.jpg';
import step_3 from '../../../assets/step_3.jpg';
import AppCard from "@/components/AppCard.vue";

const isShowModal = ref(false)
const errorMessage = ref(null)
const modalMessage = ref(null)
const currentPage = ref(0)

const pages = [
  {
    image: step_1
  },
  {
    image: step_2
  },
  {
    image: step_3
  }
]

function closeModal() {
  currentPage.value = 0;
  isShowModal.value = false
}

function showModal() {
  isShowModal.value = true
}
</script>

<template>
  <AppCard>
    <template #svg>
      <path
        d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template #title>
      How to play
    </template>

    <template #body>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Click below to see how the Free Market Fandango works.
      </p>

      <button class="inline-flex items-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"
              @click="showModal">
        Read more
        <svg
          aria-hidden="true"
          class="w-4 h-4 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clip-rule="evenodd"
        /></svg>
      </button>
    </template>
  </AppCard>

  <Modal v-if="isShowModal" size="6xl" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg text-white">
        How to play
      </div>
    </template>
    <template #body>
      <div class="text-white bg-white">
        <img :src="pages[currentPage].image" class="mx-auto mb-3" alt="Step 1: Use your card for all alcohol purchases">
      </div>
    </template>
    <template #footer>
      <div class="flex flex-row">
        <Button v-if="currentPage !== 0" @click="currentPage -= 1" size="lg">
          <div class="inline-flex items-center">
            <svg aria-hidden="true" class="w-4 h-4 mt-1 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd" />
            </svg>

            Previous
          </div>
        </Button>
        <Button v-if="currentPage < (pages.length - 1)" @click="currentPage += 1" size="lg" class="ml-auto">
          <div class="inline-flex items-center">
            Next

            <svg aria-hidden="true" class="w-4 h-4 mt-1 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
            </svg>
          </div>
        </Button>
        <Button v-else class="ml-auto" @click="closeModal" size="lg" color="green">
          Close
        </Button>
      </div>
    </template>
  </Modal>
</template>

<style scoped>

</style>