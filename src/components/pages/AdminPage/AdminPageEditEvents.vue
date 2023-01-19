<template>
  <div class="card border-primary mt-3">
    <div class="card-header">
      <span class="align-middle">
        Events
      </span>
      <button type="button" class="btn btn-sm btn-primary float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill mb-1" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
      </svg>
        New Event
      </button>
    </div>
    <div class="card-body">
      <v-alert-message :message="errorMessage" v-on:close="errorMessage = null" type="danger"></v-alert-message>
      <div v-if="Object.keys(this.events).length === 0" class="card text-bg-secondary">
        <div class="card-body">
          <h5 class="card-title">No Events Created Yet</h5>
          <p class="card-text">Use the create button on the top right to create one now!</p>
        </div>
      </div>
      <div v-else v-for="event in this.events" class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ event.title }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">
            <span v-if="event.tags.length === 0" class="badge rounded-pill text-bg-danger me-1">No tags</span>
            <span v-else v-for="tag in event.tags" class="badge rounded-pill text-bg-warning me-1">{{ tag }}</span>
          </h6>
          <p class="card-text mb-0">{{ event.body }}</p>
          <a @click.prevent="deleteEvent(event.id)" href="#" class="btn btn-sm btn-outline-danger position-absolute top-0 end-0 me-3 mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg mb-1" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">New event</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <v-alert-message :message="modalMessage" v-on:close="modalMessage = null" type="danger"></v-alert-message>
          <div class="form-floating mb-3">
            <input v-model="event.title" type="text" class="form-control" id="floatingInput" placeholder="Title">
            <label for="floatingInput">Title</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="event.body" type="text" class="form-control" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">News Story</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="event.tags" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Tags</label>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">News Story</label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">News Story</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
          <button @click.prevent="createEvent" type="button" class="btn btn-success">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/event.service";
import VAlertMessage from "@/components/VAlertMessage.vue";

export default {
  name: "AdminPageEditEvents",
  components: {VAlertMessage},
  data() {
    return {
      events: {},
      event: {
        title: null,
        body: null,
        tags: null
      },
      errorMessage: null,
      modalMessage: null
    }
  },
  mounted() {
    this.updateValues();
  },
  methods: {
    deleteEvent(eventId) {
      EventService.deleteEvent(eventId).then(
        response => {
          this.updateValues();
        },
        error => {
          this.errorMessage =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
      );
    },
    createEvent() {
      EventService.createEvent(this.event).then(
        response => {
          this.event = {
            title: null,
            body: null,
            tags: null
          }

          this.updateValues();
        },
        error => {
            this.modalMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
        }
      );
    },
    updateValues() {
      EventService.getEvents().then(
        response => {
          this.events = response.data;
        },
        error => {
          this.errorMessage =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
      )
    }
  }
}
</script>

<style scoped>

</style>