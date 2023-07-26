<script setup>
import {Button, Modal} from 'flowbite-vue'
import {reactive, ref} from 'vue'
import EventService from "@/services/event.service";
import VAlertMessage from "@/components/VAlertMessage.vue";
import AppCard from "@/components/AppCard.vue";

const isShowModal = ref(false)
const events = ref({})
const event = reactive({
  title: null,
  body: null,
  tags: null,
  breaking: false,
  video_url: null,
  change_min: null,
  change_max: null
})
const errorMessage = ref(null)
const modalMessage = ref(null)

function closeModal() {
  isShowModal.value = false
}

function showModal() {
  isShowModal.value = true
}

function deleteEvent(eventId) {
  EventService.deleteEvent(eventId).then(
      response => {
        updateValues();
      },
      error => {
        errorMessage.value =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
      }
  );
}

function createEvent() {
  EventService.createEvent(event).then(
      response => {
        closeModal();

        event.title = null
        event.body = null
        event.breaking = false
        event.video_url = null
        event.tags = null
        event.change_min = null
        event.change_max = null

        updateValues();
      },
      error => {
        modalMessage.value =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
      }
  );
}

function updateValues() {
  EventService.getEvents().then(
      response => {
        events.value = response.data;
      },
      error => {
        errorMessage.value =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
      }
  )
}

updateValues();
</script>

<template>
  <AppCard>
    <template #svg>
      <path clip-rule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h9A1.5 1.5 0 0114 3.5v11.75A2.75 2.75 0 0016.75 18h-12A2.75 2.75 0 012 15.25V3.5zm3.75 7a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm0 3a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zM5 5.75A.75.75 0 015.75 5h4.5a.75.75 0 01.75.75v2.5a.75.75 0 01-.75.75h-4.5A.75.75 0 015 8.25v-2.5z" fill-rule="evenodd"></path>
      <path d="M16.5 6.5h-1v8.75a1.25 1.25 0 102.5 0V8a1.5 1.5 0 00-1.5-1.5z"></path>
    </template>

    <template #title>
      Events
    </template>

    <template #body>
      <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
        An event is a news story which affects the prices of drinks, breaking events have a video which will be displayed to users.
      </p>

      <v-alert-message
          :display="errorMessage !== null"
          dismissible
          type="danger"
          @close="errorMessage = null"
      >
        {{ errorMessage }}
      </v-alert-message>

      <div v-if="Object.keys(events).length === 0"
           class="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">No events created yet</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">You can create one now.</p>
      </div>

      <div v-for="event in events" v-else
           class="block mb-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <span v-if="event.breaking" class="bg-red-100 text-red-800 text-base font-bold uppercase mr-1 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">Breaking</span>
          {{ event.title }}
        </h5>
        <span v-for="tag in event.tags" class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{{ tag.tag.name }}</span>
        <p class="font-normal my-2 text-gray-700 dark:text-gray-400">{{ event.body }}</p>
        <Button color="red" @click.prevent="deleteEvent(event.id)">Delete</Button>
      </div>

      <button class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"
              @click="showModal">
        Create
      </button>
    </template>
  </AppCard>

  <form @submit.prevent="createEvent">
    <Modal v-if="isShowModal" size="xl" @close="closeModal">
      <template #header>
        <div class="flex items-center text-lg text-white">
          Create a new event
        </div>
      </template>
      <template #body>
        <v-alert-message
            :display="modalMessage !== null"
            dismissible
            type="danger"
            @close="modalMessage = null"
        >
          {{ modalMessage }}
        </v-alert-message>
        <div class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          <div class="mb-6">
              <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
              <input v-model="event.title" type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>
          <div class="mb-6">
              <label for="body" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Body</label>
              <input v-model="event.body" type="text" id="body" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>
          <div class="mb-6">
              <label for="tags" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags</label>
              <input v-model="event.tags" type="text" id="tags" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          </div>
          <div class="flex items-start mb-6">
              <div class="flex items-center h-5">
              <input v-model="event.breaking" id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800">
              </div>
              <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Breaking?
              </label>
          </div>
          <div v-if="event.breaking" class="mb-6">
              <label for="video-url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Video URL</label>
              <input v-model="event.video_url" type="url" id="video-url" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          </div>
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label for="change-min" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Change % minimum</label>
              <div class="flex">
                <input v-model="event.change_min" type="text" id="change-min" class="rounded-none rounded-l-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  %
                </span>
              </div>
            </div>
            <div>
              <label for="change-max" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Change % maximum</label>
              <div class="flex">
                <input v-model="event.change_max" type="text" id="change-max" class="rounded-none rounded-l-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-between">
          <button class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" type="button" @click="closeModal">
            Cancel
          </button>
          <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">
            Create
          </button>
        </div>
      </template>
    </Modal>
  </form>
</template>

<style scoped>

</style>