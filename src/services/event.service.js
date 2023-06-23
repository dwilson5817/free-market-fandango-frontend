import axios from 'axios';
import authHeader from "@/services/auth-header";

const API_URL = import.meta.env.VITE_API_URL;

class EventService {
  getEvents() {
    return axios.get(API_URL + 'events/');
  }

  createEvent(event) {
    return axios.put(API_URL + 'events/', event, { headers: authHeader() });
  }

  deleteEvent(eventId) {
    return axios.delete(API_URL + 'events/' + eventId, { headers: authHeader() });
  }
}

export default new EventService();
