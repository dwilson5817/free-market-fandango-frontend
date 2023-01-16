import axios from 'axios';
import authHeader from "@/services/auth-header";

const API_URL = import.meta.env.VITE_API_URL;

class EventService {
  getEvents() {
    return axios.get(API_URL + 'event');
  }

  createEvent(event) {
    return axios.post(API_URL + 'event', event, { headers: authHeader() });
  }

  deleteEvent(eventId) {
    return axios.delete(API_URL + 'event/' + eventId, { headers: authHeader() });
  }
}

export default new EventService();
